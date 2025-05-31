<script setup lang="ts">
import { Accordion } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Accordion label="About Vui" class="mb-xs" card>
        <p class="m-0">
          Vui is a vu3 component library
        </p>
      </Accordion>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
