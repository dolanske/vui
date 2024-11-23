<script setup lang="ts">
import { computed } from 'vue'
import './divider.scss'

interface Props {
  thickness?: number
  space?: number
  vertical?: boolean
  margin?: string
}

const {
  thickness = 1,
  space = 32,
  vertical,
  margin = '0',
} = defineProps<Props>()

const w = computed(() => vertical ? `${space}px` : 'initial')
const bW = computed(() => `${thickness}px`)
const h = computed(() => `${space}px`)
const m = computed(() => typeof margin === 'number' ? `${margin}px` : margin)
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
  margin: v-bind(m);
  width: v-bind(w);
  height: v-bind(h);

  &:before {
    border-width: v-bind(bW);
  }
}
</style>
