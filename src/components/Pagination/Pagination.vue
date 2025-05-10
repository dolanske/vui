<script setup lang='ts'>
import type { Variants } from '../Button/Button.vue'
import type { Pagination } from './pagination'
import { computed } from 'vue'
import Button from '../Button/Button.vue'
import Flex from '../Flex/Flex.vue'
import Tooltip from '../Tooltip/Tooltip.vue'

interface Props {
  numbers?: boolean
  pagination: Pagination
  prevNext?: boolean
  firstLast?: boolean
  variant?: Variants
}

const props = withDefaults(defineProps<Props>(), {
  numbers: true,
  prevNext: true,
  firstLast: true,
  variant: 'gray',
})

const emit = defineEmits<{
  change: [page: number]
}>()

const canNextPage = computed(() => props.pagination.currentPage < props.pagination.endPage)
const canPrevPage = computed(() => props.pagination.currentPage > props.pagination.startPage)

function setNext() {
  emit('change', props.pagination.currentPage + 1)
}

function setPrev() {
  emit('change', props.pagination.currentPage - 1)
}
</script>

<template>
  <Flex inline class="vui-pagination" gap="xxs">
    <slot name="start">
      <Tooltip v-if="props.firstLast">
        <Button plain :disabled="props.pagination.startPage === props.pagination.currentPage" square icon="ph:caret-double-left" @click="emit('change', props.pagination.startPage)" />
        <template #tooltip>
          <p>First page</p>
        </template>
      </Tooltip>
    </slot>

    <slot name="prev" :disabled="canPrevPage" :set-page="setPrev">
      <Tooltip v-if="props.prevNext">
        <Button plain :disabled="!canPrevPage" square icon="ph:caret-left" @click="setPrev" />
        <template #tooltip>
          <p>Previous page</p>
        </template>
      </Tooltip>
    </slot>

    <template v-if="props.numbers">
      <Flex gap="xxs">
        <Button
          v-for="page in props.pagination.pages"
          :key="page"
          square
          :plain="props.pagination.currentPage !== page"
          variant="gray"
          @click="emit('change', page)"
        >
          {{ page }}
        </Button>
      </Flex>
    </template>
    <slot name="next" :disabled="canNextPage" :set-page="setNext">
      <Tooltip v-if="props.prevNext">
        <Button plain :disabled="!canNextPage" square icon="ph:caret-right" @click="setNext" />
        <template #tooltip>
          <p>Next page</p>
        </template>
      </Tooltip>
    </slot>

    <slot name="end">
      <Tooltip v-if="props.firstLast">
        <Button plain :disabled="props.pagination.endPage === props.pagination.currentPage" square icon="ph:caret-double-right" @click="emit('change', props.pagination.endPage)" />
        <template #tooltip>
          <p>Last page</p>
        </template>
      </Tooltip>
    </slot>
  </Flex>
</template>

<style scoped>
[data-title-top]:before {
  white-space: nowrap;
}
</style>
