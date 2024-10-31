<script setup lang='ts'>
import type { Sizes } from '../../shared/types'
import { computed } from 'vue'
import Flex from '../Flex/Flex.vue'
import './button-group.scss'

interface Props {
  spaced?: Sizes | number | boolean
  vertical?: boolean
}

const {
  spaced = false,
  vertical,
} = defineProps<Props>()

const gap = computed(() => {
  if (typeof spaced === 'boolean' || spaced === 0)
    return 0
  return spaced
})
</script>

<template>
  <Flex :row="!vertical" :column="vertical" class="vui-button-group" :class="{ spaced: gap === 0, vertical }" :gap inline>
    <slot />
  </Flex>
</template>
