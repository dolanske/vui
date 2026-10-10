<script setup lang="ts">
import { useElementBounding } from '@vueuse/core'
import { computed, nextTick, ref, useTemplateRef } from 'vue'
import { clamp } from '../../lib/helpers'
import './slider.scss'

// Internally, the slider always operates on a 0-100 percentage range.
// Conversion to / from the consumer's min-max range happens at the edges.

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
   * Round output values. `true` rounds to an integer (or to the precision
   * required by `min`, `max` and `steps` when those are fractional), a number
   * specifies decimal places, `false` disables rounding
   */
  round?: boolean | number
  /**
   * Renders the slider vertically. Its length is controlled by the
   * `--vui-slider-length` CSS variable.
   */
  vertical?: boolean
  /**
   * Native `name`. Renders hidden inputs so the value is part of form
   * submissions. In range mode, two inputs with the same name are rendered.
   */
  name?: string
  /**
   * Formats the value announced by screen readers (`aria-valuetext`)
   */
  valueText?: (_value: number) => string
}

const {
  min = 0,
  max = 100,
  steps,
  range,
  disabled,
  label,
  round = true,
  vertical,
  name,
  valueText,
} = defineProps<Props>()

const emit = defineEmits<{
  /**
   * Emitted when the user commits a value: drag release, click or key press
   */
  change: [value: number | [number, number]]
}>()

const model = defineModel<number>()
const rangeStart = defineModel<number>('start')
const rangeEnd = defineModel<number>('end')

const span = computed(() => max - min)

function countDecimals(value: number): number {
  if (!Number.isFinite(value))
    return 0
  const [, decimals = ''] = value.toString().split('.')
  return decimals.length
}

// Precision used when `round` is `true`. Integers by default, but fractional
// ranges (e.g. 0 - 1) keep enough precision so they do not collapse.
const autoDecimals = computed(() => {
  const stepValue = steps ? span.value / steps : 0
  let decimals = Math.max(countDecimals(min), countDecimals(max), countDecimals(stepValue))
  if (!steps && span.value > 0 && span.value <= 1)
    decimals = Math.max(decimals, 2)
  return Math.min(decimals, 10)
})

/**
 * Converts an output value to a percentage. Returns `null` for missing or
 * invalid values so callers can choose a sensible fallback.
 */
function toPercentage(value: number | null | undefined): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value))
    return null
  if (span.value === 0)
    return 0
  return clamp(0, 100, ((value - min) / span.value) * 100)
}

function fromPercentage(percentage: number): number {
  const raw = (percentage / 100) * span.value + min
  if (round === false)
    return raw
  const decimals = round === true ? autoDecimals.value : round
  const factor = 10 ** decimals
  return Math.round(raw * factor) / factor
}

const singlePct = computed(() => toPercentage(model.value) ?? 0)
const startPct = computed(() => toPercentage(rangeStart.value) ?? 0)
const endPct = computed(() => {
  const value = toPercentage(rangeEnd.value) ?? 100
  // Unset or inverted bounds should never produce a negative range
  return Math.max(value, startPct.value)
})

const stepSize = computed(() => steps != null && steps > 0 ? 100 / steps : null)

const sliderEl = useTemplateRef<HTMLElement>('slider')
const { left, width, bottom, height } = useElementBounding(sliderEl)

// null = not dragging, 0 = start handle, 1 = end/single handle,
// -1 = range handles overlap and the direction decides which one moves
const activeIndex = ref<number | null>(null)

// Snaps a percentage to the nearest step
function snapAndClamp(percentage: number): number {
  if (stepSize.value != null)
    percentage = Math.round(percentage / stepSize.value) * stepSize.value

  return clamp(0, 100, percentage)
}

// Converts a pointer position to a percentage of the slider length
function pointerToPercent(event: PointerEvent | MouseEvent): number {
  if (vertical)
    return height.value ? ((bottom.value - event.clientY) / height.value) * 100 : 0
  return width.value ? ((event.clientX - left.value) / width.value) * 100 : 0
}

// The last value written by the user. The models only update once the
// parent re-renders, so the change event must not read them right after setting.
let lastValue: number | [number, number] | null = null

