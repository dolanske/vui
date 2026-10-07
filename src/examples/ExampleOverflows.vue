<script setup lang='ts'>
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
    <Grid :columns="2" gap="m">
      <div>
        <strong class="block mb-s">Vertical</strong>
        <Card :padding="false">
          <Overflow class="p-m example-overflow" label="Vertical list">
            <ol>
              <li v-for="item in 25" :key="item">
                I am item {{ item }}
              </li>
            </ol>
          </Overflow>
        </Card>
      </div>

      <div>
        <strong class="block mb-s">Horizontal</strong>
        <Card :padding="false">
          <Overflow horizontal class="p-m" label="Horizontal list">
            <Flex gap="m" class="nowrap">
              <span v-for="item in 25" :key="item">I am item {{ item }}</span>
            </Flex>
          </Overflow>
        </Card>
      </div>

      <div>
        <strong class="block mb-s">Hidden scrollbar</strong>
        <Card :padding="false">
          <Overflow hide-scrollbar class="p-m example-overflow">
            <p v-for="item in 12" :key="item">
              Paragraph {{ item }} with a hidden scrollbar.
            </p>
          </Overflow>
        </Card>
      </div>

      <div>
        <strong class="block mb-s">Hidden shadows</strong>
        <Card :padding="false">
          <Overflow hide-shadows class="p-m example-overflow">
            <p v-for="item in 12" :key="item">
              Paragraph {{ item }} without shadows.
            </p>
          </Overflow>
        </Card>
      </div>

      <div>
        <strong class="block mb-s">Horizontal snap</strong>
        <Card :padding="false">
          <Overflow horizontal snap class="p-m">
            <Flex gap="m">
              <div v-for="item in 10" :key="item" class="snap-card">
                {{ item }}
              </div>
            </Flex>
          </Overflow>
        </Card>
      </div>

      <div>
        <strong class="block mb-s">Content which does not overflow</strong>
        <Card :padding="false">
          <Overflow class="p-m example-overflow">
            <p>Short content, no shadows should be visible.</p>
          </Overflow>
        </Card>
      </div>
    </Grid>
  </div>
</template>

<style scoped>
.example-overflow {
  height: 200px;
}

.nowrap {
  white-space: nowrap;
}

.snap-card {
  flex-shrink: 0;
  width: 160px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-m);
  background-color: var(--color-bg-raised);
  border: 1px solid var(--color-border);
}
</style>
