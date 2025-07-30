<script setup lang='ts'>
import type { Variants } from '../Button/Button.vue'
import type { Pagination } from './pagination'
import { IconCaretDoubleLeft, IconCaretDoubleRight, IconCaretLeft, IconCaretRight } from '@iconify-prerendered/vue-ph'
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
        <Button plain :disabled="props.pagination.startPage === props.pagination.currentPage" square @click="emit('change', props.pagination.startPage)">
          <IconCaretDoubleLeft />
        </Button>
        <template #tooltip>
          <p>First page</p>
        </template>
      </Tooltip>
    </slot>

    <slot name="prev" :disabled="canPrevPage" :set-page="setPrev">
      <Tooltip v-if="props.prevNext">
        <Button plain :disabled="!canPrevPage" square @click="setPrev">
          <IconCaretLeft />
        </Button>
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
        <Button plain :disabled="!canNextPage" square @click="setNext">
          <IconCaretRight />
        </Button>
        <template #tooltip>
          <p>Next page</p>
        </template>
      </Tooltip>
    </slot>

    <slot name="end">
      <Tooltip v-if="props.firstLast">
        <Button plain :disabled="props.pagination.endPage === props.pagination.currentPage" square @click="emit('change', props.pagination.endPage)">
          <IconCaretDoubleRight />
        </Button>
        <template #tooltip>
          <p>Last page</p>
        </template>
      </Tooltip>
    </slot>
  </Flex>
</template>
