<script setup lang="ts">
import { computed } from 'vue'
import './aspect-ratio.scss'

interface Props {
  /**
   * Width divided by height, e.g. `16 / 9`
   */
  ratio: number
}

const props = defineProps<Props>()

// Zero, negative or non-numeric ratios would collapse the element
const safeRatio = computed(() => {
  if (Number.isFinite(props.ratio) && props.ratio > 0)
    return props.ratio

  console.warn(`[AspectRatio] Invalid ratio "${props.ratio}", falling back to 1.`)
  return 1
})
</script>

<template>
  <div
    class="vui-aspect-ratio" :style="{
      '--vui-aspect-ratio': safeRatio,
    }"
  >
    <div class="vui-aspect-ratio-content">
      <slot />
    </div>
  </div>
</template>
