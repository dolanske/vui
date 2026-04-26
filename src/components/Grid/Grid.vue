<script setup lang="ts">
import type { Spaces } from '../../shared/types'
import { computed } from 'vue'
import { createArray, formatUnitValue } from '../../shared/helpers'
import './grid.scss'

/**
 * This component is not meant for complex grids
 */

interface Props {
  /** Render as inline grid container. */
  inline?: boolean
  /** Space between rows and columns. */
  gap?: Spaces | number
  /** Grid template rows value or count. */
  rows?: number | string
  /** Grid template columns value or count. */
  columns?: number | string
  // areas?: string[]

  /** Center content on both axes. */
  center?: boolean
  /** Align items to center on inline axis. */
  xCenter?: boolean
  /** Align items to start on inline axis. */
  xStart?: boolean
  /** Align items to end on inline axis. */
  xEnd?: boolean
  /** Stretch items on inline axis. */
  xStretch?: boolean
  /** Align items to center on block axis. */
  yCenter?: boolean
  /** Align items to start on block axis. */
  yStart?: boolean
  /** Align items to end on block axis. */
  yEnd?: boolean
  /** Align items to text baseline on block axis. */
  yBaseline?: boolean
  /** Stretch items on block axis. */
  yStretch?: boolean

  /** Auto-place grid items by rows. */
  autoFlowRow?: boolean
  /** Auto-place grid items by columns. */
  autoFlowColumn?: boolean
  /** Use dense auto-placement packing. */
  autoFlowDense?: boolean

  /** Expand width to 100%. */
  expand?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  gap: undefined,
})

const ag = computed(() => {
  return typeof props.gap === 'number'
    ? formatUnitValue(props.gap)
    : props.gap
      ? `var(--space-${props.gap})`
      : undefined
})

const aTC = computed(() => {
  if (typeof props.columns === 'number') {
    return createArray(props.columns)
      .map(() => '1fr')
      .join(' ')
  }
  return props.columns
})

const aTR = computed(() => {
  if (typeof props.rows === 'number') {
    return createArray(props.rows || 1)
      .map(() => '')
      .join('1fr')
  }
  return props.rows
})

const aA = computed(() => {
  if (props.yStart)
    return 'flex-start'
  else if (props.yEnd)
    return 'flex-end'
  else if (props.yCenter || props.center)
    return 'center'
  else if (props.yBaseline)
    return 'baseline'
  else if (props.yStretch)
    return 'stretch'
  return undefined
})

const aJ = computed(() => {
  if (props.xStart)
    return 'start'
  else if (props.xEnd)
    return 'end'
  else if (props.xCenter || props.center)
    return 'center'
  else if (props.xStretch)
    return 'stretch'
  return undefined
})

const aF = computed(() => {
  if (props.autoFlowColumn)
    return props.autoFlowDense ? 'column dense' : 'column'

  if (props.autoFlowRow)
    return props.autoFlowDense ? 'row dense' : 'row'

  if (props.autoFlowDense)
    return 'row dense'

  return undefined
})

const aD = computed(() => props.inline ? 'inline-grid' : undefined)

const aH = computed(() => props.expand ? '100%' : undefined)
</script>

<template>
  <div
    class="vui-grid" :style="{
      '--vui-grid-display': aD,
      '--vui-grid-gap': ag,
      '--vui-grid-columns': aTC,
      '--vui-grid-rows': aTR,
      '--vui-grid-align': aA,
      '--vui-grid-justify': aJ,
      '--vui-grid-flow': aF,
      '--vui-grid-width': aH,
    }"
  >
    <slot />
  </div>
</template>
