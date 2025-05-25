<script setup lang="ts">

</script>

<template>
  <div>
    <h1>Theming</h1>
    <p>Building upon what was described in <NuxtLink href="/docs/tokens/colors">colors</NuxtLink>, VUI defines two main themes: dark and light mode. Each theme contains a distinctive set of colors that map to the main color variables. To support both light and dark modes, you should set your color variables with the `light` or `dark` prefix.</p>
    <p>
      Here's a simple example of how to re-map some of the existing CSS variables:
    </p>
    <DocsCode>
:root {
  --light-color-accent: rgb(247, 63, 31);
  --dark-color-accent: rgb(165, 47, 27);
}
    </DocsCode>
    <p>Under the hood, VUI automatically sets the correct CSS variable based on the active theme:</p>

    <DocsCode>
:root.light {
  --color-accent: var(--light-color-accent);
}

:root.dark {
  --color-accent: var(--dark-color-accent);
}
    </DocsCode>

    <p>Since VUI supports custom themes, you can use VueUse's `useColorMode` to define your own themes. For example, if you want to add a `dark-contrast` theme, you can implement it by adding a new class to the `:root` selector:</p>

    <DocsCode>
:root.dark-contrast {
  --color-accent: var(--dark-contrast-color-accent);
}
    </DocsCode>
  </div>
</template>