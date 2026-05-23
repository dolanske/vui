# paginate

A utility function for calculating pagination state for lists, tables, or any paged data. It determines which items and page numbers to show based on the current page, total items, and configuration.

### Signature

```ts
import { paginate } from '@dolanske/vui'

function paginate(
  totalItems: number,
  currentPage?: number,
  perPage?: number,
  maxPages?: number
): Pagination
```

| Parameter     | Type     | Default | Description                                                            |
| ------------- | -------- | ------- | ---------------------------------------------------------------------- |
| `totalItems`  | `number` |         | The total number of items in the dataset.                              |
| `currentPage` | `number` | `1`     | The current page number (1-based).                                     |
| `perPage`     | `number` | `15`    | The number of items to show per page.                                  |
| `maxPages`    | `number` | `3`     | The maximum number of page links to display in the pagination control. |

Returns a `Pagination` object with all the calculated properties needed for rendering pagination controls and slicing data.

### Return value

```ts
interface Pagination {
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

| Property      | Type       | Description                                                             |
| ------------- | ---------- | ----------------------------------------------------------------------- |
| `totalItems`  | `number`   | The total number of items in the dataset.                               |
| `currentPage` | `number`   | The current page number (after clamping to valid range).                |
| `perPage`     | `number`   | The number of items per page.                                           |
| `totalPages`  | `number`   | The total number of pages.                                              |
| `startPage`   | `number`   | The first page number to show in the pagination control.                |
| `endPage`     | `number`   | The last page number to show in the pagination control.                 |
| `startIndex`  | `number`   | The index of the first item on the current page (0-based).              |
| `endIndex`    | `number`   | The index of the last item on the current page (0-based).               |
| `pages`       | `number[]` | An array of page numbers to display (for rendering page buttons/links). |

## Usage

The function is designed to help you render pagination controls and slice your data for the current page.

### Basic example

```ts
import { paginate } from '@dolanske/vui'
import { computed, ref } from 'vue'

const itemCount = ref(100)
const currentPage = ref(1)

const pagination = computed(() => paginate(
  itemCount.value,
  currentPage.value,
  10, // perPage
  5 // maxPages
))
```
