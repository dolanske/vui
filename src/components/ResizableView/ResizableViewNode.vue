<script setup lang="ts">
import type { Panel, ViewNode, ViewTab } from './resizableView'
import Resizable from '../Resizable/Resizable.vue'
import { groupKey, isGroup } from './resizableView'
import ViewPanel from './ViewPanel.vue'

// Renders one level of the view tree and recurses into nested groups, so the
// layout supports any nesting depth. Direction alternates per level.

interface Props {
  nodes: ViewNode[]
  depth: number
}

const props = defineProps<Props>()

defineSlots<{
  tab: (_props: { tab: ViewTab | undefined, panel: Panel }) => any
}>()

function nodeKey(node: ViewNode): string {
  return isGroup(node) ? groupKey(node) : node.id!
}
</script>

<template>
  <Resizable hide-handles :class="props.depth === 1 ? 'vui-resizable-view' : 'nested-view'" :vertical="props.depth % 2 === 0">
    <template v-for="node in props.nodes" :key="nodeKey(node)">
      <ResizableViewNode v-if="isGroup(node)" :nodes="node" :depth="props.depth + 1">
        <template #tab="slotProps">
          <slot name="tab" v-bind="slotProps" />
        </template>
      </ResizableViewNode>
      <ViewPanel v-else :panel="node">
        <template #tab="slotProps">
          <slot name="tab" v-bind="slotProps" />
        </template>
      </ViewPanel>
    </template>
  </Resizable>
</template>
