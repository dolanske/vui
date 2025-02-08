<script setup lang='ts'>
import type { Space } from '../../shared/types'
import Flex from '../Flex/Flex.vue'
import './button-group.scss'

interface Props {
  vertical?: boolean
  gap?: Space | number
}

const {
  vertical,
  gap = 0,
} = defineProps<Props>()
</script>

<template>
  <Flex
    :row="!vertical"
    :column="vertical"
    class="vui-button-group"
    :class="{ vertical }"
    :gap
    inline
  >
    <slot />
  </Flex>
</template>
