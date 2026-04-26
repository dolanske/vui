<script setup lang="ts">
import { Avatar, Divider, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center y-center column gap="m">
        <Divider class="w-100" />
        <Divider class="w-100" :size="2" type="dashed" />
        <Flex y-center x-between>
          <span>One</span>
          <Divider class="w-100" vertical height="16px" />
          <span>Two</span>
          <Divider class="w-100" vertical height="24px" :size="4" />
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
