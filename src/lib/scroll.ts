import type { MaybeRefOrGetter, Ref } from 'vue'
import { useEventListener, useMutationObserver, useResizeObserver } from '@vueuse/core'
import { computed, ref, toValue, watch } from 'vue'

interface ScrollEdges {
  /**
   * Content can scroll further in the given direction
   */
  canScrollLeft: Ref<boolean>
  canScrollRight: Ref<boolean>
  canScrollUp: Ref<boolean>
  canScrollDown: Ref<boolean>
  /**
   * Content overflows the element horizontally / vertically
   */
  overflowsX: Ref<boolean>
  overflowsY: Ref<boolean>
  update: () => void
}

// Fractional scroll positions (zoom, high DPI) never reach the exact end
const TOLERANCE = 1

/**
 * Tracks whether a scroll container can scroll in each direction. Updates on
 * scroll, when the container resizes and when its content changes.
 */
export function useScrollEdges(target: MaybeRefOrGetter<HTMLElement | null | undefined>): ScrollEdges {
  const canScrollLeft = ref(false)
  const canScrollRight = ref(false)
  const canScrollUp = ref(false)
  const canScrollDown = ref(false)
  const overflowsX = ref(false)
  const overflowsY = ref(false)

  const el = computed(() => toValue(target))

  function update(): void {
    const node = el.value
    if (!node)
      return

    // Math.abs handles RTL, where scrollLeft is negative
    const left = Math.abs(node.scrollLeft)
    const maxX = node.scrollWidth - node.clientWidth
    const maxY = node.scrollHeight - node.clientHeight

    overflowsX.value = maxX > TOLERANCE
    overflowsY.value = maxY > TOLERANCE
    canScrollLeft.value = left > TOLERANCE
    canScrollRight.value = left < maxX - TOLERANCE
    canScrollUp.value = node.scrollTop > TOLERANCE
    canScrollDown.value = node.scrollTop < maxY - TOLERANCE
  }

  useEventListener(el, 'scroll', update, { passive: true })
  useResizeObserver(el, update)
  // Content changes (items added, images loading in) change the scroll size
  useMutationObserver(el, update, { childList: true, subtree: true, characterData: true })
  useEventListener(el, 'load', update, { capture: true, passive: true })

  watch(el, update, { flush: 'post', immediate: true })

  return {
    canScrollLeft,
    canScrollRight,
    canScrollUp,
    canScrollDown,
    overflowsX,
    overflowsY,
    update,
  }
}
