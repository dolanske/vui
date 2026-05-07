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
        <Flex class="example-panel" x-center y-center>
          <p>Panel 1</p>
        </Flex>
        <Flex class="example-panel" x-center y-center>
          <p>Panel 2</p>
        </Flex>
        <Resizable class="example-panel" vertical>
          <Flex class="h-100" x-center y-center>
            <p>Panel 3</p>
          </Flex>
          <Flex class="h-100" x-center y-center>
            <p>Panel 4</p>
          </Flex>
        </Resizable>
      </Resizable>
    </Card>
  </div>
</template>

<style>
.example-panel {
  height: 256px;
}
</style>
