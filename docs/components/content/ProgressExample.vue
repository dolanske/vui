<script setup lang="ts">
import { Progress } from '@dolanske/vui'
import { ref } from 'vue'

const progress = ref(50)
</script>

<template>
  <DocsExample>
    <template #component>
      <Progress v-model="progress" />
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
