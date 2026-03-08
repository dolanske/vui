<script setup lang='ts'>
import type { Placement, PopoutMaybeElement } from '../../shared/types'
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import { onClickOutside } from '@vueuse/core'
import { computed, ref, useAttrs, useTemplateRef, watch } from 'vue'
import { getPlacementAnimationName } from '../../shared/helpers'
import { useLayer } from '../../shared/layerManager'
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
  transitionName?: string | 'none'
  /**
   * Whether the Popout should by default be teleported to the `body`.
   *
   * @default true
   */
  teleport?: boolean
  /**
   * Delay in milliseconds before the popout becomes visible after `visible` turns true
   */
  enterDelay?: number
  /**
   * Delay in milliseconds before the popout hides after `visible` turns false
   */
  leaveDelay?: number
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  offset: 8,
  placement: 'top',
  teleport: true,
})

const emit = defineEmits<{
  clickOutside: []
}>()

const attrs = useAttrs()

const popoutRef = useTemplateRef('popout')
const anchorRef = computed(() => props.anchor)

const { floatingStyles } = useFloating(anchorRef, popoutRef, {
  whileElementsMounted: autoUpdate,
  strategy: 'fixed',
  transform: false,
  placement: props.placement,
  middleware: [
    offset(props.offset),
    flip(),
    shift({ padding: 8 }),
  ],
})

onClickOutside(popoutRef, () => {
  emit('clickOutside')
}, {
  ignore: [anchorRef],
})

const transition = computed(() => {
  if (props.transitionName === 'none')
    return undefined
  else if (props.transitionName)
    return props.transitionName
  return getPlacementAnimationName(props.placement)
})

const { layerIndex, openLayer, closeLayer } = useLayer()

const delayedVisible = ref(props.visible)
let enterTimeoutId: ReturnType<typeof setTimeout>
let leaveTimeoutId: ReturnType<typeof setTimeout>

watch(delayedVisible, (isVisible) => {
  if (isVisible)
    openLayer()
  else
    closeLayer()
}, { immediate: true })

watch(() => props.visible, (isVisible) => {
  if (isVisible) {
    clearTimeout(leaveTimeoutId)
    if (!props.enterDelay || props.enterDelay <= 0) {
      delayedVisible.value = true
      return
    }
    clearTimeout(enterTimeoutId)
    enterTimeoutId = setTimeout(() => {
      if (props.visible)
        delayedVisible.value = true
    }, props.enterDelay)
  }
  else {
    clearTimeout(enterTimeoutId)
    if (!props.leaveDelay || props.leaveDelay <= 0) {
      delayedVisible.value = false
      return
    }
    leaveTimeoutId = setTimeout(() => {
      if (!props.visible)
        delayedVisible.value = false
    }, props.leaveDelay)
  }
})
</script>

<template>
  <Teleport to="body" :disabled="props.teleport !== true">
    <Transition :name="transition">
      <div
        v-if="delayedVisible"
        ref="popout"
        :style="[floatingStyles, { zIndex: layerIndex }]"
        class="vui-popout"
        v-bind="attrs"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
