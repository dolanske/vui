<script setup lang="ts">
import { Flex, Resizable } from '@dolanske/vui'
</script>

<template>
  <DocsExample full>
    <template #component>
      <Resizable :min-size="120" style="height: 320px;">
        <Flex x-center y-center style="background: var(--color-bg-lowered); height: 100%;">
          Sidebar
        </Flex>
        <Resizable vertical :min-size="64">
          <Flex x-center y-center style="background: var(--color-bg-lowered); height: 100%;">
            Editor
          </Flex>
          <Flex x-center y-center style="background: var(--color-bg-lowered); height: 100%;">
            Terminal
          </Flex>
        </Resizable>
      </Resizable>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
