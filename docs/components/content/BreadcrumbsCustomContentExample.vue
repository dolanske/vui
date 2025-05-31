<script setup lang="ts">
import { BreadcrumbItem, Breadcrumbs, Flex } from '@dolanske/vui'
import { Icon } from '@iconify/vue'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <Breadcrumbs>
          <BreadcrumbItem href="#">
            <Flex y-center>
              <Icon icon="mdi:home" />
              Home
            </Flex>
          </BreadcrumbItem>
          <BreadcrumbItem href="#">
            <Flex y-center>
              <Icon icon="mdi:package" />
              Products
            </Flex>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Flex y-center>
              <Icon icon="mdi:laptop" />
              Electronics
            </Flex>
          </BreadcrumbItem>
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
