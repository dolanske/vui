import type { ComputedRef } from 'vue'
import type { Sizes } from './types'
import { computed } from 'vue'
import { Size } from './types'

// Some files may share the same properties
export function useActualGap(gap?: Sizes | number): ComputedRef<string> {
  return computed(() => {
    if (typeof gap === 'number')
      return `${gap}px`
    switch (gap) {
      case Size.s: return '4px'
      case Size.l: return '16px'
      case Size.m:
      default: return '8px'
    }
  })
}
