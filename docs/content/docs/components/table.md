# Table

A data display component that provides sorting, pagination, row selection, and custom cell content. It's built with composable parts and the `defineTable` composable. It is also the only component which should be imported as a namespace and not as separate atomic components.

If you have tables with a lot of horizontal content, use the `scroll` prop for a horizontal scrollbar that keeps the table within its container.

::table-example{sourcePath="Table/Root.vue"}

```vue
<script setup lang="ts">
import { defineTable, Pagination, Table } from '@dolanske/vui'

const data = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 3, name: 'Bob Johnson', age: 35 },
  { id: 4, name: 'Alice Brown', age: 28 },
  { id: 5, name: 'Charlie Davis', age: 32 },
]

const { headers, rows, pagination, setPage } = defineTable(data, {
  pagination: {
    enabled: true,
    perPage: 3,
  },
  select: true,
})
</script>

<template>
  <Table.Root separate-cells>
    <template #header>
      <Table.SelectAll />
      <Table.Head v-for="header in headers" :key="header.label" :header="header" sort />
    </template>
    <template #body>
      <tr v-for="row in rows" :key="row.id">
        <Table.SelectRow :row="row" />
        <Table.Cell>
          {{ row.id }}
        </Table.Cell>
        <Table.Cell>
          {{ row.name }}
        </Table.Cell>
        <Table.Cell>
          {{ row.age }}
        </Table.Cell>
      </tr>
    </template>
    <template #pagination>
      <Pagination :pagination="pagination" @change="setPage" />
    </template>
  </Table.Root>
</template>
```

::

### Props

#### Table.Root Props

| Name            | Default | Type                                                                                                                                                             |
| --------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fixed`         | `false` | `boolean` <br> Sets the `table-layout` property to `fixed`                                                                                                       |
| `scroll`        | `false` | `boolean` <br> If table content overflows, it will add a horizontal scrollbar to it without expanding the table out of bounds. Only works if `fixed` is not set. |
| `pin`           | —       | `first`, `last`, `both` <br> Pins the first or last column. Only works if `scroll` is enabled.                                                                   |
| `nowrap`        | `false` | `boolean` <br> Prevents cell content from wrapping to new lines                                                                                                  |
| `separateRows`  | `true`  | `boolean` <br> Adds a visual separator between rows                                                                                                              |
| `separateCells` | `false` | `boolean` <br> Adds a visual separator between cells                                                                                                             |
| `outerBorder`   | `true`  | `boolean` <br> Adds a border around the table                                                                                                                    |
| `table`         | —       | `ReturnType<typeof defineTable>` <br> The table to bind. Required when one component defines more than one table                                                 |

#### Table.Head Props

| Name     | Default | Type                                                     |
| -------- | ------- | -------------------------------------------------------- |
| `header` | —       | `Header` <br> Header data including label and sort state |
| `sort`   | `false` | `boolean` <br> Enables sorting for the column            |

#### Table.SelectRow Props

| Name    | Default      | Type                                           |
| ------- | ------------ | ---------------------------------------------- |
| `row`   | —            | `BaseRow` <br> Row data for selection          |
| `label` | `Select row` | `string` <br> Accessible label of the checkbox |

#### Table.SelectAll Props

| Name    | Default           | Type                                           |
| ------- | ----------------- | ---------------------------------------------- |
| `label` | `Select all rows` | `string` <br> Accessible label of the checkbox |

### Slots

#### Table.Root Slots

| Slot         | Description                        |
| ------------ | ---------------------------------- |
| `header`     | Content for the table header row   |
| `body`       | Content for the table body rows    |
| `pagination` | Content for the pagination section |

#### Table.Head Slots

| Slot      | Description           |
| --------- | --------------------- |
| `default` | Custom header content |

#### Table.Cell Slots

| Slot      | Description                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------- |
| `default` | Main cell content                                                                              |
| `context` | Additional content that appears on the right side of the cell. Space is reserved as it resizes |

### defineTable API

The `defineTable` composable is the core of the table system, providing reactive data management with built-in searching, sorting, pagination, and selection.

```ts
import { defineTable, Pagination, Table } from '@dolanske/vui'

const data = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
]

