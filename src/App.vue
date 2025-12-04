<script setup lang="ts">
import ExampleButtons from './examples/ExampleButtons.vue'
import ExampleSkeletons from './examples/ExampleSkeletons.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container">
      <ExampleButtons />
      <ExampleSkeletons />
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
