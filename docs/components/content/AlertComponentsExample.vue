<script setup lang="ts">
import { Alert, Button, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Alert variant="warning" filled>
        <Flex y-center x-between>
          <p class="m-0">
            Your session will expire in 5 minutes
          </p>
          <Button plain size="m">
            Extend Session
          </Button>
        </Flex>
      </Alert>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
