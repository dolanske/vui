<script setup lang="ts">
import { Button } from "."
</script>

<template>
  <main vaul-drawer-wrapper>
    <h1>Hi</h1>
    <div class="container container-l p-xl">
      <Button expand size="l">
        <template #end>
          hi
        </template>
      </Button>
    </div>
  </main>
</template>
