<script setup lang="ts">
import { Avatar, Badge, Flex, Indicator } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center y-center gap="l">
        <Avatar url="https://github.com/dolanske.png" size="l">
          <template #overlay>
            <Indicator variant="online" position="bottom-right" outline />
          </template>
        </Avatar>

        <Badge outline size="l">
          Important
          <Indicator variant="alert" position="top-right" ripple />
        </Badge>
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
  border-radius: var(--border-radius-pill);
}
</style>
