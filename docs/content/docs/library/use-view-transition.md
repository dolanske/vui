# useViewTransition

Simple wrapper around the browser [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API). Falls back to calling the update function directly in browsers that don't support it.

### Usage

```ts
import { useViewTransition } from '@/shared/viewTransition'

const { startTransition } = useViewTransition()

async function openModal() {
  await startTransition(() => {
    // perform your state update here
    modalOpen.value = true
  })
}
```

- `isRunning` — reactive boolean that is `true` while the transition is in progress.
- `startTransition(update)` — runs the provided function inside a view transition. `update` can be sync or async.

### CSS Setup

Assign a `view-transition-name` to the elements you want to animate, then define the animation using the `::view-transition-old` and `::view-transition-new` pseudo-elements.

```css
.my-element {
  view-transition-name: my-element;
}

::view-transition-old(my-element) {
  animation: 200ms ease-out fade-out;
}

::view-transition-new(my-element) {
  animation: 200ms ease-in fade-in;
}

```

At minimum you should set `animation-duration` on both selectors. The transition name must be unique per page at the time the transition runs.
