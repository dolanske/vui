<script setup lang="ts">
import type { Sizes } from '../../shared/types'
import { computed } from 'vue'
import { useActualGap } from '../../shared/composables'

export interface FlexProps {
  inline?: boolean
  wrap?: boolean
  wrapReverse?: boolean

  row?: boolean
  column?: boolean
  rowReverse?: boolean
  columnReverse?: boolean

  gap?: Sizes | number

  // NOTE: Add more if needed
  justifyStart?: boolean
  justifyEnd?: boolean
  justifyCenter?: boolean
  spaceBetween?: boolean
  spaceAround?: boolean
  spaceEvenly?: boolean

  // NOTE: Add more if needed
  alignCenter?: boolean
  alignStart?: boolean
  alignEnd?: boolean
  alignBaseline?: boolean

  expand?: boolean
}

const props = defineProps<FlexProps>()

// Flex gap
const ag = useActualGap(props.gap)

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
  if (props.justifyStart)
    return 'flex-start'
  else if (props.justifyEnd)
    return 'flex-end'
  else if (props.justifyCenter)
    return 'center'
  else if (props.spaceBetween)
    return 'space-between'
  else if (props.spaceEvenly)
    return 'space-evenly'
  else if (props.spaceAround)
    return 'space-around'
  else return 'flex-start'
})

// Align items
const aA = computed(() => {
  if (props.alignStart)
    return 'flex-start'
  else if (props.alignEnd)
    return 'flex-end'
  else if (props.alignCenter)
    return 'center'
  else if (props.alignBaseline)
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
  <div class="vui-flex">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.vui-flex {
  display: v-bind(aY);
  flex-wrap: v-bind(aW);
  flex-direction: v-bind(ad);
  justify-content: v-bind(aj);
  gap: v-bind(ag);
  align-items: v-bind(aA);
  width: v-bind(aH);
}
</style>
