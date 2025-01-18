<script setup lang="ts">
import Divider from './components/Divider/Divider.vue'
import ExampleAlerts from './examples/ExampleAlerts.vue'
import ExampleBadges from './examples/ExampleBadges.vue'
import ExampleButtons from './examples/ExampleButtons.vue'
import ExampleSpinners from './examples/ExampleSpinners.vue'
</script>

<template>
  <div class="container container-l p-xl">
    <h1 class="mb-l">
      VUI
    </h1>
    <p>The purpose of this page is to showcase and test every single component case</p>
    <Divider :size="64" />
    <ExampleButtons />
    <Divider :size="64" />
    <ExampleBadges />
    <Divider :size="64" />
    <ExampleSpinners />
  </div>
</template>
