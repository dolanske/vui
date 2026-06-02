# Popout Hover

A convenience wrapper around `Popout` that automatically shows and hides the popout based on hover and focus events. Unlike `Tooltip`, the content inside `PopoutHover` is fully interactive - users can move their mouse into the popout and interact with its contents.

> Please note: `PopoutHover` (and the underlying `Popout`) cannot be styled using `scoped` CSS in Vue SFC. Define a separate non-scoped `<style>` block to style the popout container.

::popout-hover-example{sourcePath="Popout/PopoutHover.vue"}
```vue
<script setup>
import { Avatar, Badge, Button, PopoutHover } from '@dolanske/vui'
</script>

<template>
  <PopoutHover class="popout-hover-example">
    <template #trigger>
      <Badge variant="success" filled>
        Online
      </Badge>
    </template>
    <Flex y-start gap="m">
      <button class="pointer">
        <Avatar url="https://github.com/dolanske.png" />
      </button>
      <div>
        <span class="text-bold block mb-xxs">dolanske</span>
        <p class="text-color-light text-s block mb-xs">
          Frontend engineer. The guy who made all of this yayyy!
        </p>
        <p class="text-color-light text-s">
          Checkout my <a href="https://github.com/dolanske">Github</a>!
        </p>
      </div>
    </Flex>
  </PopoutHover>
</template>
```

::

### Props

`PopoutHover` accepts all props from [Popout](/docs/components/popout) except `anchor` and `visible`. The following additional prop is available:

| Name          | Default | Type                                                                                                      |
| ------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `disabled`    | `false` | `boolean` <br> When true, the popout will not open on hover. The trigger slot content remains visible     |
| `enter-delay` | `200`   | `number` <br> Delay in milliseconds before the popout becomes visible after hovering in                   |
| `leave-delay` | `200`   | `number` <br> Delay in milliseconds before the popout hides after the cursor leaves                       |
| `placement`   | `top`   | `string` <br> Position of the popout relative to the trigger. Inherits all placement values from `Popout` |

### Slots

| Name      | Accepts | Description                                            |
| --------- | ------- | ------------------------------------------------------ |
| `trigger` | `any`   | The element that triggers the popout on hover or focus |
| `default` | `any`   | The interactive content rendered inside the popout     |
