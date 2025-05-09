<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import Accordion from '../components/Accordion/Accordion.vue'
import Divider from '../components/Divider/Divider.vue'
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
const testData = ['Jan', 'Andrew', 'Kasper', 'Anton', 'Felix', 'Daniel', 'Gabriel', 'Ayalga', 'Floris']
const page = ref(1)
const paginationExample = computed(() => paginate(testData.length, page.value, 2))
const exampleToRender = computed(() => testData.slice(paginationExample.value.startIndex, paginationExample.value.endIndex + 1))
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
      Here we have a list of names and we're gonna paginate through them:<br><br> {{ testData.join(', ') }}
    </p>
    <Pagination :pagination="paginationExample" @change="(num) => page = num" />
    <div class="typeset">
      <ul>
        <li
          v-for="name in exampleToRender"
          :key="name"
        >
          {{ name }}
        </li>
      </ul>
    </div>

    <Divider :size="40" class="w-40" />

    <p>The <code>defineTable</code> hook can also be used with other UI components. Not just tables. That's why all the table interactivity is not within the component, but in a hook. It's very flexible and allows custom functionality.</p>

    <Divider :size="40" />

    <h5 class="mb-s">
      Responsitivity
    </h5>

    <p class="mb-m">
      Table can be made responsible if they overflow their width and are wrapped in a <code>.vui-table-container</code> element.
    </p>

    <div class="container container-m">
      <div class="vui-table-overflow">
        <table>
          <thead>
            <tr>
              <th data-title-top="ID">
                ID
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
              <th>Country</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>001</td>
              <td>John Doe</td>
              <td>john.doe@example.com</td>
              <td>(555) 123-4567</td>
              <td>123 Main St</td>
              <td>New York</td>
              <td>NY</td>
              <td>10001</td>
              <td>USA</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>002</td>
              <td>Jane Smith</td>
              <td>jane.smith@example.com</td>
              <td>(555) 987-6543</td>
              <td>456 Oak Ave</td>
              <td>Los Angeles</td>
              <td>CA</td>
              <td>90001</td>
              <td>USA</td>
              <td>Inactive</td>
            </tr>
            <tr>
              <td>003</td>
              <td>Robert Johnson</td>
              <td>robert.j@example.com</td>
              <td>(555) 456-7890</td>
              <td>789 Pine Blvd</td>
              <td>Chicago</td>
              <td>IL</td>
              <td>60601</td>
              <td>USA</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>004</td>
              <td>Emily Davis</td>
              <td>emily.d@example.com</td>
              <td>(555) 234-5678</td>
              <td>321 Cedar Ln</td>
              <td>Houston</td>
              <td>TX</td>
              <td>77001</td>
              <td>USA</td>
              <td>Pending</td>
            </tr>
            <tr>
              <td>005</td>
              <td>Michael Wilson</td>
              <td>michael.w@example.com</td>
              <td>(555) 876-5432</td>
              <td>654 Maple Dr</td>
              <td>Miami</td>
              <td>FL</td>
              <td>33101</td>
              <td>USA</td>
              <td>Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
