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
    const text

    = expect(input.element.checked).toBeFalsy()
    expect(input.element.type).toBe('checkbox')

    const label = wrapper.get('label')

    await label.trigger('click')

    expect(input.element.checked).toBeTruthy()
  })

  it('should not work when disabled')
})
