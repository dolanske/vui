# Drawer

A drawer component that slides in from the side of the screen. It's built on top of the [Vaul](https://github.com/unovue/vaul-vue) library and provides a customizable container for content.

::drawer-example

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
    <div class="p-md">
      <h2>Drawer Content</h2>
      <p>This is the content of the drawer.</p>
    </div>
  </Drawer>
</template>
```

::

### Important Note

The drawer component requires a root element with the `vaul-drawer-wrapper` attribute to function properly. Make sure your app's root component has this attribute:

```vue
<template>
  <div vaul-drawer-wrapper>
    <!-- Your app content -->
  </div>
</template>
```

### Props

| Name             | Default | Type                                                                                                                                                                                                                   |
| ---------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open`           | `false` | `boolean` <br> Controls the visibility of the drawer                                                                                                                                                                   |
| `title`          | —       | `string` <br> Title for accessibility                                                                                                                                                                                  |
| `containerClass` | —       | `string`, `object`, `array` <br> CSS class applied to the container of the drawer content                                                                                                                              |
| `containerSize`  | `m`     | `s`, `m`, `l`, `xl`, `full`, `number` <br> Size of the container or max-width in pixels                                                                                                                                |
| `handle`         | `true`  | `boolean` <br> Whether to display the handle symbol at the top of the drawer                                                                                                                                           |
| `rootProps`      | —       | `DrawerRootProps` <br> Props to pass to the underlying Vaul root component. [Type definitions](https://github.com/unovue/vaul-vue/blob/1b1f6dfdba6a775410508884097443d35c9a8690/packages/vaul-vue/src/controls.ts#L24) |
| `portalProps`    | —       | `DrawerPortalProps` <br> Props to pass to the underlying Vaul portal component. [Type definitions](https://reka-ui.com/docs/components/dialog#portal)                                                                  |

### Events

| Name    | Description                       |
| ------- | --------------------------------- |
| `close` | Emitted when the drawer is closed |

### Slots

| Name      | Accepts | Description               |
| --------- | ------- | ------------------------- |
| `default` | `any`   | The content of the drawer |
