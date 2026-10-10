<script setup lang="ts">
import { computed } from 'vue'
import { formatUnitValue } from '../../lib/helpers'
import './divider.scss'

interface BaseProps {
  size?: number | string
  type?: 'solid' | 'dashed' | 'dotted' | (string & {})
}

type Props = BaseProps & (
  | {
    vertical: true
    /**
     * Height of a vertical divider. Stretches to the parent when omitted.
     */
    height?: number | string
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
    <hr :aria-orientation="vertical ? 'vertical' : undefined">
    <div v-if="$slots.default" class="vui-divider-slot">
      <slot />
    </div>
  </div>
</template>
