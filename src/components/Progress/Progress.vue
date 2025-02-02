<script setup lang='ts'>
import { computed, onMounted, useTemplateRef, watchEffect } from 'vue'
import { delay, formatUnitValue, isNil, randomMinMax } from '../../shared/helpers'
import './progress.scss'

interface Props {
  /**
   * Will randomly increment but never actually reach the end
   */
  fake?: boolean
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
  fixed,
  height,
} = defineProps<Props>()

const progressAmount = defineModel<number>({
  default: 0,
  set(value) {
    return Math.min(value, 100)
  },
})

// Set height programatically
const progressRef = useTemplateRef('progress')

watchEffect(() => {
  if (progressRef.value && !isNil(height)) {
    progressRef.value.style.setProperty(
      '--vui-progress-height',
      formatUnitValue(height),
    )
  }
})

// Automatically / randomly increment but never reach 100% until
async function fakeIncrement() {
  if (fake && progressAmount.value < 100) {
    if (progressAmount.value > 90) {
      // Only in crement by the fraction of the remaining amount
      progressAmount.value += (100 - progressAmount.value) * 0.05
      await delay(randomMinMax(500, 3000))
    }
    else {
      progressAmount.value += randomMinMax(1, 10)
      await delay(randomMinMax(200, 1000))
    }
    fakeIncrement()
  }
}

onMounted(fakeIncrement)

const w = computed(() => `${progressAmount.value}%`)
const bC = computed(() => color)
</script>

<template>
  <div
    ref="progress"
    class="vui-progress"
    :class="{
      fixed,
      'fixed-active': progressAmount > 0 && progressAmount < 100,
    }"
  >
    <div
      class="vui-progress-indicator" :style="{
        width: w,
        backgroundColor: bC,
      }"
    />
  </div>
</template>
