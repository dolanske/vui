# Popout

A flexible popout component that can be used to create tooltips, dropdowns, or any other floating content. It uses the Floating UI library for positioning and provides smooth animations.

> Please note: components using popout ([Tooltip](/docs/components/tooltip), [Dropdown](/docs/components/dropdown) & [Popout](/docs/components/popout)) cannot be styled using `scoped` CSS in Vue SFC. However, you can just define a new `<style>` tag, style the popout inside and keep rest of your CSS scoped in a separate `<style scoped>`.

::popout-example{sourcePath="Popout/Popout.vue"}

```vue
<script setup>
import { Button, Popout } from '@dolanske/vui'
import { ref } from 'vue'

const isVisible = ref(false)
const anchorRef = ref(null)
</script>

<template>
  <Button ref="anchorRef" @click="isVisible = !isVisible">
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

| Name              | Default | Type                                                                                                                                                                                                                                                                                                                                                   |
| ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `anchor`          | —       | `HTMLElement` `Component` <br> Reference to the element (or component) the Popout is anchored to                                                                                                                                                                                                                                                       |
| `placement`       | `top`   | `Placement` <br> Position of the popout relative to the anchor. Reactive                                                                                                                                                                                                                                                                               |
| `offset`          | `8`     | `number` <br> Distance between the anchor and the popout in pixels. Reactive                                                                                                                                                                                                                                                                           |
| `matchWidth`      | `false` | `boolean` <br> Makes the popout at least as wide as its anchor                                                                                                                                                                                                                                                                                         |
| `arrow`           | `false` | `boolean` <br> Renders an arrow pointing at the anchor                                                                                                                                                                                                                                                                                                 |
| `closeOnEscape`   | `false` | `boolean` <br> Emits `escape` when Escape is pressed while this is the top-most layer. Popouts without it never react to (or block) Escape                                                                                                                                                                                                             |
| `visible`         | —       | `boolean` <br> Whether the popout is visible                                                                                                                                                                                                                                                                                                           |
| `transition-name` | —       | `string` `none` <br> Allows you to change or disable the Vue transition for the popout appear. By default, placement-based transition is used. Set to `none` when using the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) to prevent the default animation from conflicting with your view transition. |
| `teleport`        | `true`  | `boolean` <br> Whether the popout is teleported to `body`                                                                                                                                                                                                                                                                                              |
| `enter-delay`     | `0`     | `number` <br> Delay in milliseconds before the popout becomes visible after `visible` turns true                                                                                                                                                                                                                                                       |
| `leave-delay`     | `0`     | `number` <br> Delay in milliseconds before the popout hides after `visible` turns false                                                                                                                                                                                                                                                                |

### Events

| Name           | Payload        | Type                                                                                                      |
| -------------- | -------------- | --------------------------------------------------------------------------------------------------------- |
| `clickOutside` | `PointerEvent` | Called when clicking outside the popout. Clicks inside popouts stacked above (e.g. submenus) do not count |
| `escape`       | —              | Called when Escape is pressed and `closeOnEscape` is set                                                  |

Popouts keep a small distance to the viewport edges and stay clear of notches and the home indicator on mobile devices. Other attributes (such as `role` or `aria-label`) are applied to the popout element.

### Exposes

| Name         | Type     | Description                             |
| ------------ | -------- | --------------------------------------- |
| `el`         | `method` | Returns the popout element, if rendered |
| `layerIndex` | `method` | Returns the z-index of the popout layer |

### Slots

| Name      | Accepts | Description                   |
| --------- | ------- | ----------------------------- |
| `default` | `any`   | The content inside the popout |
