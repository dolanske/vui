<script setup lang='ts'>
import type { SelectOption } from '../components/Select/Select.vue'
import { ref } from 'vue'
import Badge from '../components/Badge/Badge.vue'
import Flex from '../components/Flex/Flex.vue'
import Select from '../components/Select/Select.vue'

const people: SelectOption[] = [
  { value: 'andrew', label: 'Andrew' },
  { value: 'john', label: 'John' },
  { value: 'jane', label: 'Jane' },
  { value: 'jill', label: 'Jill', disabled: true },
]

const grouped: SelectOption[] = [
  { value: 'apple', label: 'Apple', group: 'Fruit' },
  { value: 'banana', label: 'Banana', group: 'Fruit' },
  { value: 'carrot', label: 'Carrot', group: 'Vegetables' },
  { value: 'potato', label: 'Potato', group: 'Vegetables' },
]

const many: SelectOption[] = Array.from({ length: 60 }, (_, i) => ({ value: i, label: `Option ${i + 1}` }))

const single = ref<SelectOption[]>()
const preselected = ref<SelectOption[]>([people[1]])
const multiple = ref<SelectOption[]>()
const limited = ref<SelectOption[]>()
const group = ref<SelectOption[]>()
const searchable = ref<SelectOption[]>()
const custom = ref<SelectOption[]>()
const required = ref<SelectOption[]>()
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Selects
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Single</th>
          <td>
            <Flex gap="m" y-center>
              <Select v-model="single" :options="people" label="Person" placeholder="Pick a person" style="width: 256px" />
              <span>{{ single?.map(option => option.label).join(', ') || '-' }}</span>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Pre-selected, clearable</th>
          <td>
            <Select v-model="preselected" :options="people" show-clear label="Clearable" style="width: 256px" />
          </td>
        </tr>
        <tr>
          <th>Multiple</th>
          <td>
            <Select v-model="multiple" :options="people" :single="false" show-clear label="Friends" placeholder="Pick friends" style="width: 256px" />
          </td>
        </tr>
        <tr>
          <th>Max 2 active</th>
          <td>
            <Select v-model="limited" :options="people" :single="false" :max-active-options="2" label="Up to two" style="width: 256px" />
          </td>
        </tr>
        <tr>
          <th>Groups</th>
          <td>
            <Select v-model="group" :options="grouped" label="Food" style="width: 256px" />
          </td>
        </tr>
        <tr>
          <th>Search, many options</th>
          <td>
            <Select v-model="searchable" :options="many" search :single="false" max-height="240px" label="Searchable" style="width: 256px" />
          </td>
        </tr>
        <tr>
          <th>Custom option slot</th>
          <td>
            <Select v-model="custom" :options="people" label="Custom options" style="width: 256px">
              <template #option="{ option, selected }">
                <Flex x-between y-center class="w-100">
                  <span>{{ option.label }}</span>
                  <Badge v-if="selected" variant="success" size="s">
                    Selected
                  </Badge>
                </Flex>
              </template>
            </Select>
          </td>
        </tr>
        <tr>
          <th>Sizes</th>
          <td>
            <Flex column gap="s">
              <Select :options="people" size="s" placeholder="Small" show-clear :model-value="[people[0]]" style="width: 256px" />
              <Select :options="people" size="m" placeholder="Medium" show-clear :model-value="[people[0]]" style="width: 256px" />
              <Select :options="people" size="l" placeholder="Large" show-clear :model-value="[people[0]]" style="width: 256px" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Required, hint, errors</th>
          <td>
            <Select
              v-model="required"
              :options="people"
              label="Assignee"
              required
              hint="Who should work on this"
              :errors="required?.length ? [] : ['Please choose an assignee']"
              name="assignee"
              style="width: 256px"
            />
          </td>
        </tr>
        <tr>
          <th>Disabled, readonly</th>
          <td>
            <Flex gap="m">
              <Select :options="people" disabled placeholder="Disabled" style="width: 200px" />
              <Select :options="people" readonly :model-value="[people[2]]" style="width: 200px" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>No options</th>
          <td>
            <Select :options="[]" placeholder="Nothing to choose" style="width: 256px" />
          </td>
        </tr>
        <tr>
          <th>Long labels</th>
          <td>
            <Select
              :options="[{ value: 1, label: 'An option with an extremely long label which needs to be truncated somewhere' }]"
              :model-value="[{ value: 1, label: 'An option with an extremely long label which needs to be truncated somewhere' }]"
              show-clear
              style="width: 256px"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
