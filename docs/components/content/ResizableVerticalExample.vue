<script setup lang="ts">
import { Flex, Resizable } from '@dolanske/vui'
</script>

<template>
  <DocsExample full>
    <template #component>
      <Resizable vertical :min-size="48" style="height: 320px;">
        <Flex x-center y-center style="background: var(--color-bg-lowered); height: 100%;">
          Top
        </Flex>
        <Flex x-center y-center style="background: var(--color-bg-lowered); height: 100%;">
          Middle
        </Flex>
        <Flex x-center y-center style="background: var(--color-bg-lowered); height: 100%;">
          Bottom
        </Flex>
      </Resizable>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
