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
  fixed?: boolean
  /**
   * Table cells with content overflowing on new line will be cropped
   */
  nowrap?: boolean
}

const {
  // select,
  fixed,
  nowrap,
} = defineProps<Props>()

const slots = defineSlots<{
  header: (props: {}) => any
  body: (props: {}) => any
  pagination: () => any
}>()
</script>

<template>
  <div class="vui-table-container" :class="{ fixed, nowrap }">
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
