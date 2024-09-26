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

const actualSize = computed(() => {
  switch (size) {
    case Size.s: return '16px'
    case Size.l: return '38px'
    case Size.m:
    default: return '26px'
  }
})

const actualBorderWidth = computed(() => {
  switch (size) {
    case Size.s: return '3px'
    case Size.l: return '5px'
    case Size.m:
    default: return '4px'
  }
})
</script>

<template>
  <div :class="{ size }" class="vui-spinner" />
</template>

<style lang="scss">
.vui-spinner {
  width: v-bind(actualSize);
  height: v-bind(actualSize);
  border-width: v-bind(actualBorderWidth);
}
</style>
