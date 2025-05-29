<script setup lang="ts">
import { Button, Card } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-xs">
        <Card>
          <template #header>
            Basic Card
          </template>
          <p class="m-0">
            This is a basic card with header and content.
          </p>
        </Card>

        <Card separators>
          <template #header>
            Card with Separators
          </template>
          <template #header-end>
            <Button variant="link">
              Settings
            </Button>
          </template>
          <p class="m-0">
            This card has separators and a header-end slot.
          </p>
          <template #footer>
            <div class="flex justify-end gap-xs">
              <Button variant="gray">
                Cancel
              </Button>
              <Button variant="fill">
                Save
              </Button>
            </div>
          </template>
        </Card>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
