<script setup lang="ts">
import { Flex, Select } from '@dolanske/vui'
import { ref } from 'vue'

const selected = ref()
const options = [
  { value: 'andrew', label: 'Andrew' },
  { value: 'john', label: 'John' },
  { value: 'jane', label: 'Jane' },
  { value: 'jill', label: 'Jill' },
]
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="container container-xs">
        <Flex column gap="m" y-center>
          <Select
            v-model="selected"
            style="width: 256px"
            search
            :options="options"
            label="Select friends"
            placeholder="Click me..."
            :single="false"
          />
        </Flex>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style scoped>
:deep(ul) {
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    padding: 0;
  }

  li:before {
    display: none;
  }
}

:deep(p) {
  margin: 0;
}
</style>
