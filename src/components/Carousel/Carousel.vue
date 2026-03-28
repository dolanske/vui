<script setup lang="ts">
import type { Spaces } from '../../shared/types'
import { useEventListener, useScroll } from '@vueuse/core'
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import Flex from '../Flex/Flex.vue'
import Sheet from '../Sheet/Sheet.vue'
import './carousel.scss'

const {
  gap = 's' as const,
  sheetWidth,
  hideScrollbar,
  hideShadows,
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
   * Sets the sheet width
   */
  sheetWidth?: number
  /**
   * Hides the horizontal scrollbar and removes scrollbar gutter padding
   */
  hideScrollbar?: boolean
  /**
   * Hides the left & right shadows which indicate option to scroll
   */
  hideShadows?: boolean
}

const showSheet = ref(false)
const carouselRef = useTemplateRef<InstanceType<typeof Flex>>('carouselWrap')
const carouselEl = computed(() => carouselRef.value?.$el as HTMLElement | undefined)

function toggle() {
  showSheet.value = !showSheet.value
}

// Drag-to-scroll state
const isDragging = ref(false)
const hasDragged = ref(false)
const dragStartX = ref(0)
const scrollStartX = ref(0)

// How many pixels the pointer must move before it's considered a drag and not a click
const DRAG_THRESHOLD = 6

const { x } = useScroll(carouselEl)

useEventListener(carouselEl, 'pointerdown', (e: PointerEvent) => {
  // Only handle left mouse button (or touch/pen)
  if (e.button !== 0 && e.pointerType === 'mouse')
    return

  const el = carouselEl.value
  if (!el)
    return

  isDragging.value = true
  hasDragged.value = false
  dragStartX.value = e.clientX
  // Read scrollLeft directly - more reliable than the reactive x ref
  scrollStartX.value = el.scrollLeft
  // Note: do NOT call setPointerCapture here - that would swallow the click
  // event for plain taps. We capture only once a real drag is confirmed.
})

useEventListener(carouselEl, 'pointermove', (e: PointerEvent) => {
  if (!isDragging.value)
    return

  const delta = dragStartX.value - e.clientX

  // Only start scrolling once we've exceeded the threshold
  if (!hasDragged.value && Math.abs(delta) < DRAG_THRESHOLD)
    return

  // First frame past the threshold: capture the pointer so we keep receiving
  // events even when the cursor leaves the element, then start scrolling.
  if (!hasDragged.value) {
    const el = carouselEl.value
    el?.setPointerCapture(e.pointerId)
  }

  hasDragged.value = true
  // Write directly to scrollLeft for immediate, lag-free response
  const el = carouselEl.value
  if (el)
    el.scrollLeft = scrollStartX.value + delta
})

useEventListener(carouselEl, 'pointerup', () => {
  isDragging.value = false
})

useEventListener(carouselEl, 'pointercancel', () => {
  isDragging.value = false
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

// Wheel listener must be attached in onMounted so we can pass the resolved DOM
// element directly - guaranteeing { passive: false } is respected, which is
// required for e.preventDefault() to suppress vertical page scroll.
onMounted(() => {
  useEventListener(carouselEl.value, 'wheel', (e: WheelEvent) => {
    // If already scrolling horizontally (shift+wheel or trackpad swipe), let it pass
    if (e.deltaX !== 0)
      return

    e.preventDefault()
    carouselEl.value!.scrollLeft += e.deltaY
  }, { passive: false })
})
</script>

<template>
  <div class="carousel" :class="{ 'hide-scrollbar': hideScrollbar, 'hide-shadows': hideShadows }">
    <!-- Header slot -->
    <slot name="header" :toggle />

    <!-- Scrollable carousel -->
    <div
      class="carousel-track"
      :class="{
        'shadow-left': x > 0,
        'shadow-right': carouselEl && x < carouselEl.scrollWidth - carouselEl.clientWidth,
      }"
    >
      <Flex
        ref="carouselWrap"
        class="carousel-content"
        :class="{ 'is-dragging': isDragging }"
        :gap
      >
        <slot />
      </Flex>
    </div>

    <Sheet :open="showSheet" :size="sheetWidth" @close="showSheet = false">
      <template #header="{ close }">
        <slot name="sheet-header" :close />
      </template>
      <!-- Sheet content, can render for example more items than the default slot -->
      <slot name="sheet-content">
        <!-- If sheet content not provided, it will display children passed in the default slot -->
        <slot />
      </slot>
      <template #footer="{ close }">
        <slot name="sheet-footer" :close />
      </template>
    </Sheet>

    <!-- Footer slot -->
    <slot name="footer" :toggle />
  </div>
</template>
