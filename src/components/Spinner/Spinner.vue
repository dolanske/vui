<script setup lang="ts">
import type { Sizes } from '../../shared/types'
import { computed } from 'vue'
import { Size } from '../../shared/types'
import './spinner.scss'

interface Props {
  size?: Sizes
}

const {
  size = 's',
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
    :class="{ size }" class="vui-spinner" :style="{
      width: w,
      height: w,
      borderWidth: bW,
    }"
  />
</template>
