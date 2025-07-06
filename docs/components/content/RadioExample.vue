<script setup lang="ts">
import { Radio, RadioGroup } from '@dolanske/vui'
import { ref } from 'vue'

const selected = ref('option1')
</script>

<template>
  <DocsExample>
    <template #component>
      <RadioGroup v-model="selected" gap="xl" x-center>
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style scoped>
:deep(p) {
  margin: 0 !important;
}
</style>
