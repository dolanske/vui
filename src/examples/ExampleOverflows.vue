<script setup lang="ts">
import Card from '../components/Card/Card.vue'
import Flex from '../components/Flex/Flex.vue'
import Grid from '../components/Grid/Grid.vue'
import Overflow from '../components/Overflow/Overflow.vue'
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Overflow
    </h3>

    <Grid :columns="2">
      <Card :padding="false">
        <Overflow class="p-m">
          <ol class="example-list">
            <li v-for="item in 25" :key="item">
              {{ `I am item ${item}` }}
            </li>
          </ol>
        </Overflow>
      </Card>

      <Card :padding="false">
        <Overflow horizontal class="p-m">
          <Flex class="example-list">
            <span v-for="item in 25" :key="item">
              {{ `I am item ${item}` }}
            </span>
          </Flex>
        </Overflow>
      </Card>
    </Grid>
  </div>
</template>

<style lang="scss">
.example-list {
  height: 256px;
  // width: 100%;
}
</style>
