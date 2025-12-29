# Popout

A flexible popout component that can be used to create tooltips, dropdowns, or any other floating content. It uses the Floating UI library for positioning and provides smooth animations.

> Plese note: components using popout ([Tooltip](/docs/components/tooltip), [Dropdown](/docs/components/dropdown) & [Popout](/docs/components/popout)) cannot be styled using `scoped` CSS in Vue SFC. However, you can just define a new `<style>` tag, style the popout inside and keep rest of your CSS scoped in a separate `<style scoped>`.

::popout-example

```vue
<script setup>
import { Button, Popout } from '@dolanske/vui'
import { ref } from 'vue'

const isVisible = ref(false)
const anchorRef = ref(null)
</script>

<template>
  <Button @click="isVisible = !isVisible">
    Toggle Popout
  </Button>

  <Popout
    :anchor="anchorRef"
    :visible="isVisible"
    placement="bottom"
    class="p-l"
    style="max-width: 256px"
    @click-outside="isVisible = false"
  >
    <h3>Popout content</h3>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem facere eligendi ex, alias itaque molestiae, vero animi, vitae vel fuga corporis aut consectetur temporibus ipsum placeat dolores perferendis. Deleniti, et!</p>
  </Popout>
</template>
```

::

### Props

| Name              | Default | Type                                                                                                                                                                             |
| ----------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `anchor`          | —       | `HTMLElement` <br> Reference to the HTML element the Popout is anchored to                                                                                                       |
| `placement`       | `top`   | `string` <br> Position of the popout relative to the anchor                                                                                                                      |
| `offset`          | `8`     | `number` <br> Distance between the anchor and the popout in pixels                                                                                                               |
| `visible`         | —       | `boolean` <br> Whether the popout is visible                                                                                                                                     |
| `transition-name` | `modal` | `string` `none` <br> Allows you to change or disable the vue transition for the popout appear. By default, a `fade` animation with direction depending on the placement is used. |

### Events

| Name           | Payload | Type                                    |
| -------------- | ------- | --------------------------------------- |
| `clickOutside` | —       | Called when clicking outside the popout |

### Slots

| Name      | Accepts | Description                   |
| --------- | ------- | ----------------------------- |
| `default` | `any`   | The content inside the popout |
