<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { ref, useTemplateRef } from 'vue'
import { isTopLayer } from '../../shared/layerManager'
import Popout from '../Popout/Popout.vue'
import './context-menu.scss'

const context = useTemplateRef('contextEl')
const anchor = useTemplateRef('anchorEl')
const popout = useTemplateRef('popoutRef')

const anchorPos = ref<{ x: number, y: number } | null>(null)

useEventListener(context, 'contextmenu', (event) => {
  event.preventDefault()

  const rect = context.value?.getBoundingClientRect()

  if (!rect)
    return

  anchorPos.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }
})

useEventListener(window, 'keydown', (event) => {
  if (event.key === 'Escape' && isTopLayer(popout.value?.layerIndex() ?? -1)) {
    anchorPos.value = null
  }
})
</script>

<template>
  <div ref="contextEl" class="vui-context-menu">
    <div
      ref="anchorEl"
      class="vui-context-menu-anchor"
      :style="{
        left: `${anchorPos?.x}px`,
        top: `${anchorPos?.y}px`,
      }"
    />
    <Popout
      ref="popoutRef"
      :key="`${anchorPos?.x}${anchorPos?.y}`"
      :offset="16"
      :visible="!!anchorPos"
      :anchor
      placement="bottom-start"
      transition-name="none"
      @click-outside="anchorPos = null"
    >
      <slot name="menu" />
    </Popout>
    <slot />
  </div>
</template>
