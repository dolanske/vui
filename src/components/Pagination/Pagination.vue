<script setup lang='ts'>
import type { Pagination } from './pagination'
import { computed } from 'vue'
import Button from '../Button/Button.vue'
import Flex from '../Flex/Flex.vue'

interface Props {
  numbers?: boolean
  pagination: Pagination
  prevNext?: boolean
  firstLast?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  numbers: true,
  prevNext: true,
  firstLast: true,
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
  <Flex inline class="vui-pagination">
    <slot name="start">
      <Button v-if="props.firstLast" data-title-top="First page" plain :disabled="props.pagination.startPage === props.pagination.currentPage" square icon="ph:caret-double-left" @click="emit('change', props.pagination.startPage)" />
    </slot>

    <slot name="prev" :disabled="canPrevPage" :set-page="setPrev">
      <Button v-if="props.prevNext" data-title-top="Previous page" plain :disabled="!canPrevPage" square icon="ph:caret-left" @click="setPrev" />
    </slot>

    <template v-if="props.numbers">
      <Flex gap="s">
        <Button
          v-for="page in props.pagination.pages"
          :key="page"
          square
          :plain="props.pagination.currentPage !== page"
          :variant="props.pagination.currentPage === page ? 'blue' : 'default'"
          @click="emit('change', page)"
        >
          {{ page }}
        </Button>
      </Flex>
    </template>
    <slot name="next" :disabled="canNextPage" :set-page="setNext">
      <Button v-if="props.prevNext" data-title-top="Next page" plain :disabled="!canNextPage" square icon="ph:caret-right" @click="setNext" />
    </slot>

    <slot name="end">
      <Button v-if="props.firstLast" data-title-top="Last page" plain :disabled="props.pagination.endPage === props.pagination.currentPage" square icon="ph:caret-double-right" @click="emit('change', props.pagination.endPage)" />
    </slot>
  </Flex>
</template>
