<script setup lang="ts">
import { Input } from '@dolanske/vui'
import { ref } from 'vue'

const username = ref('')
const email = ref('')
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-md">
        <!-- Basic text input -->
        <Input
          label="Username"
          placeholder="Enter your username"
          hint="This will be your public display name"
        />

        <!-- Input with validation -->
        <Input
          v-model="username"
          label="Username with validation"
          placeholder="Enter username"
          :limit="20"
          :errors="username.length > 0 && username.length < 3 ? ['Username must be at least 3 characters'] : []"
        />

        <!-- Email input -->
        <Input
          v-model="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          hint="We'll never share your email"
          required
        />
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
