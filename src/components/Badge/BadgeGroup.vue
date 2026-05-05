<script setup lang="ts">
import type { Spaces } from '../../shared/types'
import { computed } from 'vue'
import Flex from '../Flex/Flex.vue'
import './badge-group.scss'

interface Props {
  gap?: Spaces | number
}

const {
  gap = 0,
} = defineProps<Props>()

const isGapZero = computed(() => gap === 0)
</script>

<template>
  <Flex row :gap inline class="vui-badge-group" :class="{ 'gap-zero': isGapZero }">
    <slot />
  </Flex>
</template>
