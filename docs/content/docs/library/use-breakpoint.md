# useBreakpoint

Allows you to check whether a specific breakpoint has been hit. It returns a `ComputedRef<boolean>` which is true when specified breakpoint is hit. Please note, that this should be used very rarely, as you can make 99% of your modification with pure CSS queries.

```ts
import type { Breakpoints } from '@dolanske/vui'
import { useBreakpoint } from '@dolanske/vui'

const isMobile = useBreakpoint(Breakpoints.Mobile)
```

Focusing on simplicity, only these 4 queries are defined.

```ts
enum Breakpoints {
  Mobile = 'mobile',
  Tablet = 'tablet',
  SmallDesktop = 'smallDesktop',
  Desktop = 'desktop',
}
```

Default values:

```ts
const vuiBreakpoints = ref<Record<Breakpoints, number>>({
  mobile: 572,
  tablet: 768,
  smallDesktop: 1228,
  desktop: 1920,
})
```

The breakpoint pixel values are stored in a reactive `ref`, exported as `vuiBreakpoints`. You can override individual values to match your project's layout:

```ts
import { vuiBreakpoints } from '@dolanske/vui'

vuiBreakpoints.value.mobile = 640
```
