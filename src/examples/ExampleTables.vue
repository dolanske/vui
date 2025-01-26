<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { defineTable } from '../components/Table/table'
import Table from '../components/Table/Table.vue'
import TCell from '../components/Table/TCell.vue'
import THead from '../components/Table/THead.vue'

interface Item {
  'ID Nation': string
  'ID Year': number
  'Nation': string
  'Population': number
  'Slug Nation': string
  'Year': string
}

const data = ref<Item[]>([])

onBeforeMount(async () => {
  data.value = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
    .then(response => response.json())
    .then(({ data }) => {
      return data
    })
    .catch((error) => {
      console.error('Error:', error)
    })
})

const {
  rows,
  headers,
} = defineTable(data, {
  pagination: {
    enabled: true,
    perPage: 5,
  },
})
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
        <th>One</th>
        <th>Two</th>
        <th>Three</th>
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

    <Table>
      <template #header>
        <THead v-for="header in headers" :key="header.label" :header />
        <!-- <THead sort>Nation</THead>
        <THead>Population</THead>
        <THead>Year</THead> -->
      </template>
      <template #body>
        <tr v-for="row in rows" :key="row['Slug Nation']">
          <TCell>{{ row.Nation }}</TCell>
          <TCell>{{ row.Population }}</TCell>
          <TCell>{{ row.Year }}</TCell>
        </tr>
      </template>
    </Table>
  </div>
</template>
