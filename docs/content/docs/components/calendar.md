# Calendar

A date picker component that allows users to select dates and times. It's built on top of [Vue Datepicker](https://vue3datepicker.com/installation/) and provides a consistent look and feel with the rest of the UI components.

::calendar-example{sourcePath="Calendar/Calendar.vue"}

```vue
<script setup>
import { Calendar } from '@dolanske/vui'
import { ref } from 'vue'

const date = ref(new Date())
</script>

<template>
  <Calendar v-model="date" />
</template>
```

::

### Props

The Calendar component accepts all the props listed in the [official documentation](https://vue3datepicker.com/props/modes/). Only the props you actually pass are forwarded, so every vue-datepicker default stays intact. VUI changes these defaults:

| Name        | Default                                        | Type                                                                                                                                                 |
| ----------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoApply` | `true`                                         | `boolean` <br> Automatically apply the selected date when clicking on a day                                                                          |
| `formats`   | `{ input: 'dd/MM/yyyy HH:mm', month: 'MMMM' }` | `object` <br> Display formats. The time is left out of `input` when `enable-time-picker` is `false` or a month, year, week or quarter picker is used |
| `expand`    | `false`                                        | `boolean` <br> VUI prop. Makes the calendar expand to full width. Without it, a custom `trigger` keeps its natural width                             |
| `dark`      | Displayed theme                                | `boolean` <br> Follows the displayed theme (`isDark`), including the system preference in `auto` mode                                                |

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
