<script setup lang="ts">
import { computed } from 'vue'
import { formatUnitValue } from '../../shared/helpers'
import './divider.scss'

interface BaseProps {
  size?: number | string
  type?: 'solid' | 'dashed' | 'dotted'
}

type Props = BaseProps & (
  | {
    vertical: true
    height: number | string
  }
  | {
    vertical?: false
    height?: never
  }
)

const {
  size,
  height,
  vertical,
  type = 'solid',
} = defineProps<Props>()

const s = computed(() => size === undefined ? undefined : formatUnitValue(size))
const h = computed(() => height === undefined ? undefined : formatUnitValue(height))
</script>

<template>
  <div
    class="vui-divider"
    :class="{ vertical }"
    :style="{
      '--vui-divider-size': s,
      '--vui-divider-height': vertical ? h : undefined,
      '--vui-divider-type': type,
    }"
  >
    <hr>
    <div v-if="$slots.default" class="vui-divider-slot">
      <slot />
    </div>
  </div>
</template>
