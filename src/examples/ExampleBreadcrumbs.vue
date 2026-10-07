<script setup lang='ts'>
import { IconCaretDown, IconHouse } from '@iconify-prerendered/vue-ph'
import { ref } from 'vue'
import BreadcrumbItem from '../components/Breadcrumbs/BreadcrumbItem.vue'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs.vue'
import Button from '../components/Button/Button.vue'
import Dropdown from '../components/Dropdown/Dropdown.vue'
import DropdownItem from '../components/Dropdown/DropdownItem.vue'

const path = ref(['Home', 'Projects', 'VUI', 'Components', 'Breadcrumbs'])
const clicked = ref('-')

function goTo(index: number) {
  path.value = path.value.slice(0, index + 1)
}
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Breadcrumbs
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Links</th>
          <td>
            <Breadcrumbs>
              <BreadcrumbItem label="Home" href="#" />
              <BreadcrumbItem label="About" href="#" />
              <BreadcrumbItem label="You" />
            </Breadcrumbs>
          </td>
        </tr>
        <tr>
          <th>Click handlers</th>
          <td>
            <Breadcrumbs>
              <BreadcrumbItem label="Home" @click="clicked = 'Home'" />
              <BreadcrumbItem label="About" @click="clicked = 'About'" />
              <BreadcrumbItem label="Current" />
            </Breadcrumbs>
            <p class="mt-xs">
              Clicked: {{ clicked }}
            </p>
          </td>
        </tr>
        <tr>
          <th>Dynamic <br> Click to navigate up</th>
          <td>
            <Breadcrumbs>
              <BreadcrumbItem v-for="(item, index) in path" :key="item" :label="item" @click="goTo(index)" />
            </Breadcrumbs>
            <Button size="s" class="mt-s" @click="path = ['Home', 'Projects', 'VUI', 'Components', 'Breadcrumbs']">
              Reset
            </Button>
          </td>
        </tr>
        <tr>
          <th>Custom separator</th>
          <td>
            <Breadcrumbs separator="›">
              <BreadcrumbItem label="Home" href="#" />
              <BreadcrumbItem label="Docs" href="#" />
              <BreadcrumbItem label="Page" />
            </Breadcrumbs>
          </td>
        </tr>
        <tr>
          <th>Explicit current page</th>
          <td>
            <Breadcrumbs>
              <BreadcrumbItem label="Home" href="#" />
              <BreadcrumbItem label="Settings" current />
              <BreadcrumbItem label="Profile" href="#" />
            </Breadcrumbs>
          </td>
        </tr>
        <tr>
          <th>Components</th>
          <td>
            <Breadcrumbs>
              <BreadcrumbItem href="#">
                <IconHouse />
              </BreadcrumbItem>
              <BreadcrumbItem label="Workspace" href="#" />
              <BreadcrumbItem>
                <Dropdown>
                  <template #trigger="{ toggle }">
                    <Button size="s" @click="toggle">
                      Switch project
                      <template #end>
                        <IconCaretDown />
                      </template>
                    </Button>
                  </template>
                  <DropdownItem>VUI</DropdownItem>
                  <DropdownItem>Hivecom</DropdownItem>
                </Dropdown>
              </BreadcrumbItem>
            </Breadcrumbs>
          </td>
        </tr>
        <tr>
          <th>Long path, narrow space</th>
          <td style="max-width: 280px">
            <Breadcrumbs>
              <BreadcrumbItem v-for="i in 8" :key="i" :label="`Level ${i}`" href="#" />
            </Breadcrumbs>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
