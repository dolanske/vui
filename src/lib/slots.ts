import type { ComputedRef, VNode } from 'vue'
import { Comment, computed, Fragment, Text } from 'vue'

type VNodesProps<T extends object> = Array<VNode & { props: T }>
type SlotFn = (_props?: any) => VNode[] | VNode | undefined

/**
 * Whether a vnode actually renders something. `v-if="false"` leaves a comment
 * vnode behind and template formatting can leave whitespace-only text nodes,
 * neither of which should count as a child.
 */
function isRenderable(vnode: VNode): boolean {
  if (vnode.type === Comment)
    return false
  if (vnode.type === Text)
    return typeof vnode.children === 'string' && vnode.children.trim().length > 0
  return true
}

function getTopLevelSlotNodes(slotFn?: SlotFn): VNode[] {
  const nodes = slotFn?.()

  if (!nodes)
    return []

  const topLevelNodes = Array.isArray(nodes) ? nodes : [nodes]
  const result: VNode[] = []

  // Only fragments (v-for, <template>) are unwrapped. Elements and components
  // are kept intact, so wrappers are never stripped away.
  const unwrapTopLevelFragments = (vnodes: VNode[]): void => {
    vnodes.forEach((vnode) => {
      if (vnode.type === Fragment && Array.isArray(vnode.children)) {
        unwrapTopLevelFragments(vnode.children as VNode[])
      }
      else if (isRenderable(vnode)) {
        result.push(vnode)
      }
    })
  }

  unwrapTopLevelFragments(topLevelNodes)
  return result
}

/**
 * Returns a computed array of renderable top-level VNodes from the provided
 * slot function. Make sure it is first read during render (template), not
 * during setup, otherwise Vue warns about slots invoked outside of render.
 *
 * Components which need to coordinate with their children should prefer
 * provide / inject registration over inspecting vnodes.
 *
 * @param slots The component slots object (from `useSlots` / `defineSlots`)
 * @param name Slot name, defaults to `default`
 */
export function useTopLevelSlots(slots: Record<string, SlotFn | undefined>, name = 'default'): ComputedRef<VNodesProps<any>> {
  // The slot is read lazily, parents can replace slot functions on re-render
  return computed(() => getTopLevelSlotNodes(slots[name]) as VNodesProps<any>)
}
