import type { Ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { computed, ref } from 'vue'

export enum Breakpoints {
  Mobile = 'mobile',
}

export const vuiBreakpoints = ref<Record<Breakpoints, number>>({
  mobile: 572,
})

const { width } = useWindowSize()

/**
 * Returns a reactive boolean indicating if the current window width is less than or equal to the specified breakpoint.
 */
export function useBreakpoint(breakpoint: Breakpoints): Ref<boolean> {
  return computed(() => {
    const breakpointValue = vuiBreakpoints.value[breakpoint]

    if (!breakpointValue) {
      console.warn(`Breakpoint ${breakpoint} is not defined in vuiBreakpoints.`)
      return false
    }

    return width.value <= breakpointValue
  })
}
