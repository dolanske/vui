import type { Ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { effectScope, reactive, ref, watchEffect } from 'vue'

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

let initialized = false

/**
 * Media queries are only created the first time the viewport is read in a
 * browser. Importing the library has no side effects, and during SSR every
 * breakpoint simply reads as `false`.
 */
function ensureInitialized(): void {
  if (initialized || typeof window === 'undefined')
    return

  initialized = true

  // Detached scope, the viewport state is global and outlives components
  effectScope(true).run(() => {
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
  })
}

// Reads go through the reactive state, so consumers can use `viewport.s` in
// templates, computed properties and watchers as before.
export const viewport = new Proxy(viewportState, {
  get(target, key) {
    ensureInitialized()
    return Reflect.get(target, key)
  },
}) as unknown as Breakpoints
