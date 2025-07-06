# Guide

VUI is a modern Vue 3 component library designed for building beautiful and accessible user interfaces. It provides a comprehensive set of pre-built components with consistent styling, heavy theming support, and TypeScript integration.

VUI's core functionality is divided into three categories.

- [Style tokens](/docs/tokens)
  - Offers heavy customization of the framework & UI components
- [CSS framework](/docs/framework)
  - Quick style change on the fly. VUI should not be used with any CSS framework
- [Components](/docs/components)
  - The UI components

---

## Installation

To install VUI into your project, simply run the following command.

```bash
npm i @dolanske/vui
```

Add this import into your root stylsheet

```css
@import url(@dolanske/vui/style);
```

If it does not work, sometimes it requires you to add it to the main entry js/ts file.

---

## Usage

VUI supports treeshaking, so you will be importing only the components you are using.

```vue
<script setup lang="ts">
import { Badge, Button, Input, Textarea } from '@dolanske/vui'
</script>
```
