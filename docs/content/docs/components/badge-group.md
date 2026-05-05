# Badge Group

A wrapper component that groups multiple `Badge` components together with merged borders for a compact, unified appearance. Useful for displaying a set of related labels inline, such as version tags or category chains.

::badge-group-example

```vue
<script setup>
import { Badge, BadgeGroup } from '@dolanske/vui'
</script>

<template>
  <BadgeGroup :gap="2">
    <Badge variant="success" circle>
      <Icon name="ph:command" />
    </Badge>
    <Badge variant="warning" circle>
      <Icon name="ph:bell" />
    </Badge>
  </BadgeGroup>

  <BadgeGroup>
    <Badge variant="success" outline>
      Merged
    </Badge>
    <Badge variant="info" outline>
      v2.4.0
    </Badge>
  </BadgeGroup>

  <BadgeGroup :gap="2">
    <Badge variant="success" filled>
      Build
    </Badge>
    <Badge variant="neutral" filled>
      Ok
    </Badge>
  </BadgeGroup>
</template>
```

::

### Props

| Name  | Default | Type                                                                                                                        |
| ----- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `gap` | `0`     | `xxs` `xs` `s` `m` `l` `xl` `xxl` `xxxl` `number` <br> Gap between badges. When `0`, borders are merged for a seamless look |

### Slots

| Name      | Accepts | Description                                  |
| --------- | ------- | -------------------------------------------- |
| `default` | `Badge` | One or more `Badge` components to be grouped |
