<script setup lang="ts">
import { useElementBounding, useEventListener } from '@vueuse/core'
import { computed, nextTick, ref, useTemplateRef } from 'vue'
import { clamp } from '../../shared/helpers'
import './slider.scss'

// Internally, the slider always operates on a 0-100 percentage range.
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
  /**
   * Disables all interaction
   */
  disabled?: boolean
  /**
   * Accessible label for the slider handle(s). In range mode, "(minimum)" and "(maximum)" are appended
   */
  label?: string
  /**
   * Round output values. `true` rounds to an integer, a number specifies decimal places, `false` disables rounding
   */
  round?: boolean | number
}

const {
  min = 0,
  max = 100,
  steps,
  range,
  disabled,
  label,
  round = true,
} = defineProps<Props>()

const modelPercent = defineModel<number>({
  get: toPercentage,
  set: fromPercentage,
})

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

function fromPercentage(value: number) {
  const raw = (value / 100) * (max - min) + min
  if (round === false)
    return raw
  const decimals = round === true ? 0 : round
  const factor = 10 ** decimals
  return Math.round(raw * factor) / factor
}

const stepSize = computed(() => steps != null ? 100 / steps : null)

const sliderEl = useTemplateRef<HTMLElement>('slider')
const { left, width } = useElementBounding(sliderEl)

// null = not dragging, 0 = start handle, 1 = end/single handle
const activeIndex = ref<number | null>(null)

// Snaps a percentage to the nearest step
function snapAndClamp(percentage: number): number {
  if (stepSize.value != null)
    percentage = Math.round(percentage / stepSize.value) * stepSize.value

  return clamp(0, 100, percentage)
}

// Converts a clientX coordinate to a percentage of the slider width
function pageXToPercent(clientX: number): number {
  return ((clientX - left.value) / width.value) * 100
}

// Sets the correct model based on which handle is active
// Makes sure range handles cannot cross each other
function setValueAt(rawPct: number, index: number | null) {
  const snapped = snapAndClamp(rawPct)

  if (range && index === 0) {
    rangeStart.value = clamp(0, rangeEnd.value ?? 100, snapped)
  }
  else if (range && index === 1) {
    rangeEnd.value = clamp(rangeStart.value ?? 0, 100, snapped)
  }
  else {
    modelPercent.value = snapped
  }
}

// Update the active handle while dragging
useEventListener(document, 'mousemove', (e: MouseEvent) => {
  if (activeIndex.value !== null)
    setValueAt(pageXToPercent(e.clientX), activeIndex.value)
})

// End drag on mouse release anywhere on the document
useEventListener(document, 'mouseup', () => {
  activeIndex.value = null
})

useEventListener(document, 'touchmove', (e: TouchEvent) => {
  if (activeIndex.value !== null)
    setValueAt(pageXToPercent(e.touches[0].clientX), activeIndex.value)
})

useEventListener(document, 'touchend', () => {
  activeIndex.value = null
})

function onMouseDown(e: MouseEvent, index: number | null = null) {
  if (disabled)
    return

  e.preventDefault()
  activeIndex.value = index
  ;(e.currentTarget as HTMLElement).focus()
}

function onTouchStart(e: TouchEvent, index: number | null = null) {
  if (disabled)
    return

  activeIndex.value = index
  ;(e.currentTarget as HTMLElement).focus()
}

// Clicking the bar directly jumps the nearest handle to that position
function onBarClick(e: MouseEvent) {
  if (disabled || (e.target as HTMLElement).classList.contains('vui-slider-handle'))
    return

  if (range) {
    const clickPct = snapAndClamp(pageXToPercent(e.clientX))
    const start = rangeStart.value ?? 0
    const end = rangeEnd.value ?? 100

    // Outside left → move start; outside right → move end; inside → move closer handle
    const index = clickPct <= start ? 0 : clickPct >= end ? 1 : (clickPct - start) <= (end - clickPct) ? 0 : 1
    setValueAt(pageXToPercent(e.clientX), index)

    nextTick(() => sliderEl.value?.querySelectorAll<HTMLElement>('.vui-slider-handle')[index]?.focus())
  }
  else {
    setValueAt(pageXToPercent(e.clientX), null)

    nextTick(() => sliderEl.value?.querySelectorAll<HTMLElement>('.vui-slider-handle')[0]?.focus())
  }
}

// Returns the current internal percentage for the given handle index
function getCurrentPercent(index: number | null): number {
  if (range && index === 0)
    return rangeStart.value ?? 0
  if (range && index === 1)
    return rangeEnd.value ?? 100
  return modelPercent.value ?? 0
}

// Keyboard navigation works in the external min-max domain, then converts back
function onKeyDown(e: KeyboardEvent, index: number | null = null) {
  if (disabled)
    return
  const delta = stepSize.value != null ? stepSize.value * (max - min) / 100 : 1
  const current = fromPercentage(getCurrentPercent(index))
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

  // Only prevent default after a key is matched. If isn't, even it discarded
  e.preventDefault()

  setValueAt(toPercentage(clamp(min, max, next)), index)
}

function handleAriaLabel(which: 'start' | 'end'): string {
  const suffix = which === 'start' ? 'minimum' : 'maximum'
  return label ? `${label} (${suffix})` : suffix
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
    :class="{ 'has-steps': !!steps, 'is-dragging': activeIndex !== null, 'is-disabled': disabled }"
    :inert="disabled"
    @click="onBarClick($event)"
  >
    <span class="vui-slider-indicator" :style="indicatorStyle" />

    <template v-if="range">
      <!-- Left handle -->
      <span
        class="vui-slider-handle"
        tabindex="0"
        role="slider"
        aria-orientation="horizontal"
        :aria-label="handleAriaLabel('start')"
        :aria-disabled="disabled || undefined"
        :aria-valuemin="min"
        :aria-valuemax="fromPercentage(rangeEnd ?? 100)"
        :aria-valuenow="fromPercentage(rangeStart ?? 0)"
        :style="{ left: `${rangeStart ?? 0}%` }"
        @mousedown="onMouseDown($event, 0)"
        @touchstart="onTouchStart($event, 0)"
        @keydown="onKeyDown($event, 0)"
      />

      <!-- Right handle -->
      <span
        class="vui-slider-handle"
        tabindex="0"
        role="slider"
        aria-orientation="horizontal"
        :aria-label="handleAriaLabel('end')"
        :aria-disabled="disabled || undefined"
        :aria-valuemin="fromPercentage(rangeStart ?? 0)"
        :aria-valuemax="max"
        :aria-valuenow="fromPercentage(rangeEnd ?? 0)"
        :style="{ left: `${rangeEnd ?? 0}%` }"
        @mousedown="onMouseDown($event, 1)"
        @touchstart="onTouchStart($event, 1)"
        @keydown="onKeyDown($event, 1)"
      />
    </template>

    <!-- Single mode -->
    <span
      v-else
      class="vui-slider-handle"
      tabindex="0"
      role="slider"
      aria-orientation="horizontal"
      :aria-label="label"
      :aria-disabled="disabled || undefined"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="fromPercentage(modelPercent ?? 0)"
      :style="{ left: `${modelPercent ?? 0}%` }"
      @mousedown="onMouseDown($event, 0)"
      @touchstart="onTouchStart($event, 0)"
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
