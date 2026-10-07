<script setup lang="ts">
import { useElementBounding, useStorage } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref, useId, useTemplateRef, watch } from 'vue'
import { clamp } from '../../lib/helpers'
import { useTopLevelSlots } from '../../lib/slots'
import './resizable.scss'

export interface ResizablePanelOptions {
  /**
   * Minimum size in pixels, overrides `minSize` for this panel
   */
  minSize?: number
  /**
   * Maximum size in pixels
   */
  maxSize?: number
}

interface Props {
  /**
   * Enable vertical layout
   */
  vertical?: boolean
  /**
   * If provided, it enables local persistence of panel sizes
   */
  storageKey?: string
  /**
   * Hides resizable handles unless hovered.
   */
  hideHandles?: boolean
  /**
   * Minimum size (in pixels) each panel can be resized to. Applies to
   * every panel and is enforced along the active axis (width for
   * horizontal layouts, height for vertical ones).
   */
  minSize?: number
  /**
   * Per panel limits, in the same order as the panels
   */
  panels?: ResizablePanelOptions[]
  /**
   * Accessible label of the resize handles
   */
  handleLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  handleLabel: 'Resize',
})

const slots = defineSlots<{
  default: () => any
}>()

/**
 * Panel sizes in percent, in the same order as the panels
 */
const sizesModel = defineModel<number[]>('sizes')

const root = useTemplateRef('resizableRef')
const panels = useTopLevelSlots(slots)
const id = useId()

interface PanelState {
  size: number
  isResizing: boolean
}

const panelState = props.storageKey
  ? useStorage<PanelState[]>(props.storageKey, [])
  : ref<PanelState[]>([])

const { width, height } = useElementBounding(root)

// The axis the panels are laid out along. Deltas are converted to a
// percentage of this size, so vertical layouts must use height.
const axisSize = computed(() => (props.vertical ? height.value : width.value))

function toPercent(px: number | undefined): number | undefined {
  if (px === undefined || !axisSize.value)
    return undefined
  return (px / axisSize.value) * 100
}

function minPercent(index: number): number {
  return toPercent(props.panels?.[index]?.minSize ?? props.minSize) ?? 0
}

function maxPercent(index: number): number {
  return toPercent(props.panels?.[index]?.maxSize) ?? 100
}

function emitSizes() {
  sizesModel.value = panelState.value.map(panel => panel.size)
}

// Set initial panel sizes on mount or when panels change. The watcher starts
// after mount so the slot is first rendered by the template, not in setup.
// Until then (and during SSR) panels render with equal sizes.
onMounted(() => {
  watch(panels, (items) => {
    // If numbers of panels is the same as the stored state, do nothing (e.g. on remount)
    if (panelState.value.length === items.length)
      return

    const fromModel = sizesModel.value?.length === items.length ? sizesModel.value : null
    panelState.value = items.map((_, index) => ({
      size: fromModel?.[index] ?? 100 / items.length,
      isResizing: false,
    }))
  }, { immediate: true })
})

// Sizes set from the outside
watch(sizesModel, (sizes) => {
  if (!sizes || sizes.length !== panelState.value.length)
    return
  sizes.forEach((size, index) => {
    panelState.value[index].size = size
  })
})

function applyResize(index: number, deltaSize: number, baseSize: number, nextBaseSize: number) {
  // Resizing only ever moves space between a panel and its neighbour, so
  // their combined size is constant. Clamp within that pair while keeping
  // both panels within their limits.
  const pairSize = baseSize + nextBaseSize
  const lower = Math.max(minPercent(index), pairSize - maxPercent(index + 1))
  const upper = Math.min(maxPercent(index), pairSize - minPercent(index + 1))

  // Not enough room to honour every limit: leave as-is.
  if (lower > upper)
    return

  const newSize = clamp(lower, upper, baseSize + deltaSize)
  panelState.value[index].size = newSize
  panelState.value[index + 1].size = pairSize - newSize
}

//
// Pointer dragging (mouse, touch & pen). The pointer is captured by the
// handle, so moves are received even outside of it and nothing needs to be
// attached to the window.

