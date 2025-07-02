<script setup lang="ts">
import { Button, Progress } from '@dolanske/vui'
import { ref } from 'vue'

const progress = ref(0)
const fakeProgress = ref(0)

function increment() {
  progress.value = Math.min(100, progress.value + 16)
}
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex column gap="l">
        <!-- Basic Progress -->
        <div class="w-100">
          <Flex class="mt-s" gap="s">
            <Button @click="increment" variant="fill">
              Add 16%
            </Button>
            <Button @click="progress = 0" variant="fill">
              Reset
            </Button>
          </Flex>
        </div>

        <!-- Fixed Progress -->
        <div class="w-100">
          <h5 class="mb-s">
            Fixed Progress (top of page)
          </h5>
          <Progress v-model="progress" fixed />
        </div>

        <!-- Custom Color -->
        <div class="w-100">
          <h5 class="mb-s">
            Custom Color
          </h5>
          <Progress v-model="progress" color="var(--color-text-green)" />
        </div>

        <!-- Fake Progress -->
        <div class="w-100">
          <h5 class="mb-s">
            Fake Progress
          </h5>
          <Progress v-model="fakeProgress" fake />
        </div>

        <!-- Custom Height -->
        <div class="w-100">
          <h5 class="mb-s">
            Custom Height
          </h5>
          <Progress v-model="progress" height="8px" />
        </div>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
