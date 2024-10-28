<script setup lang="ts">
import { computed, useSlots, useTemplateRef } from 'vue'

const slots = useSlots()
const context = useTemplateRef<HTMLTableCellElement>('context')
const computedStyle = computed(() => {
  if (!slots.context)
    return {}
  const width = context.value?.getBoundingClientRect().width ?? 0
  return {
    paddingRight: `${width}px`,
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
