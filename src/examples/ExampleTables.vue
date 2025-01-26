<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import Pagination from '../components/Pagination/Pagination.vue'
import * as Table from '../components/Table/index'
import { defineTable } from '../components/Table/table'

interface Item {
  'ID Nation': string
  'ID Year': number
  'Nation': string
  'Population': number
  'Slug Nation': string
  'Year': string
}

interface StrippedItem {
  Nation: string
  Population: number
  Year: string
}

const data = ref<StrippedItem[]>([])

onBeforeMount(async () => {
  data.value = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
    .then(response => response.json())
    .then(({ data }: { data: Item[] }) => {
      return data.map(row => ({
        Nation: row.Nation,
        Population: row.Population,
        Year: row.Year,
      }))
    })
})

const {
  rows,
  headers,
  pagination,
  setPage,
  selectedRows,
} = defineTable(data, {
  pagination: {
    enabled: true,
    perPage: 3,
  },
  select: true,
})

// TODO: add an example of other table props with simple data
// TODO: add an example of pagination not used with a table but standalone
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Tables
    </h3>

    <p class="mb-l">
      This library has two way to define tables. By default, you can use the classic <code>table</code> element and compose simple tables. <br> Or you can go overkill with the  <code>{{ `<Table />` }}</code> component, which comes with its own composable function
    </p>

    <strong class="mb-s block">Simple vertical table</strong>

    <table class="mb-l">
      <thead>
        <tr>
          <th>One</th>
          <th>Two</th>
          <th>Three</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>First </td>
          <td>Second</td>
          <td>Third</td>
        </tr>
      </tbody>
    </table>

    <strong class="mb-s block">Simple horizontal table</strong>

    <table class="mb-xxl">
      <tbody>
        <tr>
          <th>One</th>
          <td>First</td>
        </tr>
        <tr>
          <th>Two</th>
          <td>Second</td>
        </tr>
        <tr>
          <th>Three</th>
          <td>Third</td>
        </tr>
      </tbody>
    </table>

    <h5 class="mb-s">
      Data table
    </h5>

    <Table.Root separate-cells class="mb-l">
      <template #header>
        <Table.SelectAll />
        <Table.Head v-for="header in headers" :key="header.label" :header sort />
      </template>
      <template #body>
        <tr v-for="row in rows" :key="row.Year">
          <Table.SelectRow :row />
          <Table.Cell>{{ row.Nation }}</Table.Cell>
          <Table.Cell>{{ row.Population }}</Table.Cell>
          <Table.Cell>{{ row.Year }}</Table.Cell>
        </tr>
      </template>
      <template #pagination>
        <Pagination :pagination :first-last="false" @change="setPage" />
      </template>
    </Table.Root>

    <span class="mb-s block">Selected rows</span>
    <pre>
      {{ selectedRows }}
    </pre>
  </div>
</template>
