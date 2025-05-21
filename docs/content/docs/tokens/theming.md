# Theming

Continuing what was described in [colors](/docs/tokens/colors), VUI also defines two main themes. Dark and light mode. Each contains a distinctive set of colors which map to the main color variables. If you want to support both light & dark mode, you should set your color variables with the `light` or `dark` prefix.


Here's a simple example how you'd re-map some of the existing CSS variables.
```css
:root {
  --light-color-accent:rgb(247, 63, 31);
  --dark-color-accent:rgb(165, 47, 27);
}
```

Under the hood, VUI simply sets the correct CSS variable depending on the theme.

```css
:root.light {
  --color-accent: var(--light-color-accent);
}

:root.dark {
  --color-accent: var(--dark-color-accent);
}
```

Because VUI allows you to define custom themes, you can use the VueUse's `useColorMode` and define your own themes. If you add for instance a `dark-contrast` theme, you can theme it by simply adding a new class to the `:root` selector.

```css
:root.dark-contrast {
  --color-accent: rgb(255, 0, 0);
}
```