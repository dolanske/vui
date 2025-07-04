<script setup lang="ts">
import { defineTable, Input, Pagination, Table } from '@dolanske/vui'
import { computed } from 'vue'

interface TableRow {
  id: number
  name: string
  age: number
}

const data: TableRow[] = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 3, name: 'Bob Johnson', age: 35 },
  { id: 4, name: 'Alice Brown', age: 28 },
  { id: 5, name: 'Charlie Davis', age: 32 },
]

const { headers, rows, pagination, setPage, selectedRows, search } = defineTable(data, {
  pagination: {
    enabled: true,
    perPage: 3,
  },
  select: true,
})

const selectedRowsArray = computed(() => Array.from(selectedRows.value))
</script>

<template>
  <DocsExample>
    <template #component>
      <div>
        <!-- Search input -->
        <Input
          v-model="search"
          placeholder="Search..."
          class="mb-m"
        />

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

        <!-- Selected rows info -->
        <div v-if="selectedRowsArray.length > 0" class="mt-m text-m">
          <p class="text-sm font-medium">
            Selected {{ selectedRowsArray.length }} row{{ selectedRowsArray.length === 1 ? '' : 's' }}:
          </p>
          <p class="text-sm text-gray-600">
            {{ selectedRowsArray.map(row => row.name).join(', ') }}
          </p>
        </div>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style scoped>
:deep(p) {
  margin: 0;
}

:deep(table) {
  margin: 0;
}
</style>
