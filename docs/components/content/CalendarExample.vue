<script setup>
import { Calendar, Flex } from '@dolanske/vui'
import { ref } from 'vue'

const date = ref(new Date())
// const dateRange = ref([])
// const dateWithTrigger = ref(new Date())
// const inlineDate = ref(new Date())
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <Calendar v-model="date" />
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
  <!-- <div class="space-y-l">
    <div>
      <h3 class="text-m mb-s">
        Basic Usage
      </h3>
      <Calendar v-model="date" />
    </div>

    <div>
      <h3 class="text-m mb-s">
        Date Range Selection
      </h3>
      <Calendar
        v-model="dateRange"
        range
        :enable-time-picker="false"
        format="dd/MM/yyyy"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        Custom Trigger
      </h3>
      <Calendar v-model="dateWithTrigger">
        <template #trigger>
          <button class="vui-button vui-button-variant-fill">
            Select Date
          </button>
        </template>
      </Calendar>
    </div>

    <div>
      <h3 class="text-m mb-s">
        Inline Calendar
      </h3>
      <Calendar
        v-model="inlineDate"
        inline
        :enable-time-picker="false"
        format="dd/MM/yyyy"
      />
    </div>
  </div> -->
</template>
