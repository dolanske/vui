<script setup lang="ts">
import type { Spaces } from '../../lib/types.ts'
import { computed, getCurrentInstance } from 'vue'
import Flex from '../Flex/Flex.vue'
import Tooltip from '../Tooltip/Tooltip.vue'
import './histogram.scss'

interface Props {
  data: number[]
  height?: number
  gap?: Spaces
  expand?: boolean
  compact?: boolean
}

const {
  height = 32,
  gap = 'xs',
  data,
  expand = false,
  compact = false,
} = defineProps<Props>()

const emit = defineEmits<{
  cellClick: [index: number]
  click: []
}>()

const slots = defineSlots()
const instance = getCurrentInstance()
const highestValue = computed(() => Math.max(...data) || 1)
const isClickable = computed(() => !!instance?.vnode.props?.onClick || !!instance?.vnode.props?.onCellClick)
</script>

<template>
  <Flex
    class="vui-histogram"
    :class="{ expand, clickable: isClickable }"
    :gap
    @click.self="emit('click')"
  >
    <Tooltip v-for="(item, index) in data" :key="index" :disabled="!slots.tooltip">
      <div
        class="vui-histogram-cell"
        :class="{ compact }"
        :style="{ height: `${height}px` }"
        :role="isClickable ? 'button' : 'auto'"
        @click="emit('cellClick', index)"
      >
        <div class="vui-histogram-datacell" :style="{ height: `${item / highestValue * 100}%` }" />
      </div>
      <template #tooltip>
        <slot name="tooltip" :value="item" :index :highest-value />
      </template>
    </Tooltip>
  </Flex>
</template>
