# Pagination

The Pagination component provides a user interface for navigating through paginated content. It supports page numbers, previous/next buttons, and first/last page navigation.

::pagination-example

```vue
<script setup>
import { paginate, Pagination } from '@dolanske/vui'
import { computed, ref } from 'vue'

const currentPage = ref(1)
const totalItems = 100
const perPage = 10

const pagination = computed(() => paginate(totalItems, currentPage.value, perPage))

function handlePageChange(page) {
  currentPage.value = page
}
</script>

<template>
  <Pagination
    :pagination="pagination"
    @change="handlePageChange"
  />
</template>
```

::

### Props

| Name         | Default  | Type                                                                             |
| ------------ | -------- | -------------------------------------------------------------------------------- |
| `pagination` | required | `Pagination` <br> The pagination state object containing page information        |
| `numbers`    | `true`   | `boolean` <br> Whether to show page numbers                                      |
| `prevNext`   | `true`   | `boolean` <br> Whether to show previous/next buttons                             |
| `firstLast`  | `true`   | `boolean` <br> Whether to show first/last page buttons                           |
| `variant`    | `'gray'` | `fill` `danger` `success` `link` `accent` `gray` <br> The variant of the buttons |

### Slots

| Name   | Accepts | Description                            |
| ------ | ------- | -------------------------------------- |
| `prev` | `any`   | Custom content for the previous button |
| `next` | `any`   | Custom content for the next button     |

### Events

| Event    | Type                     | Description                      |
| -------- | ------------------------ | -------------------------------- |
| `change` | `(page: number) => void` | Emitted when the page is changed |

### Paginate

The library exports a `paginate` composable which allows users to define their own pagination context without having to use the provided component.

```ts
const ctx = paginate(
  100, // Total number of items
  1, // Current page, 1-indexed
  15, // Number of items per page
  5 // Maximum number of pages to display
)
```

The function returns a `Pagination` interface with the following properties:

```ts
export interface Pagination {
  totalItems: number
  currentPage: number
  perPage: number
  totalPages: number
  startPage: number
  endPage: number
  startIndex: number
  endIndex: number
  pages: number[]
}
```

If you use this inside Vue's `computed`, you will have an auto-updating pagination object that you can use in your template to manually control active pages and displayed data.

Here's an example of a custom pagination without using any VUI components.

```vue
<script setup>
import { paginate } from '@dolanske/vui'
import { computed, ref } from 'vue'

// Sample data
const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
  { id: 6, name: 'Item 6' },
])

const currentPage = ref(1)
const perPage = 3

// Create pagination context
const pagination = computed(() =>
  paginate(items.value.length, currentPage.value, perPage, 3)
)

// Get current page items
const currentItems = computed(() => {
  const { startIndex, endIndex } = pagination.value
  return items.value.slice(startIndex, endIndex)
})

function goToNext() {
  if (currentPage.value < pagination.value.totalPages) {
    currentPage.value++
  }
}

function goToPrev() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<template>
  <div v-for="item in currentItems" :key="item.id">
    {{ item.name }}
  </div>

  <button :disabled="currentPage === 1" @click="goToPrev">
    Previous
  </button>
  <button :disabled="currentPage === pagination.totalPages" @click="goToNext">
    Next
  </button>
</template>
```
