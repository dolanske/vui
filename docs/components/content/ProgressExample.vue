<script setup lang="ts">
import { Button, Progress } from '@dolanske/vui'
import { ref } from 'vue'

const progress = ref(0)
const fixedProgress = ref(0)
const customColorProgress = ref(0)
const fakeProgress = ref(0)
const customHeightProgress = ref(0)

function incrementProgress(value: number) {
  progress.value = Math.min(100, progress.value + value)
}

function incrementFixedProgress(value: number) {
  fixedProgress.value = Math.min(100, fixedProgress.value + value)
}

function incrementCustomColorProgress(value: number) {
  customColorProgress.value = Math.min(100, customColorProgress.value + value)
}

function incrementCustomHeightProgress(value: number) {
  customHeightProgress.value = Math.min(100, customHeightProgress.value + value)
}
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-md">
        <!-- Basic progress -->
        <div>
          <h3 class="mb-sm">
            Basic Progress
          </h3>
          <Progress v-model="progress" />
          <div class="mt-sm flex gap-sm">
            <Button @click="incrementProgress(10)">
              +10%
            </Button>
            <Button @click="incrementProgress(25)">
              +25%
            </Button>
            <Button @click="progress = 0">
              Reset
            </Button>
          </div>
        </div>

        <!-- Fixed progress -->
        <div>
          <h3 class="mb-sm">
            Fixed Progress
          </h3>
          <Progress v-model="fixedProgress" fixed />
          <div class="mt-sm flex gap-sm">
            <Button @click="incrementFixedProgress(10)">
              +10%
            </Button>
            <Button @click="incrementFixedProgress(25)">
              +25%
            </Button>
            <Button @click="fixedProgress = 0">
              Reset
            </Button>
          </div>
        </div>

        <!-- Custom color progress -->
        <div>
          <h3 class="mb-sm">
            Custom Color Progress
          </h3>
          <Progress v-model="customColorProgress" color="var(--color-success)" />
          <div class="mt-sm flex gap-sm">
            <Button @click="incrementCustomColorProgress(10)">
              +10%
            </Button>
            <Button @click="incrementCustomColorProgress(25)">
              +25%
            </Button>
            <Button @click="customColorProgress = 0">
              Reset
            </Button>
          </div>
        </div>

        <!-- Fake progress -->
        <div>
          <h3 class="mb-sm">
            Fake Progress
          </h3>
          <Progress v-model="fakeProgress" fake />
        </div>

        <!-- Custom height progress -->
        <div>
          <h3 class="mb-sm">
            Custom Height Progress
          </h3>
          <Progress v-model="customHeightProgress" height="8px" />
          <div class="mt-sm flex gap-sm">
            <Button @click="incrementCustomHeightProgress(10)">
              +10%
            </Button>
            <Button @click="incrementCustomHeightProgress(25)">
              +25%
            </Button>
            <Button @click="customHeightProgress = 0">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
