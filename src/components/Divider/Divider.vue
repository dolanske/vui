<script setup lang="ts">
import { useSlots } from 'vue'
import './divider.scss'

interface Props {
  thickness?: number
  height?: number
}

const {
  thickness = 1,
  height = 32,
} = defineProps<Props>()
const hasSlot = useSlots()
</script>

<template>
  <div
    class="vui-divider" :style="{
      height: `${height}px`,
      borderWidth: `${thickness}px`,
    }"
  >
    <div v-if="hasSlot" class="vui-divider-slot">
      <slot />
    </div>
  </div>
</template>
