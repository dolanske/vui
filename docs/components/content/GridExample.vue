<script setup lang="ts">
import { Button, Flex, Grid } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex column gap="m">
        <!-- Basic 3-column grid -->
        <Grid :columns="3" gap="m" class="w-100">
          <div class="example">
            Item 1
          </div>
          <div class="example">
            Item 2
          </div>
          <div class="example">
            Item 3
          </div>
        </Grid>

        <!-- Custom grid template -->
        <Grid columns="4fr 0.5fr 1fr" gap="m" class="w-100">
          <div class="example">
            Wide
          </div>
          <div class="example">
            Narrow
          </div>
          <div class="example">
            Narrow
          </div>
        </Grid>

        <!-- Grid with rows -->
        <Grid :columns="2" rows="1fr 2fr" gap="m" class="w-100">
          <div class="example">
            Top Left
          </div>
          <div class="example">
            Top Right
          </div>
          <div class="example">
            Bottom Left
          </div>
          <div class="example">
            Bottom Right
          </div>
        </Grid>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style scoped>
.example {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  line-height: 24px;
  border-radius: var(--border-radius-m);
  background-color: var(--color-border);
  text-align: center;
}
</style>
