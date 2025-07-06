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
        <Checkbox icon-on="ph:toggle-left" icon-off="ph:toggle-right-fill" accent>
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
