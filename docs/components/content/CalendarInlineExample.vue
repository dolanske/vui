<script setup>
import { Calendar, Flex } from '@dolanske/vui'
import { ref } from 'vue'

const date = ref(new Date())
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <Calendar
          v-model="date"
          inline
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
