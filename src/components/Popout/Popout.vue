<script setup lang='ts'>
import type { Placement, PopoutMaybeElement } from '../../shared/types'
import { autoPlacement, offset, shift, useFloating } from '@floating-ui/vue'
import { toRef, useTemplateRef } from 'vue'
import './popout.scss'

export interface Props {
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

const popoutRef = useTemplateRef('popout')
const anchorRef = toRef(props.anchor)

const { floatingStyles } = useFloating(anchorRef, popoutRef, {
  placement: props.placement,
  middleware: [
    ...(props.placement ? [] : [autoPlacement()]),
    offset(props.offset),
    shift({
      padding: 8,
    }),
  ],
})
</script>

<template>
  <div ref="popout" :style="floatingStyles" class="vui-popout">
    <slot />
  </div>
</template>
