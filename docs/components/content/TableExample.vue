<script setup lang="ts">
import { Button, defineTable, Table } from '@dolanske/vui'

interface TableRow {
  id: number
  name: string
  age: number
  email: string
  [key: string]: string | number
}

const data: TableRow[] = [
  { id: 1, name: 'John', age: 30, email: 'john@example.com' },
  { id: 2, name: 'Jane', age: 25, email: 'jane@example.com' },
  { id: 3, name: 'Bob', age: 35, email: 'bob@example.com' },
  { id: 4, name: 'Alice', age: 28, email: 'alice@example.com' },
  { id: 5, name: 'Charlie', age: 32, email: 'charlie@example.com' },
]

const { headers, rows, pagination } = defineTable(data, {
  pagination: {
    enabled: true,
    perPage: 3,
  },
  select: true,
})
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-md">
        <!-- Basic table -->
        <div>
          <h3 class="mb-sm">
            Basic Table
          </h3>
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
        </div>

        <!-- Table with selection -->
        <div>
          <h3 class="mb-sm">
            Table with Selection
          </h3>
          <Table.Root>
            <template #header>
              <Table.SelectAll />
              <Table.Head v-for="header in headers" :key="header.label" :header="header" sort />
            </template>
            <template #body>
              <tr v-for="row in rows" :key="row.id">
                <Table.SelectRow :row="row" />
                <Table.Cell v-for="header in headers" :key="header.label">
                  {{ row[header.label] }}
                </Table.Cell>
              </tr>
            </template>
          </Table.Root>
        </div>

        <!-- Table with custom cell content -->
        <div>
          <h3 class="mb-sm">
            Table with Custom Cell Content
          </h3>
          <Table.Root>
            <template #header>
              <Table.Head v-for="header in headers" :key="header.label" :header="header" sort />
            </template>
            <template #body>
              <tr v-for="row in rows" :key="row.id">
                <Table.Cell v-for="header in headers" :key="header.label">
                  {{ row[header.label] }}
                  <template #context>
                    <Button icon="ph:dots-three" plain square />
                  </template>
                </Table.Cell>
              </tr>
            </template>
          </Table.Root>
        </div>

        <!-- Table with pagination -->
        <div>
          <h3 class="mb-sm">
            Table with Pagination
          </h3>
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
              <Pagination
                :pagination="pagination"
                :numbers="true"
                :prev-next="true"
                :first-last="true"
              />
            </template>
          </Table.Root>
        </div>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
