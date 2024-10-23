<script setup lang='ts'>
import type { Pagination } from './pagination'
import { computed } from 'vue'
import Button from '../Button/Button.vue'
import Flex from '../Flex/Flex.vue'

interface Props {
  numbers?: boolean
  pagination: Pagination
}

const props = withDefaults(defineProps<Props>(), {
  numbers: true,
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
  <Flex inline>
    <slot name="prev" :disabled="canPrevPage" :set-page="setPrev">
      <Button plain :disabled="!canPrevPage" square icon="ph:caret-left" @click="setPrev" />
    </slot>

    <template v-if="props.numbers">
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
    </template>
    <slot name="next" :disabled="canNextPage" :set-page="setNext">
      <Button plain :disabled="!canNextPage" square icon="ph:caret-right" @click="setNext" />
    </slot>
  </Flex>
</template>

<style scoped>
.vui-button * {
  transition-duration: 0;
}
</style>
