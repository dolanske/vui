<script setup lang='ts'>
import type { VueDatePickerProps } from '@vuepic/vue-datepicker'
import { IconCalendarBlank, IconCaretDown, IconCaretLeft, IconCaretRight, IconCaretUp, IconClock, IconX } from '@iconify-prerendered/vue-ph'
import VueDatePicker from '@vuepic/vue-datepicker'
import { useAttrs } from 'vue'
import { theme } from '../../shared/theme'
import '@vuepic/vue-datepicker/dist/main.css'
import './calendar.scss'

const props = withDefaults(defineProps<VueDatePickerProps & {
  expand?: boolean
}>(), {
  autoApply: true,
  autoPosition: true,
  format: 'dd/MM/yyyy HH:mm',
  monthNameFormat: 'long',
  expand: false,
})

const attrs = useAttrs()
</script>

<template>
  <VueDatePicker
    v-bind="{ ...props, ...attrs }"
    class="vui-calendar"
    :class="{ 'vui-calendar-inline': props.inline }"
    :style="props.expand ?? !$slots.trigger
      ? undefined
      : { display: 'inline-block', width: 'auto' }
    "
    :dark="theme === 'dark'"
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
