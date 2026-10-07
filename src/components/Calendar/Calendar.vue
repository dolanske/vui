<script setup lang='ts'>
import type { RootProps } from '@vuepic/vue-datepicker'
import { IconCalendarBlank, IconCaretDown, IconCaretLeft, IconCaretRight, IconCaretUp, IconClock, IconX } from '@iconify-prerendered/vue-ph'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import { camelize, getCurrentInstance, useAttrs, useSlots } from 'vue'
import { isDark } from '../../lib/theme'
import './datepicker.css'
import './calendar.scss'

const props = defineProps<RootProps & {
  expand?: boolean
  /**
   * Shorthand for `timeConfig.enableTimePicker`. vue-datepicker v14 moved the
   * option into `timeConfig`, this keeps the familiar prop working.
   */
  enableTimePicker?: boolean
}>()

const attrs = useAttrs()
const slots = useSlots()
const instance = getCurrentInstance()

/**
 * Vue casts every omitted boolean prop to `false`. Forwarding all props would
 * therefore override vue-datepicker's own defaults (anything defaulting to
 * `true` would silently turn off). Only props the consumer actually passed
 * are forwarded.
 */
function getPassedProps(): Record<string, unknown> {
  const raw = instance?.vnode.props ?? {}
  const result: Record<string, unknown> = {}

  for (const key of Object.keys(raw)) {
    const name = camelize(key)
    if (name !== 'expand' && name in props)
      result[name] = (props as Record<string, unknown>)[name]
  }

  return result
}

function getBindings(): Record<string, unknown> {
  const { enableTimePicker, ...passed } = getPassedProps()

  const timeConfig = { ...(passed.timeConfig as Record<string, unknown> | undefined) }
  if (enableTimePicker !== undefined)
    timeConfig.enableTimePicker = enableTimePicker

  // The time is only part of the displayed value when it can be picked
  const withTime = timeConfig.enableTimePicker !== false && !passed.monthPicker && !passed.yearPicker && !passed.weekPicker && !passed.quarterPicker

  return {
    autoApply: true,
    formats: { input: withTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy', month: 'MMMM' },
    ...passed,
    ...(Object.keys(timeConfig).length > 0 ? { timeConfig } : {}),
    ...attrs,
  }
}

// A custom trigger keeps its natural width unless `expand` is set
function getStyle() {
  if (props.expand || !slots.trigger)
    return undefined
  return { display: 'inline-block', width: 'auto' }
}
</script>

<template>
  <VueDatePicker
    v-bind="getBindings()"
    class="vui-calendar"
    :class="{ 'vui-calendar-inline': props.inline, 'vui-calendar-expand': props.expand }"
    :style="getStyle()"
    :dark="isDark"
  >
    <!-- Icon slots -->
    <template #input-icon>
      <IconCalendarBlank />
    </template>
    <template #calendar-icon>
      <IconCalendarBlank />
    </template>
    <template #clear-icon>
      <IconX />
    </template>
    <template #clock-icon>
      <IconClock />
    </template>
    <template #arrow-left>
      <IconCaretLeft />
    </template>
    <template #arrow-right>
      <IconCaretRight />
    </template>
    <template #arrow-up>
      <IconCaretUp />
    </template>
    <template #arrow-down>
      <IconCaretDown />
    </template>

    <!-- Content slots -->
    <template v-if="$slots.trigger" #trigger>
      <slot name="trigger" />
    </template>
  </VueDatePicker>
</template>
