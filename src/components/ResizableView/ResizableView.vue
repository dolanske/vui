<script setup lang="ts">
import type { Panel, SplitPlacement, ViewNode, ViewTab } from './resizableView'
import { provide, ref, watch } from 'vue'
import {
  cloneTree,
  collapseTree,
  createPanelId,
  findPanel,
  hasMissingIds,
  insertSplit,
  removePanel,
  RESIZABLE_VIEW_KEY,
} from './resizableView'
import ResizableViewNode from './ResizableViewNode.vue'
import './resizable-view.scss'

export type { Panel, ViewNode, ViewTab } from './resizableView'

/**
 * ResizableView — a VSCode-like multi-panel editor layout.
 *
 * `views` is a tree. Panels are leaves holding tabs, arrays are groups which
 * alternate direction by depth (horizontal, vertical, horizontal, …).
 *
 *   views = [
 *     panelA,                        // full-width single panel
 *     [ panelB, panelC ],            // vertical split: B above C
 *     [ [ panelD, panelE ], panelF ] // vertical: (D|E horizontal) above F
 *   ]
 *
 * Tabs can be moved by dragging them onto another tab bar (reorder / move) or
 * onto a panel's content (split left/right/top/bottom or append). Keyboard:
 * with a tab focused, Alt+ArrowLeft / Alt+ArrowRight reorder it and
 * Alt+Shift+Arrow moves it into a new split on that side.
 *
 * The model is never mutated in place. Every change works on a copy which is
 * emitted through `update:modelValue`.
 */

defineSlots<{
  tab: (_props: { tab: ViewTab | undefined, panel: Panel }) => any
}>()

const views = defineModel<ViewNode[]>({ default: () => [] })

// Every panel needs a stable id to be keyed by. Missing ids are assigned on a
// copy, which is then emitted.
watch(views, (value) => {
  if (hasMissingIds(value))
    views.value = cloneTree(value)
}, { immediate: true })

/**
 * Applies a change to a copy of the tree, cleans the tree up and emits it
 */
function update(mutate: (_tree: ViewNode[]) => void) {
  const tree = cloneTree(views.value)
  mutate(tree)
  collapseTree(tree)
  views.value = tree
}

const dragState = ref<{ panelId: string, tabIndex: number } | null>(null)

function takeTab(tree: ViewNode[], panelId: string, tabIndex: number): { panel: Panel, tab: ViewTab } | null {
  const panel = findPanel(tree, panelId)
  const tab = panel?.tabs.splice(tabIndex, 1)[0]
  return panel && tab ? { panel, tab } : null
}

function dropOnTabs(toPanelId: string, insertIndex: number): ViewTab | null {
  const state = dragState.value
  dragState.value = null
  if (!state)
    return null

  let moved: ViewTab | null = null

  update((tree) => {
    const taken = takeTab(tree, state.panelId, state.tabIndex)
    const target = findPanel(tree, toPanelId)
    if (!taken || !target)
      return

    // Removing the tab shifts the following indexes of the same panel
    let index = insertIndex
    if (state.panelId === toPanelId && state.tabIndex < insertIndex)
      index--

    target.tabs.splice(index, 0, taken.tab)
    moved = taken.tab

    if (taken.panel.tabs.length === 0)
      removePanel(tree, taken.panel.id!)
  })

  return moved
}

function dropOnContent(toPanelId: string, placement: SplitPlacement | 'center'): ViewTab | null {
  if (placement === 'center') {
    const panel = findPanel(views.value, toPanelId)
    return dropOnTabs(toPanelId, panel?.tabs.length ?? 0)
  }

  const state = dragState.value
  dragState.value = null
  if (!state)
    return null

  let moved: ViewTab | null = null

  update((tree) => {
    const source = findPanel(tree, state.panelId)
    // Splitting a panel with its own only tab would leave nothing behind
    if (!source || (state.panelId === toPanelId && source.tabs.length <= 1))
      return

    const taken = takeTab(tree, state.panelId, state.tabIndex)
    if (!taken)
      return

    insertSplit(tree, toPanelId, { id: createPanelId(), tabs: [taken.tab] }, placement)
    moved = taken.tab

    if (taken.panel.tabs.length === 0)
      removePanel(tree, taken.panel.id!)
  })

  return moved
}

function moveTab(panelId: string, tabIndex: number, target: 'previous' | 'next' | SplitPlacement) {
  if (target === 'previous' || target === 'next') {
    const panel = findPanel(views.value, panelId)
    if (!panel)
      return
    const next = tabIndex + (target === 'next' ? 1 : -1)
    if (next < 0 || next >= panel.tabs.length)
      return

    update((tree) => {
      const copy = findPanel(tree, panelId)!
      const [tab] = copy.tabs.splice(tabIndex, 1)
      copy.tabs.splice(next, 0, tab)
    })
    return
  }

  dragState.value = { panelId, tabIndex }
  dropOnContent(panelId, target)
}

provide(RESIZABLE_VIEW_KEY, {
  startDrag: (panelId, tabIndex) => {
    dragState.value = { panelId, tabIndex }
  },
  endDrag: () => {
    dragState.value = null
  },
  isDragging: () => dragState.value !== null,
  dropOnTabs,
  dropOnContent,
  moveTab,
})
</script>

<template>
  <ResizableViewNode :nodes="views" :depth="1">
    <template #tab="slotProps">
      <slot name="tab" v-bind="slotProps" />
    </template>
  </ResizableViewNode>
</template>
