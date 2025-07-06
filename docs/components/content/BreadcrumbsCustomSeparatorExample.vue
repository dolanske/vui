<script setup lang="ts">
import { BreadcrumbItem, Breadcrumbs, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <Breadcrumbs separator="///">
          <BreadcrumbItem label="Home" href="#" />
          <BreadcrumbItem label="Products" href="#" />
          <BreadcrumbItem label="Electronics" />
        </Breadcrumbs>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style scoped lang="scss">
:deep(ul) {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin: 0 !important;
    padding: 0;
    &:before {
      display: none;
    }
  }
}
</style>
