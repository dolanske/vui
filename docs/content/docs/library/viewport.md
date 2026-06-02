# viewport

The `viewport` object provides a simple, reactive way to check if the current screen width matches a given breakpoint.

> **Tip:** For most layout changes, prefer using CSS media queries. Use the `viewport` object only when you need to react to breakpoints in your JavaScript or Vue logic.

- `s`: Mobile breakpoint (`<=572px`)
- `m`: Tablet breakpoint (`<=768px`)
- `l`: Small desktop/laptop breakpoint (`<=1228px`)

You can use these properties directly in your code

```ts
import { viewport } from '@dolanske/vui'

// Checking breakpoint in code
if (viewport.s) {
  getMobileData()
}
```

```vue
<!-- Checking viewport in template -->
<span v-if="viewport.s">
  Hello on mobile
</span>
```

### Customization

The pixel values for each breakpoint are stored in a reactive `breakpoints` ref. You can override them to match your project's needs:

```ts
import { breakpoints } from '@dolanske/vui'

breakpoints.value.s = 640 // Change mobile breakpoint to 640px
```

### Extending

If you wish to add new breakpoints, append a new property to `breakpoints.value`:

```ts
import { breakpoints } from '@dolanske/vui'

breakpoints.value.xl = 2048
```

Then use bracket access for dynamic keys:

```ts
import { viewport } from '@dolanske/vui'

if (viewport['xl']) {
  // ...
}
```

If you want stricter typing for custom keys in your app code, create a local helper type:

```ts
import { viewport } from '@dolanske/vui'

type AppViewport = typeof viewport & {
  xl: boolean
}

const appViewport = viewport as AppViewport

if (appViewport['xl']) {
  // ...
}
```

Custom keys are reactive the same way as built-in keys.
