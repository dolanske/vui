<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import Button from '../components/Button/Button.vue'
import Flex from '../components/Flex/Flex.vue'
import Grid from '../components/Grid/Grid.vue'
import { setColorTheme, theme } from '../shared/theme'
import ExampleColor from './shared/ExampleColor.vue'

// function getPalette(type: 'light' | 'dark') {
//   return Array.from(document.styleSheets)
//     .flatMap((styleSheet: CSSStyleSheet) => Array.from(styleSheet.cssRules))
//     .filter(
//       (cssRule: CSSRule): cssRule is CSSStyleRule =>
//         cssRule instanceof CSSStyleRule && cssRule.selectorText === `:root`,
//     )
//     .flatMap((cssRule: CSSStyleRule) => Array.from(cssRule.style))
//     .filter((style: string) => style.startsWith(`--${type}`))
// }

// const light = getPalette('light')
// const dark = getPalette('dark')
</script>

<template>
  <div>
    <h3 class="mb-l">
      Themes
    </h3>

    <Grid :columns="2">
      <Flex class="theme-wrap light" column gap="xxs">
        <Flex space-between class="mb-l" align-center expand>
          <h5>Light</h5>
          <Button :disabled="theme === 'light'" variant="gray" data-title-top="Switch theme" @click="setColorTheme('light')">
            <template #start>
              <Icon icon="ph:sun" />
            </template>
            Use
          </Button>
        </Flex>
        <ExampleColor name="Bg" color="--light-color-bg" />
        <ExampleColor name="Bg Medium" color="--light-color-bg-medium" />
        <ExampleColor name="Bg Raised" color="--light-color-bg-raised" />
        <ExampleColor name="Bg Lowered" color="--light-color-bg-lowered" />
        <div class="padder" />
        <ExampleColor name="Text" color="--light-color-text" />
        <ExampleColor name="Text Light" color="--light-color-text-light" />
        <ExampleColor name="Text Lighter" color="--light-color-text-lighter" />
        <ExampleColor name="Text Lightest" color="--light-color-text-lightest" />
        <ExampleColor name="Text Invert" color="--light-color-text-invert" />
        <div class="padder" />
        <ExampleColor name="Button Gray" color="--light-color-button-gray" />
        <ExampleColor name="Button Gray Hover" color="--light-color-button-gray-hover" />
        <div class="padder" />
        <ExampleColor name="Text Red" color="--light-color-text-red" />
        <ExampleColor name="Bg Red Lowered" color="--light-color-bg-red-lowered" />
        <ExampleColor name="Bg Red Raised" color="--light-color-bg-red-raised" />
        <div class="padder" />
        <ExampleColor name="Text Green" color="--light-color-text-green" />
        <ExampleColor name="Bg Green Lowered" color="--light-color-bg-green-lowered" />
        <ExampleColor name="Bg Green Raised" color="--light-color-bg-green-raised" />
        <div class="padder" />
        <ExampleColor name="Text Yellow" color="--light-color-text-yellow" />
        <ExampleColor name="Bg Yellow Lowered" color="--light-color-bg-yellow-lowered" />
        <ExampleColor name="Bg Yellow Raised" color="--light-color-bg-yellow-raised" />
        <div class="padder" />
        <ExampleColor name="Text Blue" color="--light-color-text-blue" />
        <ExampleColor name="Bg Blue Lowered" color="--light-color-bg-blue-lowered" />
        <ExampleColor name="Bg Blue Raised" color="--light-color-bg-blue-raised" />
        <div class="padder" />
        <ExampleColor name="Border" color="--light-color-border" />
        <ExampleColor name="Border Strong" color="--light-color-border-strong" />
        <ExampleColor name="Border Weak" color="--light-color-border-weak" />
        <div class="padder" />
        <ExampleColor name="Accent" color="--light-color-accent" />
        <ExampleColor name="Bg Accent Lowered" color="--light-color-bg-accent-lowered" />
        <ExampleColor name="Bg Accent Raised" color="--light-color-bg-accent-raised" />
      </Flex>

      <Flex class="theme-wrap dark" gap="xxs" column>
        <Flex space-between class="mb-l" align-center expand>
          <h5>Dark</h5>
          <Button :disabled="theme === 'dark'" variant="gray" data-title-top="Switch theme" @click="setColorTheme('dark')">
            <template #start>
              <Icon icon="ph:moon" />
            </template>
            Use
          </Button>
        </Flex>
        <ExampleColor name="Bg" color="--dark-color-bg" />
        <ExampleColor name="Bg Medium" color="--dark-color-bg-medium" />
        <ExampleColor name="Bg Raised" color="--dark-color-bg-raised" />
        <ExampleColor name="Bg Lowered" color="--dark-color-bg-lowered" />
        <div class="padder" />
        <ExampleColor name="Text" color="--dark-color-text" />
        <ExampleColor name="Text Light" color="--dark-color-text-light" />
        <ExampleColor name="Text Lighter" color="--dark-color-text-lighter" />
        <ExampleColor name="Text Lightest" color="--dark-color-text-lightest" />
        <ExampleColor name="Text Invert" color="--dark-color-text-invert" />
        <div class="padder" />
        <ExampleColor name="Button Gray" color="--dark-color-button-gray" />
        <ExampleColor name="Button Gray Hover" color="--dark-color-button-gray-hover" />
        <div class="padder" />
        <ExampleColor name="Text Red" color="--dark-color-text-red" />
        <ExampleColor name="Bg Red Lowered" color="--dark-color-bg-red-lowered" />
        <ExampleColor name="Bg Red Raised" color="--dark-color-bg-red-raised" />
        <div class="padder" />
        <ExampleColor name="Text Green" color="--dark-color-text-green" />
        <ExampleColor name="Bg Green Lowered" color="--dark-color-bg-green-lowered" />
        <ExampleColor name="Bg Green Raised" color="--dark-color-bg-green-raised" />
        <div class="padder" />
        <ExampleColor name="Text Yellow" color="--dark-color-text-yellow" />
        <ExampleColor name="Bg Yellow Lowered" color="--dark-color-bg-yellow-lowered" />
        <ExampleColor name="Bg Yellow Raised" color="--dark-color-bg-yellow-raised" />
        <div class="padder" />
        <ExampleColor name="Text Blue" color="--dark-color-text-blue" />
        <ExampleColor name="Bg Blue Lowered" color="--dark-color-bg-blue-lowered" />
        <ExampleColor name="Bg Blue Raised" color="--dark-color-bg-blue-raised" />
        <div class="padder" />
        <ExampleColor name="Border" color="--dark-color-border" />
        <ExampleColor name="Border Strong" color="--dark-color-border-strong" />
        <ExampleColor name="Border Weak" color="--dark-color-border-weak" />
        <div class="padder" />
        <ExampleColor name="Accent" color="--dark-color-accent" />
        <ExampleColor name="Bg Accent Lowered" color="--dark-color-bg-accent-lowered" />
        <ExampleColor name="Bg Accent Raised" color="--dark-color-bg-accent-raised" />
      </Flex>
    </Grid>
  </div>
</template>

<style>
.padder {
  height: 16px;
}

.theme-wrap {
  padding: var(--space-m);
  border-radius: var(--border-radius-m);

  &.light {
    background-color: white;

    h5,
    span {
      color: var(--light-color-text) !important;
    }
  }

  &.dark {
    background-color: black;

    h5,
    span {
      color: var(--dark-color-text) !important;
    }
  }
}
</style>
