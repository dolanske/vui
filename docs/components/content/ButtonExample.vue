<script setup lang="ts">
import { Button, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <Button variant="fill" class="mb-xs">
          Primary Button
        </Button>
        <Button variant="gray" class="mb-xs">
          Secondary Button
        </Button>
        <Button variant="fill" loading class="mb-xs">
          Loading
        </Button>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
