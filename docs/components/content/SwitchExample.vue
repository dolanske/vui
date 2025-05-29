<script setup lang="ts">
import { Switch } from '@dolanske/vui'
import { ref } from 'vue'

const enabled = ref(false)
const disabledEnabled = ref(false)
const accentEnabled = ref(false)
const customEnabled = ref(false)
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-md">
        <!-- Basic switch -->
        <div>
          <h3 class="mb-sm">
            Basic Switch
          </h3>
          <Switch v-model="enabled" label="Enable feature" />
        </div>

        <!-- Disabled switch -->
        <div>
          <h3 class="mb-sm">
            Disabled Switch
          </h3>
          <Switch v-model="disabledEnabled" label="Disabled switch" disabled />
        </div>

        <!-- Accent switch -->
        <div>
          <h3 class="mb-sm">
            Accent Switch
          </h3>
          <Switch v-model="accentEnabled" label="Accent switch" accent />
        </div>

        <!-- Custom content switch -->
        <div>
          <h3 class="mb-sm">
            Custom Content Switch
          </h3>
          <Switch v-model="customEnabled">
            <div class="flex items-center gap-sm">
              <Icon icon="ph:bell" />
              <span>Enable notifications</span>
            </div>
          </Switch>
        </div>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
