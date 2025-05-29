<script setup lang="ts">
import { Divider } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-xs">
        <p class="m-0">
          Content above
        </p>
        <Divider />
        <p class="m-0">
          Content below
        </p>
        <Divider :thickness="2" />
        <Divider>With Text</Divider>
        <div class="flex items-center gap-xs">
          <span>Left</span>
          <Divider vertical size="24" />
          <span>Right</span>
        </div>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
