# Password Input

A specialized input component for password fields that includes a toggle button to show/hide the password. It extends the base Input component with password-specific functionality.

::password-example

### Props

The Password component accepts all props from the base Input component, with the following additions:

| Name           | Default | Type      | Description                                       |
| -------------- | ------- | --------- | ------------------------------------------------- |
| `showPassword` | `false` | `boolean` | Whether the password should be visible by default |

### With Label and Placeholder

```vue
<script setup>
import { Password } from '@dolanske/vui'
import { ref } from 'vue'

const password = ref('')
</script>

<template>
  <Password
    v-model="password"
    label="Password"
    placeholder="Enter your password"
  />
</template>
```

### With Validation

```vue
<script setup>
import { Password } from '@dolanske/vui'
import { ref } from 'vue'

const password = ref('')
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
  <Password
    v-model="password"
    label="Password"
    :error="error"
    @update:model-value="validatePassword"
  />
</template>
```

### With Custom Icons

```vue
<script setup>
import { Password } from '@dolanske/vui'
import { ref } from 'vue'

const password = ref('')
</script>

<template>
  <Password
    v-model="password"
    label="Password"
    icon="mdi:lock"
  />
</template>
```
