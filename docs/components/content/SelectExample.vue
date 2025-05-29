<script setup lang="ts">
import { Select } from '@dolanske/vui'
import { ref } from 'vue'

const selected = ref()
const multipleSelected = ref()
const searchableSelected = ref()
const requiredSelected = ref()
const limitedSelected = ref()

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
]

const errors = ['This field is required']
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-md">
        <!-- Basic select -->
        <div>
          <h3 class="mb-sm">
            Basic Select
          </h3>
          <Select
            v-model="selected"
            :options="options"
            label="Select an option"
            placeholder="Choose..."
          />
        </div>

        <!-- Multiple select -->
        <div>
          <h3 class="mb-sm">
            Multiple Select
          </h3>
          <Select
            v-model="multipleSelected"
            :options="options"
            :single="false"
            label="Select multiple options"
            placeholder="Choose..."
          />
        </div>

        <!-- Searchable select -->
        <div>
          <h3 class="mb-sm">
            Searchable Select
          </h3>
          <Select
            v-model="searchableSelected"
            :options="options"
            search
            label="Search and select"
            placeholder="Search..."
          />
        </div>

        <!-- Required select with error -->
        <div>
          <h3 class="mb-sm">
            Required Select with Error
          </h3>
          <Select
            v-model="requiredSelected"
            :options="options"
            required
            label="Required field"
            placeholder="Choose..."
            :errors="errors"
          />
        </div>

        <!-- Multiple select with limit -->
        <div>
          <h3 class="mb-sm">
            Multiple Select with Limit
          </h3>
          <Select
            v-model="limitedSelected"
            :options="options"
            :single="false"
            :max-active-options="2"
            label="Select up to 2 options"
            placeholder="Choose..."
          />
        </div>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
