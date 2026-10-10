import type { ComputedRef } from 'vue'
import { computed, getCurrentInstance, onUnmounted, ref, shallowRef } from 'vue'

interface LayerOptions {
  /**
   * Called when Escape is pressed while this is the top-most layer with an
   * Escape handler. Return `false` to let the next layer below handle it.
   *
   * Layers without a handler are skipped entirely, so passive layers (e.g. a
   * copy confirmation) never block dismissing the layer underneath.
   */
  onEscape?: () => void | boolean
}

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

interface LayerEntry {
  z: number
  options: LayerOptions
}

const BASE_Z = 600
const STEP = 10
const stack = shallowRef<LayerEntry[]>([])
let counter = BASE_Z

//
// Escape handling. A single listener serves every layer, so that Escape only
// ever dismisses the top-most layer instead of every open overlay at once.

let listening = false

function onKeydown(event: KeyboardEvent): void {
  if (event.key !== 'Escape' || event.defaultPrevented || event.isComposing)
    return

  for (let i = stack.value.length - 1; i >= 0; i--) {
    const { onEscape } = stack.value[i].options
    if (!onEscape)
      continue

    if (onEscape() !== false) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
  }
}

function ensureListener(): void {
  if (listening || typeof document === 'undefined')
    return

  listening = true
  document.addEventListener('keydown', onKeydown)
}

function claim(options: LayerOptions): number {
  ensureListener()
  counter += STEP
  stack.value = [...stack.value, { z: counter, options }]
  return counter
}

function release(z: number): void {
  stack.value = stack.value.filter(entry => entry.z !== z)

  if (stack.value.length === 0) {
    counter = BASE_Z
  }
}

export function isTopLayer(z: number): boolean {
  return stack.value.length > 0 && stack.value.at(-1)?.z === z
}

/**
 * Provides a reactive z-index that participates in the global layer stack.
 * Each floating element (Modal, Sheet, Popout, Tooltip, …) should call this
 * composable and invoke `open()` when it becomes visible and `close()` when
 * it hides.  The layer is automatically released when the component unmounts.
 */
export function useLayer(options: LayerOptions = {}): UseLayer {
  const claimed = ref<number | null>(null)

  function openLayer(): void {
    // Never claim during SSR, layers are released on unmount which never
    // happens on the server and would leak between requests
    if (claimed.value !== null || typeof window === 'undefined')
      return
    claimed.value = claim(options)
  }

  function closeLayer(): void {
    if (claimed.value === null)
      return
    release(claimed.value)
    claimed.value = null
  }

  if (getCurrentInstance()) {
    onUnmounted(() => {
      closeLayer()
    })
  }

  const layerIndex = computed(() => claimed.value ?? BASE_Z)

  const layerPostition = computed(() => {
    if (claimed.value === null)
      return 0
    const idx = stack.value.findIndex(entry => entry.z === claimed.value)
    // Bottom layer is 0, layers above it increment
    return idx === -1 ? 0 : idx
  })

  return {
    layerPostition,
    layerIndex,
    openLayer,
    closeLayer,
  }
}
