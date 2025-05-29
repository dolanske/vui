# Sidebar

A responsive sidebar component that can be used for navigation, menus, or any other content that needs to be displayed in a side panel. It supports both full-width and mini modes, and can be configured to appear on hover.

## Usage

```vue
<script setup>
import { Sidebar } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(true)
</script>

<template>
  <Sidebar v-model="isOpen" :width="224">
    <template #header>
      <div class="p-md">
        <h2>Navigation</h2>
      </div>
    </template>

    <div class="p-md">
      <!-- Sidebar content -->
    </div>

    <template #footer>
      <div class="p-md">
        <!-- Footer content -->
      </div>
    </template>
  </Sidebar>
</template>
```

## Props

| Name     | Type      | Default | Description                                                               |
| -------- | --------- | ------- | ------------------------------------------------------------------------- |
| `width`  | `number`  | `224`   | Width of the sidebar in pixels when in full mode                          |
| `mini`   | `boolean` | `false` | Whether to display the sidebar in mini mode (collapsed)                   |
| `appear` | `boolean` | `false` | Whether the sidebar should appear on hover at the left edge of the screen |
| `floaty` | `boolean` | `false` | Whether to add edges of background around the sidebar                     |

## Events

| Name                | Type      | Description                                   |
| ------------------- | --------- | --------------------------------------------- |
| `update:modelValue` | `boolean` | Emitted when the sidebar's open state changes |

## Slots

| Name      | Props                                                                                 | Description                                     |
| --------- | ------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `default` | `{ mini: boolean, floaty: boolean, width: number, open: boolean, close: () => void }` | Main content of the sidebar                     |
| `header`  | `{ mini: boolean, floaty: boolean, width: number, open: boolean, close: () => void }` | Content to display at the top of the sidebar    |
| `footer`  | `{ mini: boolean, floaty: boolean, width: number, open: boolean, close: () => void }` | Content to display at the bottom of the sidebar |

## Examples

### Basic Sidebar

```vue
<script setup>
import { Sidebar } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(true)
</script>

<template>
  <Sidebar v-model="isOpen">
    <div class="p-md">
      <h3>Navigation</h3>
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  </Sidebar>
</template>
```

### Mini Sidebar

```vue
<script setup>
import { Sidebar } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(true)
</script>

<template>
  <Sidebar v-model="isOpen" mini>
    <div class="p-md">
      <nav>
        <ul>
          <li>🏠</li>
          <li>ℹ️</li>
          <li>📞</li>
        </ul>
      </nav>
    </div>
  </Sidebar>
</template>
```

### Appear on Hover

```vue
<script setup>
import { Sidebar } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <Sidebar v-model="isOpen" appear>
    <div class="p-md">
      <h3>Navigation</h3>
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  </Sidebar>
</template>
```

### With Header and Footer

```vue
<script setup>
import { Sidebar } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(true)
</script>

<template>
  <Sidebar v-model="isOpen">
    <template #header>
      <div class="p-md">
        <h2>My App</h2>
      </div>
    </template>

    <div class="p-md">
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>

    <template #footer>
      <div class="p-md">
        <p>© 2024 My App</p>
      </div>
    </template>
  </Sidebar>
</template>
```
