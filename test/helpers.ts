import { nextTick } from 'vue'

/**
 * Flushes Vue's scheduler a few times plus a macrotask, enough for watchers,
 * post-flush effects and jsdom transitions to settle.
 */
export async function flush(ms = 0): Promise<void> {
  for (let i = 0; i < 5; i++)
    await nextTick()
  await new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * jsdom has no layout, so every element reports no client rects and counts as
 * invisible. The focus utilities skip invisible elements.
 */
export function mockLayout(): void {
  Object.defineProperty(HTMLElement.prototype, 'getClientRects', {
    configurable: true,
    value: () => [{}],
  })
}

export function pressKey(target: EventTarget, key: string, init: KeyboardEventInit = {}): boolean {
  return target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init }))
}

/**
 * Real transitions instead of the stubs of Vue Test Utils, so after-leave
 * hooks (unmounting overlays) run
 */
export const withTransitions = { attachTo: document.body, global: { stubs: { transition: false } } }
