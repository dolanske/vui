<script setup lang='ts'>
import type { TableDataDefinition } from './table'
import { useSlots } from 'vue'
import './table.scss'

interface Props {
  // Pagination settings
  // data: TableDataDefinition

  // search?: string

  // Used to add checkboxs to each row
  select?: boolean
}

const props = defineProps<Props>()

const slots = defineSlots<{
  header: (props: {}) => any
  body: (props: {}) => any
  pagination: () => any
}>()
</script>

<template>
  <div class="vui-table-container">
    <table>
      <thead>
        <tr>
          <slot name="header" />
        </tr>
      </thead>
      <tbody>
        <slot name="body" />
      </tbody>
    </table>

    <div class="vui-table-pagination-wrap">
      <slot name="pagination" />
    </div>
  </div>
</template>