const activeHandle = ref<number | null>(null)
let dragStart: { pos: number, size: number, nextSize: number } | null = null

function onHandlePointerDown(event: PointerEvent, index: number) {
  if (event.pointerType === 'mouse' && event.button !== 0)
    return

  event.preventDefault()
  const handle = event.currentTarget as HTMLElement
  handle.setPointerCapture?.(event.pointerId)
  handle.focus({ preventScroll: true })

  activeHandle.value = index
  panelState.value[index].isResizing = true
  dragStart = {
    pos: props.vertical ? event.clientY : event.clientX,
    size: panelState.value[index].size,
    nextSize: panelState.value[index + 1].size,
  }
}

function onHandlePointerMove(event: PointerEvent, index: number) {
  if (activeHandle.value !== index || !dragStart || !axisSize.value)
    return

  const delta = (props.vertical ? event.clientY : event.clientX) - dragStart.pos
  applyResize(index, (delta / axisSize.value) * 100, dragStart.size, dragStart.nextSize)
}

function endDrag(event?: PointerEvent) {
  if (activeHandle.value === null)
    return

  if (event)
    (event.currentTarget as HTMLElement).releasePointerCapture?.(event.pointerId)

  if (panelState.value[activeHandle.value])
    panelState.value[activeHandle.value].isResizing = false
  activeHandle.value = null
  dragStart = null
  emitSizes()
}

onUnmounted(() => endDrag())

// Controls via keyboard when handle is focused
function onHandleKeydown(event: KeyboardEvent, index: number) {
  const decrease = props.vertical ? 'ArrowUp' : 'ArrowLeft'
  const increase = props.vertical ? 'ArrowDown' : 'ArrowRight'
  const RESIZE_STEP = 5
  const current = panelState.value[index].size
  const next = panelState.value[index + 1].size

  let delta: number | null = null
  if (event.key === decrease)
    delta = -RESIZE_STEP
  else if (event.key === increase)
    delta = RESIZE_STEP
  else if (event.key === 'Home')
    delta = -current
  else if (event.key === 'End')
    delta = next

  if (delta === null)
    return

  event.preventDefault()
  applyResize(index, delta, current, next)
  emitSizes()
}

// Reset to default size on double click
function resetSize(index: number) {
  // Get width of both current and the next panel.
  const current = panelState.value[index]
  const next = panelState.value[index + 1]

  // Set their width so they're both equal
  const newSize = (current.size + next.size) / 2
  panelState.value[index].size = newSize
  panelState.value[index + 1].size = newSize
  emitSizes()
}

const panelId = (index: number) => `${id}-panel-${index}`
</script>

<template>
  <div
    ref="resizableRef"
    class="vui-resizable"
    :class="{
      'vertical': props.vertical,
      'hide-handles': props.hideHandles,
      'is-resizing': activeHandle !== null,
    }"
  >
    <template v-for="(panel, index) in panels" :key="panel.key ?? index">
      <div
        :id="panelId(index)"
        class="vui-resizable-panel"
        :style="{
          flex: `${panelState[index]?.size ?? 100 / panels.length} 1 0px`,
        }"
      >
        <Component :is="panel" />
      </div>
      <!-- A focusable separator is the ARIA pattern for splitters -->
      <div
        v-if="index < panels.length - 1"
        class="vui-resizable-handle"
        role="separator"
        tabindex="0"
        :aria-orientation="props.vertical ? 'horizontal' : 'vertical'"
        :aria-label="props.handleLabel"
        :aria-controls="panelId(index)"
        :aria-valuenow="Math.round(panelState[index]?.size ?? 100 / panels.length)"
        aria-valuemin="0"
        aria-valuemax="100"
        @pointerdown="onHandlePointerDown($event, index)"
        @pointermove="onHandlePointerMove($event, index)"
        @pointerup="endDrag($event)"
        @pointercancel="endDrag($event)"
        @keydown="onHandleKeydown($event, index)"
        @dblclick="resetSize(index)"
      />
    </template>
  </div>
</template>
