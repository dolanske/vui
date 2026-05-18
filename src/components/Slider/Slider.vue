<script setup lang="ts">
import { useElementBounding, useEventListener } from '@vueuse/core'
import { computed, ref, useTemplateRef } from 'vue'
import { clamp } from '../../shared/helpers'
import './slider.scss'

// Internally, the slider always operates on a 0-100 percentage scale.
// The model's get/set transformers handle conversion to/from the consumer's min-max range.

interface Props {
  /**
   * Minimum output value
   */
  min?: number
  /**
   * Maximum output value
   */
  max?: number
  /**
   * Number of equal divisions between min and max
   */
  steps?: number
  /**
   * Switch to range slider
   */
  range?: boolean
}

const {
  min = 0,
  max = 100,
  steps,
  range,
} = defineProps<Props>()

// Internal value is always 0-100 (percentage).
// get: parent's min-max value → internal percentage (for reading)
// set: internal percentage → parent's min-max value (before emitting)
const modelPercent = defineModel<number>({
  get: toPercentage,
  set: fromPercentage,
})

// TODO: guard against crossing each other
const rangeStart = defineModel<number>('start', {
  get: toPercentage,
  set: fromPercentage,
})

const rangeEnd = defineModel<number>('end', {
  get: toPercentage,
  set: fromPercentage,
})

function toPercentage(value: number) {
  return ((value - min) / (max - min)) * 100
}

// Maps a 0-100 percentage back to a min-max value
function fromPercentage(value: number) {
  return (value / 100) * (max - min) + min
}

// Size of one step expressed as a 0-100 percentage
const stepSize = computed(() => steps != null ? 100 / steps : null)

// Measure the slider bar to get percentages from mouse position
const sliderEl = useTemplateRef<HTMLElement>('slider')
const { left, width } = useElementBounding(sliderEl)

const isDragging = ref(false)

// Snaps a raw percentage to the nearest step boundary and clamps to 0-100
function snapAndClamp(percentage: number): number {
  if (stepSize.value != null)
    percentage = Math.round(percentage / stepSize.value) * stepSize.value

  return clamp(0, 100, percentage)
}

// Derives and sets the value from a raw pageX coordinate
function setFromPageX(pageX: number) {
  const rawPct = ((pageX - left.value) / width.value) * 100
  modelPercent.value = snapAndClamp(rawPct)
}

// Update value while dragging
useEventListener(document, 'mousemove', (e: MouseEvent) => {
  if (isDragging.value)
    setFromPageX(e.pageX)
})

// End drag on mouse release anywhere on the document
useEventListener(document, 'mouseup', () => {
  isDragging.value = false
})

function onMouseDown(e: MouseEvent) {
  e.preventDefault()
  isDragging.value = true
}

// Clicking the bar directly jumps the handle to that position
function onBarClick(e: MouseEvent) {
  if ((e.target as HTMLElement).classList.contains('vui-slider-handle'))
    return

  setFromPageX(e.pageX)
}

// Keyboard navigation works in the external min-max domain, then converts back
function onKeyDown(e: KeyboardEvent) {
  e.preventDefault()

  const delta = stepSize.value != null ? stepSize.value * (max - min) / 100 : 1
  const current = fromPercentage(modelPercent.value ?? 0)
  let next: number | null = null

  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      next = current + delta
      break
    case 'ArrowLeft':
    case 'ArrowDown':
      next = current - delta
      break
    case 'Home':
      next = min
      break
    case 'End':
      next = max
      break
    default:
      return
  }

  modelPercent.value = snapAndClamp(toPercentage(clamp(min, max, next)))
}

const indicatorStyle = computed(() => {
  if (range) {
    return {
      left: `${rangeStart.value ?? 0}%`,
      width: `${(rangeEnd.value ?? 0) - (rangeStart.value ?? 0)}%`,
    }
  }

  return { width: `${modelPercent.value ?? 0}%` }
})
</script>

<template>
  <div
    ref="slider"
    class="vui-slider"
    :class="{ 'has-steps': !!steps }"
    @click="onBarClick($event)"
  >
    <span
      class="vui-slider-indicator"
      :style="indicatorStyle"
    />

    <!-- Range mode -->
    <template v-if="range">
      <!-- Left handle -->
      <span
        class="vui-slider-handle"
        tabindex="0"
        role="slider"
        :aria-valuemin="min"
        :aria-valuemax="rangeEnd"
        :aria-valuenow="fromPercentage(rangeStart ?? 0)"
        :style="{ left: `${rangeStart ?? 0}%` }"
        @mousedown="onMouseDown($event)"
        @keydown="onKeyDown($event)"
      />

      <!-- Right handle -->
      <span
        class="vui-slider-handle"
        tabindex="0"
        role="slider"
        :aria-valuemin="rangeStart"
        :aria-valuemax="max"
        :aria-valuenow="fromPercentage(rangeEnd ?? 0)"
        :style="{ left: `${rangeEnd ?? 0}%` }"
        @mousedown="onMouseDown($event)"
        @keydown="onKeyDown($event)"
      />
    </template>

    <!-- Single mode -->
    <span
      v-else
      class="vui-slider-handle"
      tabindex="0"
      role="slider"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="fromPercentage(modelPercent ?? 0)"
      :style="{ left: `${modelPercent ?? 0}%` }"
      @mousedown="onMouseDown($event)"
      @keydown="onKeyDown($event)"
    />

    <!-- Step indicators -->
    <template v-if="steps">
      <div
        v-for="step in (steps + 1)"
        :key="step"
        class="vui-slider-step-indicator"
        :style="{ left: `${((step - 1) / steps) * 100}%` }"
      />
    </template>
  </div>
</template>
