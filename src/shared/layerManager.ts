import type { ComputedRef } from 'vue'
import { computed, onUnmounted, ref } from 'vue'

interface UseLayer {
  /**
   * The z-index of the layer.
   */
  layerIndex: ComputedRef<number>
  /**
   * The number of the layer in the global stack. Bottom layer is 0, additional layers increment upward
   */
  layerPostition: ComputedRef<number>
  /**
   * Opens the layer, claiming a z-index from the global stack.
   */
  openLayer: () => void
  /**
   * Closes the layer, releasing its z-index back to the global stack.
   */
  closeLayer: () => void
}

const BASE_Z = 600
const STEP = 10
const stack = ref<number[]>([])
let counter = BASE_Z

function claim(): number {
  counter += STEP
  stack.value.push(counter)
  return counter
}

function release(z: number): void {
  const idx = stack.value.lastIndexOf(z)

  if (idx !== -1) {
    stack.value.splice(idx, 1)
  }

  if (stack.value.length === 0) {
    counter = BASE_Z
  }
}

export function isTopLayer(z: number): boolean {
  return stack.value.length > 0 && stack.value.at(-1) === z
}

/**
 * Provides a reactive z-index that participates in the global layer stack.
 * Each floating element (Modal, Sheet, Popout, Tooltip, …) should call this
 * composable and invoke `open()` when it becomes visible and `close()` when
 * it hides.  The layer is automatically released when the component unmounts.
 */
export function useLayer(): UseLayer {
  const claimed = ref<number | null>(null)

  function openLayer(): void {
    if (claimed.value !== null)
      return
    claimed.value = claim()
  }

  function closeLayer(): void {
    if (claimed.value === null)
      return
    release(claimed.value)
    claimed.value = null
  }

  onUnmounted(() => {
    closeLayer()
  })

  const layerIndex = computed(() => claimed.value ?? BASE_Z)

  const layerPostition = computed(() => {
    if (claimed.value === null)
      return 0
    const idx = stack.value.lastIndexOf(claimed.value)
    if (idx === -1)
      return 0
    // Bottom layer is 0, layers above it increment
    return idx
  })

  return {
    layerPostition,
    layerIndex,
    openLayer,
    closeLayer,
  }
}
