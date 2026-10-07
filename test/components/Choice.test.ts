import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createCommentVNode, defineComponent, h, nextTick, ref } from 'vue'
import Checkbox from '../../src/components/Checkbox/Checkbox.vue'
import OTP from '../../src/components/OTP/OTP.vue'
import OTPItem from '../../src/components/OTP/OTPItem.vue'
import Radio from '../../src/components/Radio/Radio.vue'
import RadioGroup from '../../src/components/Radio/RadioGroup.vue'
import Select from '../../src/components/Select/Select.vue'
import Slider from '../../src/components/Slider/Slider.vue'
import Switch from '../../src/components/Switch/Switch.vue'
import { flush, mockLayout, withTransitions } from '../helpers'

function controlled(component: any, props: Record<string, unknown>, options: Record<string, unknown> = {}) {
  const wrapper: any = mount(component, {
    ...options,
    props: {
      ...props,
      'onUpdate:modelValue': (value: unknown) => wrapper.setProps({ modelValue: value }),
    },
  })
  return wrapper
}

describe('checkbox', () => {
  it('respects the checked prop without v-model', async () => {
    const wrapper = mount(Checkbox, { props: { checked: true, label: 'x' } })
    expect((wrapper.get('input').element as HTMLInputElement).checked).toBe(true)
    expect(wrapper.classes()).toContain('checked')

    await wrapper.get('input').setValue(false)
    expect(wrapper.classes()).not.toContain('checked')
    expect(wrapper.emitted('change')).toEqual([[false]])
  })

  it('supports indeterminate and array models', async () => {
    expect((mount(Checkbox, { props: { indeterminate: true } }).get('input').element as HTMLInputElement).indeterminate).toBe(true)

    const wrapper = controlled(Checkbox, { value: 'b', modelValue: ['a'] })
    await wrapper.get('input').setValue(true)
    expect(wrapper.props('modelValue')).toEqual(['a', 'b'])
    await wrapper.get('input').setValue(false)
    expect(wrapper.props('modelValue')).toEqual(['a'])
  })

  it('forwards attributes and avoids block content in labels', () => {
    const wrapper = mount(Checkbox, { props: { label: 'x', name: 'tos', hint: 'h' }, attrs: { 'data-a': '1' } })
    const input = wrapper.get('input')
    expect(input.attributes('name')).toBe('tos')
    expect(input.attributes('data-a')).toBe('1')
    expect(input.attributes('aria-describedby')).toBeTruthy()
    expect(wrapper.find('label p').exists()).toBe(false)
  })
})

describe('radio', () => {
  it('groups radios, survives v-if children and emits change', async () => {
    const selected = ref('a')
    const Group = defineComponent({
      render: () => h(RadioGroup, { 'modelValue': selected.value, 'onUpdate:modelValue': (value: string) => selected.value = value, 'label': 'Pick' }, () => [
        h('div', [h(Radio, { value: 'a' })]),
        h(Radio, { value: 'b' }),
        createCommentVNode('v-if', true),
      ]),
    })

    const wrapper = mount(Group)
    await nextTick()
    const inputs = wrapper.findAll('input')
    expect(inputs[0].attributes('name')).toBeTruthy()
    expect(inputs[0].attributes('name')).toBe(inputs[1].attributes('name'))
    expect(wrapper.get('legend').text()).toBe('Pick')

    await inputs[1].setValue(true)
    expect(selected.value).toBe('b')
    expect(wrapper.findAllComponents(Radio)[1].emitted('change')).toEqual([['b']])
  })

  it('disables every radio of a disabled group', () => {
    const wrapper = mount(RadioGroup, { props: { disabled: true }, slots: { default: () => h(Radio, { value: 'x' }) } })
    expect(wrapper.get('fieldset').attributes('disabled')).toBeDefined()
    expect(wrapper.get('input').attributes('disabled')).toBeDefined()
  })
})

describe('switch', () => {
  it('is announced as a switch', () => {
    const wrapper = mount(Switch, { props: { label: 'x', hint: 'h' } })
    expect(wrapper.get('input').attributes('role')).toBe('switch')
    expect(wrapper.get('input').attributes('aria-describedby')).toBeTruthy()
  })
})

