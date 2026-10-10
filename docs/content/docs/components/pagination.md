# Pagination

The Pagination component provides a user interface for navigating through paginated content. It supports page numbers, previous/next buttons, first/last page navigation and an optional ellipsis layout.

It renders a `<nav>` landmark. Every button has an accessible label and the current page is marked with `aria-current="page"`.

::pagination-example{sourcePath="Pagination/Pagination.vue"}

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

| Name         | Default      | Type                                                                                                                    |
| ------------ | ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `pagination` | required     | `Pagination` <br> The pagination state object containing page information                                               |
| `numbers`    | `true`       | `boolean` <br> Whether to show page numbers                                                                             |
| `prevNext`   | `true`       | `boolean` <br> Whether to show previous/next buttons                                                                    |
| `firstLast`  | `true`       | `boolean` <br> Whether to show first/last page buttons                                                                  |
| `variant`    | `'gray'`     | `fill` `danger` `success` `warning` `info` `link` `accent` `note` `gray` <br> Variant of the button of the current page |
| `ellipsis`   | `false`      | `boolean` <br> Always shows the first and last page, with `…` for skipped pages (`1 … 4 5 6 … 20`)                      |
| `label`      | `Pagination` | `string` <br> Accessible name of the navigation landmark                                                                |

Previous / next pages are available based on the data (`1` and `totalPages`), not on the window of visible page numbers.

### Slots

Every slot replaces one of the default buttons and receives `disabled` (whether the action is unavailable) and `setPage` (performs the action).

| Name    | Props                                        | Description                       |
| ------- | -------------------------------------------- | --------------------------------- |
| `start` | `{ disabled: boolean, setPage: () => void }` | Replaces the first page button    |
| `prev`  | `{ disabled: boolean, setPage: () => void }` | Replaces the previous page button |
| `next`  | `{ disabled: boolean, setPage: () => void }` | Replaces the next page button     |
| `end`   | `{ disabled: boolean, setPage: () => void }` | Replaces the last page button     |

### Events

| Event    | Type                     | Description                                                   |
| -------- | ------------------------ | ------------------------------------------------------------- |
| `change` | `(page: number) => void` | Emitted with the new page. Never emitted for the current page |

### Paginate

The library exports a `paginate` function which allows you to calculate pagination state without the provided component. See the [paginate](/docs/library/paginate) page for details.

```ts
const ctx = paginate(
  100, // Total number of items
  1, // Current page, 1-indexed
  15, // Number of items per page
  5 // Maximum number of pages to display
)
```

If you use this inside Vue's `computed`, you will have an auto-updating pagination object that you can use in your template to manually control active pages and displayed data.

Here's an example of a custom pagination without using any VUI components. Note that `endIndex` is inclusive.

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

// Get current page items, endIndex is inclusive
const currentItems = computed(() => {
  const { startIndex, endIndex } = pagination.value
  return items.value.slice(startIndex, endIndex + 1)
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
