<script setup>
import { Calendar, Flex } from '@dolanske/vui'
import { ref } from 'vue'

const dateRange = ref([
  new Date('2025-05-01'),
  new Date('2025-05-05'),
])
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <Calendar
          v-model="dateRange"
          range
          :enable-time-picker="false"
          format="dd/MM/yyyy"
        />
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
