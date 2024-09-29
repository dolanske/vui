<script setup lang="ts">
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
</script>

<template>
  <div
    class="vui-divider" :class="{ vertical }" :style="{
      ...(vertical && { width: `${size}px` }),
      height: `${size}px`,
      borderWidth: `${thickness}px`,
    }"
  >
    <div v-if="$slots.default" class="vui-divider-slot">
      <slot />
    </div>
  </div>
</template>
