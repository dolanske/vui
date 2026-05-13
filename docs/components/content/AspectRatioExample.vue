<script setup lang="ts">
import { AspectRatio, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex gap="l" column>
        <AspectRatio :ratio="16 / 9">
          <NuxtImg src="/example.jpg" alt="16 / 9" />
        </AspectRatio>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
