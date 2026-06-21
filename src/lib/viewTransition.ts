import type { Ref } from 'vue'
import { nextTick, ref } from 'vue'

interface ViewTransitionComposable {
  /**
   * Indicates if transition is currently in progress
   */
  isRunning: Ref<boolean>
  /**
   * Starts a view transition. The provided `update` function will be called during the transition.
   */
  startTransition: (update: () => void | Promise<void>) => Promise<void>
}

/**
 * A generic composable for running View Transitions.
 *
 * In order to setup view transitions, we need to provide `transition-name` in
 * CSS to the components we want to transition and then apply old & new
 * styles to them via the following selectors. At minimum, you should provide
 * the animation-duration
 *
 * ```css
 * ::view-transition-old(<transition-name>) {}
 * ::view-transition-new(<transition-name>) {}
 * ```
 */
export function useViewTransition(): ViewTransitionComposable {
  const isRunning = ref(false)

  async function startTransition(update: () => void | Promise<void>): Promise<void> {
    if (!document.startViewTransition) {
      await update()
      return
    }

    isRunning.value = true

    const transition = document.startViewTransition(async () => {
      await update()
      await nextTick()
    })

    try {
      await transition.finished
    }
    finally {
      isRunning.value = false
    }
  }

  return {
    isRunning,
    startTransition,
  }
}
