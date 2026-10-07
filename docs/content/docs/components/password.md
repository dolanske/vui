# Password

A specialized input component for password fields that includes a toggle button to show/hide the password.

The input uses `autocomplete="current-password"`, so password managers can fill it. Pass `autocomplete="new-password"` on sign-up and password change forms. The toggle button is labelled and announces its pressed state.

::password-example{sourcePath="Input/Password.vue"}

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
    name="password"
    placeholder="******************"
    label="Password"
  />
</template>
```

::

### Props

The Password component accepts all props from the base Input component, except `type`, with the following additions:

| Name            | Default | Type                                                             |
| --------------- | ------- | ---------------------------------------------------------------- |
| `show-password` | `false` | `boolean` <br> Whether the password should be visible by default |

### Usage

The Password component inherits all functionality from the base [Input](/docs/components/input) component.
