<script setup lang="ts">
import { Avatar, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center y-center>
        <Avatar />
        <Avatar>JD</Avatar>
        <Avatar>
          <Icon name="ph:person" />
        </Avatar>
        <Avatar url="https://github.com/dolanske.png" />

        <Divider vertical />

        <Avatar size="s" />
        <Avatar size="m" />
        <Avatar size="l" />
        <Avatar :size="80" />
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style lang="scss" scoped>
:deep(img) {
  margin: 0 !important;
  border-radius: 0 !important;
}
</style>
