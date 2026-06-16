<script setup lang='ts'>
import type { TableSelectionProvide } from './table'
import { IconCheckSquareFill, IconSquare } from '@iconify-prerendered/vue-ph'
import { computed, inject } from 'vue'
import Button from '../Button/Button.vue'
import { TableSelectionProvideSymbol } from './table'

interface Props {
  row: any
}

const props = defineProps<Props>()
const {
  enabled,
  selectRow,
  selectedRows,
} = inject(TableSelectionProvideSymbol) as TableSelectionProvide

const isSelected = computed(() => selectedRows.value.has(props.row.id))
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
