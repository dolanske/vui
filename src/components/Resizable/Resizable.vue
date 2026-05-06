<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { ref, useTemplateRef, watch } from 'vue'
import { useTopLevelSlots } from '../../shared/slots'
import './resizable.scss'

interface Props {
  vertical?: boolean
  persist?: boolean
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

// When applying defaults, set `flex: <value> 1 0px;
// While moving, set overflow hidden & pointer events none

interface PanelState {
  size: number
  isResizing: boolean
}

const focusedPanelIndex = ref(-1)
const panelState = ref<PanelState[]>([])

// Initialize panels
watch(panels, (items) => {
  // Initialize from localStorage state if persist is enabled
  if (props.persist && panelState.value.length) {
    return
  }

  panelState.value = items.map(() => ({
    size: 100 / items.length,
    isResizing: false,
  }))
}, { immediate: true })

useEventListener(root, 'mousedown', (event) => {
  const handle = (event.target as HTMLElement).closest('.vui-resizable-handle')
  if (!handle)
    return

  const index = Number(handle.getAttributeNode('data-handle-index')?.value)
  if (index === undefined)
    return

  panelState.value[index].isResizing = true

  const rect = root.value!.getBoundingClientRect()
  const startX = Math.max(rect.left, Math.min(rect.right, event.clientX))
  const startSize = panelState.value[index].size
  const nextStartSize = panelState.value[index + 1].size

  const onMouseMove = (event: MouseEvent) => {
    const clampedClientX = Math.max(rect.left, Math.min(rect.right, event.clientX))
    const deltaX = clampedClientX - startX
    const containerWidth = rect.width
    if (!containerWidth)
      return

    const deltaSize = (deltaX / containerWidth) * 100

    panelState.value[index].size = Math.max(0, Math.min(100, startSize + deltaSize))
    panelState.value[index + 1].size = Math.max(0, Math.min(100, nextStartSize - deltaSize))
  }

  const onMouseUp = () => {
    panelState.value[index].isResizing = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
})
</script>

<template>
  <div ref="resizableRef" class="vui-resizable" :class="{ vertical: props.vertical }">
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
        @focus="focusedPanelIndex = index"
        @blur="focusedPanelIndex = -1"
      />
    </template>
  </div>
</template>
