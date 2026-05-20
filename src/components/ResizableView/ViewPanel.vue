<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'
import { computed, inject, ref, useTemplateRef } from 'vue'
import Card from '../Card/Card.vue'
import Tab from '../Tabs/Tab.vue'
import Tabs from '../Tabs/Tabs.vue'

/**
 * ViewPanel — one pane in the ResizableView grid.
 *
 * Renders a Card whose header is a Tabs bar and whose body is the active tab's
 * content area. It is both a drag SOURCE (tabs can be picked up) and a drag
 * TARGET with two independent drop zones:
 *
 *   ┌─────────────────────────────────┐
 *   │  [Tab A] [Tab B] [Tab C]        │  ← TABS DROP ZONE
 *   ├─────────────────────────────────┤
 *   │                                 │
 *   │         content area            │  ← CONTENT DROP ZONE
 *   │   (split overlay shown here)    │
 *   │                                 │
 *   └─────────────────────────────────┘
 *
 * TABS DROP ZONE
 *   Dropping here reorders tabs or moves a tab from another panel.
 *   A thin 2 px bar (::before / ::after pseudo-element on the neighbouring Tab)
 *   previews the insertion slot. The slot is determined by which horizontal half
 *   of each Tab the cursor is over (left-half → insert before, right-half →
 *   insert after). The dropped tab becomes active only for cross-panel drops.
 *
 * CONTENT DROP ZONE
 *   A semi-transparent overlay divides the content area into five zones using
 *   `HOVER_OFFSET` (33 %) margins:
 *
 *     ┌──────┬──────────┬──────┐
 *     │      │   top    │      │
 *     │ left │  center  │ right│
 *     │      │  bottom  │      │
 *     └──────┴──────────┴──────┘
 *
 *   center → append tab to this panel (no split)
 *   left/right/top/bottom → split the panel and place a new panel on that side
 */

export interface ViewTab {
  path: string
  label?: string
}

export interface Panel {
  /** Stable unique ID assigned by ResizableView on first render. Used as v-for key. */
  id?: string
  tabs: ViewTab[]
}

interface Props {
  panel: Panel
}

const props = defineProps<Props>()

defineSlots<{
  tab: (props: { tab: ViewTab, panel: Panel }) => any
}>()

/**
 * Path of the currently visible tab. Initialised to the first tab.
 */
const active = ref(props.panel.tabs[0]?.path ?? '')

/**
 * Whether something is currently being dragged over the Tabs bar.
 * Drives the visibility of the insertion indicator (drop-before / drop-after).
 *
 * Using a boolean + relatedTarget check (instead of an enter/leave counter) is
 * more reliable: dragleave fires for every child-to-child transition inside the
 * Tabs container, which makes a naïve counter drift. With relatedTarget we only
 * clear the flag when the drag truly leaves the Tabs container entirely.
 */
const isTabsDraggedOver = ref(false)

/**
 * Index at which the dragged tab will be inserted into `panel.tabs`.
 * Range: 0 … panel.tabs.length (inclusive — length = append at the end).
 * Defaults to the end so a plain drop on the Tabs container appends.
 */
const tabInsertIndex = ref(props.panel.tabs.length)

/**
 * Fired when the drag enters anywhere inside the Tabs container (bubbles from
 * child Tab elements too). Sets the drag-over flag and, when the cursor is over
 * the container's own empty space (target === currentTarget), moves the
 * insertion slot to the end.
 */
function onTabsDragEnter(event: DragEvent) {
  isTabsDraggedOver.value = true
  if (event.target === event.currentTarget)
    tabInsertIndex.value = props.panel.tabs.length
}

/**
 * Fired on every dragleave inside the Tabs container. Only clears the flag
 * when the drag truly exits the Tabs container: `relatedTarget` (the element
 * being entered next) must be outside the container. This handles:
 *   • cursor moving between sibling Tab buttons → relatedTarget is still inside → no-op
 *   • cursor leaving the Tabs bar entirely      → relatedTarget is outside → reset
 *   • cursor leaving the browser window         → relatedTarget is null   → reset
 */
function onTabsDragLeave(event: DragEvent) {
  if (!(event.currentTarget as Element).contains(event.relatedTarget as Node)) {
    isTabsDraggedOver.value = false
    tabInsertIndex.value = props.panel.tabs.length
  }
}

/**
 * Fired when the drag enters a specific Tab button. Uses the cursor's X
 * position relative to the tab's bounding rect to decide whether to insert
 * BEFORE (left half) or AFTER (right half) that tab.
 *
 * Using event.clientX + getBoundingClientRect() rather than event.offsetX is
 * intentional: offsetX is relative to event.target, which may be a child
 * element (icon, text span) rather than the Tab button itself, giving wrong
 * measurements. clientX is always the absolute viewport position.
 */
