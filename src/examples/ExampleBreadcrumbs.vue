<script setup lang='ts'>
import { Icon } from '@iconify/vue'
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
              <BreadcrumbItem label="Home" href="#" />
              <BreadcrumbItem label="About" href="#" />
              <BreadcrumbItem label="You" />
            </Breadcrumbs>
          </td>
        </tr>
        <tr>
          <th>With components</th>
          <td>
            <Breadcrumbs>
              <BreadcrumbItem label="Home" href="#" />
              <BreadcrumbItem label="About" href="#" />
              <BreadcrumbItem>
                <Button size="s">
                  Switch
                  <template #end>
                    <Icon icon="ph:caret-down" />
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
