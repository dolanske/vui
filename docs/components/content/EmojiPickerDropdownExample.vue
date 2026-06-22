<script setup lang="ts">
import { Button, Dropdown, EmojiPicker, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <Dropdown>
          <template #trigger="{ toggle }">
            <Button size="s" @click="toggle">
              Choose emoji
            </Button>
          </template>
          <EmojiPicker />
        </Dropdown>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
