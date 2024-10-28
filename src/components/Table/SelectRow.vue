<script setup lang='ts'>
import type { BaseRow, TableSelectionProvide } from './table'
import { computed, inject } from 'vue'
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

const isSelected = computed(() => selectedRows.value.has(props.row))
</script>

<template>
  <td v-if="enabled" class="vui-table-checkbox-cell" :class="{ selected: isSelected }">
    <Button
      square
      plain
      :icon="isSelected ? 'ph:check-square-fill' : 'ph:square-bold'"
      @click="selectRow(props.row)"
    />
  </td>
</template>
