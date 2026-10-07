<script setup lang='ts'>
import type { TableSelectionProvide } from './table'
import { computed, inject, provide } from 'vue'
import { viewport } from '../../lib/viewport'
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
   * Pins the selected so it stays visible while user scrolls the table horizontally
   */
  pin?: 'first' | 'last' | 'both'
  /**
   * Enable automatic horizontal scrolling if table content ovetflows its container
   */
  scroll?: boolean
  /**
   * The object returned by `defineTable`. Required when a single component
   * defines more than one table, otherwise the closest `defineTable` is used.
   */
  table?: { selection: TableSelectionProvide }
}

const {
  pin,
  fixed,
  scroll,
  nowrap,
  separateRows = true,
  separateCells = false,
  outerBorder = true,
  table,
} = defineProps<Props>()

const injected = inject(TableSelectionProvideSymbol, null)
const selecting = computed(() => table?.selection ?? injected)

if (!table && !injected)
  console.warn('[Table.Root] No table found. Call `defineTable` in a parent component or pass its result with the `table` prop.')

// Children (SelectAll / SelectRow) always talk to the table of this Root
if (selecting.value) {
  provide(TableSelectionProvideSymbol, {
    get selectedRows() { return selecting.value!.selectedRows },
    get enabled() { return selecting.value!.enabled },
    get isSelectedAll() { return selecting.value!.isSelectedAll },
    get isSelectedSome() { return selecting.value!.isSelectedSome },
    selectRow: row => selecting.value?.selectRow(row),
    selectAllRows: () => selecting.value?.selectAllRows(),
  } as TableSelectionProvide)
}

const isSelecting = computed(() => !!selecting.value?.enabled.value)
</script>

<template>
  <div
    class="vui-table-container"
    :class="{
      fixed,
      nowrap,
      'selecting': isSelecting,
      'separated-rows': separateRows,
      'separated-cells': separateCells,
      'outer-border': outerBorder,
      'pin-first': (pin === 'first' || pin === 'both') && !viewport.s,
      'pin-last': (pin === 'last' || pin === 'both') && !viewport.s,
      'vui-table-overflow': scroll,
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
