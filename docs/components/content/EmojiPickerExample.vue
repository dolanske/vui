<script setup lang="ts">
import { Card, EmojiPicker, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <Card :padding="false" inline>
          <EmojiPicker />
        </Card>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
