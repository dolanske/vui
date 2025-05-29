# Table

The Table component is a powerful data display component that provides features like sorting, pagination, row selection, and custom cell content. It's built with composable parts that can be used together to create complex data tables.

::table-example

```vue
<script setup lang="ts">
import { defineTable, Table } from '@dolanske/vui'
import { ref } from 'vue'

const data = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  { id: 3, name: 'Bob', age: 35 },
]

const { headers, rows } = defineTable(data, {
  pagination: {
    enabled: true,
    perPage: 10,
  },
  select: true,
})
</script>

<template>
  <Table.Root>
    <template #header>
      <Table.Head v-for="header in headers" :key="header.label" :header="header" sort />
    </template>
    <template #body>
      <tr v-for="row in rows" :key="row.id">
        <Table.Cell v-for="header in headers" :key="header.label">
          {{ row[header.label] }}
        </Table.Cell>
      </tr>
    </template>
  </Table.Root>
</template>
```

::

### Props

| Prop            | Type      | Default | Description                                      |
| --------------- | --------- | ------- | ------------------------------------------------ |
| `fixed`         | `boolean` | `false` | Sets the `table-layout` property to `fixed`      |
| `nowrap`        | `boolean` | `false` | Prevents cell content from wrapping to new lines |
| `separateRows`  | `boolean` | `true`  | Adds a visual separator between rows             |
| `separateCells` | `boolean` | `false` | Adds a visual separator between cells            |
| `outerBorder`   | `boolean` | `true`  | Adds a border around the table                   |

### Slots

| Slot         | Description                        |
| ------------ | ---------------------------------- |
| `header`     | Content for the table header row   |
| `body`       | Content for the table body rows    |
| `pagination` | Content for the pagination section |

### Table.Head Props

| Prop     | Type      | Default | Description                                |
| -------- | --------- | ------- | ------------------------------------------ |
| `header` | `Header`  | -       | Header data including label and sort state |
| `sort`   | `boolean` | `false` | Enables sorting for the column             |

### Table.Cell Slots

| Slot      | Description                                                   |
| --------- | ------------------------------------------------------------- |
| `default` | Main cell content                                             |
| `context` | Additional content that appears on the right side of the cell |

### Features

- Sorting functionality with multi-column support
- Pagination with customizable page size
- Row selection with select all capability
- Custom cell content with context slots
- Flexible styling options
- Search functionality
- Responsive design

### Examples

#### Basic Table

```vue
<script setup lang="ts">
import { defineTable, Table } from '@dolanske/vui'
import { ref } from 'vue'

const data = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  { id: 3, name: 'Bob', age: 35 },
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
          {{ row[header.label] }}
        </Table.Cell>
      </tr>
    </template>
  </Table.Root>
</template>
```

#### Table with Pagination

```vue
<script setup lang="ts">
import { defineTable, Table } from '@dolanske/vui'
import { ref } from 'vue'

const data = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  { id: 3, name: 'Bob', age: 35 },
]

const { headers, rows } = defineTable(data, {
  pagination: {
    enabled: true,
    perPage: 2,
  },
})
</script>

<template>
  <Table.Root>
    <template #header>
      <Table.Head v-for="header in headers" :key="header.label" :header="header" sort />
    </template>
    <template #body>
      <tr v-for="row in rows" :key="row.id">
        <Table.Cell v-for="header in headers" :key="header.label">
          {{ row[header.label] }}
        </Table.Cell>
      </tr>
    </template>
    <template #pagination>
      <Table.Pagination />
    </template>
  </Table.Root>
</template>
```

#### Table with Selection

```vue
<script setup lang="ts">
import { defineTable, Table } from '@dolanske/vui'
import { ref } from 'vue'

const data = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  { id: 3, name: 'Bob', age: 35 },
]

const { headers, rows } = defineTable(data, {
  select: true,
})
</script>

<template>
  <Table.Root>
    <template #header>
      <Table.Head v-for="header in headers" :key="header.label" :header="header" sort />
    </template>
    <template #body>
      <tr v-for="row in rows" :key="row.id">
        <Table.Cell v-for="header in headers" :key="header.label">
          {{ row[header.label] }}
        </Table.Cell>
      </tr>
    </template>
  </Table.Root>
</template>
```
