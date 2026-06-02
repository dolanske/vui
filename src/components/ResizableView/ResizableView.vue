<script setup lang="ts">
import type { Panel, ViewTab } from './ViewPanel.vue'
import { provide, ref, watch } from 'vue'
import Resizable from '../Resizable/Resizable.vue'
import ViewPanel from './ViewPanel.vue'
import './resizable-view.scss'

/**
 * ResizableView — a VSCode-like multi-panel editor layout.
 *
 * CONCEPTS
 * ─────────
 * Panel  — a leaf node: holds an ordered list of tabs, one of which is active.
 * Group  — an inner node: an array that contains Panels and/or nested Groups.
 *          Groups alternate direction by depth:
 *            depth 1 (views[])      → horizontal  <Resizable>
 *            depth 2 (item1[])      → vertical    <Resizable vertical>
 *            depth 3 (item2[])      → horizontal  <Resizable>
 *          Three levels of nesting therefore support h → v → h splits.
 *
 * TREE SHAPE
 * ──────────
 * `views` is a Level1Item[] whose elements are either a Panel (rendered
 * directly) or a Level2Item[] Group (rendered as a nested Resizable).
 *
 *   views = [
 *     panelA,                        // full-width single panel
 *     [ panelB, panelC ],            // vertical split: B above C
 *     [ [ panelD, panelE ], panelF ] // vertical: (D|E horizontal) above F
 *   ]
 *
 * DRAG & DROP
 * ───────────
 * Shared drag state (`dragState`) is stored here and injected into every
 * ViewPanel via provide/inject under the key '$vrp'. Each ViewPanel has two
 * independent drop zones:
 *
 *   Tabs bar  — reorders tabs; dropped tab becomes active in the target panel.
 *   Content   — splits the panel (left/right/top/bottom) or appends (center).
 */

type Level3Item = Panel
type Level2Item = Panel | Level3Item[]
type Level1Item = Panel | Level2Item[]

const slots = defineSlots<{
  tab: (props: { tab: ViewTab | undefined, panel: Panel }) => any
}>()

const views = defineModel<Level1Item[]>({ default: [] })

/**
 * Why stable IDs?
 * The naive approach keys Panels by their tab paths. But paths change as tabs
 * are dragged between panels — Vue then thinks a Panel component was destroyed
 * and a new one created, resetting local state (active tab, scroll position, …).
 *
 * Instead we assign a short numeric ID to each node once and never change it:
 *   • Panels: stored as `panel.id` (a plain property on the data object).
 *   • Groups: stored in a WeakMap keyed by the array object itself, because
 *     you cannot attach arbitrary properties to a plain array.
 *
 * IDs are assigned lazily by `ensureIds`, which is called:
 *   1. Immediately when the model value is first observed (watch + immediate).
 *   2. After every mutation (handleDrag / handleSplit) so newly created nodes
 *      get IDs before the next render.
 */
let _uid = 0
function uid() {
  return `${++_uid}`
}

/** WeakMap so Group array objects are the keys — no tree modification needed. */
const groupIds = new WeakMap<any[], string>()

/**
 * Returns a stable key for any node (Panel or Group array).
 * Used exclusively as the v-for :key in the template.
 */
function nodeKey(node: any): string {
  if (Array.isArray(node)) {
    if (!groupIds.has(node))
      groupIds.set(node, `g${uid()}`)
    return groupIds.get(node)!
  }
  return (node as Panel).id!
}

/**
 * Walks the tree and ensures every Panel and Group has a stable ID.
 * Idempotent — nodes that already have an ID are skipped.
 */
function ensureIds(nodes: any[]) {
  if (!groupIds.has(nodes))
    groupIds.set(nodes, `g${uid()}`)
  for (const node of nodes) {
    if (Array.isArray(node))
      ensureIds(node)
    else if (!(node as Panel).id)
      (node as Panel).id = `p${uid()}`
  }
}

// Assign IDs on initial load and whenever the parent replaces the model value.
watch(views, val => ensureIds(val), { immediate: true })

