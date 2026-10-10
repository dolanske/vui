import type { InjectionKey } from 'vue'
import { getFocusableElements } from './focus'

export const MENU_ITEM_SELECTOR = '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"], [role="option"]'

/**
 * Context provided by menu-like containers (Dropdown, ContextMenu, MenuItem)
 * so their items can close the menu when activated, regardless of how deeply
 * they are nested or teleported (e.g. inside a submenu).
 */
export interface MenuContext {
  /**
   * Closes the menu. Focus is returned to the trigger when `returnFocus` is true.
   */
  close: (_returnFocus?: boolean) => void
}

export const MENU_KEY = Symbol('vui-menu') as InjectionKey<MenuContext>

/**
 * Shared between every ContextMenu instance. The innermost menu claims a
 * contextmenu event, outer menus see the claim and stay closed.
 */
export const claimedContextMenuEvents = new WeakMap<Event, string>()

/**
 * Returns the enabled menu items of a container, in DOM order. Items inside
 * nested menus (e.g. a submenu rendered inline) are excluded.
 */
export function getMenuItems(container: HTMLElement): HTMLElement[] {
  return Array
    .from(container.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR))
    .filter(el =>
      el.closest('[role="menu"], [role="listbox"]') === container
      && !el.hasAttribute('disabled')
      && el.getAttribute('aria-disabled') !== 'true',
    )
}

function isEditable(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement))
    return false
  return el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)
}

/**
 * Focuses the most suitable element when a menu opens: an element with
 * `autofocus`, a search input, the selected option or the first item.
 */
export function focusInitialItem(container: HTMLElement, position: 'first' | 'last' = 'first'): void {
  const preferred = container.querySelector<HTMLElement>('[autofocus]')
    ?? container.querySelector<HTMLElement>('input:not([type="hidden"]):not([disabled])')

  if (preferred && position === 'first') {
    preferred.focus({ preventScroll: true })
    return
  }

  const items = getMenuItems(container)
  const selected = items.find(el => el.getAttribute('aria-selected') === 'true' || el.getAttribute('aria-checked') === 'true')
  const target = position === 'last'
    ? items.at(-1)
    : (selected ?? items[0])

  ;(target ?? getFocusableElements(container)[0] ?? container).focus({ preventScroll: true })
}

/**
 * Creates a keydown handler implementing the WAI-ARIA menu / listbox keyboard
 * model: Arrow keys, Home, End and typeahead.
 */
export function createMenuKeydownHandler(getContainer: () => HTMLElement | null | undefined): (_event: KeyboardEvent) => void {
  let typeahead = ''
  let typeaheadTimer: ReturnType<typeof setTimeout> | undefined

  return (event: KeyboardEvent) => {
    const container = getContainer()
    if (!container || event.defaultPrevented || event.isComposing)
      return

    const items = getMenuItems(container)
    if (items.length === 0)
      return

    const active = document.activeElement as HTMLElement | null
    const index = active ? items.indexOf(active) : -1
    const inEditable = isEditable(event.target)

    function focusAt(next: number): void {
      event.preventDefault()
      items[(next + items.length) % items.length]?.focus({ preventScroll: false })
    }

    switch (event.key) {
      case 'ArrowDown':
        focusAt(index === -1 ? 0 : index + 1)
        return
      case 'ArrowUp':
        focusAt(index === -1 ? items.length - 1 : index - 1)
        return
      case 'Home':
        // Inside a search input Home / End move the caret
        if (!inEditable)
          focusAt(0)
        return
      case 'End':
        if (!inEditable)
          focusAt(items.length - 1)
        return
    }

    // Typeahead, never while typing into an input
    if (inEditable || event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1 || event.key === ' ')
      return

    clearTimeout(typeaheadTimer)
    typeahead += event.key.toLowerCase()
    typeaheadTimer = setTimeout(() => typeahead = '', 500)

    const ordered = [...items.slice(index + 1), ...items.slice(0, index + 1)]
    // A repeated single character cycles through items starting with it
    const search = typeahead.split('').every(char => char === typeahead[0]) ? typeahead[0] : typeahead
    const match = ordered.find(el => el.textContent?.trim().toLowerCase().startsWith(search))

    if (match) {
      event.preventDefault()
      match.focus()
    }
  }
}
