<script setup lang="ts">
import { Tab, Tabs } from '@dolanske/vui'

defineSlots<{
  component: () => VNode
  code: () => VNode
}>()

const tab = ref('Component')
</script>

<template>
  <div>
    <Tabs v-model="tab" class="mb-m">
      <Tab value="Component">
        Component
      </Tab>
      <Tab value="Code">
        Code
      </Tab>
    </Tabs>
    <slot v-if="tab === 'Component'" name="component" />
    <slot v-else-if="tab === 'Code'" name="code" />
  </div>
</template>
