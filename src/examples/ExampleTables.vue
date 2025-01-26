<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import Accordion from '../components/Accordion/Accordion.vue'
import { paginate } from '../components/Pagination/pagination'
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
  allRows,
  setPage,
  selectedRows,
} = defineTable(data, {
  pagination: {
    enabled: true,
    perPage: 3,
  },
  select: true,
})

// Example
//
const testData = ['Jan', 'Andrew', 'Kasper', 'Anton', 'Felix', 'Daniel', 'Gabriel', 'Ayalga', '']
const page = ref(1)
const paginationExample = computed(() => paginate(testData.length, page.value, 2))
const exampleToRender = computed(() => testData.slice(paginationExample.value.startIndex, paginationExample.value.endIndex))
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

    <p class="mb-s">
      This example demonstrates the full capability of the table component. Including column sorting, pagination and row selection.
    </p>

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

    <Accordion :label="`Selected rows (${selectedRows.size})`" class="mb-xl">
      <pre>
        {{ selectedRows }}
      </pre>
    </Accordion>

    <h5 class="mb-s">
      Variations
    </h5>

    <div class="typeset mb-xl">
      <ul>
        <li><p><code>separate-rows</code> Adds a border between rows (default: <code>true</code>)</p></li>
        <li><p><code>separate-cells</code> Adds a border between cells (default: <code>false</code>)</p></li>
        <li><p><code>outer-border</code> Adds a border around the entire table component (default: <code>true</code>)</p></li>
        <li><p><code>nowrap</code> Adds ellipsis to text which overflows to keep row size consistent (default: <code>false</code>)</p></li>
        <li><p><code>fixed</code> Keeps all the columns the same size (default: <code>false</code>)</p></li>
      </ul>
    </div>

    <div class="container container-s mb-xxl ml-0">
      <Table.Root :outer-border="false" :separate-cells="true" nowrap fixed>
        <template #body>
          <tr v-for="row in allRows" :key="row.Year">
            <Table.Cell>{{ `${row.Nation} ${row.Nation}` }}</Table.Cell>
            <Table.Cell>{{ row.Population }}</Table.Cell>
            <Table.Cell>{{ row.Year }}</Table.Cell>
          </tr>
        </template>
      </Table.Root>
    </div>

    <h5 class="mb-s">
      Pagination
    </h5>

    <p class="mb-m">
      Pagination does not need to be used with table only. The calculation of pages is done via an external function and the pagination component accepts all the necesary props to implement it for any kind of dataset and UI
    </p>

    <p class="mb-m">
      Here we have a list of names and we're gonna paginate through them. {{ testData.join(', ') }}
    </p>
    <Pagination :pagination="paginationExample" class="mb-l" @change="(num) => page = num" />
    <div class="typeset mb-m">
      <ul>
        <li
          v-for="name in exampleToRender"
          :key="name"
        >
          {{ name }}
        </li>
      </ul>
    </div>

    <pre>{{ paginationExample }}</pre>
  </div>
</template>
