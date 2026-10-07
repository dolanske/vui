# Tooltip

The Tooltip component displays additional information when hovering over or keyboard-focusing an element. It's commonly used to provide context or explanations for UI elements.

The tooltip is a `role="tooltip"` referenced by the trigger through `aria-describedby`. `Esc` hides it (a second `Esc` reaches the layer below, e.g. a modal). On touch devices hover tooltips are not shown, so never put essential information only into a tooltip. The trigger must be focusable for keyboard users.

> Please note: components using popout ([Tooltip](/docs/components/tooltip), [Dropdown](/docs/components/dropdown) & [Popout](/docs/components/popout)) cannot be styled using `scoped` CSS in Vue SFC. However, you can just define a new `<style>` tag, style the popout inside and keep rest of your CSS scoped in a separate `<style scoped>`.

::tooltip-example{sourcePath="Tooltip/Tooltip.vue"}

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
        With Enter Delay
      </strong>
      <Tooltip :enter-delay="500">
        <Button>Hover me (500ms delay)</Button>
        <template #tooltip>
          <p>This tooltip appears after 500ms</p>
        </template>
      </Tooltip>
    </div>

    <div>
      <strong class="text-m mb-s block text-semibold">
        With Leave Delay
      </strong>
      <Tooltip :leave-delay="500">
        <Button>Hover me (closes after 500ms)</Button>
        <template #tooltip>
          <p>This tooltip stays for 500ms after you stop hovering</p>
        </template>
      </Tooltip>
    </div>

    <div>
      <strong class="text-m mb-s block text-semibold">
        With Icon
      </strong>
      <Tooltip>
        <Button plain square aria-label="More information">
          <IconInfo :size="24" />
        </Button>
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

| Name          | Default | Type                                                                                                                                                                                   |
| ------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placement`   | `top`   | `top` `right` `bottom` `left` `top-start` `top-end` `right-start` `right-end` `bottom-start` `bottom-end` `left-start` `left-end` <br> Position of the tooltip relative to the trigger |
| `enter-delay` | `0`     | `number` <br> The delay in milliseconds before showing the tooltip                                                                                                                     |
| `leave-delay` | `0`     | `number` <br> The delay in milliseconds before hiding the tooltip after the cursor leaves                                                                                              |
| `disabled`    | `false` | `boolean` <br> Controls whether the tooltip can render                                                                                                                                 |
| `arrow`       | `false` | `boolean` <br> Renders an arrow pointing at the trigger                                                                                                                                |

### Slots

| Name      | Accepts | Description                           |
| --------- | ------- | ------------------------------------- |
| `default` | `any`   | The element that triggers the tooltip |
| `tooltip` | `any`   | The content of the tooltip            |

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                            | Default                                         | Description        |
| -------------------------------- | ----------------------------------------------- | ------------------ |
| `--vui-tooltip-padding-block`    | [`var(--space-xs)`](/docs/tokens/spacing)       | Vertical padding   |
| `--vui-tooltip-padding-inline`   | [`var(--space-s)`](/docs/tokens/spacing)        | Horizontal padding |
| `--vui-tooltip-max-width`        | `512px`                                         | Max tooltip width  |
| `--vui-tooltip-background-color` | [`var(--color-bg-raised)`](/docs/tokens/colors) | Background color   |
| `--vui-tooltip-font-size`        | [`var(--font-size-m)`](/docs/tokens/text)       | Font size          |
| `--vui-tooltip-color`            | [`var(--color-text)`](/docs/tokens/colors)      | Text color         |
