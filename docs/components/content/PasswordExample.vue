<script setup>
import { Password } from '@dolanske/vui'
import { ref } from 'vue'

const password = ref('')
const passwordWithLabel = ref('')
const passwordWithValidation = ref('')
const passwordWithIcon = ref('')
const error = ref('')

function validatePassword(value) {
  if (value.length < 8) {
    error.value = 'Password must be at least 8 characters long'
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
      <Password v-model="password" />
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Label and Placeholder
      </h3>
      <Password
        v-model="passwordWithLabel"
        label="Password"
        placeholder="Enter your password"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Validation
      </h3>
      <Password
        v-model="passwordWithValidation"
        label="Password"
        :error="error"
        @update:model-value="validatePassword"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Custom Icon
      </h3>
      <Password
        v-model="passwordWithIcon"
        label="Password"
        icon="mdi:lock"
      />
    </div>
  </div>
</template>
