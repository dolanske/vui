<script setup lang='ts'>
import type { TableSelectionProvide } from './table'
import { inject } from 'vue'
import Checkbox from '../Checkbox/Checkbox.vue'
import { TableSelectionProvideSymbol } from './table'

const {
  allRowsSelected,
  enabled,
  selectAllRows,
} = inject(TableSelectionProvideSymbol) as TableSelectionProvide
</script>

<template>
  <th v-if="enabled" class="vui-table-checkbox-cell">
    <Checkbox
      :checked="allRowsSelected"
      @change="selectAllRows()"
    />
  </th>
</template>
