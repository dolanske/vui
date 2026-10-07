import type { MaybeRefOrGetter } from 'vue'
import { onUnmounted, toValue, watch } from 'vue'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function isVisible(el: HTMLElement): boolean {
  // `checkVisibility` is not available everywhere (and not in jsdom)
  if (typeof el.checkVisibility === 'function')
    return el.checkVisibility()
  return !el.hidden && el.getClientRects().length > 0
}

/**
 * Whether an element can receive keyboard focus on its own
 */
export function isFocusable(el: Element): boolean {
  return el.matches(FOCUSABLE_SELECTOR)
}

/**
 * Returns the tabbable elements inside a container, in DOM order
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array
    .from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    .filter(el => !el.closest('[inert]') && el.tabIndex >= 0 && isVisible(el))
}

interface FocusTrapOptions {
  /**
   * Z-index of the layer owning the trap. Focus is allowed to move into
   * layers above it (e.g. a dropdown opened inside a modal).
   */
  layer?: MaybeRefOrGetter<number>
  /**
   * Return focus to the previously focused element when the trap deactivates
   */
  restoreFocus?: boolean
}

interface ActiveTrap {
  container: () => HTMLElement | null | undefined
  layer: () => number
}

// Only the most recently activated trap enforces focus
const traps: ActiveTrap[] = []

function isInsideHigherLayer(target: Element, layer: number): boolean {
  const layerEl = target.closest<HTMLElement>('[data-vui-layer]')
  return !!layerEl && Number(layerEl.dataset.vuiLayer) > layer
}

function onFocusIn(event: FocusEvent): void {
  const trap = traps.at(-1)
  const container = trap?.container()
  const target = event.target as Element | null

  if (!trap || !container || !target || container.contains(target))
    return

  if (isInsideHigherLayer(target, trap.layer()))
    return

  // Focus escaped the trap (e.g. via a click on the page behind), bring it back
  const [first] = getFocusableElements(container)
  ;(first ?? container).focus({ preventScroll: true })
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key !== 'Tab')
    return

  const container = traps.at(-1)?.container()
  if (!container || !container.contains(document.activeElement))
    return

  const focusable = getFocusableElements(container)

  if (focusable.length === 0) {
    event.preventDefault()
    container.focus({ preventScroll: true })
    return
  }

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.shiftKey && (document.activeElement === first || document.activeElement === container)) {
    event.preventDefault()
    last.focus()
  }
  else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

function updateListeners(): void {
  if (typeof document === 'undefined')
    return

  if (traps.length > 0) {
    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('keydown', onKeydown)
  }
  else {
    document.removeEventListener('focusin', onFocusIn)
    document.removeEventListener('keydown', onKeydown)
  }
}

/**
 * Moves focus into a container while `active` is true, keeps Tab / Shift+Tab
 * cycling inside of it and restores focus to the previously focused element
 * once deactivated. Elements with `autofocus` receive the initial focus.
 */
export function useFocusTrap(
  container: MaybeRefOrGetter<HTMLElement | null | undefined>,
  active: MaybeRefOrGetter<boolean>,
  options: FocusTrapOptions = {},
): void {
  const { restoreFocus = true } = options
  let previouslyFocused: HTMLElement | null = null
  let trap: ActiveTrap | null = null

  function activate(): void {
    const el = toValue(container)
    if (!el || trap)
      return

    previouslyFocused = document.activeElement as HTMLElement | null
    trap = {
      container: () => toValue(container),
      layer: () => toValue(options.layer) ?? 0,
    }
    traps.push(trap)
    updateListeners()

    // Do not steal focus if something inside is already focused
    if (el.contains(document.activeElement))
      return

    const preferred = el.querySelector<HTMLElement>('[autofocus]')
    const [first] = getFocusableElements(el)
    const target = preferred ?? first

    if (target) {
      target.focus({ preventScroll: true })
    }
    else {
      if (!el.hasAttribute('tabindex'))
        el.setAttribute('tabindex', '-1')
      el.focus({ preventScroll: true })
    }
  }

  function deactivate(): void {
    if (!trap)
      return

    const index = traps.indexOf(trap)
    if (index !== -1)
      traps.splice(index, 1)
    trap = null
    updateListeners()

    if (restoreFocus && previouslyFocused?.isConnected)
      previouslyFocused.focus({ preventScroll: true })
    previouslyFocused = null
  }

  watch(
    () => [toValue(active), toValue(container)] as const,
    ([isActive, el]) => {
      if (isActive && el)
        activate()
      else if (!isActive)
        deactivate()
    },
    { flush: 'post', immediate: true },
  )

  onUnmounted(deactivate)
}
