<script setup lang="ts">
import { Button } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Button square>
        <Icon name="ph:list" />
        <span class="visually-hidden">Open navigation menu</span>
      </Button>
      <p>
        <span class="visually-hidden">Note: </span>
        This button has hidden text that screen readers will announce but sighted users won't see.
      </p>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
