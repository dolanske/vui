import type { Ref } from 'vue'
import { reactiveComputed, useMediaQuery } from '@vueuse/core'
import { computed, ref } from 'vue'

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

export const breakpoints = ref({
  s: 572,
  m: 768,
  l: 1228,
})

type BreakpointKey = keyof typeof breakpoints.value

const rawViewports = computed(() => {
  return Object.entries(breakpoints.value).reduce((acc, [key, value]) => {
    acc[key as BreakpointKey] = useMediaQuery(`(max-width: ${value}px)`, {
      // Default values for SSR to prevent hydration mismatch
      ssrWidth: 1680,
    })
    return acc
  }, {} as Record<BreakpointKey, Ref<boolean>>)
})

// Convert rawViewports to a reactive object of booleans for easy consumption
export const viewport = reactiveComputed<Breakpoints>(() => {
  return Object.entries(rawViewports.value).reduce((acc, [key, value]) => {
    acc[key as keyof Breakpoints] = value.value
    return acc
  }, {} as Breakpoints)
})
