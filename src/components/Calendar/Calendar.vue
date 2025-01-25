<script setup lang='ts'>
import type { VueDatePickerProps } from '@vuepic/vue-datepicker'
import { Icon } from '@iconify/vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import { useAttrs } from 'vue'
import '@vuepic/vue-datepicker/dist/main.css'
import './calendar.scss'

const props = withDefaults(defineProps<VueDatePickerProps & {
  expand?: boolean
}>(), {
  autoApply: true,
  autoPosition: true,
  dark: true,
  format: 'dd/MM/yyyy HH:mm',
  monthNameFormat: 'long',
  expand: false,
})

const ICON_SIZE = 18
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
  >
    <!-- Icon slots -->
    <template #input-icon>
      <Icon :width="ICON_SIZE" :height="ICON_SIZE" icon="ph:calendar-blank" />
    </template>
    <template #calendar-icon>
      <Icon :width="ICON_SIZE" :height="ICON_SIZE" icon="ph:calendar-blank" />
    </template>
    <template #clear-icon>
      <Icon :width="ICON_SIZE" :height="ICON_SIZE" icon="ph:x" />
    </template>
    <template #clock-icon>
      <Icon :width="ICON_SIZE" :height="ICON_SIZE" icon="ph:clock" />
    </template>
    <template #arrow-left>
      <Icon :width="ICON_SIZE" :height="ICON_SIZE" icon="ph:caret-left" />
    </template>
    <template #arrow-right>
      <Icon :width="ICON_SIZE" :height="ICON_SIZE" icon="ph:caret-right" />
    </template>
    <template #arrow-up>
      <Icon :width="ICON_SIZE" :height="ICON_SIZE" icon="ph:caret-up" />
    </template>
    <template #arrow-down>
      <Icon :width="ICON_SIZE" :height="ICON_SIZE" icon="ph:caret-down" />
    </template>

    <!-- Content slots -->
    <template v-if="$slots.trigger" #trigger>
      <slot name="trigger" />
    </template>
  </VueDatePicker>
</template>
