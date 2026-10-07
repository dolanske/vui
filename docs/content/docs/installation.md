# Installation

VUI is a Vue 3 component library with consistent styling, heavy theming support, and TypeScript integration. Its components follow the WAI-ARIA authoring practices for roles, focus management and keyboard support. Always test your own screens with a keyboard and a screen reader, the library can not guarantee accessibility of the content you put into it.

VUI's core functionality is divided into four categories.

- [Tokens](/docs/tokens)
  - Offers heavy customization of the framework & UI components
- [Classes](/docs/classes)
  - Quick style change on the fly. VUI should not be used with a CSS framework
- [Components](/docs/components)
  - The UI components
- [Library](/docs/library)
  - Collection of useful methods and composables

---

## Installation

To install VUI into your project, simply run the following command.

```bash
npm i @dolanske/vui
```

Add this import into your root stylesheet

```css
@import url(@dolanske/vui/style);
```

If it does not work, import it from your main entry file instead: `import '@dolanske/vui/style'`.

---

## Usage

Import the components you use. Importing the library has no side effects, so bundlers can drop the components you do not use. The stylesheet always contains the styles of every component.

```vue
<script setup lang="ts">
import { Badge, Button, Input, Textarea } from '@dolanske/vui'
</script>
```

Mount `<Toasts />` once if you use toast notifications, and read `theme` once on startup to restore the user's saved theme. See [Toast](/docs/components/toast) and [theme](/docs/library/theme).

---

## Styles and your app

All VUI styles are placed in [cascade layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer):

```css
@layer vui.reset, vui.base, vui.components, vui.utilities;
```

Styles of your app which are not in a layer always take precedence over layered styles, regardless of specificity. Overriding a component never requires `!important` or longer selectors:

```css
/* Wins over the library, even though it is a single class */
.vui-button {
  border-radius: 0;
}
```

VUI includes a CSS reset in the lowest layer, which your own styles override. The font size scale is based on the `--vui-font-unit` token (`0.635rem` by default, which follows the font size set in the browser settings), so VUI does not change the root font size of your app.

Older versions set `font-size: 63.5%` and `overflow-x: hidden` on `<html>`. Add the `vui-root` class to `<html>` to keep that behavior:

```html
<html class="vui-root"></html>
```

High contrast mode (`forced-colors`) is supported, and focus rings meet the WCAG contrast requirements.
