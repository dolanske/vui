<script setup lang="ts">
import type { Space } from '../../shared/types'
import { computed } from 'vue'
import { formatUnitValue } from '../../shared/helpers'

export interface FlexProps {
  inline?: boolean
  wrap?: boolean
  wrapReverse?: boolean

  row?: boolean
  column?: boolean
  rowReverse?: boolean
  columnReverse?: boolean

  gap?: Space | number

  // NOTE: Add more if needed
  xStart?: boolean
  xEnd?: boolean
  xCenter?: boolean
  xBetween?: boolean
  xAround?: boolean
  xEvenly?: boolean

  // NOTE: Add more if needed
  yCenter?: boolean
  yStart?: boolean
  yEnd?: boolean
  yBaseline?: boolean

  expand?: boolean
}

const props = withDefaults(defineProps<FlexProps>(), {
  // eslint-disable-next-line vue/require-valid-default-prop
  gap: 's',
})

// Flex gap
const ag = computed(() => typeof props.gap === 'number'
  ? formatUnitValue(props.gap)
  : `var(--space-${props.gap})`,
)

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
  else return 'row'
})

// Justify content
const aj = computed(() => {
  if (props.xStart)
    return 'flex-start'
  else if (props.xEnd)
    return 'flex-end'
  else if (props.xCenter)
    return 'center'
  else if (props.xBetween)
    return 'space-between'
  else if (props.xEvenly)
    return 'space-evenly'
  else if (props.xAround)
    return 'space-around'
  else return 'flex-start'
})

// Align items
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

const aY = computed(() => props.inline ? 'inline-flex' : 'flex')
const aW = computed(() => props.wrap
  ? 'wrap'
  : props.wrapReverse
    ? 'wrap-reverse'
    : 'nowrap')

const aH = computed(() => props.expand ? '100%' : 'auto')
</script>

<template>
  <div
    class="vui-flex" :style="{
      display: aY,
      flexWrap: aW,
      flexDirection: ad,
      justifyContent: aj,
      gap: ag,
      alignItems: aA,
      width: aH,
    }"
  >
    <slot />
  </div>
</template>
