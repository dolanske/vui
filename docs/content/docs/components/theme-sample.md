# Theme Sample

A compact overview of the theme. It shows every color token, the type, spacing, radius, shadow and height scales, and the most common components, all on one screen. Render it temporarily while adjusting your theme to see every change at once, in both light and dark mode.

::theme-sample-example{sourcePath="ThemeSample/ThemeSample.vue"}

```vue
<script setup>
import { ThemeSample } from '@dolanske/vui'
</script>

<template>
  <ThemeSample title="Acme theme" />
</template>
```

::

Hover a color swatch to see the full name of its CSS variable. The sample only reads tokens, so overriding them anywhere above it in the page, for example on `:root`, is reflected immediately.

### Props

| Name    | Default          | Type                                     |
| ------- | ---------------- | ---------------------------------------- |
| `title` | `'Theme sample'` | `string` <br> Heading and accessible name |
