import type { Ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { reactive, ref, watchEffect } from 'vue'

export interface Breakpoints {
  /**
   * Mobile breakpoint `<=572px`
   */
  s: boolean
  /**
   * Tablet breakpoint `<=768px`
   */
  m: boolean
  /**
   * Small desktop / laptop breakpoint `<=1228px`
   */
  l: boolean
}

type BreakpointValues = Record<string, number> & {
  s: number
  m: number
  l: number
}

export const breakpoints = ref<BreakpointValues>({
  s: 572,
  m: 768,
  l: 1228,
})

type BreakpointKey = keyof typeof breakpoints.value

const mediaQueries = new Map<string, Ref<boolean>>()

// Source of truth for consumers. Keys mirror `breakpoints` and stay reactive.
const viewportState = reactive<Record<string, boolean>>({})

watchEffect(() => {
  const currentKeys = new Set(Object.keys(breakpoints.value))

  for (const key of currentKeys) {
    if (!mediaQueries.has(key)) {
      mediaQueries.set(key, useMediaQuery(() => `(max-width: ${breakpoints.value[key as BreakpointKey]}px)`))
    }

    viewportState[key] = Boolean(mediaQueries.get(key)?.value)
  }

  for (const key of mediaQueries.keys()) {
    if (!currentKeys.has(key)) {
      mediaQueries.delete(key)
      delete viewportState[key]
    }
  }
})

// `reactive` unwraps refs on property access, so consumers can use `viewport.s`.
export const viewport = viewportState as unknown as Breakpoints
