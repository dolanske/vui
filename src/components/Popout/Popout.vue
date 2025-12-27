<script setup lang='ts'>
import type { Placement, PopoutMaybeElement } from '../../shared/types'
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import { onClickOutside } from '@vueuse/core'
import { computed, toRef, useAttrs, useTemplateRef, watch } from 'vue'
import { getPlacementAnimationName } from '../../shared/helpers'
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
  /**
   * By default, elements with transition already use a default fade transition. This can be replaced by a custom vue transition class name.
   *
   * Setting the value to `none` will not apply any transition
   */
  transitionName?: string | 'disabled'
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  offset: 8,
  placement: 'top',
})

const emit = defineEmits<{
  clickOutside: []
}>()

const attrs = useAttrs()

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

const transition = computed(() => {
  if (props.transitionName === 'none')
    return undefined
  else if (props.transitionName)
    return props.transitionName
  return getPlacementAnimationName(props.placement)
})
</script>

<template>
  <!-- <Teleport to="#app"> -->
  <Transition :name="transition">
    <div
      v-if="props.visible"
      ref="popout"
      :style="floatingStyles"
      class="vui-popout"
      v-bind="attrs"
    >
      <slot />
    </div>
  </Transition>
  <!-- </Teleport> -->
</template>
