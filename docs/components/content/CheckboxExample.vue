<script setup lang="ts">
import { Checkbox, Flex } from '@dolanske/vui'

const prechecked = ref(true)
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex column gap="m">
        <Checkbox label="Basic checkbox" />
        <Checkbox label="Disabled checkbox" disabled />
        <Checkbox v-model="prechecked" label="Checked checkbox" checked />
        <Checkbox accent>
          <template #icon-on>
            <Icon name="ph:toggle-left" />
          </template>
          <template #icon-off>
            <Icon name="ph:toggle-right-fill" />
          </template>
          <template #default>
            Custom icons with <code>accent</code> color
          </template>
        </Checkbox>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style scoped>
:deep(p) {
  margin: 0;
}
</style>
