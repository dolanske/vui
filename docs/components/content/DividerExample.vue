<script setup lang="ts">
import { Avatar, Divider, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center y-center column gap="m">
        <Divider class="w-100" />
        <Divider class="w-100" :thickness="5" :size="64" />
        <Flex>
          <span>One</span>
          <Divider class="w-100" vertical :size="16" />
          <span>Two</span>
          <Divider class="w-100" vertical :size="16" />
          <span>Three</span>
        </Flex>
        <Divider class="w-100">
          <Avatar style="outline-color: var(--color-bg-lowered)" />
        </Divider>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style scoped>
p {
  margin: 0 !important;
}
</style>
