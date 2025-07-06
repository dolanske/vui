# Badge

Badges are used to display a status of an object or action that a component has performed. Often used inside tables and other data lists.

::badge-example

```vue
<script setup>
import { Badge } from '@dolanske/vui'
</script>

<template>
  <div class="flex gap-xs">
    <Badge>Default</Badge>
    <Badge variant="success">
      Success
    </Badge>
    <Badge variant="warning">
      Warning
    </Badge>
    <Badge variant="danger">
      Danger
    </Badge>
    <Badge variant="info">
      Info
    </Badge>
    <Badge variant="accent">
      Accent
    </Badge>
  </div>

  <div class="flex gap-xs mt-xs">
    <Badge outline>
      Default
    </Badge>
    <Badge variant="success" outline>
      Success
    </Badge>
    <Badge variant="warning" outline>
      Warning
    </Badge>
    <Badge variant="danger" outline>
      Danger
    </Badge>
    <Badge variant="info" outline>
      Info
    </Badge>
    <Badge variant="accent" outline>
      Accent
    </Badge>
  </div>

  <div class="flex gap-xs mt-xs">
    <Badge filled>
      Default
    </Badge>
    <Badge variant="success" filled>
      Success
    </Badge>
    <Badge variant="warning" filled>
      Warning
    </Badge>
    <Badge variant="danger" filled>
      Danger
    </Badge>
    <Badge variant="info" filled>
      Info
    </Badge>
    <Badge variant="accent" filled>
      Accent
    </Badge>
  </div>
</template>
```

::

### Props

| Name      | Default   | Type                                                                                      |
| --------- | --------- | ----------------------------------------------------------------------------------------- |
| `variant` | `neutral` | `neutral` `danger` `warning` `success` `info` `accent` <br> The visual style of the badge |
| `outline` | `false`   | `boolean` <br> Whether to show the badge with an outline style                            |
| `filled`  | `false`   | `boolean` <br> Whether to show the badge with a filled background                         |

### Slots

| Name      | Accepts | Description                         |
| --------- | ------- | ----------------------------------- |
| `default` | `any`   | Content to display inside the badge |
