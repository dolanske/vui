<script setup lang='ts'>
import type { BaseRow, TableSelectionProvide } from './table'
import { inject } from 'vue'
import Checkbox from '../Checkbox/Checkbox.vue'
import { generateRowId, TableSelectionProvideSymbol } from './table'

interface Props {
  row: BaseRow
}

const props = defineProps<Props>()
const {
  enabled,
  selectedIds,
  selectRow,
} = inject(TableSelectionProvideSymbol) as TableSelectionProvide
</script>

<template>
  <td v-if="enabled" class="vui-table-checkbox-cell">
    <Checkbox
      :checked="selectedIds.has(generateRowId(props.row))"
      @change="selectRow(props.row)"
    />
  </td>
</template>
