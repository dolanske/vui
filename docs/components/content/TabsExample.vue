<script setup lang="ts">
import { Button, Tab, Tabs } from '@dolanske/vui'
import { ref } from 'vue'

const activeTab = ref('tab1')
</script>

<template>
  <DocsExample>
    <template #component>
      <Tabs v-model="activeTab" class="mb-m">
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
          <Button size="s">
            <template #start>
              <Icon name="ph:plus" />
            </template>
            Export
          </Button>
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
