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
  /**
   * Variant of the button representing the current page
   */
  variant?: Variants
  /**
   * Always shows the first and last page, with an ellipsis for skipped pages
   * (1 … 4 5 6 … 20)
   */
  ellipsis?: boolean
  /**
   * Accessible name of the navigation landmark
   */
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  numbers: true,
  prevNext: true,
  firstLast: true,
  variant: 'gray',
  ellipsis: false,
  label: 'Pagination',
})

const emit = defineEmits<{
  change: [page: number]
}>()

// Previous / next pages exist based on the data, not on the visible window
const canNextPage = computed(() => props.pagination.currentPage < props.pagination.totalPages)
const canPrevPage = computed(() => props.pagination.currentPage > 1)

function setPage(page: number) {
  const clamped = Math.min(Math.max(1, page), props.pagination.totalPages)
  if (clamped !== props.pagination.currentPage)
    emit('change', clamped)
}

function setNext() {
  setPage(props.pagination.currentPage + 1)
}

function setPrev() {
  setPage(props.pagination.currentPage - 1)
}

type PageItem = { type: 'page', page: number } | { type: 'ellipsis', key: string }

const items = computed<PageItem[]>(() => {
  const { pages, totalPages } = props.pagination
  const list: PageItem[] = pages.map(page => ({ type: 'page', page }))

  if (!props.ellipsis || pages.length === 0)
    return list

  const first = pages[0]
  const last = pages[pages.length - 1]

  if (first > 1) {
    if (first > 2)
      list.unshift({ type: 'ellipsis', key: 'start' })
    list.unshift({ type: 'page', page: 1 })
  }

  if (last < totalPages) {
    if (last < totalPages - 1)
      list.push({ type: 'ellipsis', key: 'end' })
    list.push({ type: 'page', page: totalPages })
  }

  return list
})
</script>

<template>
  <nav class="vui-pagination-nav" :aria-label="props.label">
    <Flex inline class="vui-pagination" gap="xxs">
      <slot name="start" :disabled="!canPrevPage" :set-page="() => setPage(1)">
        <Tooltip v-if="props.firstLast">
          <Button plain :disabled="!canPrevPage" square aria-label="First page" @click="setPage(1)">
            <IconCaretDoubleLeft />
          </Button>
          <template #tooltip>
            <p>First page</p>
          </template>
        </Tooltip>
      </slot>

      <slot name="prev" :disabled="!canPrevPage" :set-page="setPrev">
        <Tooltip v-if="props.prevNext">
          <Button plain :disabled="!canPrevPage" square aria-label="Previous page" @click="setPrev">
            <IconCaretLeft />
          </Button>
          <template #tooltip>
            <p>Previous page</p>
          </template>
        </Tooltip>
      </slot>

      <template v-if="props.numbers">
        <Flex gap="xxs">
          <template v-for="item in items" :key="item.type === 'page' ? item.page : item.key">
            <span v-if="item.type === 'ellipsis'" class="vui-pagination-ellipsis" aria-hidden="true">…</span>
            <Button
              v-else
              square
              :plain="props.pagination.currentPage !== item.page"
              :variant="props.pagination.currentPage === item.page ? props.variant : 'gray'"
              :aria-label="`Page ${item.page}`"
              :aria-current="props.pagination.currentPage === item.page ? 'page' : undefined"
              @click="setPage(item.page)"
            >
              {{ item.page }}
            </Button>
          </template>
        </Flex>
      </template>

      <slot name="next" :disabled="!canNextPage" :set-page="setNext">
        <Tooltip v-if="props.prevNext">
          <Button plain :disabled="!canNextPage" square aria-label="Next page" @click="setNext">
            <IconCaretRight />
          </Button>
          <template #tooltip>
            <p>Next page</p>
          </template>
        </Tooltip>
      </slot>

      <slot name="end" :disabled="!canNextPage" :set-page="() => setPage(props.pagination.totalPages)">
        <Tooltip v-if="props.firstLast">
          <Button plain :disabled="!canNextPage" square aria-label="Last page" @click="setPage(props.pagination.totalPages)">
            <IconCaretDoubleRight />
          </Button>
          <template #tooltip>
            <p>Last page</p>
          </template>
        </Tooltip>
      </slot>
    </Flex>
  </nav>
</template>

<style scoped>
@layer vui.reset, vui.base, vui.components, vui.modifiers, vui.utilities;

@layer vui.components {
  .vui-pagination-nav {
    display: inline-block;
  }

  .vui-pagination-ellipsis {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--interactive-el-height);
    color: var(--color-text-lighter);
  }
}
</style>
