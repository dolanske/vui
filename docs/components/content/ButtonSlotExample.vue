<script setup>
import { Button } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Button variant="fill">
        <template #start>
          <Icon name="ph:plus" />
        </template>
        Add Item
        <template #end>
          <Icon name="ph:caret-down" />
        </template>
      </Button>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
