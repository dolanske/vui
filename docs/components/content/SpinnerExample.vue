<script setup lang="ts">
import { Flex, Spinner } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center y-center gap="l">
        <Spinner size="s" />
        <Spinner size="m" />
        <Spinner size="l" />
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
