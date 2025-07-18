<script setup lang='ts'>
import { IconSidebar, IconX } from '@iconify-prerendered/vue-ph'
import { ref } from 'vue'
import Button from '../components/Button/Button.vue'
import Flex from '../components/Flex/Flex.vue'
import Tab from '../components/Tabs/Tab.vue'
import Tabs from '../components/Tabs/Tabs.vue'
// import Flex from '../components/Flex/Flex.vue'

const activeTab = ref('Home')
const noActiveNow = ref('')

// Dynamic test
const dynamicTabs = ref(['First', 'Second', 'Third'])
const activeDynamic = ref(dynamicTabs.value[0])
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Tabs
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Base + nothing active at first</th>
          <td>
            <Tabs v-model="noActiveNow">
              <Tab value="Home" />
              <Tab value="About" />
              <Tab value="You" />
            </Tabs>
          </td>
        </tr>
        <tr>
          <th>Filled</th>
          <td>
            <Tabs v-model="activeTab" variant="filled">
              <Tab value="Home" />
              <Tab value="About" />
              <Tab value="You" />
            </Tabs>
          </td>
        </tr>
        <tr class="w-100">
          <th>Expanded</th>
          <td class="w-100">
            <Tabs v-model="activeTab" expand>
              <Tab value="Home" />
              <Tab value="About" />
              <Tab value="You" />
            </Tabs>

            <div class="mb-xl" />

            <Tabs v-model="activeTab" expand variant="filled">
              <Tab value="Home" />
              <Tab value="About" />
              <Tab value="You" />
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
                    <IconSidebar />
                  </template>
                  Sidebar
                </Button>
              </template>
              <Tab value="Home" />
              <Tab value="About" />
              <Tab value="You" />
            </Tabs>

            <div class="mb-xl" />

            <Tabs v-model="activeTab" variant="filled">
              <Tab value="Home" />
              <Tab value="About" />
              <Tab value="You" />

              <template #end>
                <Button plain>
                  <IconX />
                </Button>
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
                    <IconSidebar />
                  </template>
                  Sidebar
                </Button>
              </template>
              <Tab value="Home" />
              <Tab value="About" />
              <Tab value="You" />
            </Tabs>

            <div class="mb-xl" />

            <Tabs v-model="activeTab" expand variant="filled">
              <Tab value="Home" />
              <Tab value="About" />
              <Tab value="You" />

              <template #end>
                <Button plain>
                  <IconX />
                </Button>
              </template>
            </Tabs>
          </td>
        </tr>
        <tr>
          <th>Dynamic</th>
          <td>
            <Flex>
              <Button @click="dynamicTabs.push(`Tab ${dynamicTabs.length}`)">
                Add
              </Button>
              <Button @click="dynamicTabs.shift()">
                Remove
              </Button>
            </Flex>
            <Tabs v-model="activeDynamic">
              <Tab v-for="tab in dynamicTabs" :key="tab" :value="tab" />
            </Tabs>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
