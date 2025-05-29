<script setup>
import { Skeleton } from '@dolanske/vui'
</script>

<template>
  <div class="space-y-l">
    <div>
      <h3 class="text-m mb-s">
        Basic Usage
      </h3>
      <Skeleton />
    </div>

    <div>
      <h3 class="text-m mb-s">
        Custom Size
      </h3>
      <Skeleton
        width="200px"
        height="100px"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        Custom Radius
      </h3>
      <Skeleton
        radius="8px"
        width="200px"
        height="100px"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        Circle
      </h3>
      <Skeleton
        circle
        width="100px"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        Multiple Skeletons
      </h3>
      <div class="space-y-s">
        <Skeleton
          width="200px"
          height="24px"
        />
        <Skeleton
          width="150px"
          height="24px"
        />
        <Skeleton
          width="180px"
          height="24px"
        />
      </div>
    </div>

    <div>
      <h3 class="text-m mb-s">
        Card Layout
      </h3>
      <div class="card p-m">
        <Skeleton
          width="200px"
          height="24px"
          class="mb-s"
        />
        <Skeleton
          width="100%"
          height="100px"
          class="mb-s"
        />
        <Skeleton
          width="80px"
          height="32px"
        />
      </div>
    </div>
  </div>
</template>
