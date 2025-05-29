<script setup>
import { Button, Spinner } from '@dolanske/vui'
</script>

<template>
  <div class="space-y-l">
    <div>
      <h3 class="text-m mb-s">
        Basic Usage
      </h3>
      <Spinner />
    </div>

    <div>
      <h3 class="text-m mb-s">
        Different Sizes
      </h3>
      <div class="flex gap-m items-center">
        <Spinner size="s" />
        <Spinner size="m" />
        <Spinner size="l" />
      </div>
    </div>

    <div>
      <h3 class="text-m mb-s">
        In Button
      </h3>
      <Button disabled>
        <Spinner size="s" class="mr-s" />
        Loading...
      </Button>
    </div>

    <div>
      <h3 class="text-m mb-s">
        In Card
      </h3>
      <div class="card p-m flex items-center justify-center">
        <Spinner size="l" />
      </div>
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Text
      </h3>
      <div class="flex items-center gap-s">
        <Spinner />
        <span>Loading content...</span>
      </div>
    </div>

    <div>
      <h3 class="text-m mb-s">
        Centered in Container
      </h3>
      <div class="h-200px flex items-center justify-center">
        <Spinner size="l" />
      </div>
    </div>
  </div>
</template>
