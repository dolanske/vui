<script setup lang='ts'>
import type { TableSelectionProvide } from './table'
import { IconCheckSquareFill, IconSquare } from '@iconify-prerendered/vue-ph'
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
  <th v-if="enabled" class="vui-table-interactive-cell" :class="{ selected: isSelectedAll }">
    <Button
      square
      plain
      @click="selectAllRows()"
    >
      <IconCheckSquareFill v-if="isSelectedAll" />
      <IconSquare v-else />
    </Button>
  </th>
</template>
