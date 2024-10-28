<script setup lang='ts'>
import type { TableSelectionProvide } from './table'
import { inject } from 'vue'
import Button from '../Button/Button.vue'
import { TableSelectionProvideSymbol } from './table'

const {
  isSelectedAll,
  enabled,
  selectAllRows,
} = inject(TableSelectionProvideSymbol) as TableSelectionProvide
</script>

<template>
  <th v-if="enabled" class="vui-table-checkbox-cell" :class="{ selected: isSelectedAll }">
    <Button
      square
      plain
      :icon="isSelectedAll ? 'ph:check-square-fill' : 'ph:square'"
      @click="selectAllRows()"
    />
  </th>
</template>
