import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import Accordion from '../../src/components/Accordion/Accordion.vue'
import Button from '../../src/components/Button/Button.vue'
import Color from '../../src/components/Input/Color.vue'
import Counter from '../../src/components/Input/Counter.vue'
import Dropzone from '../../src/components/Input/Dropzone.vue'
import Input from '../../src/components/Input/Input.vue'
import Password from '../../src/components/Input/Password.vue'
import Textarea from '../../src/components/Input/Textarea.vue'

function controlled<T>(component: any, props: Record<string, unknown>) {
  const wrapper: any = mount(component, {
    props: {
      ...props,
      'onUpdate:modelValue': (value: T) => wrapper.setProps({ modelValue: value }),
    },
  })
  return wrapper
}

describe('forms', () => {
  it('never submits a parent form by accident', async () => {
    let submitted = 0
    const Form = defineComponent({
      render: () => h('form', { onSubmit: (event: Event) => {
        event.preventDefault()
        submitted++
      } }, [
        h(Accordion, { label: 'a' }),
        h(Button, null, () => 'b'),
        h(Counter, { modelValue: 1 }),
        h(Password, { modelValue: 'x' }),
      ]),
    })
    const wrapper = mount(Form, { attachTo: document.body })
    for (const button of wrapper.findAll('button'))
      await button.trigger('click')

    expect(submitted).toBe(0)
    wrapper.unmount()
  })

  it('button honours an explicit type', () => {
    expect(mount(Button, { props: { type: 'submit' } }).attributes('type')).toBe('submit')
    expect(mount(Button).attributes('type')).toBe('button')
    expect(mount(Button).attributes('role')).toBeUndefined()
  })

  it('loading buttons stay focusable but ignore clicks', async () => {
    let clicks = 0
    const wrapper = mount(Button, { props: { loading: true }, attrs: { onClick: () => clicks++ } })
    await wrapper.trigger('click')
    expect(clicks).toBe(0)
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.attributes('inert')).toBeUndefined()
    expect(mount(Button).find('.vui-spinner').exists()).toBe(false)
  })

  it('disabled links are not navigable', async () => {
    let clicks = 0
    const wrapper = mount(Button, { props: { href: '/x', disabled: true }, attrs: { onClick: () => clicks++ } })
    await wrapper.trigger('click')
    expect(wrapper.attributes('href')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBe('true')
    expect(wrapper.attributes('tabindex')).toBe('-1')
    expect(clicks).toBe(0)
  })

  it('renders router links through `as`', () => {
    const Link = defineComponent({
      props: { to: String },
      setup: (props, { slots }) => () => h('a', { href: props.to }, slots.default?.()),
    })
    const wrapper = mount(Button, { props: { as: Link }, attrs: { to: '/settings' } })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('/settings')
  })

  it('input forwards name and attributes to the native input', () => {
    const wrapper = mount(Input, { props: { name: 'email' }, attrs: { autocomplete: 'email', class: 'custom' } })
    const input = wrapper.get('input')
    expect(input.attributes('name')).toBe('email')
    expect(input.attributes('autocomplete')).toBe('email')
    expect(wrapper.classes()).toContain('custom')
  })

  it('input links hint and errors for assistive technology', () => {
    const wrapper = mount(Input, { props: { hint: 'h', errors: ['e', 'e'] } })
    const input = wrapper.get('input')
    expect(input.attributes('aria-describedby')?.split(' ')).toHaveLength(2)
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(wrapper.findAll('.vui-input-errors li')).toHaveLength(2)
  })

  it('input limit keeps the DOM in sync with the model', async () => {
    const wrapper = controlled<string>(Input, { limit: 3, modelValue: 'abc' })
    const input = wrapper.get('input')
    expect(input.attributes('maxlength')).toBe('3')
    await input.setValue('abcd')
    expect(wrapper.props('modelValue')).toBe('abc')
    expect((input.element as HTMLInputElement).value).toBe('abc')
  })

  it('number inputs truncate to the limit and keep max separate', async () => {
    const wrapper = controlled<string>(Input, { type: 'number', limit: 2, modelValue: '' })
    await wrapper.get('input').setValue('123')
    expect(wrapper.props('modelValue')).toBe('12')
    expect(wrapper.get('input').attributes('max')).toBeUndefined()
  })

  it('clearable inputs clear their value', async () => {
    const wrapper = controlled<string>(Input, { clearable: true, modelValue: 'hey' })
    await wrapper.get('.vui-input-clear').trigger('click')
    expect(wrapper.props('modelValue')).toBe('')
  })

  it('textarea forwards name and attributes', () => {
    const wrapper = mount(Textarea, { props: { name: 'bio', limit: 5 }, attrs: { 'data-x': '1' } })
    const textarea = wrapper.get('textarea')
    expect(textarea.attributes('name')).toBe('bio')
    expect(textarea.attributes('maxlength')).toBe('5')
    expect(textarea.attributes('data-x')).toBe('1')
  })

  it('counter clamps, avoids float drift and stays numeric', async () => {
    const wrapper = controlled<number>(Counter, { modelValue: 0.1, max: 0.3, incrementBy: 0.1 })
    const [, increment] = wrapper.findAll('button')
    await increment.trigger('click')
    await increment.trigger('click')
    await increment.trigger('click')
    expect(wrapper.props('modelValue')).toBe(0.3)
    expect(increment.attributes('disabled')).toBeDefined()
    expect(increment.attributes('aria-label')).toBe('Increase by 0.1')

    await wrapper.get('input').setValue('')
    expect(wrapper.props('modelValue')).toBeNull()
  })

  it('counter treats an empty field as zero instead of concatenating', async () => {
    const wrapper = controlled<number>(Counter, { modelValue: null })
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.props('modelValue')).toBe(1)
  })

  it('password supports password managers', () => {
    expect(mount(Password).get('input').attributes('autocomplete')).toBe('current-password')
    expect(mount(Password, { attrs: { autocomplete: 'new-password' } }).get('input').attributes('autocomplete')).toBe('new-password')
    expect(mount(Password).get('button').attributes('aria-pressed')).toBe('false')
  })

  it('color labels the text input and only emits complete colors', async () => {
    const wrapper = controlled<string>(Color, { label: 'Theme', modelValue: '#000000' })
    const text = wrapper.get('input[type=text]')
    expect(wrapper.get('.vui-input > label').attributes('for')).toBe(text.attributes('id'))
    await text.setValue('#ff')
    expect(wrapper.props('modelValue')).toBe('#000000')
    await text.setValue('#fff')
    expect(wrapper.props('modelValue')).toBe('#fff')
  })

  it('dropzone forwards file input attributes', () => {
    const wrapper = mount(Dropzone, { props: { accept: '.png', multiple: true, name: 'upload' } })
    const input = wrapper.get('input[type=file]')
    expect(input.attributes('accept')).toBe('.png')
    expect(input.attributes('multiple')).toBeDefined()
    expect(input.attributes('name')).toBe('upload')
  })
})
