# Button

A button component that supports various styles, sizes, and states. It can be used as a standard button, as a link, or rendered through a router link component.

Buttons default to `type="button"`, so a button placed inside a `<form>` never submits it by accident. Use `type="submit"` for submit buttons.

::button-example{sourcePath="Button/Button.vue"}

```vue
<script setup>
import { Button } from '@dolanske/vui'
</script>

<template>
  <Button variant="fill" class="mb-xs">
    Primary Button
  </Button>
  <Button variant="gray" class="mb-xs">
    Secondary Button
  </Button>
  <Button variant="fill" loading class="mb-xs">
    Loading
  </Button>
</template>
```

::

### Props

| Name       | Default  | Type                                                                                                                                                |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`     | `button` | `button` `submit` `reset` <br> Native button type. Ignored for links                                                                                |
| `loading`  | `false`  | `boolean` <br> Shows a spinner and ignores clicks. The button stays focusable and is marked with `aria-busy`, so focus is not lost                  |
| `size`     | `m`      | `s` `m` `l` <br> Controls the size of the button                                                                                                    |
| `expand`   | `false`  | `boolean` <br> Makes the button expand to full width                                                                                                |
| `square`   | `false`  | `boolean` <br> Makes the button square instead of rectangular. Hides the `start` and `end` slots. Add an `aria-label` when it only contains an icon |
| `variant`  | `gray`   | `fill` `danger` `success` `warning` `info` `link` `accent` `note` `gray` <br> Controls the button's appearance                                      |
| `outline`  | `false`  | `boolean` <br> Makes the button outlined instead of filled                                                                                          |
| `disabled` | `false`  | `boolean` <br> Disables the button. A disabled link loses its `href`, leaves the Tab order and ignores clicks                                       |
| `plain`    | `false`  | `boolean` <br> Removes background and border, keeping only the text                                                                                 |
| `href`     | —        | `string` <br> URL to navigate to. When provided, renders as an anchor (`a`) element                                                                 |
| `as`       | —        | `string` `Component` <br> Element or component to render, e.g. `RouterLink` or `NuxtLink` together with a `to` attribute                            |

### Slots

| Name      | Accepts | Description                                     |
| --------- | ------- | ----------------------------------------------- |
| `default` | `any`   | The main content of the button                  |
| `start`   | `any`   | Content to be displayed before the main content |
| `end`     | `any`   | Content to be displayed after the main content  |

### Events

The button component emits all standard button events like `click`, `focus`, `blur`, etc. Clicks are not emitted while `loading`, or while a link is `disabled`.

### Examples

#### Custom slots

::button-slot-example

```vue
<script setup>
import { Button } from '@dolanske/vui'
import { IconCaretDown, IconPlus } from '@iconify-prerendered/vue-ph'
</script>

<template>
  <Button variant="fill">
    <template #start>
      <IconPlus />
    </template>
    Add Item
    <template #end>
      <IconCaretDown />
    </template>
  </Button>
</template>
```

::

#### Router links

```vue
<script setup>
import { Button } from '@dolanske/vui'
import { RouterLink } from 'vue-router'
</script>

<template>
  <Button :as="RouterLink" to="/settings">
    Settings
  </Button>
</template>
```

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                    | Default                                                                          | Description        |
| ------------------------ | -------------------------------------------------------------------------------- | ------------------ |
| `--vui-button-height`    | [`var(--interactive-el-height)`](/docs/tokens/layout#interactive-element-height) | Button height      |
| `--vui-button-padding`   | `10px` (`6px` small, `16px` large)                                               | Horizontal padding |
| `--vui-button-font-size` | [`var(--font-size-s)`](/docs/tokens/text)                                        | Default font size  |
