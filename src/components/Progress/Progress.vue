<script setup lang='ts'>
import { computed, onMounted, onUnmounted, useTemplateRef, watch, watchEffect } from 'vue'
import { clamp, delay, formatUnitValue, isNil, randomMinMax } from '../../lib/helpers'
import './progress.scss'

interface Props {
  /**
   * Will randomly increment but never actually reach the end
   */
  fake?: boolean
  /**
   * Shows an animation without a value, for progress which can not be measured
   */
  indeterminate?: boolean
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
  /**
   * Accessible name of the progress bar
   */
  label?: string
}

const {
  fake,
  indeterminate,
  color = 'var(--color-accent)',
  fixed,
  height,
  label = 'Progress',
} = defineProps<Props>()

const emit = defineEmits<{
  done: []
}>()

const progressAmount = defineModel<number>({
  default: 0,
  set(value) {
    return clamp(0, 100, value)
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

// Every fake loop gets a generation number. Starting a new loop, disabling
// `fake` or unmounting invalidates the running one, so loops never stack up.
let generation = 0
let mounted = false

async function fakeIncrement(current: number): Promise<void> {
  // Stop when a newer loop started, 'fake' was disabled or progress is done
  if (current !== generation || !fake || progressAmount.value >= 100)
    return

  if (progressAmount.value > 90) {
    // Only increment by a fraction of the remaining amount
    progressAmount.value += (100 - progressAmount.value) * 0.05
    await delay(randomMinMax(500, 3000))
  }
  else {
    progressAmount.value += randomMinMax(1, 10)
    await delay(randomMinMax(200, 12000))
  }

  return fakeIncrement(current)
}

function restartFake() {
  generation++
  if (fake && mounted)
    fakeIncrement(generation)
}

watch(() => fake, restartFake)

onMounted(() => {
  mounted = true
  restartFake()
})

onUnmounted(() => {
  mounted = false
  generation++
})

watch(progressAmount, (v) => {
  if (v >= 100) {
    emit('done')
  }
})

const w = computed(() => `${clamp(0, 100, progressAmount.value)}%`)
const bC = computed(() => color)
</script>

<template>
  <div
    ref="progress"
    class="vui-progress"
    :class="{
      fixed,
      indeterminate,
      'fixed-active': indeterminate || (progressAmount > 0 && progressAmount < 100),
    }"
    role="progressbar"
    :aria-label="label"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="indeterminate ? undefined : Math.round(progressAmount)"
  >
    <div
      class="vui-progress-indicator" :style="{
        width: indeterminate ? undefined : w,
        backgroundColor: bC,
      }"
    />
  </div>
</template>
