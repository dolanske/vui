<script setup lang="ts">
import type { Spaces } from '../../lib/types.ts'
import { IconCaretLeft, IconCaretRight } from '@iconify-prerendered/vue-ph'
import { useEventListener } from '@vueuse/core'
import { computed, ref, useTemplateRef } from 'vue'
import { useScrollEdges } from '../../lib/scroll.ts'
import Button from '../Button/Button.vue'
import Flex from '../Flex/Flex.vue'
import '../Overflow/overflow.scss'
import './carousel.scss'

const {
  gap = 's' as const,
  hideScrollbar,
  hideShadows,
  snap,
  disableDrag,
  controls = false,
  label = 'Carousel',
} = defineProps<Props>()

/**
 * When using the carousel, the items put within should generally have a `min-width` set.
 * Otherwise the flex will try to fit all items without overflowing.
 *
 * When using Carousel, you should set `:draggable="false"` to avoid issues with dragging.
 */
interface Props {
  /**
   * We use flex to gap items.
   */
  gap?: Spaces | number
  /**
   * Hides the horizontal scrollbar and removes scrollbar gutter padding
   */
  hideScrollbar?: boolean
  /**
   * Hides the left & right shadows which indicate option to scroll
   */
  hideShadows?: boolean
  /**
   * Enables scroll-snap so items snap into place when scrolling stops
   */
  snap?: boolean
  /**
   * Disables the drag-to-scroll functionality. Keeping only mouse wheel and
   * touch scrolling. Useful when the carousel contains interactive elements
   * like buttons or links that would conflict with dragging.
   */
  disableDrag?: boolean
  /**
   * Renders previous / next buttons below the carousel
   */
  controls?: boolean
  /**
   * Accessible name of the carousel region
   */
  label?: string
}

const carouselRef = useTemplateRef<InstanceType<typeof Flex>>('carouselWrap')
const carouselEl = computed(() => carouselRef.value?.$el as HTMLElement | undefined)

const { canScrollLeft, canScrollRight, overflowsX } = useScrollEdges(carouselEl)

// Drag-to-scroll state
const isDragging = ref(false)
const hasDragged = ref(false)
const dragStartX = ref(0)
const scrollStartX = ref(0)

// How many pixels the pointer must move before it's considered a drag and not a click
const DRAG_THRESHOLD = 6

useEventListener(carouselEl, 'pointerdown', (e: PointerEvent) => {
  if (disableDrag)
    return

  // Only the mouse drags, touch and pen already scroll natively
  if (e.pointerType !== 'mouse' || e.button !== 0)
    return

  const el = carouselEl.value
  if (!el)
    return

  // Reset any stale drag state from a previous interaction where click never fired
  hasDragged.value = false
  isDragging.value = true
  dragStartX.value = e.clientX
  scrollStartX.value = el.scrollLeft
  // Note: do NOT call setPointerCapture here - that would swallow the click
  // event for plain taps. We capture only once a real drag is confirmed.
})

useEventListener(carouselEl, 'pointermove', (e: PointerEvent) => {
  if (disableDrag || !isDragging.value)
    return

  const delta = dragStartX.value - e.clientX

  // Only start scrolling once we've exceeded the threshold
  if (!hasDragged.value && Math.abs(delta) < DRAG_THRESHOLD)
    return

  // First frame past the threshold: capture the pointer so we keep receiving
  // events even when the cursor leaves the element, then start scrolling.
  if (!hasDragged.value) {
    carouselEl.value?.setPointerCapture(e.pointerId)
  }

  hasDragged.value = true
  // Write directly to scrollLeft for immediate, lag-free response. Scroll
  // snapping is suspended while dragging (see .is-dragging styles).
  const el = carouselEl.value
  if (el)
    el.scrollLeft = scrollStartX.value + delta
})

function endDrag() {
  isDragging.value = false
}

useEventListener(carouselEl, 'pointerup', endDrag)
useEventListener(carouselEl, 'pointercancel', () => {
  endDrag()
  hasDragged.value = false
})

// Suppress the click that fires immediately after a drag so child links/buttons don't activate
useEventListener(carouselEl, 'click', (e: MouseEvent) => {
  if (hasDragged.value) {
    e.preventDefault()
    e.stopPropagation()
    hasDragged.value = false
  }
}, { capture: true })

// Vertical wheel scrolling is turned into horizontal scrolling, but only while
// the carousel can actually scroll that way. At either end (or without any
// overflow) the page scrolls normally instead of being trapped.
useEventListener(carouselEl, 'wheel', (e: WheelEvent) => {
  const el = carouselEl.value
  // Already scrolling horizontally (shift+wheel or trackpad swipe), let it pass
  if (!el || e.deltaX !== 0 || e.deltaY === 0 || !overflowsX.value)
    return

  const canScroll = e.deltaY > 0 ? canScrollRight.value : canScrollLeft.value
  if (!canScroll)
    return

  e.preventDefault()
  el.scrollLeft += e.deltaY
}, { passive: false })

function scrollByPage(direction: 1 | -1) {
  const el = carouselEl.value
  if (!el)
    return
  el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
}

// The focused carousel can be scrolled with the arrow keys
function onKeydown(event: KeyboardEvent) {
  if (event.target !== carouselEl.value)
    return

  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault()
    scrollByPage(event.key === 'ArrowRight' ? 1 : -1)
  }
}
</script>

<template>
  <div
    class="vui-overflow is-horizontal carousel"
    role="region"
    aria-roledescription="carousel"
    :aria-label="label"
    :class="{
      'hide-scrollbar': hideScrollbar,
      'hide-shadows': hideShadows,
      'no-drag': disableDrag,
      'is-snap': snap,
    }"
  >
    <div class="overflow-track">
      <div class="overflow-shadow overflow-shadow-left" :class="{ visible: canScrollLeft }" />
      <div class="overflow-shadow overflow-shadow-right" :class="{ visible: canScrollRight }" />
      <Flex
        ref="carouselWrap"
        class="overflow-content"
        :class="{ 'is-dragging': isDragging && hasDragged }"
        :gap
        :tabindex="overflowsX ? 0 : undefined"
        @keydown="onKeydown"
      >
        <slot />
      </Flex>
    </div>
    <Flex v-if="controls" class="carousel-controls" x-end gap="xxs">
      <Button size="s" square plain :disabled="!canScrollLeft" aria-label="Previous" @click="scrollByPage(-1)">
        <IconCaretLeft />
      </Button>
      <Button size="s" square plain :disabled="!canScrollRight" aria-label="Next" @click="scrollByPage(1)">
        <IconCaretRight />
      </Button>
    </Flex>
  </div>
</template>
