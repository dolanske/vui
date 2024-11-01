<script setup lang="ts">
import type { Sizes } from '../../shared/types'
import { computed } from 'vue'
import { createArray } from '../../shared/helpers'
import { useActualGap } from '../../shared/composables'

/**
 * This component is not meant for complex grids
 */

interface Props {
  inline?: boolean
  gap?: Sizes | number
  rows?: number | string
  columns?: number | string
  areas?: string[]
}

const props = defineProps<Props>()

const actualGap = useActualGap(props.gap)

const actualTemplateColumns = computed(() => {
  if (typeof props.columns === 'number') {
    return createArray(props.columns)
      .map(() => '1fr')
      .join(' ')
  }
  return props.columns
})

const actualTemplateRows = computed(() => {
  if (typeof props.rows === 'number') {
    return createArray(props.rows || 1)
      .map(() => '')
      .join('1fr')
  }
  return props.rows
})
</script>

<template>
  <div
    :style="{
      display: props.inline ? 'inline-grid' : 'grid',
      gap: actualGap,
      gridTemplateColumns: actualTemplateColumns,
      ...(props.rows && { gridTemplateRows: actualTemplateRows }),
    }"
  >
    <slot />
  </div>
</template>
