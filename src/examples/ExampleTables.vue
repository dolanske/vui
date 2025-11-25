<script setup lang="ts">
import { computed, ref } from 'vue'
import Accordion from '../components/Accordion/Accordion.vue'
import Divider from '../components/Divider/Divider.vue'
import { paginate } from '../components/Pagination/pagination'
import Pagination from '../components/Pagination/Pagination.vue'
import * as Table from '../components/Table/index'
import { defineTable } from '../components/Table/table'
import Tooltip from '../components/Tooltip/Tooltip.vue'

const data = [
  { State: 'Alabama', Population: 5024279, Capital: 'Montgomery' },
  { State: 'Alaska', Population: 733391, Capital: 'Juneau' },
  { State: 'Arizona', Population: 7151502, Capital: 'Phoenix' },
  { State: 'Arkansas', Population: 3011524, Capital: 'Little Rock' },
  { State: 'California', Population: 39538223, Capital: 'Sacramento' },
  { State: 'Colorado', Population: 5773714, Capital: 'Denver' },
  { State: 'Connecticut', Population: 3605944, Capital: 'Hartford' },
  { State: 'Delaware', Population: 989948, Capital: 'Dover' },
  { State: 'Florida', Population: 21538187, Capital: 'Tallahassee' },
  { State: 'Georgia', Population: 10711908, Capital: 'Atlanta' },
  { State: 'Hawaii', Population: 1455271, Capital: 'Honolulu' },
  { State: 'Idaho', Population: 1839106, Capital: 'Boise' },
  { State: 'Illinois', Population: 12812508, Capital: 'Springfield' },
  { State: 'Indiana', Population: 6785528, Capital: 'Indianapolis' },
  { State: 'Iowa', Population: 3190369, Capital: 'Des Moines' },
  { State: 'Kansas', Population: 2937880, Capital: 'Topeka' },
  { State: 'Kentucky', Population: 4505836, Capital: 'Frankfort' },
  { State: 'Louisiana', Population: 4657757, Capital: 'Baton Rouge' },
  { State: 'Maine', Population: 1362359, Capital: 'Augusta' },
  { State: 'Maryland', Population: 6177224, Capital: 'Annapolis' },
  { State: 'Massachusetts', Population: 7029917, Capital: 'Boston' },
  { State: 'Michigan', Population: 10037261, Capital: 'Lansing' },
  { State: 'Minnesota', Population: 5737915, Capital: 'Saint Paul' },
  { State: 'Mississippi', Population: 2961279, Capital: 'Jackson' },
  { State: 'Missouri', Population: 6196010, Capital: 'Jefferson City' },
  { State: 'Montana', Population: 1084225, Capital: 'Helena' },
  { State: 'Nebraska', Population: 1961504, Capital: 'Lincoln' },
  { State: 'Nevada', Population: 3104614, Capital: 'Carson City' },
  { State: 'New Hampshire', Population: 1377529, Capital: 'Concord' },
  { State: 'New Jersey', Population: 9288994, Capital: 'Trenton' },
  { State: 'New Mexico', Population: 2117522, Capital: 'Santa Fe' },
  { State: 'New York', Population: 20201249, Capital: 'Albany' },
  { State: 'North Carolina', Population: 10439388, Capital: 'Raleigh' },
  { State: 'North Dakota', Population: 779094, Capital: 'Bismarck' },
  { State: 'Ohio', Population: 11799448, Capital: 'Columbus' },
  { State: 'Oklahoma', Population: 3959353, Capital: 'Oklahoma City' },
  { State: 'Oregon', Population: 4237256, Capital: 'Salem' },
  { State: 'Pennsylvania', Population: 13002700, Capital: 'Harrisburg' },
  { State: 'Rhode Island', Population: 1097379, Capital: 'Providence' },
  { State: 'South Carolina', Population: 5118425, Capital: 'Columbia' },
  { State: 'South Dakota', Population: 886667, Capital: 'Pierre' },
  { State: 'Tennessee', Population: 6910840, Capital: 'Nashville' },
  { State: 'Texas', Population: 29145505, Capital: 'Austin' },
  { State: 'Utah', Population: 3271616, Capital: 'Salt Lake City' },
  { State: 'Vermont', Population: 643077, Capital: 'Montpelier' },
  { State: 'Virginia', Population: 8631393, Capital: 'Richmond' },
  { State: 'Washington', Population: 7705281, Capital: 'Olympia' },
  { State: 'West Virginia', Population: 1793716, Capital: 'Charleston' },
  { State: 'Wisconsin', Population: 5893718, Capital: 'Madison' },
  { State: 'Wyoming', Population: 576851, Capital: 'Cheyenne' },
]

const {
  rows,
  headers,
  pagination,
  setPage,
  selectedRows,
} = defineTable(data, {
  pagination: {
    enabled: true,
    perPage: 5,
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

    <Table.Root separate-cells class="mb-l" fixed>
      <template #header>
        <Table.SelectAll />
        <Table.Head v-for="header in headers" :key="header.label" :header sort />
      </template>
      <template #body>
        <tr v-for="row in rows" :key="row.State">
          <Table.SelectRow :row />
          <Table.Cell>{{ row.State }}</Table.Cell>
          <Table.Cell>{{ row.Population }}</Table.Cell>
          <Table.Cell>{{ row.Capital }}</Table.Cell>
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
              <th>
                <Tooltip placement="top">
                  ID
                  <template #tooltip>
                    <p>ID</p>
                  </template>
                </Tooltip>
              </th>
              <th>
                <Tooltip placement="top">
                  Name
                  <template #tooltip>
                    <p>Name</p>
                  </template>
                </Tooltip>
              </th>
              <th>
                <Tooltip placement="top">
                  Email
                  <template #tooltip>
                    <p>Email</p>
                  </template>
                </Tooltip>
              </th>
              <th>
                <Tooltip placement="top">
                  Phone
                  <template #tooltip>
                    <p>Phone</p>
                  </template>
                </Tooltip>
              </th>
              <th>
                <Tooltip placement="top">
                  Address
                  <template #tooltip>
                    <p>Address</p>
                  </template>
                </Tooltip>
              </th>
              <th>
                <Tooltip placement="top">
                  City
                  <template #tooltip>
                    <p>City</p>
                  </template>
                </Tooltip>
              </th>
              <th>
                <Tooltip placement="top">
                  State
                  <template #tooltip>
                    <p>State</p>
                  </template>
                </Tooltip>
              </th>
              <th>
                <Tooltip placement="top">
                  Zip
                  <template #tooltip>
                    <p>Zip</p>
                  </template>
                </Tooltip>
              </th>
              <th>
                <Tooltip placement="top">
                  Country
                  <template #tooltip>
                    <p>Country</p>
                  </template>
                </Tooltip>
              </th>
              <th>
                <Tooltip placement="top">
                  Status
                  <template #tooltip>
                    <p>Status</p>
                  </template>
                </Tooltip>
              </th>
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
