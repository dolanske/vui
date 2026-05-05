<script setup lang="ts">
import { Avatar, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center y-center>
        <Avatar />
        <Avatar>JD</Avatar>
        <Avatar url="https://github.com/dolanske.png" size="l" />
        <Avatar :size="80">
          <Icon name="ph:person" />
        </Avatar>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style lang="scss" scoped>
:deep(img) {
  border-radius: var(--border-radius-pill);
}
</style>
