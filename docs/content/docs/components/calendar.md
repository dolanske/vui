# Calendar

A date picker component that allows users to select dates and times. It's built on top of [Vue Datepicker](https://vue3datepicker.com/installation/) and provides a consistent look and feel with the rest of the UI components.

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

The Calendar component accepts all the props listed in the [official documentation](https://vue3datepicker.com/props/modes/). Vuil builds on top of this and customizes this with a few defaults:

| Name              | Default              | Type                                                                        |
| ----------------- | -------------------- | --------------------------------------------------------------------------- |
| `autoApply`       | `true`               | `boolean` <br> Automatically apply the selected date when clicking on a day |
| `autoPosition`    | `true`               | `boolean` <br> Automatically position the calendar popup                    |
| `format`          | `'dd/MM/yyyy HH:mm'` | `string` <br> Format of the displayed date                                  |
| `monthNameFormat` | `'long'`             | `string` <br> Format of the month name in the header                        |
| `expand`          | `false`              | `boolean` <br> Makes the calendar input expand to full width                |
| `inline`          | `false`              | `boolean` <br> Renders the calendar inline instead of as a popup            |
| `dark`            | Based on theme       | `boolean` <br> Enables dark mode for the calendar                           |

### Slots

| Name      | Accepts | Description                                                    |
| --------- | ------- | -------------------------------------------------------------- |
| `trigger` | `any`   | Custom trigger element to open the calendar popup when clicked |

### Events

All events emitted by the component are described here in the [official documentation](https://vue3datepicker.com/methods-and-events/events/).

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
