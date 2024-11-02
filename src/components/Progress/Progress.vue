<script setup lang='ts'>
import { TransitionPresets, useCssVar, useTransition } from '@vueuse/core'
import { ref, useTemplateRef, watchEffect } from 'vue'
import { calculateColorLightness, stringRgbToValues } from '../../shared/helpers'
import './progress.scss'

interface Props {
  /**
   * Will randomly increment but never actually reach the end
   */
  fake?: boolean

  /**
   * Show the progress number as perceetnage
   */
  label?: boolean
  /**
   *
   */
  labelPosition?: 'left' | 'right' | 'center'
  /**
   * Indicator color. Use CSS color values or variables
   */
  color?: string
  /**
   * Displays loader at the top of the page. It is only displayed when the
   * progress is between 0 and 100 (exclusive).
   */
  fixed?: boolean
  /**
   * Height
   */
  height?: number | string
}

const {
  fake,
  color = 'var(--color-accent)',
  label,
  fixed,
  height = 4,
} = defineProps<Props>()

const progressAmount = defineModel<number>({
  default: 0,
  set(value) {
    return Math.min(value, 100)
  },
})

// Text color based on the background
const textColor = ref('var(--color-text)')
const indicator = useTemplateRef('indicator')

watchEffect(() => {
  if (indicator.value) {
    const bg = window.getComputedStyle(indicator.value).backgroundColor
    const lightness = calculateColorLightness(...stringRgbToValues(bg))
    textColor.value = `var(--color-text${lightness === 'light' ? '-invert' : ''})`
  }
}, {
  flush: 'post',
})

// Animate actual value
const actualProgressValue = useTransition(progressAmount, {
  transition: TransitionPresets.easeInOutCubic,
  duration: 400,
})

// TODO: Fake loader

// TODO: fixed

const heightVar = useCssVar('--vui-progress-height')
</script>

<template>
  <div
    class="vui-progress"
    :class="{
      fixed,
      'fixed-active': actualProgressValue > 0 && actualProgressValue < 100,
    }"
  >
    <div
      ref="indicator"
      class="vui-progress-indicator" :style="{
        width: `${actualProgressValue}%`,
        backgroundColor: color,
      }"
    />
    <span
      v-if="label"
      :style="{ color: textColor }"
    >{{ `${Math.round(actualProgressValue)}%` }}</span>
  </div>
</template>
