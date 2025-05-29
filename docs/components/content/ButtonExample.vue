<script setup lang="ts">
import { Button } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-xs">
        <Button variant="fill" class="mb-xs">
          Primary Button
        </Button>
        <Button variant="gray" class="mb-xs">
          Secondary Button
        </Button>
        <Button variant="fill" icon="mdi:plus" class="mb-xs">
          With Icon
        </Button>
        <Button variant="fill" loading class="mb-xs">
          Loading
        </Button>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
