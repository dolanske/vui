<script setup lang="ts">
import Card from '../components/Card/Card.vue'
import Flex from '../components/Flex/Flex.vue'
import Resizable from '../components/Resizable/Resizable.vue'
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Resizeable
    </h3>

    <Card :padding="false">
      <Resizable>
        <Flex
          v-for="item in 3"
          :key="item"
          class="example-panel" x-center y-center
        >
          <p>Panel {{ item }}</p>
        </Flex>
      </Resizable>
    </Card>
  </div>
</template>

<style>
.example-panel {
  height: 256px;
}
</style>
