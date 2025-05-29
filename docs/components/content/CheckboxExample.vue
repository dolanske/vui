<script setup lang="ts">
import { Checkbox } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-xs">
        <Checkbox label="Basic checkbox" />
        <Checkbox label="Disabled checkbox" disabled />
        <Checkbox label="Checked checkbox" checked />
        <Checkbox
          icon-on="mdi:checkbox-marked"
          icon-off="mdi:checkbox-blank-outline"
          accent
        >
          <template #default>
            Custom icons with <strong>accent</strong> color
          </template>
        </Checkbox>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