/**
 * Removes `target` Panel from the tree by reference. Walks depth-first and
 * splices it out when found. Any ancestor Group that becomes empty is also
 * removed so the tree never has dangling empty arrays.
 * Returns true once found so the recursion short-circuits.
 */
function removePanelFromTree(target: Panel, nodes: any[] = views.value): boolean {
  for (let i = 0; i < nodes.length; i++) {
    if (Array.isArray(nodes[i])) {
      if (removePanelFromTree(target, nodes[i])) {
        if (nodes[i].length === 0)
          nodes.splice(i, 1)
        return true
      }
    }
    else if (nodes[i] === target) {
      nodes.splice(i, 1)
      return true
    }
  }
  return false
}

/**
 * Collapses redundant single-child Groups after any tree mutation.
 *
 * WHY: dragging a panel's last sibling away leaves a Group with one child,
 * e.g. `[[panel]]`. That wrapper is meaningless and adds an extra Resizable.
 *
 * HOW: post-order (children first). If a Group has exactly one child, it is
 * replaced in-place by that child. After the splice `i` is decremented so the
 * same slot is re-examined — the replacement might itself be collapsible.
 *
 * Groups with ≥ 2 children are never touched, preserving split orientations.
 *
 * Example:  [[[panel]]]  →  collapses twice  →  [panel]
 */
function collapseTree(nodes: any[] = views.value) {
  for (let i = 0; i < nodes.length; i++) {
    if (Array.isArray(nodes[i])) {
      collapseTree(nodes[i]) // process children first (post-order)
      if (nodes[i].length === 1) {
        nodes.splice(i, 1, nodes[i][0]) // unwrap the single-child group
        i-- // recheck same slot after replacement
      }
    }
  }
}

/**
 * Returns the nesting depth of `target` within the `views` tree.
 *   depth 1 → direct child of views  (horizontal axis)
 *   depth 2 → inside a Level1 group  (vertical axis)
 *   depth 3 → inside a Level2 group  (horizontal axis)
 * Returns -1 if not found.
 */
function getDepth(target: any[], nodes: any[] = views.value, depth = 1): number {
  if (nodes === target)
    return depth
  for (const node of nodes) {
    if (Array.isArray(node)) {
      const found = getDepth(target, node, depth + 1)
      if (found !== -1)
        return found
    }
  }
  return -1
}

/**
 * Lives for the duration of one drag gesture. Set on dragstart, consumed
 * (reset to null) the moment the drop is processed.
 */
const dragState = ref<{ panel: Panel, tabIndex: number } | null>(null)

// Called by the source ViewPanel's dragstart handler.
function startDrag(panel: Panel, tabIndex: number) {
  dragState.value = { panel, tabIndex }
}

/**
 * Moves the dragged tab into `toPanel` at `insertIndex` (tabs-bar drop).
 *
 * 1. Splice the tab out of the source panel.
 * 2. Adjust insertIndex for same-panel reorders: removing the source tab shifts
 *    every subsequent index left by one, so the intended visual slot is one
 *    position lower when the source was before the destination.
 * 3. Splice the tab into the target panel at the adjusted index.
 * 4. Remove the source panel if it became empty, then collapse the tree.
 */
function handleDrag(toPanel: Panel, insertIndex: number) {
  if (!dragState.value)
    return

  const { panel: fromPanel, tabIndex: fromTabIndex } = dragState.value
  dragState.value = null

  const [tab] = fromPanel.tabs.splice(fromTabIndex, 1)
  if (!tab)
    return

  if (fromPanel === toPanel && fromTabIndex < insertIndex)
    insertIndex--

  toPanel.tabs.splice(insertIndex, 0, tab)

  if (fromPanel.tabs.length === 0)
    removePanelFromTree(fromPanel)

  collapseTree()

  // assign IDs to any nodes touched by the mutation
  ensureIds(views.value)
}