function currentValue(): number | [number, number] {
  if (lastValue !== null)
    return lastValue
  if (range)
    return [fromPercentage(startPct.value), fromPercentage(endPct.value)]
  return fromPercentage(singlePct.value)
}

function commit() {
  emit('change', currentValue())
  lastValue = null
}

// Sets the correct model based on which handle is active
// Makes sure range handles cannot cross each other
function setValueAt(rawPct: number, index: number | null) {
  const snapped = snapAndClamp(rawPct)

  if (range && index === 0) {
    const value = fromPercentage(clamp(0, endPct.value, snapped))
    rangeStart.value = value
    lastValue = [value, fromPercentage(endPct.value)]
  }
  else if (range && index === 1) {
    const value = fromPercentage(clamp(startPct.value, 100, snapped))
    rangeEnd.value = value
    lastValue = [fromPercentage(startPct.value), value]
  }
  else {
    const value = fromPercentage(snapped)
    model.value = value
    lastValue = value
  }
}

//
// Pointer interaction (mouse, touch & pen)

function onHandlePointerDown(event: PointerEvent, index: number) {
  if (disabled || (event.pointerType === 'mouse' && event.button !== 0))
    return

  event.preventDefault()
  event.stopPropagation()

  const handle = event.currentTarget as HTMLElement
  handle.setPointerCapture?.(event.pointerId)
  handle.focus()

  // When both range handles sit on the same spot, the first movement decides
  // which one gets dragged. Otherwise the start handle could get stuck under
  // the end handle at the maximum.
  activeIndex.value = range && startPct.value === endPct.value ? -1 : index
}

function onHandlePointerMove(event: PointerEvent) {
  if (activeIndex.value === null)
    return

  const pct = pointerToPercent(event)

  if (activeIndex.value === -1) {
    if (pct === startPct.value)
      return
    activeIndex.value = pct < startPct.value ? 0 : 1
  }

  setValueAt(pct, activeIndex.value)
}

function onHandlePointerUp(event: PointerEvent) {
  if (activeIndex.value === null)
    return

  const handle = event.currentTarget as HTMLElement
  handle.releasePointerCapture?.(event.pointerId)
  activeIndex.value = null
  commit()
}

function focusHandle(index: number) {
  nextTick(() => sliderEl.value?.querySelectorAll<HTMLElement>('.vui-slider-handle')[index]?.focus())
}

// Clicking the bar directly jumps the nearest handle to that position
function onBarClick(event: MouseEvent) {
  if (disabled || (event.target as HTMLElement).classList.contains('vui-slider-handle'))
    return

  const pct = pointerToPercent(event)

  if (range) {
    const clickPct = snapAndClamp(pct)
    const start = startPct.value
    const end = endPct.value

    // Outside left → move start; outside right → move end; inside → move closer handle
    const index = clickPct <= start ? 0 : clickPct >= end ? 1 : (clickPct - start) <= (end - clickPct) ? 0 : 1
    setValueAt(pct, index)
    focusHandle(index)
  }
  else {
    setValueAt(pct, null)
    focusHandle(0)
  }

  commit()
}

//
// Keyboard

function getCurrentPercent(index: number | null): number {
  if (range && index === 0)
    return startPct.value
  if (range && index === 1)
    return endPct.value
  return singlePct.value
}

// Keyboard navigation works in the external min-max domain, then converts back
function onKeyDown(event: KeyboardEvent, index: number | null = null) {
  if (disabled || span.value === 0)
    return

  // One step, or the smallest value the rounding can represent (1 for integers)
  const delta = stepSize.value != null
    ? stepSize.value * span.value / 100
    : round === false
      ? span.value / 100
      : 10 ** -(round === true ? autoDecimals.value : round)
  // Larger jumps, 10% of the range or one step, whichever is bigger
  const pageDelta = Math.max(delta, span.value / 10)
  const current = fromPercentage(getCurrentPercent(index))
  let next: number | null = null

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      next = current + delta
      break
    case 'ArrowLeft':
    case 'ArrowDown':
      next = current - delta
      break
    case 'PageUp':
      next = current + pageDelta
      break
    case 'PageDown':
      next = current - pageDelta
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

  // Only prevent default after a key is matched
  event.preventDefault()

  setValueAt(toPercentage(clamp(min, max, next)) ?? 0, index)
  commit()
}

