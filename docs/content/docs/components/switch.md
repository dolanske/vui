# Switch

The Switch component is a form control that allows users to toggle between two states. It provides a visual representation of a boolean value and can be customized with labels and different styles.

::switch-example

```vue
<script setup lang="ts">
import { Switch } from '@dolanske/vui'
import { ref } from 'vue'

const enabled = ref(false)
</script>

<template>
  <div class="flex flex-col gap-xs">
    <Switch v-model="enabled" label="Enable feature" />
    <Switch v-model="enabled" label="Disabled switch" disabled />
    <Switch v-model="enabled" label="Accent switch" accent />
  </div>
</template>
```

::

## Props

| Prop         | Type      | Default | Description                     |
| ------------ | --------- | ------- | ------------------------------- |
| `modelValue` | `boolean` | -       | The current state of the switch |
| `label`      | `string`  | -       | The label text for the switch   |
| `disabled`   | `boolean` | `false` | Whether the switch is disabled  |
| `accent`     | `boolean` | `false` | Whether to use the accent color |

## Features

- Simple toggle functionality
- Customizable appearance with accent color option
- Disabled state support
- Label text support
- Custom content support through slots

## Examples

### Basic Switch

```vue
<script setup lang="ts">
import { Switch } from '@dolanske/vui'
import { ref } from 'vue'

const enabled = ref(false)
</script>

<template>
  <Switch v-model="enabled" label="Enable feature" />
</template>
```

### Disabled Switch

```vue
<script setup lang="ts">
import { Switch } from '@dolanske/vui'
import { ref } from 'vue'

const enabled = ref(false)
</script>

<template>
  <Switch v-model="enabled" label="Disabled switch" disabled />
</template>
```

### Accent Switch

```vue
<script setup lang="ts">
import { Switch } from '@dolanske/vui'
import { ref } from 'vue'

const enabled = ref(false)
</script>

<template>
  <Switch v-model="enabled" label="Accent switch" accent />
</template>
```

### Custom Content Switch

```vue
<script setup lang="ts">
import { Switch } from '@dolanske/vui'
import { ref } from 'vue'

const enabled = ref(false)
</script>

<template>
  <Switch v-model="enabled">
    <div class="flex items-center gap-sm">
      <Icon icon="ph:bell" />
      <span>Enable notifications</span>
    </div>
  </Switch>
</template>
```
