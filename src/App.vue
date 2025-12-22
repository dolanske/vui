<script setup lang="ts">
import ExampleButtons from './examples/ExampleButtons.vue'
import ExampleSheets from './examples/ExampleSheets.vue'
import ExampleTooltips from './examples/ExampleTooltips.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container">
      <ExampleButtons />
      <!-- <ExampleSkeletons /> -->
      <!-- <ExampleSheets /> -->
      <ExampleTooltips />
      <!-- <ExampleSheets /> -->
    <!-- <h1>Hi</h1>
    <div class="container container-l p-xl">
      <Button expand size="l">
        <template #end>
          hi
        </template>
      </Button>
    </div> -->
    </div>
  </main>
</template>

<style>
  .red {
  background: red !important;
}
</style>
