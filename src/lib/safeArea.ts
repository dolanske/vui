export interface SafeAreaInsets {
  top: number
  right: number
  bottom: number
  left: number
}

let probe: HTMLElement | null = null

/**
 * Reads the current `env(safe-area-inset-*)` values in pixels. CSS
 * environment variables can not be read from JavaScript directly, so a hidden
 * element using them as padding is measured instead.
 */
export function getSafeAreaInsets(): SafeAreaInsets {
  if (typeof document === 'undefined')
    return { top: 0, right: 0, bottom: 0, left: 0 }

  if (!probe || !probe.isConnected) {
    probe = document.createElement('div')
    probe.setAttribute('aria-hidden', 'true')
    probe.style.cssText = [
      'position: fixed',
      'visibility: hidden',
      'pointer-events: none',
      'padding-top: env(safe-area-inset-top, 0px)',
      'padding-right: env(safe-area-inset-right, 0px)',
      'padding-bottom: env(safe-area-inset-bottom, 0px)',
      'padding-left: env(safe-area-inset-left, 0px)',
    ].join(';')
    document.body.appendChild(probe)
  }

  const style = getComputedStyle(probe)
  return {
    top: Number.parseFloat(style.paddingTop) || 0,
    right: Number.parseFloat(style.paddingRight) || 0,
    bottom: Number.parseFloat(style.paddingBottom) || 0,
    left: Number.parseFloat(style.paddingLeft) || 0,
  }
}
