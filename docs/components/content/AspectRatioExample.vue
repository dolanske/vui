<script setup lang="ts">
import { AspectRatio, Flex } from '@dolanske/vui'

const exampleImg = '/example.jpg'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex gap="l" column>
        <AspectRatio :ratio="16 / 9">
          <img :src="exampleImg" alt="16 / 9">
        </AspectRatio>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
