# Password

A specialized input component for password fields that includes a toggle button to show/hide the password.

::password-example

```vue
<script setup>
import { Password } from '@dolanske/vui'
import { ref } from 'vue'
const password = ref('')
</script>

<template>
  <Password
    v-model="password"
    expand
    placeholder="******************"
    label="Password"
  />
</template>
```

::

### Props

The Password component accepts all props from the base Input component, with the following additions:

| Name            | Default | Type                                                             |
| --------------- | ------- | ---------------------------------------------------------------- |
| `show-password` | `false` | `boolean` <br> Whether the password should be visible by default |

### Usage

The Color component inherits all functionality from the base [Input](/docs/components/input) component.
