<script setup lang="ts">
import { computed, useSlots } from 'vue'
import "./divider.scss"

interface Props {
  thickness: number
}

const props = defineProps<Props>()
const hasSlot = useSlots()
const border = computed(() => `${props.thickness}px solid var(--vui-color-border)`)
</script>

<template>
  <div class="vui vui-divider">
    <div v-if="hasSlot" class="vui-divider-slot">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.vui-divider:before {
  border-bottom: v-bind(border);
}
</style>
