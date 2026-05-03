<script setup lang="ts">
import type { NuxtError } from '#app'
import { Badge, Card } from '@dolanske/vui'

const props = defineProps<{ error: NuxtError }>()
</script>

<template>
  <Flex class="error-page" y-center x-center>
    <Card header-align="start">
      <template #header>
        <Badge v-if="props.error.statusCode" variant="danger" @click="$router.back()">
          {{ props.error.statusCode }}
        </Badge>
        <h1>
          Error
        </h1>
      </template>
      <template #header-end>
        <Button size="s" outline>
          Back
        </Button>
      </template>
      <p>
        {{ props.error.message }}
      </p>
    </Card>
  </Flex>
</template>

<style>
.error-page {
  height: 100vh;
  width: 100%;

  .vui-card {
    max-width: 328px !important;
  }
}
</style>
