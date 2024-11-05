<script setup lang='ts'>
import type { VueDatePickerProps } from '@vuepic/vue-datepicker'
import { Icon } from '@iconify/vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import './calendar.scss'

const props = withDefaults(defineProps<VueDatePickerProps & {
  expand?: boolean
}>(), {
  autoApply: true,
  autoPosition: true,
  dark: true,
  format: 'dd/MM/yyyy HH:mm',
  expand: false,
})
</script>

<template>
  <VueDatePicker
    v-bind="props"
    :style="props.expand || !$slots.trigger
      ? undefined
      : { display: 'inline-block', width: 'auto' }
    "
  >
    <!-- Icon slots -->
    <template #input-icon>
      <Icon :width="18" :height="18" icon="ph:calendar-blank" />
    </template>
    <template #calendar-icon>
      <Icon :width="18" :height="18" icon="ph:calendar-blank" />
    </template>
    <template #clear-icon>
      <Icon :width="18" :height="18" icon="ph:x" />
    </template>
    <template #clock-icon>
      <Icon :width="18" :height="18" icon="ph:clock" />
    </template>
    <template #arrow-left>
      <Icon :width="18" :height="18" icon="ph:caret-left" />
    </template>
    <template #arrow-right>
      <Icon :width="18" :height="18" icon="ph:caret-right" />
    </template>
    <template #arrow-up>
      <Icon :width="18" :height="18" icon="ph:caret-up" />
    </template>
    <template #arrow-down>
      <Icon :width="18" :height="18" icon="ph:caret-down" />
    </template>

    <!-- Content slots -->
    <template v-if="$slots.trigger" #trigger>
      <slot name="trigger" />
    </template>
  </VueDatePicker>
</template>
