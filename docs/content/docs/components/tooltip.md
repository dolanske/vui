# Tooltip

The Tooltip component displays additional information when hovering over an element. It's commonly used to provide context or explanations for UI elements.

> Plese note: components using popout ([Tooltip](/docs/components/tooltip), [Dropdown](/docs/components/dropdown) & [Popout](/docs/components/popout)) cannot be styled using `scoped` CSS in Vue SFC. However, you can just define a new `<style>` tag, style the popout inside and keep rest of your CSS scoped in a separate `<style scoped>`.

::tooltip-example

```vue
<script setup>
import { Button, Flex, Grid, Tooltip } from '@dolanske/vui'
</script>

<template>
  <Grid gap="l" :columns="2">
    <div>
      <strong class="text-m mb-s block text-semibold">
        Basic Usage
      </strong>
      <Tooltip>
        <Button>Hover me</Button>
        <template #tooltip>
          <p>This is a tooltip</p>
        </template>
      </Tooltip>
    </div>

    <div>
      <strong class="text-m mb-s block text-semibold">
        Different Placements
      </strong>
      <Flex gap="m">
        <Tooltip placement="top">
          <Button>Top</Button>
          <template #tooltip>
            <p>Top tooltip</p>
          </template>
        </Tooltip>

        <Tooltip placement="right">
          <Button>Right</Button>
          <template #tooltip>
            <p>Right tooltip</p>
          </template>
        </Tooltip>

        <Tooltip placement="bottom">
          <Button>Bottom</Button>
          <template #tooltip>
            <p>Bottom tooltip</p>
          </template>
        </Tooltip>

        <Tooltip placement="left">
          <Button>Left</Button>
          <template #tooltip>
            <p>Left tooltip</p>
          </template>
        </Tooltip>
      </Flex>
    </div>

    <div>
      <strong class="text-m mb-s block text-semibold">
        With Delay
      </strong>
      <Tooltip delay="500">
        <Button>Hover me (500ms delay)</Button>
        <template #tooltip>
          <p>This tooltip appears after 500ms</p>
        </template>
      </Tooltip>
    </div>

    <div>
      <strong class="text-m mb-s block text-semibold">
        With Icon
      </strong>
      <Tooltip>
        <IconInfo :size="24" />
        <template #tooltip>
          <p>Additional information</p>
        </template>
      </Tooltip>
    </div>

    <div>
      <strong class="text-m mb-s block text-semibold">
        With Formatted Content
      </strong>
      <Tooltip>
        <Button>Hover for details</Button>
        <template #tooltip>
          <div class="p-s">
            <strong class="mb-s block text-semibold">
              Title
            </strong>
            <p>Detailed description goes here</p>
          </div>
        </template>
      </Tooltip>
    </div>
  </Grid>
</template>
```

::

### Props

| Name        | Default | Type                                                                                                                                                                                    |
| ----------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placement` | `top`   | `top` `right` `bottom` `left` `top-start` `top-end` `right-start` `right-end` `bottom-start` `bottom-end` `left-start` `left-end` <br> Position of the dropdown relative to the trigger |
| `delay`     | `0`     | `number` <br> The delay in milliseconds before showing the tooltip                                                                                                                      |
| `disabled`  | `false` | `boolean` <br> Controls whether the tooltip can render                                                                                                                                  |

### Slots

| Name      | Accepts | Description                           |
| --------- | ------- | ------------------------------------- |
| `default` | `any`   | The element that triggers the tooltip |
| `tooltip` | `any`   | The content of the tooltip            |
