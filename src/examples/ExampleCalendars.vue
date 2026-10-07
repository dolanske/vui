<script setup lang='ts'>
import { ref } from 'vue'
import Button from '../components/Button/Button.vue'
import Calendar from '../components/Calendar/Calendar.vue'
import Flex from '../components/Flex/Flex.vue'

const date = ref<Date>()
const dateTime = ref<Date>(new Date())
const range = ref<Date[]>()
const month = ref<{ month: number, year: number }>()
const year = ref<number>()
const time = ref<{ hours: number, minutes: number }>()
const inline = ref<Date>()
const limited = ref<Date>()

const today = new Date()
const inTwoWeeks = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)

function formatDate(value?: Date) {
  return value ? value.toLocaleDateString() : 'Choose date'
}
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Calendars
    </h3>
    <p class="mb-s">
      Using the <a href="https://vue3datepicker.com/" target="_blank">Vue Datepicker</a> component. By default it always outputs a javascript Date object. So it is up to the user to format the dates themselves.
    </p>
    <table>
      <tbody>
        <tr>
          <th>Date only</th>
          <td>
            <Calendar v-model="date" :enable-time-picker="false" placeholder="Pick a date" />
          </td>
        </tr>
        <tr>
          <th>Date and time</th>
          <td>
            <Calendar v-model="dateTime" />
          </td>
        </tr>
        <tr>
          <th>Range</th>
          <td>
            <Calendar v-model="range" range :enable-time-picker="false" placeholder="Pick a range" />
          </td>
        </tr>
        <tr>
          <th>Range, two months</th>
          <td>
            <Calendar v-model="range" range multi-calendars :enable-time-picker="false" placeholder="Pick a range" />
          </td>
        </tr>
        <tr>
          <th>Month, year, time pickers</th>
          <td>
            <Flex gap="s" wrap>
              <Calendar v-model="month" month-picker placeholder="Month" />
              <Calendar v-model="year" year-picker placeholder="Year" />
              <Calendar v-model="time" time-picker placeholder="Time" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Min / max date <br> Next two weeks</th>
          <td>
            <Calendar v-model="limited" :min-date="today" :max-date="inTwoWeeks" :enable-time-picker="false" />
          </td>
        </tr>
        <tr>
          <th>Custom trigger</th>
          <td>
            <Calendar v-model="date" :enable-time-picker="false">
              <template #trigger>
                <Button>{{ formatDate(date) }}</Button>
              </template>
            </Calendar>
          </td>
        </tr>
        <tr>
          <th>Custom trigger, expand</th>
          <td>
            <Calendar v-model="date" expand :enable-time-picker="false">
              <template #trigger>
                <Button expand>
                  {{ formatDate(date) }}
                </Button>
              </template>
            </Calendar>
          </td>
        </tr>
        <tr>
          <th>Disabled, readonly</th>
          <td>
            <Flex gap="s">
              <Calendar :model-value="today" disabled />
              <Calendar :model-value="today" readonly />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Inline</th>
          <td>
            <Calendar v-model="inline" inline :enable-time-picker="false" />
          </td>
        </tr>
        <tr>
          <th>Inline with time</th>
          <td>
            <Calendar v-model="inline" inline />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