function handleAriaLabel(which: 'start' | 'end'): string {
  const suffix = which === 'start' ? 'minimum' : 'maximum'
  return label ? `${label} (${suffix})` : suffix
}

function ariaValueText(value: number): string | undefined {
  return valueText ? valueText(value) : undefined
}

function positionStyle(pct: number) {
  return vertical ? { bottom: `${pct}%` } : { left: `${pct}%` }
}

const indicatorStyle = computed(() => {
  const start = range ? startPct.value : 0
  const length = range ? endPct.value - startPct.value : singlePct.value

  return vertical
    ? { bottom: `${start}%`, height: `${length}%` }
    : { left: `${start}%`, width: `${length}%` }
})

const orientation = computed(() => vertical ? 'vertical' : 'horizontal')
</script>

<template>
  <div
    ref="slider"
    class="vui-slider"
    :class="{ 'has-steps': !!steps, 'is-dragging': activeIndex !== null, 'is-disabled': disabled, 'is-vertical': vertical }"
    :inert="disabled || undefined"
    @click="onBarClick($event)"
  >
    <span class="vui-slider-indicator" :style="indicatorStyle" />

    <template v-if="range">
      <!-- Left / bottom handle -->
      <span
        class="vui-slider-handle"
        tabindex="0"
        role="slider"
        :aria-orientation="orientation"
        :aria-label="handleAriaLabel('start')"
        :aria-disabled="disabled || undefined"
        :aria-valuemin="min"
        :aria-valuemax="fromPercentage(endPct)"
        :aria-valuenow="fromPercentage(startPct)"
        :aria-valuetext="ariaValueText(fromPercentage(startPct))"
        :style="positionStyle(startPct)"
        @pointerdown="onHandlePointerDown($event, 0)"
        @pointermove="onHandlePointerMove"
        @pointerup="onHandlePointerUp"
        @pointercancel="onHandlePointerUp"
        @keydown="onKeyDown($event, 0)"
      />

      <!-- Right / top handle -->
      <span
        class="vui-slider-handle"
        tabindex="0"
        role="slider"
        :aria-orientation="orientation"
        :aria-label="handleAriaLabel('end')"
        :aria-disabled="disabled || undefined"
        :aria-valuemin="fromPercentage(startPct)"
        :aria-valuemax="max"
        :aria-valuenow="fromPercentage(endPct)"
        :aria-valuetext="ariaValueText(fromPercentage(endPct))"
        :style="positionStyle(endPct)"
        @pointerdown="onHandlePointerDown($event, 1)"
        @pointermove="onHandlePointerMove"
        @pointerup="onHandlePointerUp"
        @pointercancel="onHandlePointerUp"
        @keydown="onKeyDown($event, 1)"
      />
    </template>

    <!-- Single mode -->
    <span
      v-else
      class="vui-slider-handle"
      tabindex="0"
      role="slider"
      :aria-orientation="orientation"
      :aria-label="label"
      :aria-disabled="disabled || undefined"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="fromPercentage(singlePct)"
      :aria-valuetext="ariaValueText(fromPercentage(singlePct))"
      :style="positionStyle(singlePct)"
      @pointerdown="onHandlePointerDown($event, 1)"
      @pointermove="onHandlePointerMove"
      @pointerup="onHandlePointerUp"
      @pointercancel="onHandlePointerUp"
      @keydown="onKeyDown($event)"
    />

    <!-- Step indicators -->
    <template v-if="steps">
      <div
        v-for="step in (steps + 1)"
        :key="step"
        class="vui-slider-step-indicator"
        :style="positionStyle(((step - 1) / steps) * 100)"
      />
    </template>

    <!-- Native form values -->
    <template v-if="name">
      <template v-if="range">
        <input type="hidden" :name :value="fromPercentage(startPct)">
        <input type="hidden" :name :value="fromPercentage(endPct)">
      </template>
      <input v-else type="hidden" :name :value="fromPercentage(singlePct)">
    </template>
  </div>
</template>
