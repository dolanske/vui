import type { MaybeRefOrGetter } from 'vue'
import { onUnmounted, toValue, watch } from 'vue'

// Several overlays can lock scrolling at once, styles are only restored once
// the last one releases its lock
let locks = 0
let previousStyles: { overflow: string, paddingRight: string } | null = null

function lock(): void {
  if (typeof document === 'undefined')
    return

  locks++
  if (locks > 1)
    return

  const root = document.documentElement
  // Width of the classic scrollbar which disappears with `overflow: hidden`.
  // Compensating for it prevents the page from shifting horizontally.
  const scrollbarWidth = window.innerWidth - root.clientWidth

  previousStyles = {
    overflow: root.style.overflow,
    paddingRight: root.style.paddingRight,
  }

  root.style.setProperty('--vui-scrollbar-width', `${scrollbarWidth}px`)
  root.style.overflow = 'hidden'
  if (scrollbarWidth > 0)
    root.style.paddingRight = `calc(${getComputedStyle(root).paddingRight} + ${scrollbarWidth}px)`
}

function unlock(): void {
  if (typeof document === 'undefined' || locks === 0)
    return

  locks--
  if (locks > 0 || !previousStyles)
    return

  const root = document.documentElement
  root.style.overflow = previousStyles.overflow
  root.style.paddingRight = previousStyles.paddingRight
  root.style.removeProperty('--vui-scrollbar-width')
  previousStyles = null
}

/**
 * Prevents the page from scrolling while `active` is true. The overlay itself
 * should use `overscroll-behavior: contain` so touch scrolling does not chain
 * to the page on iOS.
 */
export function useScrollLock(active: MaybeRefOrGetter<boolean>): void {
  let isLocked = false

  function set(value: boolean): void {
    if (value === isLocked)
      return
    isLocked = value
    if (value)
      lock()
    else
      unlock()
  }

  watch(() => toValue(active), set, { immediate: true })
  onUnmounted(() => set(false))
}
