<script setup lang="ts">
import { Switch, Tab, Tabs } from '@dolanske/vui'
import { ref } from 'vue'

const activeTab = ref('tab1')
const filled = ref(false)
</script>

<template>
  <DocsExample>
    <template #component>
      <Tabs v-model="activeTab" class="example-tabs" :variant="filled ? 'filled' : 'default'">
        <Tab value="tab1">
          Tab 1
        </Tab>
        <Tab value="tab2">
          Tab 2
        </Tab>
        <Tab value="tab3">
          Tab 3
        </Tab>

        <template #end>
          <Switch v-model="filled" label="Filled" />
        </template>
      </Tabs>

      <div class="mt-md">
        <div v-if="activeTab === 'tab1'">
          Content for Tab 1
        </div>
        <div v-if="activeTab === 'tab2'">
          Content for Tab 2
        </div>
        <div v-if="activeTab === 'tab3'">
          Content for Tab 3
        </div>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style lang="scss">
.example-tabs {
  margin-bottom: var(--space-m);

  &.vui-tabs-variant-filled {
    background-color: var(--color-bg);

    .vui-switch .vui-switch-icon {
      background-color: var(--color-bg-raised) !important;
    }
  }
}

:root .example-tabs.vui-tabs-variant-filled .vui-switch .vui-switch-icon {
  background-color: var(--color-bg-lowered);
}
</style>
