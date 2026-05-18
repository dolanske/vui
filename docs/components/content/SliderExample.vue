<script setup lang="ts">
import { Flex, Slider } from '@dolanske/vui'
import { ref } from 'vue'

const value = ref(40)
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex column y-center gap="m">
        <Slider v-model="value" style="max-width: 320px" />
        <span class="text-xs text-color-light">Value: {{ value }}</span>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
