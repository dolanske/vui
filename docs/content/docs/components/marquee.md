# Marquee

A continuously scrolling ticker that loops its content infinitely. It duplicates the slot content behind the scenes to create a seamless loop, and exposes controls for direction, speed, and a stepped/stagger mode. Animation is disabled if user uses `prefer-reduced-motion` setting on.

::marquee-example

```vue
<script setup>
import { Flex, Marquee } from '@dolanske/vui'
</script>

<template>
  <Flex column gap="m">
    <Marquee direction="left" :speed="70">
      <span style="font-size: 65px; line-height: 65px; font-weight: 700; white-space: nowrap; padding-right: 2rem;">
        Scrolling Left — Fast and Seamless —
      </span>
    </Marquee>

    <Marquee direction="right" :speed="40">
      <span style="font-size: 65px; line-height: 65px; font-weight: 700; white-space: nowrap; padding-right: 2rem;">
        Scrolling Right — Smooth and Infinite —
      </span>
    </Marquee>

    <Marquee direction="left" :speed="20">
      <span style="font-size: 65px; line-height: 65px; font-weight: 700; white-space: nowrap; padding-right: 2rem;">
        Slow Left Scroll — Relaxed Pace — Easy Reading —
      </span>
    </Marquee>
  </Flex>
</template>
```

::

### Props

| Name        | Default   | Type                                                                                                        |
| ----------- | --------- | ----------------------------------------------------------------------------------------------------------- |
| `direction` | `'right'` | `'left'` `'right'` <br> The direction the content scrolls                                                   |
| `speed`     | `50`      | `number` <br> Scroll speed in pixels per second. Higher values scroll faster                                |
| `stagger`   | —         | `boolean` <br> Uses a stepped timing function for a jerky/ticker-style movement instead of smooth scrolling |

### Slots

| Name      | Accepts | Description                                                                                        |
| --------- | ------- | -------------------------------------------------------------------------------------------------- |
| `default` | `any`   | The content to scroll. Items should use `white-space: nowrap` to prevent wrapping during animation |
