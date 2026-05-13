<script setup lang="ts">
import type { FlexProps } from '../Flex/Flex.vue'
import type { MenubarContext } from './menubar'
import { provide, ref } from 'vue'
import Flex from '../Flex/Flex.vue'
import { MENUBAR_KEY } from './menubar'

const props = withDefaults(defineProps<FlexProps>(), {
  gap: 's',
})

const openIndex = ref<number | null>(null)
let counter = 0

function register() {
  return counter++
}

function open(index: number) {
  openIndex.value = index
}

function close() {
  openIndex.value = null
}

provide<MenubarContext>(MENUBAR_KEY, { openIndex, register, open, close })
</script>

<template>
  <Flex v-bind="props">
    <slot />
  </Flex>
</template>
