import type { InjectionKey } from 'vue'

export interface ViewTab {
  path: string
  label?: string
}

export interface Panel {
  /** Stable unique ID assigned by ResizableView. Used as v-for key. */
  id?: string
  tabs: ViewTab[]
}

/**
 * A node is either a Panel (leaf) or a Group (array of nodes). Groups alternate
 * direction by depth: the root is horizontal, its groups vertical, their
 * groups horizontal again, and so on. There is no depth limit.
 */
export type ViewNode = Panel | ViewNode[]

export type SplitPlacement = 'left' | 'right' | 'top' | 'bottom'

export interface ResizableViewContext {
  startDrag: (_panelId: string, _tabIndex: number) => void
  endDrag: () => void
  isDragging: () => boolean
  /**
   * Moves the dragged tab into a panel at an index (tabs bar drop)
   */
  dropOnTabs: (_panelId: string, _insertIndex: number) => ViewTab | null
  /**
   * Drops the dragged tab on a panel's content, splitting it or appending
   */
  dropOnContent: (_panelId: string, _placement: SplitPlacement | 'center') => ViewTab | null
  /**
   * Keyboard alternative to dragging
   */
  moveTab: (_panelId: string, _tabIndex: number, _target: 'previous' | 'next' | SplitPlacement) => void
}

export const RESIZABLE_VIEW_KEY = Symbol('vui-resizable-view') as InjectionKey<ResizableViewContext>

export function isGroup(node: ViewNode): node is ViewNode[] {
  return Array.isArray(node)
}

let uid = 0

export function createPanelId(): string {
  return `p${++uid}`
}

/**
 * Deep copies the tree. Panel ids are kept, panels without an id get one, so
 * the copy can be keyed stably.
 */
export function cloneTree(nodes: ViewNode[]): ViewNode[] {
  return nodes.map((node) => {
    if (isGroup(node))
      return cloneTree(node)
    return { ...node, id: node.id ?? createPanelId(), tabs: node.tabs.map(tab => ({ ...tab })) }
  })
}

export function hasMissingIds(nodes: ViewNode[]): boolean {
  return nodes.some(node => isGroup(node) ? hasMissingIds(node) : !node.id)
}

export function findPanel(nodes: ViewNode[], id: string): Panel | null {
  for (const node of nodes) {
    if (isGroup(node)) {
      const found = findPanel(node, id)
      if (found)
        return found
    }
    else if (node.id === id) {
      return node
    }
  }
  return null
}

/**
 * Stable key for a group, derived from the first panel inside of it
 */
export function groupKey(nodes: ViewNode[]): string {
  const first = nodes[0]
  if (!first)
    return 'g-empty'
  return `g-${isGroup(first) ? groupKey(first) : first.id}`
}

/**
 * Removes a panel. Groups which become empty are removed as well.
 */
export function removePanel(nodes: ViewNode[], id: string): boolean {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (isGroup(node)) {
      if (removePanel(node, id)) {
        if (node.length === 0)
          nodes.splice(i, 1)
        return true
      }
    }
    else if (node.id === id) {
      nodes.splice(i, 1)
      return true
    }
  }
  return false
}

/**
 * Unwraps groups with a single child, they would only add a useless level
 */
export function collapseTree(nodes: ViewNode[]): void {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (isGroup(node)) {
      collapseTree(node)
      if (node.length === 1) {
        nodes.splice(i, 1, node[0])
        i--
      }
    }
  }
}

/**
 * Inserts a new panel next to the target panel. When the split direction
 * matches the direction of the containing group, the panel is inserted
 * inline. Otherwise the target is wrapped in a new group of the needed
 * direction, which simply becomes one level deeper.
 */
export function insertSplit(nodes: ViewNode[], targetId: string, newPanel: Panel, placement: SplitPlacement, depth = 1): boolean {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]

    if (isGroup(node)) {
      if (insertSplit(node, targetId, newPanel, placement, depth + 1))
        return true
      continue
    }

    if (node.id !== targetId)
      continue

    const isHorizontal = placement === 'left' || placement === 'right'
    const before = placement === 'left' || placement === 'top'
    // Odd depth = horizontal axis; even depth = vertical axis
    const parentIsHorizontal = depth % 2 === 1

    if (isHorizontal === parentIsHorizontal)
      nodes.splice(before ? i : i + 1, 0, newPanel)
    else
      nodes.splice(i, 1, before ? [newPanel, node] : [node, newPanel])

    return true
  }

  return false
}
