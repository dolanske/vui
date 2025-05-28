<script setup lang="ts">
import { Tab, Tabs } from '@dolanske/vui'

defineSlots<{
  component: () => VNode
  code: () => VNode
}>()

const tab = ref('Component')
</script>

<template>
  <div class="mt-l example-root">
    <Tabs v-model="tab" class="mb-m">
      <Tab value="Component">
        Component
      </Tab>
      <Tab value="Code">
        Code
      </Tab>
    </Tabs>
    <div v-if="tab === 'Component'" class="example-component">
      <slot name="component" />
    </div>
    <div v-else-if="tab === 'Code'" class="example-code">
      <slot name="code" />
    </div>
  </div>
</template>

<style lang="scss">
.example-component,
.example-code {
  border: 1px solid var(--color-border-weak);
  background-color: var(--color-bg-lowered);
  border-radius: var(--border-radius-m);
}

.example-code pre {
  margin-top: 0 !important;
}

.example-component {
  padding: var(--space-xxl) 128px;
}
</style>
