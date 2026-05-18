<script setup lang="ts">
import { Flex, Slider } from '@dolanske/vui'
import { ref } from 'vue'

const start = ref(20)
const end = ref(80)
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex column gap="m" y-center>
        <Slider v-model:start="start" v-model:end="end" style="width: 100%; max-width: 320px" range :steps="10" />
        <span class="text-xs text-color-light">{{ start }} – {{ end }}</span>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
