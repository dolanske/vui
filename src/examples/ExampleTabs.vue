<script setup lang='ts'>
import { IconHouse, IconInfo, IconSidebar, IconX } from '@iconify-prerendered/vue-ph'
import { ref } from 'vue'
import Button from '../components/Button/Button.vue'
import Flex from '../components/Flex/Flex.vue'
import Tab from '../components/Tabs/Tab.vue'
import TabPanel from '../components/Tabs/TabPanel.vue'
import Tabs from '../components/Tabs/Tabs.vue'

const activeTab = ref('Home')
const noActiveNow = ref('')
const activeWithDisabled = ref('Overview')
const activePanel = ref('Account')
const activeMany = ref('Tab 1')

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
              <Button @click="activeDynamic = ''">
                Remove Active
              </Button>
            </Flex>
            <Tabs v-model="activeDynamic">
              <Tab v-for="tab in dynamicTabs" :key="tab" :value="tab" />
            </Tabs>
          </td>
        </tr>
        <tr>
          <th>Disabled tab <br> Arrow keys skip it</th>
          <td>
            <Tabs v-model="activeWithDisabled">
              <Tab value="Overview" />
              <Tab value="Billing" disabled />
              <Tab value="Settings" />
            </Tabs>
          </td>
        </tr>
        <tr>
          <th>Disabled tabs</th>
          <td>
            <Tabs model-value="Home" disabled>
              <Tab value="Home" />
              <Tab value="About" />
            </Tabs>
          </td>
        </tr>
        <tr>
          <th>Linked panels</th>
          <td>
            <Tabs id="example-panels" v-model="activePanel">
              <Tab value="Account" />
              <Tab value="Password" />
              <Tab value="Notifications" />
            </Tabs>
            <TabPanel tabs="example-panels" value="Account" :active="activePanel">
              <p class="py-m">
                Account panel, labelled by its tab.
              </p>
            </TabPanel>
            <TabPanel tabs="example-panels" value="Password" :active="activePanel">
              <p class="py-m">
                Password panel.
              </p>
            </TabPanel>
            <TabPanel tabs="example-panels" value="Notifications" :active="activePanel" keep-mounted>
              <p class="py-m">
                Notifications panel, kept mounted while hidden.
              </p>
            </TabPanel>
          </td>
        </tr>
        <tr>
          <th>Custom tab content</th>
          <td>
            <Tabs v-model="activeTab">
              <Tab value="Home">
                <Flex gap="xs" y-center>
                  <IconHouse /> Home
                </Flex>
              </Tab>
              <Tab value="About">
                <Flex gap="xs" y-center>
                  <IconInfo /> About
                </Flex>
              </Tab>
            </Tabs>
          </td>
        </tr>
        <tr>
          <th>Many tabs, narrow space</th>
          <td style="max-width: 320px">
            <Tabs v-model="activeMany">
              <Tab v-for="i in 12" :key="i" :value="`Tab ${i}`" />
            </Tabs>
          </td>
        </tr>
        <tr>
          <th>No transition</th>
          <td>
            <Tabs v-model="activeTab" transition-name="none">
              <Tab value="Home" />
              <Tab value="About" />
              <Tab value="You" />
            </Tabs>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
