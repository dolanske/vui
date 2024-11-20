<script setup lang="ts">
import { computed } from 'vue'
import './divider.scss'

interface Props {
  thickness?: number
  size?: number
  vertical?: boolean
  width?: number
  height?: number
  margin?: string
}

const {
  thickness = 1,
  size = 32,
  vertical,
  margin = '0',
} = defineProps<Props>()

const w = computed(() => vertical ? `${size}px` : 'initial')
const bW = computed(() => `${thickness}px`)
const h = computed(() => `${size}px`)
</script>

<template>
  <div class="vui-divider" :class="{ vertical }">
    <div v-if="$slots.default" class="vui-divider-slot">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vui-divider {
  margin: v-bind(margin);
  width: v-bind(w);
  border-width: v-bind(bW);
  height: v-bind(h);
}
</style>
