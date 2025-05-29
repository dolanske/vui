<script setup lang="ts">
import { Tab, Tabs } from '@dolanske/vui'
import { ref } from 'vue'

const activeTab = ref('tab1')
const activeFilledTab = ref('tab1')
const activeIconTab = ref('tab1')
const activeCustomTab = ref('tab1')
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-lg">
        <!-- Basic tabs -->
        <div>
          <h3 class="mb-sm">
            Basic Tabs
          </h3>
          <Tabs v-model="activeTab">
            <Tab value="tab1" label="Tab 1" />
            <Tab value="tab2" label="Tab 2" />
            <Tab value="tab3" label="Tab 3" />
          </Tabs>
        </div>

        <!-- Filled tabs -->
        <div>
          <h3 class="mb-sm">
            Filled Tabs
          </h3>
          <Tabs v-model="activeFilledTab" variant="filled">
            <Tab value="tab1" label="Tab 1" />
            <Tab value="tab2" label="Tab 2" />
            <Tab value="tab3" label="Tab 3" />
          </Tabs>
        </div>

        <!-- Tabs with icons -->
        <div>
          <h3 class="mb-sm">
            Tabs with Icons
          </h3>
          <Tabs v-model="activeIconTab">
            <Tab value="tab1" label="Home" icon="ph:house" />
            <Tab value="tab2" label="Settings" icon="ph:gear" />
            <Tab value="tab3" label="Profile" icon="ph:user" />
          </Tabs>
        </div>

        <!-- Custom content tabs -->
        <div>
          <h3 class="mb-sm">
            Custom Content Tabs
          </h3>
          <Tabs v-model="activeCustomTab">
            <Tab value="tab1">
              <div class="flex items-center gap-sm">
                <Icon icon="ph:house" />
                <span>Home</span>
                <Badge>New</Badge>
              </div>
            </Tab>
            <Tab value="tab2">
              <div class="flex items-center gap-sm">
                <Icon icon="ph:gear" />
                <span>Settings</span>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
