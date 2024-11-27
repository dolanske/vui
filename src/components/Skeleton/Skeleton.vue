<!-- eslint-disable ts/no-use-before-define -->
<script setup lang='ts'>
import { computed } from 'vue'
import { formatUnitValue } from '../../shared/helpers'
import './skeleton.scss'

interface Props {
  radius?: string | number
  width?: string | number
  height?: string | number
  circle?: boolean
}

const {
  // @ts-expect-error I can't get ESLint to STOP moving DEFAULT_RADIUS below
  // this props declaration wtf
  radius = DEFAULT_RADIUS,
  width = '100%',
  height = '32px',
  circle,
} = defineProps<Props>()

const DEFAULT_RADIUS = 'var(--border-radius-s)'

// Give priority to radius, if it is NOT set to default
const bR = computed(() => formatUnitValue(circle && radius === DEFAULT_RADIUS ? 9999 : radius))

// When using `circle` prop, we want to use the same
// value for both height and width, but we can't
// know which one will be defined
const w = computed(() => formatUnitValue(circle ? (width || height) : width))
const h = computed(() => formatUnitValue(circle ? (width || height) : height))
</script>

<template>
  <div
    class="vui-skeleton" :style="{
      borderRadius: bR,
      width: w,
      height: h,
    }"
  />
</template>
