import { mount } from '@vue/test-utils'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import { describe, expect, it } from 'vitest'
import Calendar from '../../src/components/Calendar/Calendar.vue'

describe('calendar', () => {
  it('keeps vue-datepicker defaults and maps the time picker shorthand', () => {
    const plain = mount(Calendar).findComponent(VueDatePicker)
    expect(plain.props('autoApply')).toBe(true)
    expect(plain.props('formats')).toMatchObject({ input: 'dd/MM/yyyy HH:mm' })

    const dateOnly = mount(Calendar, { props: { enableTimePicker: false } }).findComponent(VueDatePicker)
    expect(dateOnly.props('timeConfig')).toMatchObject({ enableTimePicker: false })
    expect(dateOnly.props('formats')).toMatchObject({ input: 'dd/MM/yyyy' })

    const merged = mount(Calendar, { props: { enableTimePicker: false, timeConfig: { is24: false } } }).findComponent(VueDatePicker)
    expect(merged.props('timeConfig')).toMatchObject({ enableTimePicker: false, is24: false })
  })
})
