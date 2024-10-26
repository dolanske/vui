<script setup lang="ts">
import type { Header } from './table'
import { computed } from 'vue'
import Button from '../Button/Button.vue'

interface Props {
  header: Header
  disableSort?: boolean
}

const props = defineProps<Props>()

const icon = computed(() => {
  switch (props.header.sortKey) {
    case 'asc': return 'ph:sort-ascending'
    case 'desc': return 'ph:sort-descending'
    default: return 'ph:arrows-down-up'
  }
})
</script>

<template>
  <th>
    <div class="vui-table-th-content">
      <Button
        v-if="props.disableSort !== true"
        class="vui-table-sort-button"
        :class="{ active: !!props.header.sortKey }"
        size="s"
        plain
        square
        :icon="icon"
        @click="props.header.sortToggle"
      />
      <slot>
        {{ props.header.label }}
      </slot>
    </div>
  </th>
</template>
