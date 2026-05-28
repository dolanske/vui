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

If you wish to add new breakpoints, you can do it by appending a new property to the `breakpoints` ref and globally augmenting the `Breakpoints` interface for type safety:

```ts
import { breakpoints } from '@dolanske/vui'

Reflect.set(breakpoints, 'xl', 2048)
```

To make TypeScript aware of your new breakpoint everywhere, augment the `Breakpoints` interface in a `.d.ts` file (e.g., `types/viewport-augment.d.ts`):

```ts
// types/viewport-augment.d.ts
import '@dolanske/vui'

declare module '@dolanske/vui' {
  interface Breakpoints {
    /**
     * 2k monitors (<= 2048px)
     */
    xl: boolean
  }
}
```

Now, `viewport.xl` will be reactive and type-safe throughout your project.
