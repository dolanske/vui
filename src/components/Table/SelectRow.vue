<script setup lang='ts'>
import { IconCheckSquareFill, IconSquare } from '@iconify-prerendered/vue-ph'
import { computed, inject } from 'vue'
import Button from '../Button/Button.vue'
import { TableSelectionProvideSymbol } from './table'

interface Props {
  row: any
  /**
   * Accessible label of the checkbox
   */
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Select row',
})

const selection = inject(TableSelectionProvideSymbol, null)

if (!selection)
  console.warn('[Table.SelectRow] must be used inside <Table.Root> together with `defineTable`.')

const isSelected = computed(() => !!selection?.selectedRows.value.has(props.row.id))
</script>

<template>
  <td v-if="selection?.enabled.value" class="vui-table-interactive-cell" :class="{ selected: isSelected }">
    <Button
      square
      plain
      role="checkbox"
      :aria-checked="isSelected"
      :aria-label="props.label"
      @click="selection.selectRow(props.row)"
    >
      <IconCheckSquareFill v-if="isSelected" />
      <IconSquare v-else />
    </Button>
  </td>
</template>
