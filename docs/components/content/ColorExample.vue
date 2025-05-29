<script setup>
import { Color } from '@dolanske/vui'
import { ref } from 'vue'

const color = ref('#000000')
const labeledColor = ref('#000000')
const defaultColor = ref('#4CAF50')
const validatedColor = ref('#000000')
const error = ref('')

function validateColor(value) {
  if (!value.match(/^#[0-9a-f]{6}$/i)) {
    error.value = 'Please enter a valid hex color code'
  }
  else {
    error.value = ''
  }
}
</script>

<template>
  <div class="space-y-l">
    <div>
      <h3 class="text-m mb-s">
        Basic Usage
      </h3>
      <Color v-model="color" />
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Label and Placeholder
      </h3>
      <Color
        v-model="labeledColor"
        label="Background Color"
        placeholder="Enter hex color"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Default Value
      </h3>
      <Color
        v-model="defaultColor"
        label="Theme Color"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Validation
      </h3>
      <Color
        v-model="validatedColor"
        label="Color"
        :error="error"
        @update:model-value="validateColor"
      />
    </div>
  </div>
</template>
