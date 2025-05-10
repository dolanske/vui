<script setup lang='ts'>
import type { Placement, PopoutMaybeElement } from '../../shared/types'
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import { onClickOutside } from '@vueuse/core'
import { onMounted, onUpdated, toRef, useTemplateRef, watch } from 'vue'
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
  /**
   * Set the visibility of the dropdown
   */
  visible: boolean
}

const props = withDefaults(defineProps<Props>(), {
  offset: 8,
})

const emit = defineEmits<{
  clickOutside: []
}>()
const popoutRef = useTemplateRef('popout')
const anchorRef = toRef(props.anchor)

const { floatingStyles, update } = useFloating(anchorRef, popoutRef, {
  whileElementsMounted: autoUpdate,
  strategy: 'fixed',
  transform: false,
  placement: props.placement,
  middleware: [
    shift({ padding: 8 }),
    flip(),
    offset(props.offset),
  ],
})

// Make sure to update the popout when the anchor is mounted
watch(() => props.anchor, (value) => {
  if (value) {
    anchorRef.value = value
    update()
  }
})

onClickOutside(popoutRef, () => emit('clickOutside'))
</script>

<template>
  <Transition name="fade-up">
    <div
      v-if="props.visible"
      ref="popout"
      :style="floatingStyles"
      class="vui-popout"
    >
      <slot />
    </div>
  </Transition>
</template>
