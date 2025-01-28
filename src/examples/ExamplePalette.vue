<script setup lang='ts'>
import Flex from '../components/Flex/Flex.vue'
import Grid from '../components/Grid/Grid.vue'

function getPalette(type: 'light' | 'dark') {
  return Array.from(document.styleSheets)
    .flatMap((styleSheet: CSSStyleSheet) => Array.from(styleSheet.cssRules))
    .filter(
      (cssRule: CSSRule): cssRule is CSSStyleRule =>
        cssRule instanceof CSSStyleRule && cssRule.selectorText === `:root`,
    )
    .flatMap((cssRule: CSSStyleRule) => Array.from(cssRule.style))
    .filter((style: string) => style.startsWith(`--${type}`))
}

const light = getPalette('light')
const dark = getPalette('dark')
</script>

<template>
  <div>
    <h3 class="mb-l">
      Sidebars
    </h3>

    <Grid :columns="2">
      <div>
        <span>Light</span>

        <pre>
          {{ light }}
        </pre>
      </div>

      <div>
        <span>Dark</span>
        <pre>
          {{ dark }}
        </pre>
        <!-- <Flex wrap gap="xxs">
          <div
            v-for="color in dark"
            :key="color"
            class="cube"
            :style="{
              backgroundColor: `var(${color})`,
            }"
          />
        </Flex> -->
      </div>
    </Grid>
  </div>
</template>

<style scoped>
.cube {
  display: block;
  width: 32px;
  height: 32px;
  border-radius: var(--border-radius-s);
}
</style>
