<script setup>
import { Flex, paginate, Pagination } from '@dolanske/vui'
import { computed, ref } from 'vue'

const currentPage = ref(1)
const totalItems = 100
const perPage = 10

const pagination = computed(() => paginate(totalItems, currentPage.value, perPage))
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <Pagination
          :pagination="pagination"
          @change="(page) => currentPage = page"
        />
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
