<script setup lang='ts'>
import type { MaybeElement, Placement } from '@floating-ui/vue'
import { autoPlacement, offset, useFloating } from '@floating-ui/vue'
import { toRef, useTemplateRef } from 'vue'
import './popout.scss'

interface Props {
  anchor: MaybeElement<HTMLElement>
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
  ],
})
</script>

<template>
  <div ref="popout" :style="floatingStyles" class="vui-popout">
    <slot />
  </div>
</template>
