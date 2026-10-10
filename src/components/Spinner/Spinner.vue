<script setup lang="ts">
import type { Sizes } from '../../lib/types'
import { computed } from 'vue'
import { Size } from '../../lib/types'
import './spinner.scss'

interface Props {
  size?: Sizes
  /**
   * Text announced to screen readers
   */
  label?: string
}

const {
  size = 's',
  label = 'Loading',
} = defineProps<Props>()

const w = computed(() => {
  switch (size) {
    case Size.s: return '16px'
    case Size.l: return '38px'
    case Size.m:
    default: return '26px'
  }
})

const bW = computed(() => {
  switch (size) {
    case Size.s: return '3px'
    case Size.l: return '5px'
    case Size.m:
    default: return '4px'
  }
})
</script>

<template>
  <div
    :class="`vui-spinner-size-${size}`" class="vui-spinner" role="status" :aria-label="label" :style="{
      width: w,
      height: w,
      borderWidth: bW,
    }"
  />
</template>
