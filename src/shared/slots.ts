import type { ShallowRef, VNode } from 'vue'
import { computed, Fragment, shallowRef, watchEffect } from 'vue'

type VNodesProps<T extends object> = Array<VNode & { props: T }>

/**
 * Flattens slot children and keeps them in sync reactively.
 * @param slotFn The slot function (e.g., slots.default)
 * @returns Computed array of flattened VNodes
 */
export function useFlattenedSlot<T extends object>(slotFn?: () => VNode[] | undefined): ShallowRef<VNodesProps<T>> {
  const rawChildren = shallowRef<VNodesProps<T>>([])

  // Flatten VNodes recursively (handles Fragments)
  function flatten(vnodes: VNode[]): VNodesProps<T> {
    const result: VNode[] = []

    const walk = (nodes: VNode[] | VNode | undefined): void => {
      if (!nodes)
        return

      if (Array.isArray(nodes)) {
        nodes.forEach(walk)
      }
      else if (nodes.type === Fragment || Array.isArray(nodes.children)) {
        walk(nodes.children as VNode[])
      }
      else {
        result.push(nodes)
      }
    }

    walk(vnodes)
    return result as VNodesProps<T>
  }

  // Re-compute children whenever slot content changes
  watchEffect(() => {
    const content = slotFn?.() ?? []
    rawChildren.value = flatten(content)
  })

  return computed(() => rawChildren.value)
}

export function enforceSlotType(vnodes: ShallowRef<VNodesProps<any>>, name: string) {
  watchEffect(() => {
    // @ts-expect-error Accessing internals
    if (vnodes.value.some(item => item.type.__name !== name)) {
      throw new Error(`You can only pass \`<${name} />\` components as children.`)
    }
  })
}