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
@layer vui.reset, vui.base, vui.components, vui.modifiers, vui.utilities;
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

---

## Migrating to 2.0

Cascade layers change which styles win, so overrides written for 1.x may behave differently. Go through these steps after upgrading.

### Root font size

If your app was designed around the old root font size, add `vui-root` to `<html>`. Remove any `font-size` you set on `html` yourself, otherwise it now wins over VUI and changes the whole rem scale.

```css
/* Remove this, use the vui-root class instead */
html {
  font-size: 63.5%;
}
```

### Remove `!important` from overrides

Your unlayered styles already win over VUI, so `!important` is no longer needed. It also works the other way around for layers: an `!important` declaration in a layer beats an `!important` declaration outside of one. VUI does not use `!important`, apart from the high contrast styles.

```css
/* 1.x */
.vui-card .vui-card-header {
  padding: 0 !important;
}

/* 2.0 */
.vui-card-header {
  padding: 0;
}
```

### Global element styles

Element selectors such as `a`, `p` or `table td` used to lose to the more specific selectors of components. Unlayered, they now win over every component, so a global `a { color: red; }` also colors a `Button` rendered as a link.

Either scope them to your own content (`.content p`), or put them in a layer ordered below VUI. The order statement has to come before the VUI stylesheet:

```css
@layer app, vui;
@import url(@dolanske/vui/style);

@layer app {
  a {
    color: var(--color-text);
    text-decoration: none;
  }
}
```

If your bundler might load the VUI styles first, put the order statement in the `<head>` instead, before any stylesheet:

```html
<style>
  @layer app, vui;
</style>
```

Overrides of VUI itself, such as `.vui-button` or `:root` tokens, should stay outside of any layer.
