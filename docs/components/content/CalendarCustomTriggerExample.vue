<script setup>
import { Calendar } from '@dolanske/vui'
import { ref } from 'vue'

const date = ref(new Date())
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <Calendar v-model="date">
          <template #trigger>
            <button class="vui-button vui-button-variant-fill">
              Select Date
            </button>
          </template>
        </Calendar>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
