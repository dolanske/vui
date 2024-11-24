<script setup lang="ts">
import { computed } from 'vue'
import { formatUnitValue } from '../../shared/helpers'
import './divider.scss'

interface Props {
  thickness?: number
  size?: number | string
  vertical?: boolean
  margin?: string | number
}

const {
  thickness = 1,
  size = 32,
  vertical,
  margin = '0',
} = defineProps<Props>()

const h = computed(() => formatUnitValue(size))
const w = computed(() => vertical ? h.value : 'initial')
const bW = computed(() => `${thickness}px`)
const m = computed(() => formatUnitValue(margin))
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
