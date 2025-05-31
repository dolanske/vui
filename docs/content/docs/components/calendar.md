# Calendar

A date picker component that allows users to select dates and times. It's built on top of `@vuepic/vue-datepicker` and provides a consistent look and feel with the rest of the UI components.

::calendar-example

```vue
<script setup>
import { Calendar, Flex } from '@dolanske/vui'
import { ref } from 'vue'

const date = ref(new Date())
</script>

<template>
  <Calendar v-model="date" />
</template>
```

::

### Props

The Calendar component accepts all props from `@vuepic/vue-datepicker` with some defaults applied. Here are the most commonly used props:

| Name              | Default              | Type      | Description                                                  |
| ----------------- | -------------------- | --------- | ------------------------------------------------------------ |
| `autoApply`       | `true`               | `boolean` | Automatically apply the selected date when clicking on a day |
| `autoPosition`    | `true`               | `boolean` | Automatically position the calendar popup                    |
| `format`          | `'dd/MM/yyyy HH:mm'` | `string`  | Format of the displayed date                                 |
| `monthNameFormat` | `'long'`             | `string`  | Format of the month name in the header                       |
| `expand`          | `false`              | `boolean` | Makes the calendar input expand to full width                |
| `inline`          | `false`              | `boolean` | Renders the calendar inline instead of as a popup            |
| `dark`            | Based on theme       | `boolean` | Enables dark mode for the calendar                           |

For a complete list of available props, refer to the [@vuepic/vue-datepicker documentation](https://vue3datepicker.com/).

### Slots

| Name      | Accepts | Description                                                    |
| --------- | ------- | -------------------------------------------------------------- |
| `trigger` | `any`   | Custom trigger element to open the calendar popup when clicked |

### Examples

#### Date Range Selection

::calendar-date-range-example

```vue
<script setup>
import { Calendar } from '@dolanske/vui'
import { ref } from 'vue'

const dateRange = ref([])
</script>

<template>
  <Calendar
    v-model="dateRange"
    range
    :enable-time-picker="false"
    format="dd/MM/yyyy"
  />
</template>
```

::

#### Custom Trigger

::calendar-custom-trigger-example

```vue
<script setup>
import { Calendar } from '@dolanske/vui'
import { ref } from 'vue'

const date = ref(new Date())
</script>

<template>
  <Calendar v-model="date">
    <template #trigger>
      <button class="vui-button vui-button-variant-fill">
        Select Date
      </button>
    </template>
  </Calendar>
</template>
```

::

#### Inline

::calendar-inline-example

```vue
<script setup>
import { Calendar } from '@dolanske/vui'
import { ref } from 'vue'

const date = ref(new Date())
</script>

<template>
  <Calendar
    v-model="date"
    inline
    :enable-time-picker="false"
    format="dd/MM/yyyy"
  />
</template>
```

::
