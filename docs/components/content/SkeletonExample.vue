<script setup lang="ts">
import { Grid, Skeleton } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Grid columns="1fr 1fr 128px" gap="s">
        <Skeleton />
        <Skeleton :radius="16" />
        <Grid :columns="3" gap="s">
          <Skeleton :width="32" :height="32" circle />
          <Skeleton :width="32" :height="32" circle />
          <Skeleton :width="32" :height="32" circle />
        </Grid>
      </Grid>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
