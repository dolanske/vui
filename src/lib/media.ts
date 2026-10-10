import type { Ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { effectScope } from 'vue'

interface InputCapabilities {
  /**
   * The primary pointer can hover precisely (mouse, trackpad)
   */
  canHover: Ref<boolean>
  /**
   * The primary pointer is imprecise (touch)
   */
  coarsePointer: Ref<boolean>
}

let capabilities: InputCapabilities | null = null

/**
 * Lazily created, shared input capability queries. Prefer these over screen
 * width when a behaviour depends on how the user interacts (hover tooltips,
 * touch friendly drawers) rather than on the available space.
 */
export function useInputCapabilities(): InputCapabilities {
  if (!capabilities) {
    capabilities = effectScope(true).run(() => ({
      canHover: useMediaQuery('(hover: hover) and (pointer: fine)'),
      coarsePointer: useMediaQuery('(pointer: coarse)'),
    }))!
  }

  return capabilities
}
