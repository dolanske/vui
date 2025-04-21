<script setup lang="ts">
import type { Space } from '../../shared/types'
import { computed } from 'vue'
import { createArray, formatUnitValue } from '../../shared/helpers'

/**
 * This component is not meant for complex grids
 */

interface Props {
  inline?: boolean
  gap?: Space | number
  rows?: number | string
  columns?: number | string
  // areas?: string[]

  // NOTE: Add more if needed
  yCenter?: boolean
  yStart?: boolean
  yEnd?: boolean
  yBaseline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  // eslint-disable-next-line vue/require-valid-default-prop
  gap: 's',
})

const ag = computed(() => typeof props.gap === 'number'
  ? formatUnitValue(props.gap)
  : `var(--space-${props.gap})`,
)

const aTC = computed(() => {
  if (typeof props.columns === 'number') {
    return createArray(props.columns)
      .map(() => '1fr')
      .join(' ')
  }
  return props.columns ?? 'none'
})

const aTR = computed(() => {
  if (typeof props.rows === 'number') {
    return createArray(props.rows || 1)
      .map(() => '')
      .join('1fr')
  }
  return props.rows ?? 'none'
})

const aA = computed(() => {
  if (props.yStart)
    return 'flex-start'
  else if (props.yEnd)
    return 'flex-end'
  else if (props.yCenter)
    return 'center'
  else if (props.yBaseline)
    return 'baseline'
  return 'flex-start'
})

const aD = computed(() => props.inline ? 'inline-grid' : 'grid')
</script>

<template>
  <div
    class="vui-grid" :style="{
      display: aD,
      gap: ag,
      gridTemplateColumns: aTC,
      gridTemplateRows: aTR,
      alignItems: aA,
    }"
  >
    <slot />
  </div>
</template>
