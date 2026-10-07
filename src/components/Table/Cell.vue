<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import { computed, ref, useSlots, useTemplateRef } from 'vue'

const slots = useSlots()
const contextRef = useTemplateRef<HTMLDivElement>('context')

// Width of the context slot, re-measured whenever it changes size
const contextWidth = ref(0)
useResizeObserver(contextRef, ([entry]) => {
  contextWidth.value = entry?.borderBoxSize?.[0]?.inlineSize ?? entry?.contentRect.width ?? 0
})

const computedStyle = computed(() => {
  if (!slots.context || contextWidth.value === 0)
    return {}
  return {
    paddingRight: `${contextWidth.value}px`,
  }
})
</script>

<template>
  <td :style="computedStyle">
    <slot />
    <div v-if="$slots.context" ref="context" class="vui-cell-context">
      <slot name="context" />
    </div>
  </td>
</template>
