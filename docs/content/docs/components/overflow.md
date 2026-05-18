# Overflow

A scrollable container with gradient shadow indicators that show when there is more content to scroll to. Supports both vertical and horizontal scrolling.

::overflow-example

```vue
<script setup>
import { Avatar, Card, Flex, Overflow } from '@dolanske/vui'
</script>

<template>
  <Card :padding="false">
    <Overflow class="p-m" hide-scrollbar>
      <div style="height:200px">
        <Card v-for="item in avatars" :key="item.name" class="p-s">
          <Flex y-center>
            <Avatar :url="item.url" />
            <strong class="text-l">{{ item.name }}</strong>
          </Flex>
        </Card>
      </div>
    </Overflow>
  </Card>
</template>
```

::

### Props

| Name            | Default | Type                                                                             |
| --------------- | ------- | -------------------------------------------------------------------------------- |
| `horizontal`    | —       | `boolean` <br> Use horizontal scrolling instead of vertical                      |
| `hideScrollbar` | —       | `boolean` <br> Hides the scrollbar and removes the scrollbar gutter padding      |
| `hideShadows`   | —       | `boolean` <br> Hides the gradient shadows indicating more scrollable content     |
| `snap`          | —       | `boolean` <br> Enables scroll-snap so items snap into place when scrolling stops |

### Slots

| Name      | Accepts | Description            |
| --------- | ------- | ---------------------- |
| `default` | `any`   | The scrollable content |

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                          | Default            | Description             |
| ------------------------------ | ------------------ | ----------------------- |
| `--vui-overflow-gutter-size`   | `8px`              | Scrollbar gutter width  |
| `--vui-overflow-shadow-size`   | `32px`             | Edge fade shadow size   |
| `--vui-overflow-shadow-color`  | [`var(--color-bg)`](/docs/tokens/colors)  | Edge fade shadow color  |
