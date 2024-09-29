<script setup lang="ts">
import { useSlots } from 'vue'
import './divider.scss'

interface Props {
  thickness?: number
  size?: number
  vertical?: boolean
}

const {
  thickness = 1,
  size = 32,
  vertical,
} = defineProps<Props>()
const hasSlot = useSlots()
</script>

<template>
  <div
    class="vui-divider" :class="{ vertical }" :style="{
      ...(vertical && { width: `${size}px` }),
      height: `${size}px`,
      borderWidth: `${thickness}px`,
    }"
  >
    <div v-if="hasSlot" class="vui-divider-slot">
      <slot />
    </div>
  </div>
</template>
