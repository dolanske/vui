---

# Select

The Select component is a form control that allows users to choose one or more options from a dropdown list. It supports both single and multiple selection modes, includes search functionality, and provides various customization options.

::select-example

```vue
<script setup lang="ts">
import { Select } from '@dolanske/vui'
import { ref } from 'vue'

const selected = ref()
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]
</script>

<template>
  <div class="flex flex-col gap-xs">
    <Select
      v-model="selected"
      :options="options"
      label="Select an option"
      placeholder="Choose..."
    />

    <Select
      v-model="selected"
      :options="options"
      :single="false"
      label="Select multiple options"
      placeholder="Choose..."
    />

    <Select
      v-model="selected"
      :options="options"
      search
      label="Search and select"
      placeholder="Search..."
    />
  </div>
</template>
```

::

### Props

| Prop          | Type                          | Default | Description                                                         |
| ------------- | ----------------------------- | ------- | ------------------------------------------------------------------- |
| `modelValue`  | `SelectOption[] \| undefined` | -       | The selected option(s)                                              |
| `options`     | `SelectOption[]`              | -       | Array of options to display                                         |
| `single`      | `boolean`                     | `true`  | Whether to allow only single selection                              |
| `readonly`    | `boolean`                     | `false` | Whether the select is readonly                                      |
| `label`       | `string`                      | -       | The label text for the select                                       |
| `placeholder` | `string`                      | -       | Placeholder text when no option is selected                         |
| `search`      | `boolean`                     | `false` | Whether to enable search functionality                              |
| `required`    | `boolean`                     | `false` | Whether the select is required                                      |
| `errors`      | `string[]`                    | `[]`    | Array of error messages to display                                  |
| `disabled`    | `boolean`                     | `false` | Whether the select is disabled                                      |
| `maxSelected` | `number`                      | -       | Maximum number of options that can be selected (multiple mode only) |

### Events

| Name                | Type                          | Description                        |
| ------------------- | ----------------------------- | ---------------------------------- |
| `update:modelValue` | `SelectOption[] \| undefined` | Emitted when selection changes     |
| `search`            | `string`                      | Emitted when search input changes  |
| `focus`             | -                             | Emitted when the select is focused |
| `blur`              | -                             | Emitted when the select is blurred |

### Examples

#### Basic Select

```vue
<script setup lang="ts">
import { Select } from '@dolanske/vui'
import { ref } from 'vue'

const selected = ref()
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]
</script>

<template>
  <Select
    v-model="selected"
    :options="options"
    label="Select an option"
    placeholder="Choose..."
  />
</template>
```

#### Multiple Select

```vue
<script setup lang="ts">
import { Select } from '@dolanske/vui'
import { ref } from 'vue'

const selected = ref()
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]
</script>

<template>
  <Select
    v-model="selected"
    :options="options"
    :single="false"
    label="Select multiple options"
    placeholder="Choose..."
  />
</template>
```

#### Searchable Select

```vue
<script setup lang="ts">
import { Select } from '@dolanske/vui'
import { ref } from 'vue'

const selected = ref()
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]
</script>

<template>
  <Select
    v-model="selected"
    :options="options"
    search
    label="Search and select"
    placeholder="Search..."
  />
</template>
```

#### Required Select with Error

```vue
<script setup lang="ts">
import { Select } from '@dolanske/vui'
import { ref } from 'vue'

const selected = ref()
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]
const errors = ['This field is required']
</script>

<template>
  <Select
    v-model="selected"
    :options="options"
    required
    label="Required field"
    placeholder="Choose..."
    :errors="errors"
  />
</template>
```

## Types

```typescript
interface SelectOption {
  value: any
  label: string
}
```

## Features

- Support for both single and multiple selection modes
- Search functionality for filtering options
- Customizable appearance with expand option
- Clear button for easy value reset
- Error message display
- Maximum selection limit for multiple mode
- Readonly mode support
- Required field validation
- Helper text support
