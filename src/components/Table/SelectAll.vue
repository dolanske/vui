<script setup lang='ts'>
import { IconCheckSquareFill, IconMinusSquareFill, IconSquare } from '@iconify-prerendered/vue-ph'
import { computed, inject } from 'vue'
import Button from '../Button/Button.vue'
import { TableSelectionProvideSymbol } from './table'

const { label = 'Select all rows' } = defineProps<{
  /**
   * Accessible label of the checkbox
   */
  label?: string
}>()

const selection = inject(TableSelectionProvideSymbol, null)

if (!selection)
  console.warn('[Table.SelectAll] must be used inside <Table.Root> together with `defineTable`.')

const checked = computed(() => {
  if (selection?.isSelectedAll.value)
    return 'true'
  return selection?.isSelectedSome.value ? 'mixed' : 'false'
})
</script>

<template>
  <th v-if="selection?.enabled.value" class="vui-table-interactive-cell" :class="{ selected: checked === 'true' }">
    <Button
      square
      plain
      role="checkbox"
      :aria-checked="checked"
      :aria-label="label"
      @click="selection.selectAllRows()"
    >
      <IconCheckSquareFill v-if="checked === 'true'" />
      <IconMinusSquareFill v-else-if="checked === 'mixed'" />
      <IconSquare v-else />
    </Button>
  </th>
</template>
