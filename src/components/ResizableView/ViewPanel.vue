<script setup lang="ts">
import type { Panel, SplitPlacement, ViewTab } from './resizableView'
import { useMouseInElement } from '@vueuse/core'
import { computed, inject, nextTick, ref, useTemplateRef, watch } from 'vue'
import Card from '../Card/Card.vue'
import Tab from '../Tabs/Tab.vue'
import Tabs from '../Tabs/Tabs.vue'
import { RESIZABLE_VIEW_KEY } from './resizableView'

export type { Panel, ViewTab } from './resizableView'

/**
 * ViewPanel — one pane in the ResizableView grid.
 *
 * Renders a Card whose header is a Tabs bar and whose body is the active tab's
 * content area. It is both a drag SOURCE (tabs can be picked up) and a drag
 * TARGET with two independent drop zones:
 *
 *   ┌─────────────────────────────────┐
 *   │  [Tab A] [Tab B] [Tab C]        │  ← TABS DROP ZONE (reorder / move)
 *   ├─────────────────────────────────┤
 *   │         content area            │  ← CONTENT DROP ZONE
 *   │   (split overlay shown here)    │     left/right/top/bottom split,
 *   └─────────────────────────────────┘     center appends
 */

interface Props {
  panel: Panel
}

const props = defineProps<Props>()

defineSlots<{
  tab: (_props: { tab: ViewTab, panel: Panel }) => any
}>()

const context = inject(RESIZABLE_VIEW_KEY, null)

if (!context)
  throw new Error('[ViewPanel] must be rendered by <ResizableView />.')

/**
 * Path of the currently visible tab. Initialised to the first tab.
 */
const active = ref(props.panel.tabs[0]?.path ?? '')

// The active tab may have been moved away, fall back to the first one
watch(() => props.panel.tabs.map(tab => tab.path), (paths) => {
  if (!paths.includes(active.value))
    active.value = paths[0] ?? ''
})

//
// Tabs drop zone

const isTabsDraggedOver = ref(false)
const tabInsertIndex = ref(props.panel.tabs.length)

function onTabsDragEnter(event: DragEvent) {
  if (!context!.isDragging())
    return
  isTabsDraggedOver.value = true
  if (event.target === event.currentTarget)
    tabInsertIndex.value = props.panel.tabs.length
}

// Only resets once the drag truly leaves the container. relatedTarget is the
// element being entered next, null when leaving the window.
function onTabsDragLeave(event: DragEvent) {
  if (!(event.currentTarget as Element).contains(event.relatedTarget as Node)) {
    isTabsDraggedOver.value = false
    tabInsertIndex.value = props.panel.tabs.length
  }
}

function onTabItemDragEnter(event: DragEvent, index: number) {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  tabInsertIndex.value = event.clientX > rect.left + rect.width / 2 ? index + 1 : index
}

function handleTabDrop() {
  const insertIndex = tabInsertIndex.value
  isTabsDraggedOver.value = false
  tabInsertIndex.value = props.panel.tabs.length
  const tab = context!.dropOnTabs(props.panel.id!, insertIndex)
  if (tab)
    active.value = tab.path
}

//
// Content drop zone. Like the tabs bar, it uses relatedTarget instead of an
// enter / leave counter, which drifts with arbitrary slot content.

const isDraggedOver = ref(false)
const HOVER_OFFSET = 0.33

const content = useTemplateRef('contentRef')
const { elementX, elementY, elementWidth, elementHeight } = useMouseInElement(content, {
  handleOutside: false,
})

const hoverPosition = computed<SplitPlacement | 'center' | undefined>(() => {
  if (!elementX.value || !elementY.value || !elementWidth.value || !elementHeight.value)
    return undefined

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

function onContentDragEnter() {
  if (context!.isDragging())
    isDraggedOver.value = true
}

function onContentDragLeave(event: DragEvent) {
  if (!(event.currentTarget as Element).contains(event.relatedTarget as Node))
    isDraggedOver.value = false
}

function handleContentDrop() {
  isDraggedOver.value = false
  const tab = context!.dropOnContent(props.panel.id!, hoverPosition.value ?? 'center')
  if (tab)
    active.value = tab.path
}

function handleDragStart(index: number) {
  context!.startDrag(props.panel.id!, index)
}

// Cancelled drags (Escape, dropped elsewhere) must not leave any overlay behind
function handleDragEnd() {
  isDraggedOver.value = false
  isTabsDraggedOver.value = false
  context!.endDrag()
}

//
// Keyboard alternative to drag & drop

async function onTabKeydown(event: KeyboardEvent, index: number) {
  if (!event.altKey)
    return

  const tab = props.panel.tabs[index]
  const map: Record<string, SplitPlacement> = {
    ArrowLeft: 'left',
    ArrowRight: 'right',
    ArrowUp: 'top',
    ArrowDown: 'bottom',
  }

  if (event.shiftKey && map[event.key]) {
    event.preventDefault()
    context!.moveTab(props.panel.id!, index, map[event.key])
  }
  else if (!event.shiftKey && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
    event.preventDefault()
    context!.moveTab(props.panel.id!, index, event.key === 'ArrowLeft' ? 'previous' : 'next')
    // Keep focus on the moved tab
    await nextTick()
    document.querySelector<HTMLElement>(`.vui-tab[data-value="${CSS.escape(tab.path)}"]`)?.focus()
  }
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
            @dragstart="handleDragStart(index)"
            @dragend="handleDragEnd"
            @dragenter="onTabItemDragEnter($event, index)"
            @keydown="onTabKeydown($event, index)"
          >
            {{ tab.label ?? tab.path }}
          </Tab>
        </Tabs>
      </template>
      <div
        ref="contentRef"
        class="view-content"
        @dragenter="onContentDragEnter"
        @dragleave="onContentDragLeave"
        @dragover.prevent
        @drop.prevent="handleContentDrop()"
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
