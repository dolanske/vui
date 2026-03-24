<script setup lang="ts">
import Select from './components/Select/Select.vue'
import ExampleButtons from './examples/ExampleButtons.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('light')

const options = [
  { value: 0, label: 'Jan' },
  { value: 1, label: 'Andrew' },
  { value: 2, label: 'Felix' },
  { value: 3, label: 'Sarah' },
  { value: 4, label: 'Michael' },
  { value: 5, label: 'Emma' },
  { value: 6, label: 'David' },
  { value: 7, label: 'Lisa' },
  { value: 8, label: 'James' },
  { value: 9, label: 'Anna' },
  { value: 10, label: 'Robert' },
  { value: 11, label: 'Jessica' },
  { value: 12, label: 'William' },
  { value: 13, label: 'Maria' },
  { value: 14, label: 'Christopher' },
  { value: 15, label: 'Lauren' },
  { value: 16, label: 'Daniel' },
  { value: 17, label: 'Victoria' },
]
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container container-m pt-xxl">
      <Select expand :options="options" label="Base, single, search, showClear" search show-clear />
      <ExampleButtons />
    </div>
  </main>
</template>
