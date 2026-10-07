<script setup lang="ts">
import type { Spaces } from '../../lib/types.ts'
import { computed, getCurrentInstance } from 'vue'
import Flex from '../Flex/Flex.vue'
import Tooltip from '../Tooltip/Tooltip.vue'
import './histogram.scss'

interface Props {
  data: number[]
  height?: number
  gap?: Spaces | number
  expand?: boolean
  compact?: boolean
  /**
   * Accessible description of the chart. Defaults to a summary of the data.
   */
  label?: string
  /**
   * Formats the value of a bar for screen readers
   */
  formatValue?: (_value: number, _index: number) => string
}

const {
  height = 32,
  // eslint-disable-next-line vue/require-valid-default-prop
  gap = 'xs',
  data,
  expand = false,
  compact = false,
  label,
  formatValue = (value: number, index: number) => `${index + 1}: ${value}`,
} = defineProps<Props>()

const emit = defineEmits<{
  cellClick: [index: number]
  click: []
}>()

const slots = defineSlots()
const instance = getCurrentInstance()

// A loop instead of Math.max(...data), which overflows the call stack for very
// large arrays. Negative and invalid values are drawn as empty bars.
const highestValue = computed(() => {
  let max = 0
  for (const value of data) {
    if (Number.isFinite(value) && value > max)
      max = value
  }
  return max || 1
})

function barHeight(value: number): string {
  if (!Number.isFinite(value) || value <= 0)
    return '0%'
  return `${(value / highestValue.value) * 100}%`
}

const isClickable = computed(() => !!instance?.vnode.props?.onClick || !!instance?.vnode.props?.onCellClick)

const summary = computed(() => label ?? `Histogram of ${data.length} values, highest ${highestValue.value}`)

// Template note:
// Clickable bars are buttons inside a labelled group, otherwise the whole
// chart is a single image with a text summary
</script>

<template>
  <Flex
    class="vui-histogram"
    :class="{ expand, clickable: isClickable }"
    :gap
    :role="isClickable ? 'group' : 'img'"
    :aria-label="summary"
    @click.self="emit('click')"
  >
    <template v-for="(item, index) in data" :key="index">
      <Tooltip v-if="slots.tooltip">
        <component
          :is="isClickable ? 'button' : 'div'"
          :type="isClickable ? 'button' : undefined"
          class="vui-histogram-cell"
          :class="{ compact }"
          :style="{ height: `${height}px` }"
          :aria-label="isClickable ? formatValue(item, index) : undefined"
          @click="emit('cellClick', index)"
        >
          <div class="vui-histogram-datacell" :style="{ height: barHeight(item) }" />
        </component>
        <template #tooltip>
          <slot name="tooltip" :value="item" :index :highest-value />
        </template>
      </Tooltip>
      <component
        :is="isClickable ? 'button' : 'div'"
        v-else
        :type="isClickable ? 'button' : undefined"
        class="vui-histogram-cell"
        :class="{ compact }"
        :style="{ height: `${height}px` }"
        :aria-label="isClickable ? formatValue(item, index) : undefined"
        @click="emit('cellClick', index)"
      >
        <div class="vui-histogram-datacell" :style="{ height: barHeight(item) }" />
      </component>
    </template>
  </Flex>
</template>
