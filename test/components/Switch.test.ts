import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Switch from '../../src/components/Switch/Switch.vue'

describe('component:Switch', () => {
  it('should have default state', async () => {
    const wrapper = mount(Switch, {
      props: {
        label: 'Hello',
        modelValue: false,
      },
    })
    const input = wrapper.get('input')

    // Setup
    expect(wrapper.text()).toContain('Hello')
    expect(input.element.checked).toBeFalsy()
    expect(input.element.type).toBe('checkbox')

    const label = wrapper.get('label')
    await label.trigger('click')

    // Switch
    expect(input.element.checked).toBeTruthy()
  })

  it('should not work when disabled', async () => {
    const wrapper = mount(Switch, {
      props: {
        label: 'Hello',
        modelValue: false,
        disabled: true,
      },
    })
    const input = wrapper.get('input')

    expect(input.element.disabled).toBeTruthy()
    await wrapper.get('label').trigger('click')
    expect(input.element.checked).toBeFalsy()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