/**
 * Splits the view by inserting a new Panel next to `toPanel` (content drop).
 *
 * HOW THE TREE IS MUTATED
 * ───────────────────────
 * Each Group has an axis determined by its depth (see getDepth). A split is
 * either horizontal (left/right) or vertical (top/bottom).
 *
 *   Case A — parent axis matches split axis:
 *     Just splice the new panel into the parent array before or after `toPanel`.
 *     e.g. existing horizontal group [A, B], split A right → [A, newPanel, B]
 *
 *   Case B — parent axis is perpendicular to split axis:
 *     Wrap `toPanel` and `newPanel` together in a new Group of the needed axis.
 *     e.g. existing vertical group [A, B], split A right (needs horiz):
 *       replace A with [A, newPanel] → [[A, newPanel], B]
 *
 * left/top   → new panel is inserted BEFORE toPanel
 * right/bottom → new panel is inserted AFTER  toPanel
 */
function handleSplit(toPanel: Panel, placement: 'left' | 'right' | 'top' | 'bottom') {
  if (!dragState.value)
    return

  const { panel: fromPanel, tabIndex: fromTabIndex } = dragState.value
  dragState.value = null

  const [tab] = fromPanel.tabs.splice(fromTabIndex, 1)
  if (!tab)
    return

  const newPanel: Panel = { tabs: [tab] }

  function insertSplit(nodes: any[]): boolean {
    for (let i = 0; i < nodes.length; i++) {
      if (Array.isArray(nodes[i])) {
        if (insertSplit(nodes[i]))
          return true
      }
      else if (nodes[i] === toPanel) {
        const isHorizontal = placement === 'left' || placement === 'right'
        const before = placement === 'left' || placement === 'top'
        // Odd depth = horizontal axis; even depth = vertical axis
        const parentIsHorizontal = getDepth(nodes) % 2 === 1

        if (isHorizontal === parentIsHorizontal) {
          // Case A: same axis — insert inline
          nodes.splice(before ? i : i + 1, 0, newPanel)
        }
        else {
          // Case B: perpendicular axis — wrap in a new Group
          const pair = before ? [newPanel, toPanel] : [toPanel, newPanel]
          nodes.splice(i, 1, pair)
        }
        return true
      }
    }
    return false
  }

  insertSplit(views.value)

  if (fromPanel.tabs.length === 0)
    removePanelFromTree(fromPanel)

  collapseTree()
  ensureIds(views.value) // assign IDs to the new panel and any new group arrays
}

/**
 * Returns the dragged tab without consuming dragState.
 * ViewPanel needs to read the path BEFORE calling handleDrag, because
 * handleDrag resets dragState to null.
 */
function peekDragTab(): ViewTab | null {
  if (!dragState.value)
    return null
  return dragState.value.panel.tabs[dragState.value.tabIndex] ?? null
}

/**
 * True when the active drag originated from `panel`. Used to skip active-tab
 * updates for same-panel reorders (the tab just moved, it was already active).
 */
function isDragFromPanel(panel: Panel): boolean {
  return dragState.value?.panel === panel
}

provide('$vrp', {
  startDrag,
  handleDrag,
  handleSplit,
  peekDragTab,
  isDragFromPanel,
})
</script>

<template>
  <Resizable hide-handles class="vui-resizable-view">
    <template v-for="item1 in views" :key="nodeKey(item1)">
      <Resizable v-if="Array.isArray(item1)" hide-handles class="nested-view" vertical>
        <template v-for="item2 in item1" :key="nodeKey(item2)">
          <Resizable v-if="Array.isArray(item2)" hide-handles class="nested-view">
            <ViewPanel v-for="item3 in item2" :key="nodeKey(item3)" :panel="item3">
              <!-- Forward ResizableView's `tab` scoped slot to ViewPanel.
                `slotProps` is the payload emitted by ViewPanel (`{ tab, panel }`), and
                we pass it through unchanged so consumers receive the exact panel context
                from the panel instance that is currently rendering. -->
              <template #tab="slotProps">
                <slot name="tab" v-bind="slotProps" />
              </template>
            </ViewPanel>
          </Resizable>
          <ViewPanel v-else :panel="item2">
            <template #tab="slotProps">
              <slot name="tab" v-bind="slotProps" />
            </template>
          </ViewPanel>
        </template>
      </Resizable>
      <ViewPanel v-else :panel="item1">
        <template #tab="slotProps">
          <slot name="tab" v-bind="slotProps" />
        </template>
      </ViewPanel>
    </template>
  </Resizable>
</template>
