<script setup lang='ts'>
import type { Placement, PopoutMaybeElement } from '../../shared/types'
import { autoPlacement, flip, offset, shift, useFloating } from '@floating-ui/vue'
import { onClickOutside, useWindowScroll } from '@vueuse/core'
import { toRef, Transition, useTemplateRef, watch, watchEffect } from 'vue'
import './popout.scss'

export interface Props {
  /**
   * Reference to the HTML element the Popout is anchored to
   */
  anchor: PopoutMaybeElement<HTMLElement>
  /**
   * Override the autoPlacement option
   */
  placement?: Placement
  /**
   * Distance between the anchor and the rendered tooltip
   */
  offset?: number
}

const props = withDefaults(defineProps<Props>(), {
  offset: 8,
})

const emit = defineEmits<{
  clickOutside: []
}>()
const popoutRef = useTemplateRef('popout')
const anchorRef = toRef(props.anchor)

const { floatingStyles } = useFloating(anchorRef, popoutRef, {
  placement: props.placement,
  middleware: [
    // ...(props.placement
    //   ? []
    //   : [autoPlacement()]),
    shift({ padding: 8 }),
    flip(),
    offset(props.offset),
  ],
})

onClickOutside(popoutRef, () => emit('clickOutside'))
</script>

<template>
  <div ref="popout" :style="floatingStyles" class="vui-popout">
    <slot />
  </div>
</template>
