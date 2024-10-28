<script setup lang='ts'>
import type { TableSelectionProvide } from './table'
import { inject, onMounted } from 'vue'
import Checkbox from '../Checkbox/Checkbox.vue'
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
}

const {
  fixed,
  nowrap,
} = defineProps<Props>()

const selecting = inject(TableSelectionProvideSymbol) as TableSelectionProvide
</script>

<template>
  <div class="vui-table-container" :class="{ fixed, nowrap, selecting: selecting.enabled }">
    <table>
      <thead>
        <tr>
          <slot name="header" />
        </tr>
      </thead>
      <tbody>
        <slot name="body" />
      </tbody>
    </table>

    <div class="vui-table-pagination-wrap">
      <slot name="pagination" />
    </div>
  </div>
</template>
