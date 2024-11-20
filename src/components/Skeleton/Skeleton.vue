<!-- eslint-disable ts/no-use-before-define -->
<script setup lang='ts'>
import { computed } from 'vue'
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

function valueToPixels(value: string | number) {
  return typeof value === 'number'
    ? `${value}px`
    // If last value of string is NOT a number, do not add "px" at the end
    // eslint-disable-next-line unicorn/prefer-number-properties
    : isNaN(Number(value[value.length - 1]))
      ? value
      : `${value}px`
}

// Give priority to radius, if it is NOT set to default
const bR = computed(() => valueToPixels(circle && radius === DEFAULT_RADIUS ? 9999 : radius))

// When using `circle` prop, we want to use the same
// value for both height and width, but we can't
// know which one will be defined
const w = computed(() => valueToPixels(circle ? (width || height) : width))
const h = computed(() => valueToPixels(circle ? (width || height) : height))
</script>

<template>
  <div class="vui-skeleton" />
</template>

<style lang="scss" scoped>
.vui-skeleton {
  border-radius: v-bind(bR);
  width: v-bind(w);
  height: v-bind(h);
}
</style>
