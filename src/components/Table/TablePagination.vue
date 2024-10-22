<script setup lang='ts'>
import type { Pagination } from '../../shared/helpers'
import { type ComputedRef, inject } from 'vue'
import Button from '../Button/Button.vue'
import Flex from '../Flex/Flex.vue'
import { PaginationSymbol } from './table'

export interface PaginationContext {
  pagination: ComputedRef<Pagination>
  canPrevPage: ComputedRef<boolean>
  canNextPage: ComputedRef<boolean>
  setPage: (index: number) => void
}

interface Props {
  numbers?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  numbers: true,
})

const {
  pagination,
  canNextPage,
  canPrevPage,
  setPage,
} = inject<PaginationContext>(PaginationSymbol, {} as PaginationContext)
</script>

<template>
  <Flex inline>
    <Button plain :disabled="!canPrevPage" square icon="ph:caret-left" @click="setPage(pagination.currentPage - 1)" />
    <template v-if="props.numbers">
      <Button
        v-for="page in pagination.pages"
        :key="page"
        square
        :plain="pagination.currentPage !== page"
        :variant="pagination.currentPage === page ? 'blue' : 'default'"
        @click="setPage(page)"
      >
        {{ page }}
      </Button>
    </template>

    <Button plain :disabled="!canNextPage" square icon="ph:caret-right" @click="setPage(pagination.currentPage + 1)" />
  </Flex>
</template>
