# Theme

VUI ships a light and a dark theme. The theme API lets you switch between them and read which one is displayed.

Nothing happens when the library is imported. Until the theme API is used, the page follows the system preference through CSS, so apps which manage the `light` / `dark` class on `<html>` themselves are never overridden.

```ts
import { isDark, resolvedTheme, setColorTheme, theme } from '@dolanske/vui'

// Switch theme, persisted in localStorage
setColorTheme('dark') // 'light' | 'dark' | 'auto'

// The selected mode, can be 'auto'
theme.value

// The theme actually displayed, 'auto' resolved through the system preference
resolvedTheme.value // 'light' | 'dark'
isDark.value // boolean
```

### Restoring the saved theme

The saved choice is restored the first time `theme` is read or `setColorTheme` is called. Do this once when your app starts:

```ts
// main.ts
import { theme } from '@dolanske/vui'

// Applies the saved theme (or 'auto') to <html>
void theme.value
```

### API

| Name            | Type                             | Description                                                                                                                                |
| --------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `setColorTheme` | `(theme: VuiTheme) => void`      | Sets the theme and applies the `light` / `dark` class to `<html>`. `auto` follows the system preference                                    |
| `theme`         | `ComputedRef<VuiTheme>`          | The selected mode. Reading it starts theme management                                                                                      |
| `resolvedTheme` | `ComputedRef<'light' \| 'dark'>` | The displayed theme. Read-only, it observes the class on `<html>` and the system preference and never changes anything. `light` during SSR |
| `isDark`        | `ComputedRef<boolean>`           | Shortcut for `resolvedTheme.value === 'dark'`                                                                                              |

```ts
type VuiTheme = 'light' | 'dark' | 'auto'
```

See [Theming](/docs/tokens/theming) for customizing the colors of each theme.

### Server side rendering

`theme`, `resolvedTheme`, the [viewport](/docs/library/viewport) object and the toast store are module level singletons. They are safe to import on the server, but their values only become meaningful in the browser. Avoid calling `pushToast` during server rendering, toasts would be shared between requests.
