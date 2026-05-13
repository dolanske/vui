<script setup lang="ts">
import './aspect-ratio.scss'

interface Props {
  ratio: number
}

const props = defineProps<Props>()
</script>

<template>
  <div
    class="vui-aspect-ratio" :style="{
      '--vui-aspect-ratio-value': `${100 / props.ratio}%`,
    }"
  >
    <div class="vui-aspect-ratio-content">
      <slot />
    </div>
  </div>
</template>
