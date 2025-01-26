<script setup lang='ts'>
import type { TableSelectionProvide } from './table'
import { inject } from 'vue'
import { TableSelectionProvideSymbol } from './table'
import './table.scss'

interface Props {
  /**
   * Sets the `table-layout` property
   */
  fixed?: boolean
  /**
   * Table cells with content overflowing on new line will be cropped
   */
  nowrap?: boolean
  /**
   * Add a visual separator between each row
   */
  separateRows?: boolean
  /**
   * Add a visual separator between each cell
   */
  separateCells?: boolean
  /**
   * Wrap table with a border
   */
  outerBorder?: boolean
  /**
   * TODO:
   * Alternate row background color
   */
  // alternate?: boolean
}

const {
  fixed,
  nowrap,
  separateRows = true,
  separateCells = false,
  outerBorder = true,
} = defineProps<Props>()
const selecting = inject(TableSelectionProvideSymbol) as TableSelectionProvide
</script>

<template>
  <div
    class="vui-table-container"
    :class="{
      fixed,
      nowrap,
      'selecting': selecting.enabled,
      'separated-rows': separateRows,
      'separated-cells': separateCells,
      'outer-border': outerBorder,
    }"
  >
    <table>
      <thead v-if="$slots.header">
        <tr>
          <slot name="header" />
        </tr>
      </thead>
      <tbody>
        <slot name="body" />
      </tbody>
    </table>
    <div v-if="$slots.pagination" class="vui-table-pagination-wrap">
      <slot name="pagination" />
    </div>
  </div>
</template>
