<script setup lang="ts">
import { Flex, Resizable } from '@dolanske/vui'
</script>

<template>
  <DocsExample full>
    <template #component>
      <Resizable style="height: 200px;">
        <Flex x-center y-center style="background: var(--color-bg-lowered); height: 100%;">
          Panel 1
        </Flex>
        <Flex x-center y-center style="background: var(--color-bg-lowered); height: 100%;">
          Panel 2
        </Flex>
        <Flex x-center y-center style="background: var(--color-bg-lowered); height: 100%;">
          Panel 3
        </Flex>
      </Resizable>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