const { headers, rows, pagination, setPage } = defineTable(data, {
  pagination: {
    enabled: true,
    perPage: 1,
  },
  select: true,
})
```

It is a separate API, because it allows you to build your own table-like UI without having to use the provided `Table` namespace. It doesn't even need to look like one!

#### Parameters

| Name      | Default | Type                                                             |
| --------- | ------- | ---------------------------------------------------------------- |
| `data`    | —       | `MaybeRefOrGetter<T[]>` <br> The dataset to display in the table |
| `options` | —       | `TableOptionsInput` <br> Configuration options                   |

#### Options

Nested options are merged with the defaults, so passing only `pagination: { enabled: true }` keeps the default `perPage`.

| Name                  | Default | Type                                                                  |
| --------------------- | ------- | --------------------------------------------------------------------- |
| `pagination.enabled`  | `false` | `boolean` <br> Enable pagination                                      |
| `pagination.perPage`  | `10`    | `number` <br> Number of items per page                                |
| `pagination.maxPages` | `3`     | `number` <br> Maximum number of page buttons                          |
| `select`              | `false` | `boolean` <br> Enable row selection. Rows need a unique `id` property |

#### Behavior

- **Sorting** compares numbers, dates and booleans naturally and strings locale-aware (`item 2` before `item 10`). Empty values are always sorted last.
- **Searching** matches against the primitive values of each row. Nested objects are ignored.
- **Pagination** keeps the current page valid when the data shrinks, and `setPage` clamps to the available pages.
- **Selection** "select all" applies to the rows matching the current search. Rows removed from the data are removed from the selection.

#### Returns

The `defineTable` composable returns an object with the following reactive properties and methods:

##### Methods

| Name              | Type                                                       | Description                                              |
| ----------------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| `setSort`         | `(key: string, type: 'asc' \| 'desc' \| 'toggle') => void` | Set sorting for a specific column key                    |
| `clearSort`       | `() => void`                                               | Clear current sorting                                    |
| `setPage`         | `(page: number) => void`                                   | Navigate to a specific page (1-indexed, clamped)         |
| `selectRow`       | `(row: T) => void`                                         | Toggle selection state of a specific row                 |
| `selectAllRows`   | `() => void`                                               | Toggle selection of all rows matching the current search |
| `deselectAllRows` | `() => void`                                               | Clear selection                                          |

##### Properties

| Name             | Type                                            | Description                                                    |
| ---------------- | ----------------------------------------------- | -------------------------------------------------------------- |
| `search`         | `Ref<string>`                                   | Reactive search query string                                   |
| `sorting`        | `Ref<{ key?: keyof T, type: 'asc' \| 'desc' }>` | Current sorting                                                |
| `rows`           | `ComputedRef<T[]>`                              | Filtered and paginated dataset rows                            |
| `allRows`        | `ComputedRef<T[]>`                              | All filtered rows (without pagination)                         |
| `selectedRows`   | `ComputedRef<T[]>`                              | Array of currently selected rows                               |
| `headers`        | `ComputedRef<Header[]>`                         | Table headers with sorting functionality                       |
| `pagination`     | `ComputedRef<Pagination>`                       | Pagination state and metadata                                  |
| `canPrevPage`    | `ComputedRef<boolean>`                          | Whether previous page navigation is available                  |
| `canNextPage`    | `ComputedRef<boolean>`                          | Whether next page navigation is available                      |
| `options`        | `Ref<DeepRequired<TableOptionsInput>>`          | Reactive table configuration options                           |
| `isSelectedAll`  | `ComputedRef<boolean>`                          | Whether all matching rows are selected. `false` for empty data |
| `isSelectedSome` | `ComputedRef<boolean>`                          | Whether some, but not all, rows are selected                   |

### Examples

#### Custom Cell content

::table-custom-cell-example

```vue
<script setup lang="ts">
import { Button, defineTable, Table } from '@dolanske/vui'
import { IconDotsThree } from '@iconify-prerendered/vue-ph'

const data = [
  { id: 1, name: 'John', status: 'Active' },
  { id: 2, name: 'Jane', status: 'Inactive' },
]

const { headers, rows } = defineTable(data)
</script>

<template>
  <Table.Root>
    <template #header>
      <Table.Head v-for="header in headers" :key="header.label" :header="header" sort />
    </template>
    <template #body>
      <tr v-for="row in rows" :key="row.id">
        <Table.Cell v-for="header in headers" :key="header.label">
          {{ row[header.label as keyof typeof row] }}
          <template #context>
            <Button plain square aria-label="More actions">
              <IconDotsThree />
            </Button>
          </template>
        </Table.Cell>
      </tr>
    </template>
  </Table.Root>
</template>
```

::

#### Multiple tables in one component

```vue
<script setup lang="ts">
import { defineTable, Table } from '@dolanske/vui'

const users = defineTable(userData, { select: true })
const orders = defineTable(orderData)
</script>

<template>
  <Table.Root :table="users">
    <!-- ... -->
  </Table.Root>
  <Table.Root :table="orders">
    <!-- ... -->
  </Table.Root>
</template>
```
