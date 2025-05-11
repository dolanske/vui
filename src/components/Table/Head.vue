<script setup lang="ts">
import type { Header } from './table'
import { computed } from 'vue'
import Button from '../Button/Button.vue'
import Tooltip from '../Tooltip/Tooltip.vue'

interface Props {
  /**
   * Main header data. This can be empty in case we are just adding an empty
   * padder. It is recommended to just use <th> instead, but this shouldn't fail
   * anyway
   */
  header?: Header
  /**
   * Enable sorting on this column
   */
  sort?: boolean
}

const props = defineProps<Props>()

const sortStateBind = computed(() => {
  if (!props.header)
    return
  switch (props.header.sortKey) {
    case 'asc': return {
      icon: 'ph:sort-ascending',
      tooltipText: 'Ascending',
    }
    case 'desc': return {
      icon: 'ph:sort-descending',
      tooltipText: 'Descending',
    }
    default: return {
      icon: 'ph:arrows-down-up',
      tooltipText: 'Sort column',
    }
  }
})
</script>

<template>
  <th>
    <div v-if="props.header || $slots.default" class="vui-table-th-content">
      <slot>
        {{ props.header?.label }}
      </slot>
      <template v-if="props.sort && props.header">
        <Tooltip placement="top">
          <Button
            :icon="sortStateBind?.icon"
            class="vui-table-sort-button"
            size="s"
            :plain="!!!props.header.sortKey"
            square
            variant="gray"
            @click="props.header.sortToggle"
          />
          <template #tooltip>
            {{ sortStateBind?.tooltipText }}
          </template>
        </Tooltip>
      </template>
    </div>
  </th>
</template>
