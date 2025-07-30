<script setup lang='ts'>
import type { BaseRow, TableSelectionProvide } from './table'
import { IconCheckSquareFill, IconSquare } from '@iconify-prerendered/vue-ph'
import { computed, inject } from 'vue'
import { isObjectInSet } from '../../shared/helpers'
import Button from '../Button/Button.vue'
import { TableSelectionProvideSymbol } from './table'

interface Props {
  row: BaseRow
}

const props = defineProps<Props>()
const {
  enabled,
  selectRow,
  selectedRows,
} = inject(TableSelectionProvideSymbol) as TableSelectionProvide
const isSelected = computed(() => isObjectInSet(selectedRows.value, props.row))
</script>

<template>
  <td v-if="enabled" class="vui-table-interactive-cell" :class="{ selected: isSelected }">
    <Button
      square
      plain
      @click="selectRow(props.row)"
    >
      <IconCheckSquareFill v-if="isSelected" />
      <IconSquare v-else />
    </Button>
  </td>
</template>
