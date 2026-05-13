<script setup lang="ts">
import { ref } from 'vue'
import { useFlattenedSlot } from '../../shared/slots'
import Flex from '../Flex/Flex.vue'

const slots = defineSlots()
// 1. Mention only s sized plain button should be preferably used

const isMenuOpen = ref(false)
const flattened = useFlattenedSlot<ButtonProps>(slots.default)
</script>

<template>
  <Flex gap="xs">
    <Component
      :is="slot"
      v-for="slot in flattened"
      :key="slot.key"
    />
  </Flex>
</template>