function onTabItemDragEnter(event: DragEvent, index: number) {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  tabInsertIndex.value = event.clientX > rect.left + rect.width / 2 ? index + 1 : index
}

/**
 * Counter-based approach for the content area (simpler here because the
 * content div has no interactive children that generate spurious enter/leave
 * pairs during a typical drag path).
 */
const dragCounter = ref(0)
const isDraggedOver = computed(() => dragCounter.value > 0)

const HOVER_OFFSET = 0.33

const content = useTemplateRef('contentRef')
const { elementX, elementY, elementWidth, elementHeight } = useMouseInElement(content, {
  handleOutside: false,
})

/**
 * Maps the cursor position within the content area to one of five zones.
 * Returns undefined while the mouse is outside (useMouseInElement reports 0s).
 *
 * The zones are evaluated in order: left → right → top → bottom → center.
 * center is the fallback when none of the edge conditions are met.
 */
const hoverPosition = computed(() => {
  if (!elementX.value || !elementY.value || !elementWidth.value || !elementHeight.value)
    return

  if (elementX.value < elementWidth.value * HOVER_OFFSET)
    return 'left'
  else if (elementX.value > elementWidth.value * (1 - HOVER_OFFSET))
    return 'right'
  else if (elementY.value < elementHeight.value * HOVER_OFFSET)
    return 'top'
  else if (elementY.value > elementHeight.value * (1 - HOVER_OFFSET))
    return 'bottom'
  return 'center'
})

const { startDrag, handleDrag, handleSplit, peekDragTab, isDragFromPanel } = inject('$vrp') as {
  startDrag: (panel: Panel, tabIndex: number) => void
  handleDrag: (toPanel: Panel, insertIndex: number) => void
  handleSplit: (toPanel: Panel, placement: 'left' | 'right' | 'top' | 'bottom') => void
  peekDragTab: () => ViewTab | null
  isDragFromPanel: (panel: Panel) => boolean
}

/**
 * Registers this panel + tab index as the drag source.
 */
function handleDragStart(_event: DragEvent, index: number) {
  startDrag(props.panel, index)
}

/**
 * Handles a drop on the tabs bar.
 * Reads the dragged tab's path BEFORE calling handleDrag (which resets
 * dragState), then updates `active` only for cross-panel drops — for
 * same-panel reorders the tab was already active (or intentionally not).
 */
function handleTabDrop() {
  const insertIndex = tabInsertIndex.value
  const tab = peekDragTab()
  const isSamePanel = isDragFromPanel(props.panel)
  isTabsDraggedOver.value = false
  tabInsertIndex.value = props.panel.tabs.length
  handleDrag(props.panel, insertIndex)
  if (tab && !isSamePanel)
    active.value = tab.path
}

/**
 * Handles a drop on the content area.
 * center → append the tab to this panel (no structural change).
 * left/right/top/bottom → delegate to handleSplit which mutates the tree.
 * After either operation the dropped tab is activated.
 */
function handleDragDrop() {
  dragCounter.value = 0
  const tab = peekDragTab()
  const position = hoverPosition.value

  if (!position || position === 'center') {
    handleDrag(props.panel, props.panel.tabs.length)
  }
  else {
    handleSplit(props.panel, position)
  }

  if (tab)
    active.value = tab.path
}

const activeTab = computed(() => props.panel.tabs.find(t => t.path === active.value))
</script>

<template>
  <div class="view-wrap">
    <Card :padding="false" header-separator>
      <template #header>
        <Tabs
          v-model="active"
          variant="filled"
          @dragenter="onTabsDragEnter($event)"
          @dragleave="onTabsDragLeave($event)"
          @dragover.prevent
          @drop.prevent="handleTabDrop()"
        >
          <Tab
            v-for="(tab, index) in panel.tabs"
            :key="tab.path"
            :value="tab.path"
            :draggable="true"
            :class="{
              'drop-before': isTabsDraggedOver && tabInsertIndex === index,
              'drop-after': isTabsDraggedOver && tabInsertIndex === panel.tabs.length && index === panel.tabs.length - 1,
            }"
            @dragstart="handleDragStart($event, index)"
            @dragenter="onTabItemDragEnter($event, index)"
          >
            {{ tab.label ?? tab.path }}
          </Tab>
        </Tabs>
      </template>
      <div
        ref="contentRef"
        class="view-content"
        @dragenter="dragCounter++"
        @dragleave="dragCounter--"
        @dragover.prevent
        @drop.prevent="handleDragDrop()"
      >
        <div
          v-show="isDraggedOver"
          class="view-drag-overlay"
          :class="`drag-${hoverPosition}`"
        />
        <slot v-if="activeTab" name="tab" :tab="activeTab" :panel="props.panel" />
      </div>
    </Card>
  </div>
</template>