describe('select', () => {
  const options = [
    { value: 1, label: 'One', group: 'A' },
    { value: 2, label: 'Two', group: 'A', disabled: true },
    { value: 3, label: 'Three' },
  ]

  it('has no nested buttons and submits with forms', () => {
    const wrapper = mount(Select, { props: { options, single: false, showClear: true, name: 'nums', modelValue: [options[0], options[2]] } })
    const trigger = wrapper.get('.vui-select-trigger-container')
    expect(trigger.attributes('type')).toBe('button')
    expect(trigger.find('button').exists()).toBe(false)
    expect(wrapper.find('.vui-select-clear').exists()).toBe(true)
    expect(wrapper.findAll('input[type=hidden]').map(input => input.attributes('value'))).toEqual(['1', '3'])
  })

  it('hides the clear button while readonly', () => {
    const wrapper = mount(Select, { props: { options, readonly: true, showClear: true, modelValue: [options[0]] } })
    expect(wrapper.find('.vui-select-clear').exists()).toBe(false)
  })

  it('is a keyboard operable listbox that replaces the model', async () => {
    mockLayout()
    const initial = [options[2]]
    const wrapper = controlled(Select, { options, single: false, modelValue: initial }, withTransitions)
    const trigger = wrapper.get('.vui-select-trigger-container').element as HTMLElement
    trigger.click()
    await flush()

    const listbox = document.querySelector('[role=listbox]')!
    expect(listbox.querySelectorAll('[role=option]')).toHaveLength(3)
    expect(listbox.querySelectorAll('[role=group]')).toHaveLength(1)
    expect((listbox.querySelectorAll('[role=option]')[1] as HTMLButtonElement).disabled).toBe(true)

    ;(listbox.querySelector('[role=option]') as HTMLElement).click()
    await flush()
    expect(wrapper.props('modelValue')).not.toBe(initial)
    expect(initial).toHaveLength(1)
    expect(wrapper.props('modelValue').map((option: any) => option.value)).toEqual([3, 1])
    wrapper.unmount()
  })
})

describe('slider', () => {
  it('handles unset models', () => {
    const single = mount(Slider)
    expect(single.find('.vui-slider-handle').attributes('aria-valuenow')).toBe('0')
    expect(single.find('.vui-slider-indicator').attributes('style')).not.toContain('NaN')

    const range = mount(Slider, { props: { range: true } })
    expect(range.find('.vui-slider-indicator').attributes('style')).toContain('width: 100%')
    expect(mount(Slider, { props: { min: 5, max: 5, modelValue: 5 } }).find('.vui-slider-handle').attributes('aria-valuenow')).toBe('5')
  })

  it('keeps precision for fractional ranges and emits the committed value', async () => {
    const wrapper = controlled(Slider, { min: 0, max: 1, modelValue: 0.5 })
    await wrapper.find('.vui-slider-handle').trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.props('modelValue')).toBe(0.51)
    expect(wrapper.emitted('change')).toEqual([[0.51]])
  })

  it('supports page keys, value text, forms and vertical layout', async () => {
    const wrapper = controlled(Slider, { modelValue: 50, name: 'volume', valueText: (value: number) => `${value}%` })
    await wrapper.find('.vui-slider-handle').trigger('keydown', { key: 'PageUp' })
    expect(wrapper.props('modelValue')).toBe(60)
    expect(wrapper.find('.vui-slider-handle').attributes('aria-valuetext')).toBe('60%')
    expect(wrapper.find('input[type=hidden]').attributes('value')).toBe('60')

    const vertical = mount(Slider, { props: { vertical: true, modelValue: 30 } })
    expect(vertical.find('.vui-slider-handle').attributes('aria-orientation')).toBe('vertical')
    expect(vertical.find('.vui-slider-handle').attributes('style')).toContain('bottom: 30%')
  })
})

describe('otp', () => {
  it('renders items, accepts virtual keyboard input and emits complete', async () => {
    const wrapper = controlled(OTP, { length: 4, mode: 'num', modelValue: '' })
    expect(wrapper.findAll('.vui-otp-item')).toHaveLength(4)

    const input = wrapper.get('input')
    await input.trigger('focus')
    for (const key of ['1', '2', '3'])
      await input.trigger('keydown', { key })

    // Android keyboards report "Unidentified" and rely on the input event
    await input.trigger('keydown', { key: 'Unidentified' })
    input.element.dispatchEvent(new InputEvent('input', { inputType: 'insertText', data: '4', bubbles: true }))
    await nextTick()

    expect(wrapper.props('modelValue')).toBe('1234')
    expect(wrapper.emitted('complete')).toEqual([['1234']])
  })

  it('keeps the length in sync with mounted items', async () => {
    const show = ref(true)
    const App = defineComponent({ render: () => h(OTP, null, () => [h(OTPItem, { i: 0 }), h(OTPItem, { i: 1 }), show.value ? h(OTPItem, { i: 2 }) : null]) })
    const wrapper = mount(App)
    await nextTick()
    expect(wrapper.get('input').attributes('maxlength')).toBe('3')
    show.value = false
    await nextTick()
    show.value = true
    await nextTick()
    show.value = false
    await nextTick()
    expect(wrapper.get('input').attributes('maxlength')).toBe('2')
  })
})
