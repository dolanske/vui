<script setup lang="ts">
import { useElementBounding, useEventListener, useStorage } from '@vueuse/core'
import { computed, ref, useTemplateRef, watch } from 'vue'
import { clamp } from '../../shared/helpers'
import { useTopLevelSlots } from '../../shared/slots'
import './resizable.scss'

// TODO / REVIEW
// Support for `Panel.vue` and prop handling (maybe not needed?)

// Need to be able to get current resizable sizes etc via v-model so that components like ResizableView can handle/persist them

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
}

interface PanelProps {
  minWidth: number
  maxWidth: number
}

const props = defineProps<Props>()
const slots = defineSlots<{
  default: (props: PanelProps) => any
}>()

const root = useTemplateRef('resizableRef')
const panels = useTopLevelSlots(slots.default)

interface PanelState {
  size: number
  isResizing: boolean
}

const focusedPanelIndex = ref(-1)

const panelState = props.storageKey
  ? useStorage<PanelState[]>(props.storageKey, [])
  : ref<PanelState[]>([])

const { left, right, width, height, top, bottom } = useElementBounding(root)

// The axis the panels are laid out along. Deltas are converted to a
// percentage of this size, so vertical layouts must use height.
const axisSize = computed(() => (props.vertical ? height.value : width.value))

// Convert the pixel `minSize` into a percentage of the current axis so it
// can be compared against the percentage-based panel sizes.
const minSizePercent = computed(() => {
  if (!props.minSize || !axisSize.value)
    return 0

  return (props.minSize / axisSize.value) * 100
})

// Set initial panel sizes on mount or when panels change
watch(panels, (items) => {
  // If numbers of panels is the same as the stored state, do nothing (e.g. on remount)
  if (panelState.value.length === items.length)
    return

  panelState.value = items.map(() => ({
    size: 100 / items.length,
    isResizing: false,
  }))
}, { immediate: true })

// Returns the index of the currently focused handle
function getFocusedHandle(event: MouseEvent | KeyboardEvent) {
  const handle = (event.target as HTMLElement).closest('.vui-resizable-handle')
  if (!handle)
    return

  if (handle.closest('.vui-resizable') !== root.value)
    return

  return Number(handle.getAttributeNode('data-handle-index')?.value)
}

function applyResize(index: number, deltaSize: number, baseSize: number, nextBaseSize: number) {
  // Resizing only ever moves space between a panel and its neighbour, so
  // their combined size is constant. Clamp within that pair while keeping
  // both panels above the minimum size.
  const pairSize = baseSize + nextBaseSize
  const min = minSizePercent.value

  // Not enough room for both panels to honour the minimum: leave as-is.
  if (min * 2 > pairSize)
    return

  const newSize = clamp(min, pairSize - min, baseSize + deltaSize)
  panelState.value[index].size = newSize
  panelState.value[index + 1].size = pairSize - newSize
}

// Controls via mouse drag
useEventListener(root, 'mousedown', (event) => {
  const index = getFocusedHandle(event)

  if (index === undefined)
    return

  panelState.value[index].isResizing = true

  const startPos = clamp(
    props.vertical ? top.value : left.value,
    props.vertical ? bottom.value : right.value,
    props.vertical ? event.clientY : event.clientX,
  )

  const startSize = panelState.value[index].size
  const nextStartSize = panelState.value[index + 1].size

  const onMouseMove = (event: MouseEvent) => {
    const clampedClientPos = clamp(
      props.vertical ? top.value : left.value,
      props.vertical ? bottom.value : right.value,
      props.vertical ? event.clientY : event.clientX,
    )

    const delta = clampedClientPos - startPos

    if (!axisSize.value)
      return

    applyResize(index, (delta / axisSize.value) * 100, startSize, nextStartSize)
  }

  const onMouseUp = () => {
    panelState.value[index].isResizing = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
})

// Controls via keyboard when handle is focused
useEventListener(root, 'keydown', (event) => {
  const index = getFocusedHandle(event)

  if (index === undefined)
    return

  // Control with arrow keys: left/right for horizontal, up/down for vertical but not at once
  if (((event.key === 'ArrowLeft' || event.key === 'ArrowRight') && !props.vertical) || ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && props.vertical)) {
    event.preventDefault()
    const RESIZE_STEP = 5
    const delta = (event.key === 'ArrowLeft' || event.key === 'ArrowUp') ? -RESIZE_STEP : RESIZE_STEP
    applyResize(index, delta, panelState.value[index].size, panelState.value[index + 1].size)
  }
})

// Reset to default size on double click
function resetSize(index: number) {
  // Get width of both current and the next panel.
  const current = panelState.value[index]
  const next = panelState.value[index + 1]

  // Set their width so they're both equal
  const newSize = (current.size + next.size) / 2
  panelState.value[index].size = newSize
  panelState.value[index + 1].size = newSize
}
</script>

<template>
  <div
    ref="resizableRef"
    class="vui-resizable"
    :class="{
      'vertical': props.vertical,
      'hide-handles': props.hideHandles,
    }"
  >
    <template v-for="(panel, index) in panels" :key="panel.key">
      <div
        class="vui-resizable-panel"
        :style="{
          flex: `${panelState[index].size} 1 0px`,
          pointerEvents: panelState[index].isResizing ? 'none' : 'auto',
        }"
      >
        <Component :is="panel" />
      </div>
      <button
        v-if="index < panels.length - 1"
        :data-handle-index="index"
        class="vui-resizable-handle"
        @dblclick="resetSize(index)"
        @focus="focusedPanelIndex = index"
        @blur="focusedPanelIndex = -1"
      />
    </template>
  </div>
</template>
