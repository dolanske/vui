<script setup lang="ts">
import { Alert } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Alert
        variant="info"
        title="System Update"
        description="A new version of the system is available. Please update to the latest version to ensure optimal performance and security."
      />
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style scoped>
:deep(p) {
  margin: 0;
}
</style>
