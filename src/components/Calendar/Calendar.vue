<script setup lang='ts'>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import './calendar.scss'

// TODO: set default styles
// https://vue3datepicker.com/customization/theming/

// TODO: customize for generic usage
</script>

<template>
  <VueDatePicker auto-apply>
    <template #trigger>
      <slot name="trigger" />
    </template>
  </VueDatePicker>
</template>
