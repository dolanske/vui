<script setup lang="ts">
import { Button, Grid } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-md">
        <!-- Basic 3-column grid -->
        <Grid :columns="3" gap="m">
          <Button>Item 1</Button>
          <Button>Item 2</Button>
          <Button>Item 3</Button>
        </Grid>

        <!-- Custom grid template -->
        <Grid columns="2fr 1fr 1fr" gap="m">
          <Button>Wide</Button>
          <Button>Narrow</Button>
          <Button>Narrow</Button>
        </Grid>

        <!-- Grid with rows -->
        <Grid :columns="2" :rows="2" gap="m">
          <Button>Top Left</Button>
          <Button>Top Right</Button>
          <Button>Bottom Left</Button>
          <Button>Bottom Right</Button>
        </Grid>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
