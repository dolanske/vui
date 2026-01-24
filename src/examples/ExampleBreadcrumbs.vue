<script setup lang='ts'>
import { IconCaretDown } from '@iconify-prerendered/vue-ph'
import BreadcrumbItem from '../components/Breadcrumbs/BreadcrumbItem.vue'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs.vue'
import Button from '../components/Button/Button.vue'
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Breadcrumbs
    </h3>

    <table>
      <tbody>
        <tr>
          <th>Base with links</th>
          <td>
            <Breadcrumbs>
              <BreadcrumbItem label="Home" />
              <BreadcrumbItem label="About" href="#" />
              <BreadcrumbItem label="You" href="#" />
            </Breadcrumbs>
          </td>
        </tr>
        <tr>
          <th>With components and buttons</th>
          <td>
            <Breadcrumbs>
              <BreadcrumbItem label="Home" @click="console.log('bro')" />
              <BreadcrumbItem label="About" @click="console.log('bro')" />
              <BreadcrumbItem>
                <Button size="s">
                  Switch
                  <template #end>
                    <IconCaretDown />
                  </template>
                </Button>
              </BreadcrumbItem>
            </Breadcrumbs>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
