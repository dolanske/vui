<script setup lang="ts">
import { ref } from 'vue'
import Button from '../components/Button/Button.vue'
import Calendar from '../components/Calendar/Calendar.vue'

const date = ref(Date.now())
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
          <th>Base</th>
          <td>
            <Calendar v-model="date" format="dd/MM/yyyy">
              <template #trigger>
                <Button>{{ date ?? 'Choose date' }}</Button>
              </template>
            </Calendar>
          </td>
        </tr>
        <tr>
          <th>Inline</th>
          <th>
            <Calendar inline />
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
