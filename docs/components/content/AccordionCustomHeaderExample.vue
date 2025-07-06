<script setup lang="ts">
import { Accordion, Button } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Accordion unstyled>
        <template #trigger="{ isOpen, toggle }">
          <Button @click="toggle">
            Details
            <Icon class="ml-m" :name="isOpen ? 'ph:caret-up' : 'ph:caret-down'" />
          </Button>
        </template>
        <p class="m-0">
          Vui provides a lot of customization.
        </p>
      </Accordion>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
