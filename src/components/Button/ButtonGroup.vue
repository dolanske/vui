<script setup lang='ts'>
import type { Spaces } from '../../shared/types'
import { computed } from 'vue'
import Flex from '../Flex/Flex.vue'
import './button-group.scss'

interface Props {
  vertical?: boolean
  gap?: Spaces | number
}

const {
  vertical,
  gap = 0,
} = defineProps<Props>()

const isGapZero = computed(() => gap === 0)
</script>

<template>
  <Flex
    :row="!vertical"
    :column="vertical"
    class="vui-button-group"
    :class="{ vertical, 'gap-zero': isGapZero }"
    :gap
    inline
  >
    <slot />
  </Flex>
</template>
