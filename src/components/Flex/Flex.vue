<script setup lang="ts">
import type { Spaces } from '../../shared/types'
import { computed } from 'vue'
import { formatUnitValue } from '../../shared/helpers'
import './flex.scss'

export interface FlexProps {
  /** Render as inline flex container. */
  inline?: boolean
  /** Allow items to wrap onto multiple lines. */
  wrap?: boolean
  /** Wrap items in reverse order. */
  wrapReverse?: boolean

  /** Set main axis direction to row. */
  row?: boolean
  /** Set main axis direction to column. */
  column?: boolean
  /** Set main axis direction to row-reverse. */
  rowReverse?: boolean
  /** Set main axis direction to column-reverse. */
  columnReverse?: boolean

  /** Space between children. */
  gap?: Spaces | number

  /** Center content on both axes. */
  center?: boolean
  /** Align items to the start on main axis. */
  xStart?: boolean
  /** Align items to the end on main axis. */
  xEnd?: boolean
  /** Center items on main axis. */
  xCenter?: boolean
  /** Distribute items with space-between on main axis. */
  xBetween?: boolean
  /** Distribute items with space-around on main axis. */
  xAround?: boolean
  /** Distribute items with space-evenly on main axis. */
  xEvenly?: boolean

  /** Center items on cross axis. */
  yCenter?: boolean
  /** Align items to start on cross axis. */
  yStart?: boolean
  /** Align items to end on cross axis. */
  yEnd?: boolean
  /** Align items to text baseline on cross axis. */
  yBaseline?: boolean
  /** Stretch items on cross axis. */
  yStretch?: boolean

  /** Expand width to 100%. */
  expand?: boolean
}

const props = withDefaults(defineProps<FlexProps>(), {
  gap: undefined,
})

// Flex gap
const ag = computed(() => {
  return typeof props.gap === 'number'
    ? formatUnitValue(props.gap)
    : props.gap
      ? `var(--space-${props.gap})`
      : undefined
})

// Flex direction
const ad = computed(() => {
  if (props.row)
    return 'row'
  else if (props.column)
    return 'column'
  else if (props.rowReverse)
    return 'row-reverse'
  else if (props.columnReverse)
    return 'column-reverse'
  return undefined
})

// Justify content
const aj = computed(() => {
  if (props.xStart)
    return 'flex-start'
  else if (props.xEnd)
    return 'flex-end'
  else if (props.xCenter || props.center)
    return 'center'
  else if (props.xBetween)
    return 'space-between'
  else if (props.xEvenly)
    return 'space-evenly'
  else if (props.xAround)
    return 'space-around'
  return undefined
})

// Align items
const aA = computed(() => {
  if (props.yStart)
    return 'flex-start'
  else if (props.yEnd)
    return 'flex-end'
  else if (props.yCenter || props.center)
    return 'center'
  else if (props.yStretch)
    return 'stretch'
  else if (props.yBaseline)
    return 'baseline'
  return undefined
})

const aY = computed(() => props.inline ? 'inline-flex' : undefined)
const aW = computed(() => props.wrap
  ? 'wrap'
  : props.wrapReverse
    ? 'wrap-reverse'
    : undefined)

const aH = computed(() => props.expand
  ? '100%'
  : props.inline
    ? 'fit-content'
    : undefined)
</script>

<template>
  <div
    class="vui-flex" :style="{
      '--vui-flex-display': aY,
      '--vui-flex-wrap': aW,
      '--vui-flex-direction': ad,
      '--vui-flex-justify': aj,
      '--vui-flex-gap': ag,
      '--vui-flex-align': aA,
      '--vui-flex-width': aH,
    }"
  >
    <slot />
  </div>
</template>
