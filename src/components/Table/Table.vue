<script setup lang='ts'>
import type { SelectProvide } from './table'
import { inject } from 'vue'
import Checkbox from '../Checkbox/Checkbox.vue'
import { SelectProvideSymbol } from './table'
import './table.scss'

interface Props {
  // Pagination settings
  // data: TableDataDefinition

  // search?: string

  // Used to add checkboxs to each row
  select?: boolean
  /**
   * Sets the `table-layout` property
   */
  fixed?: boolean
  /**
   * Table cells with content overflowing on new line will be cropped
   */
  nowrap?: boolean
}

const {
  select,
  fixed,
  nowrap,
} = defineProps<Props>()

// TODO: type slots

// const slots = defineSlots<{
//   header: (props: {}) => any
//   body: (props: {}) => any
//   pagination: () => any
// }>()

const selected = inject(SelectProvideSymbol)
// TODO: use provide and implement selecting
</script>

<template>
  <div class="vui-table-container" :class="{ fixed, nowrap }">
    <table>
      <thead>
        <tr>
          <th v-if="select" class="vui-table-checkbox-cell">
            <Checkbox @change="selected?.selectAllRows()" />
          </th>
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
