# Drawer

A drawer component that slides up from the bottom of the screen and can be dragged to close. It's built on top of the [Vaul](https://github.com/unovue/vaul-vue) library and provides a customizable container for content. On mobile it stays above the on-screen keyboard and clear of the home indicator.

::drawer-example{sourcePath="Drawer/Drawer.vue"}

```vue
<script setup>
import { Button, Drawer } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <Button @click="isOpen = true">
    Open Drawer
  </Button>

  <Drawer v-model:open="isOpen" title="Settings">
    <div class="p-m">
      <h2>Drawer Content</h2>
      <p>This is the content of the drawer.</p>
    </div>
  </Drawer>
</template>
```

::

### Background scaling

When using `rootProps.shouldScaleBackground`, the page behind the drawer is scaled down. This needs a root element with the `vaul-drawer-wrapper` attribute:

```vue
<template>
  <div vaul-drawer-wrapper>
    <!-- Your app content -->
  </div>
</template>
```

### Props

| Name              | Default  | Type                                                                                                                                                                                                                   |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open`            | `false`  | `boolean` <br> Controls the visibility of the drawer. Supports `v-model:open`                                                                                                                                          |
| `title`           | `Drawer` | `string` <br> Accessible name of the drawer. It is visually hidden, use the `header` slot for a visible title                                                                                                          |
| `containerClass`  | —        | `string` `object` `array` <br> CSS class applied to the container of the drawer content                                                                                                                                |
| `containerSize`   | `m`      | `s` `m` `l` `xl` `full` `number` <br> Size of the container or max-width in pixels                                                                                                                                     |
| `handle`          | `true`   | `boolean` <br> Whether to display the handle symbol at the top of the drawer                                                                                                                                           |
| `nested`          | `false`  | `boolean` <br> Uses Vaul's nested drawer root. Required when rendering a drawer inside another drawer                                                                                                                  |
| `activeSnapPoint` | —        | `number` `string` `null` <br> Active snap point in controlled mode (`v-model:activeSnapPoint`)                                                                                                                         |
| `rootProps`       | —        | `DrawerRootProps` <br> Props to pass to the underlying Vaul root component. [Type definitions](https://github.com/unovue/vaul-vue/blob/1b1f6dfdba6a775410508884097443d35c9a8690/packages/vaul-vue/src/controls.ts#L24) |
| `portalProps`     | —        | `DrawerPortalProps` <br> Props to pass to the underlying Vaul portal component. [Type definitions](https://reka-ui.com/docs/components/dialog#portal)                                                                  |
| `overlay`         | `true`   | `boolean` <br> Whether to render the drawer backdrop                                                                                                                                                                   |

### Events

| Name                     | Payload                  | Description                                           |
| ------------------------ | ------------------------ | ----------------------------------------------------- |
| `close`                  | -                        | Emitted once when the drawer is closed                |
| `update:open`            | `boolean`                | Emitted together with `close`, used by `v-model:open` |
| `update:activeSnapPoint` | `number` `string` `null` | Emitted when the active snap point changes            |

### Slots

| Name      | Accepts | Description                                           |
| --------- | ------- | ----------------------------------------------------- |
| `header`  | `any`   | Optional header content rendered above drawer content |
| `default` | `any`   | The content of the drawer                             |

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                              | Default                                         | Description         |
| ---------------------------------- | ----------------------------------------------- | ------------------- |
| `--vui-drawer-top-offset`          | `28px`                                          | Top content padding |
| `--vui-drawer-shadow-open`         | `0px -12px 48px 24px var(--color-bg-lowered)`   | Shadow when open    |
| `--vui-drawer-shadow-closed`       | `0px 0px 0px 0px transparent`                   | Shadow when closed  |
| `--vui-drawer-overlay-max-opacity` | `75%`                                           | Max overlay opacity |
| `--vui-drawer-overlay-color`       | [`var(--color-bg-raised)`](/docs/tokens/colors) | Overlay color       |
