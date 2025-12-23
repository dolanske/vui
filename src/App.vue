<script setup lang="ts">
import ExampleButtons from './examples/ExampleButtons.vue'
import ExampleDividers from './examples/ExampleDividers.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container">
      <ExampleButtons />
      <ExampleDividers />
      <!-- <ExampleSkeletons /> -->
      <!-- <ExampleSheets /> -->
      <!-- <ExampleTooltips /> -->
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
