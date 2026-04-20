import type { Ref } from 'vue'
import { onUnmounted, ref } from 'vue'

interface UseLayer {
  layerIndex: Ref<number>
  openLayer: () => void
  closeLayer: () => void
}

const BASE_Z = 600
const STEP = 10
const stack: number[] = []
let counter = BASE_Z

function claim(): number {
  counter += STEP
  stack.push(counter)
  return counter
}

function release(z: number): void {
  const idx = stack.lastIndexOf(z)

  if (idx !== -1) {
    stack.splice(idx, 1)
  }

  if (stack.length === 0) {
    counter = BASE_Z
  }
}

export function isTopLayer(z: number): boolean {
  return stack.length > 0 && stack.at(-1) === z
}

/**
 * Provides a reactive z-index that participates in the global layer stack.
 * Each floating element (Modal, Sheet, Popout, Tooltip, …) should call this
 * composable and invoke `open()` when it becomes visible and `close()` when
 * it hides.  The layer is automatically released when the component unmounts.
 */
export function useLayer(): UseLayer {
  const layerIndex = ref<number>(BASE_Z)
  let claimed: number | null = null

  function openLayer(): void {
    if (claimed !== null)
      return
    claimed = claim()
    layerIndex.value = claimed
  }

  function closeLayer(): void {
    if (claimed === null)
      return
    release(claimed)
    claimed = null
  }

  onUnmounted(() => {
    closeLayer()
  })

  return {
    layerIndex,
    openLayer,
    closeLayer,
  }
}
