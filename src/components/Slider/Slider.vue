<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { ref } from 'vue'
import './slider.scss'

// Does not implement rtl nor verticality

// Slider always operates in percentual values. If min is 20, and max 150, the value that the slider actually has is always
// between 0 and 100. It needs to make sure that on output and input, that value is parsed into the internal percentage

interface Props {
  min?: number
  max?: number
  step?: number
  range?: boolean
}

const {
  min = 0,
  max = 100,
  step,
  range,
} = defineProps<Props>()

// Slider state
const isDragging = ref(false)

// Single handle
const singleValue = defineModel<number>({
  // Parse internal percentage based 0-100 value to fraction of the provided min-max
  set: fromPercentage,
  get: toPercentage,
})

// Range handles
// const rangeStart = defineModel('start', {
//   set: fromPercentage,
//   get: toPercentage,
// })

// const rangeEnd = defineModel('end', {
//   set: fromPercentage,
//   get: toPercentage,
// })

// Parses a numeric value into internal percentage
function toPercentage(value: number) {
  return ((value - min) / (max - min)) * 100
}

// Parses internal percentage into a value based on the min-max value
function fromPercentage(value: number) {
  return (value / 100) * (max - min) + min
}

// Track mouse position relative to the slider
useEventListener(document, 'mousemove', () => {
  // Calculate percentage based on mouse position relative to the slider
})

// End sliding when mouse is up
useEventListener(document, 'mouseup', () => {
  isDragging.value = false
})

// Handlers
function onDragStart(event: MouseEvent | DragEvent) {
  isDragging.value = true
}

function onBlur(event: FocusEvent) {
  isDragging.value = false
}
</script>

<template>
  <div class="vui-slider">
    <!-- TODO: range -->
    <!-- Slider width indicator -->
    <div class="vui-slider-indicator" :style="{ width: `${singleValue}%` }" />

    <!-- Normal handle -->
    <span
      class="vui-slider-handle"
      tabindex="0"
      :style="{ left: `${singleValue}%` }"
      @mousedown="onDragStart($event)"
      @blur="onBlur($event)"
    />

    <!-- Range handlers -->
    <!-- <span></span>
    <span></span> -->
  </div>
</template>
