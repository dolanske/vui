# Accordion Group

Groups multiple [Accordion](/docs/components/accordion) components together and controls whether only a single accordion or multiple accordions can be opened simultaneously.

::accordion-group-example

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

| Name     | Default | Type                                                                                                            |
| -------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `single` | false   | `boolean` <br> Controls whether the accordions placed inside can be opened simultaneously or only one at a time |

### Slots

| Name      | Accepts     | Description                                                                         |
| --------- | ----------- | ----------------------------------------------------------------------------------- |
| `default` | `Accordion` | Only `<Accordion />` components are allowed. Anything else will result in an error. |
