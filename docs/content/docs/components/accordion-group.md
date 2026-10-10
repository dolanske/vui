# Accordion Group

Groups multiple [Accordion](/docs/components/accordion) components together and controls whether only a single accordion or multiple accordions can be opened simultaneously.

Accordions can be nested anywhere inside the group, including inside wrapper elements or behind `v-if`.

::accordion-group-example{sourcePath="Accordion/AccordionGroup.vue"}

```vue
<script setup>
import { Accordion, AccordionGroup } from '@dolanske/vui'
</script>

<template>
  <AccordionGroup single>
    <Accordion label="About Vui" card class="mb-xs">
      <p>Vui is a Vue 3 component library designed for building modern web applications.</p>
    </Accordion>
    <Accordion label="Contributing" card class="mb-xs">
      <p>Just clone the repo and submit a PR!</p>
    </Accordion>
  </AccordionGroup>
</template>
```

::

### Props

| Name          | Default | Type                                                                                                            |
| ------------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `single`      | `false` | `boolean` <br> Controls whether the accordions placed inside can be opened simultaneously or only one at a time |
| `defaultOpen` | —       | `string[]` <br> Values of the accordions which are open initially. Ignored when `v-model` is used               |

### Models

| Name         | Type       | Description                                                                     |
| ------------ | ---------- | ------------------------------------------------------------------------------- |
| `modelValue` | `string[]` | Values of the open accordions. Each accordion is identified by its `value` prop |

### Slots

| Name      | Accepts | Description                                                  |
| --------- | ------- | ------------------------------------------------------------ |
| `default` | `any`   | `Accordion` components, directly or nested in other elements |

### Controlled example

```vue
<script setup>
import { Accordion, AccordionGroup } from '@dolanske/vui'
import { ref } from 'vue'

const open = ref(['shipping'])
</script>

<template>
  <AccordionGroup v-model="open">
    <Accordion value="shipping" label="Shipping">
      <p>Ships within 2 days.</p>
    </Accordion>
    <Accordion value="returns" label="Returns">
      <p>30 day returns.</p>
    </Accordion>
  </AccordionGroup>
</template>
```
