<script setup lang='ts'>
import type { Middleware } from '@floating-ui/vue'
import type { Placement, PopoutMaybeElement } from '../../lib/types'
import { arrow as arrowMiddleware, autoUpdate, flip, offset, shift, size, useFloating } from '@floating-ui/vue'
import { onClickOutside } from '@vueuse/core'
import { computed, onUnmounted, ref, toRef, useAttrs, useTemplateRef, watch } from 'vue'
import { getPlacementAnimationName } from '../../lib/helpers'
import { useLayer } from '../../lib/layerManager'
import { getSafeAreaInsets } from '../../lib/safeArea'
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
   * Setting the value to `none` will not apply any transition. This is useful when using viewTransitions to prevent conflicts between default animation and the view transition
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
  /**
   * Makes the popout at least as wide as its anchor
   */
  matchWidth?: boolean
  /**
   * Renders an arrow pointing at the anchor
   */
  arrow?: boolean
  /**
   * Emits `escape` when Escape is pressed while this is the top-most layer.
   * Popouts without it never react to (or block) Escape.
   */
  closeOnEscape?: boolean
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
  clickOutside: [event: PointerEvent]
  escape: []
}>()

const attrs = useAttrs()

const popoutRef = useTemplateRef('popout')
const arrowRef = useTemplateRef<HTMLElement>('arrowEl')
const anchorRef = computed(() => props.anchor)

const EDGE_PADDING = 8

function viewportPadding() {
  const insets = getSafeAreaInsets()
  return {
    top: EDGE_PADDING + insets.top,
    right: EDGE_PADDING + insets.right,
    bottom: EDGE_PADDING + insets.bottom,
    left: EDGE_PADDING + insets.left,
  }
}

// Options are reactive, so changing placement or offset re-positions the popout
const middleware = computed(() => {
  const list: Middleware[] = [
    offset(props.offset),
    // Popouts keep a small distance to the viewport edges, plus any notch or
    // home indicator area on mobile devices (issue #229)
    flip(() => ({ padding: viewportPadding() })),
    shift(() => ({ padding: viewportPadding() })),
  ]

  if (props.matchWidth) {
    list.push(size({
      apply({ rects, elements }) {
        elements.floating.style.minWidth = `${rects.reference.width}px`
      },
    }))
  }

  if (props.arrow)
    list.push(arrowMiddleware({ element: arrowRef, padding: 6 }))

  return list
})

const { floatingStyles, placement: computedPlacement, middlewareData } = useFloating(anchorRef, popoutRef, {
  whileElementsMounted: autoUpdate,
  strategy: 'fixed',
  transform: false,
  placement: toRef(() => props.placement),
  middleware,
})

const { layerIndex, openLayer, closeLayer } = useLayer({
  onEscape: () => {
    if (!props.closeOnEscape)
      return false
    emit('escape')
  },
})

// Clicks inside popouts stacked above this one (submenus, nested dropdowns)
// are not "outside", even though they are teleported elsewhere in the DOM
function isInsideHigherLayer(target: EventTarget | null): boolean {
  if (!(target instanceof Element))
    return false
  const layerEl = target.closest<HTMLElement>('[data-vui-layer]')
  return !!layerEl && Number(layerEl.dataset.vuiLayer) > layerIndex.value
}

onClickOutside(popoutRef, (event) => {
  if (isInsideHigherLayer(event.target))
    return
  emit('clickOutside', event as PointerEvent)
}, {
  ignore: [anchorRef],
})

const transition = computed(() => {
  if (props.transitionName === 'none')
    return undefined
  else if (props.transitionName)
    return props.transitionName
  return getPlacementAnimationName(computedPlacement.value)
})

const delayedVisible = ref(props.visible)
let enterTimeoutId: ReturnType<typeof setTimeout> | undefined
let leaveTimeoutId: ReturnType<typeof setTimeout> | undefined

watch(delayedVisible, (isVisible) => {
  if (isVisible)
    openLayer()
  else
    closeLayer()
}, { immediate: true })

defineExpose({
  el: () => popoutRef.value,
  layerIndex: () => layerIndex.value,
})

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

onUnmounted(() => {
  clearTimeout(enterTimeoutId)
  clearTimeout(leaveTimeoutId)
})

// The arrow sits on the side of the popout facing the anchor
const arrowStyle = computed(() => {
  const data = middlewareData.value.arrow
  const side = computedPlacement.value.split('-')[0] as 'top' | 'right' | 'bottom' | 'left'
  const opposite = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[side]

  return {
    left: data?.x != null ? `${data.x}px` : '',
    top: data?.y != null ? `${data.y}px` : '',
    [opposite]: 'calc(var(--vui-popout-arrow-size) / -2)',
  }
})
</script>

<template>
  <Teleport to="body" :disabled="props.teleport !== true">
    <Transition :name="transition" :css="transitionName !== 'none'">
      <div
        v-if="delayedVisible"
        ref="popout"
        :style="[floatingStyles, { zIndex: layerIndex }]"
        class="vui-popout"
        :data-vui-layer="layerIndex"
        :data-placement="computedPlacement"
        v-bind="attrs"
      >
        <slot />
        <div v-if="props.arrow" ref="arrowEl" class="vui-popout-arrow" :style="arrowStyle" aria-hidden="true" />
      </div>
    </Transition>
  </Teleport>
</template>
