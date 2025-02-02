<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import Button from '../components/Button/Button.vue'
import Tab from '../components/Tabs/Tab.vue'
import Tabs from '../components/Tabs/Tabs.vue'

const activeTab = ref('Home')
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Tabs
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Base</th>
          <td>
            <Tabs v-model="activeTab">
              <Tab label="Home" />
              <Tab label="About" />
              <Tab label="You" />
            </Tabs>
          </td>
        </tr>
        <tr>
          <th>Filled</th>
          <td>
            <Tabs v-model="activeTab" variant="filled">
              <Tab label="Home" />
              <Tab label="About" />
              <Tab label="You" />
            </Tabs>
          </td>
        </tr>
        <tr class="w-100">
          <th>Expanded</th>
          <td class="w-100">
            <Tabs v-model="activeTab" expand>
              <Tab label="Home" />
              <Tab label="About" />
              <Tab label="You" />
            </Tabs>

            <div class="mb-xl" />

            <Tabs v-model="activeTab" expand variant="filled">
              <Tab label="Home" />
              <Tab label="About" />
              <Tab label="You" />
            </Tabs>
          </td>
        </tr>
        <tr>
          <th>With slots</th>
          <td class="w-100">
            <Tabs v-model="activeTab">
              <template #start>
                <Button>
                  <template #start>
                    <Icon icon="ph:sidebar" />
                  </template>
                  Sidebar
                </Button>
              </template>
              <Tab label="Home" />
              <Tab label="About" />
              <Tab label="You" />
            </Tabs>

            <div class="mb-xl" />

            <Tabs v-model="activeTab" variant="filled">
              <Tab label="Home" />
              <Tab label="About" />
              <Tab label="You" />

              <template #end>
                <Button icon="ph:x" plain />
              </template>
            </Tabs>
          </td>
        </tr>
        <tr>
          <th>With slots expanded</th>
          <td class="w-100">
            <Tabs v-model="activeTab" expand>
              <template #start>
                <Button>
                  <template #start>
                    <Icon icon="ph:sidebar" />
                  </template>
                  Sidebar
                </Button>
              </template>
              <Tab label="Home" />
              <Tab label="About" />
              <Tab label="You" />
            </Tabs>

            <div class="mb-xl" />

            <Tabs v-model="activeTab" expand variant="filled">
              <Tab label="Home" />
              <Tab label="About" />
              <Tab label="You" />

              <template #end>
                <Button icon="ph:x" plain />
              </template>
            </Tabs>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
