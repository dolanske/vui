<script setup lang="ts">
import { Radio, RadioGroup } from '@dolanske/vui'
import { ref } from 'vue'

const selected = ref('option1')
const verticalSelected = ref('option1')
const disabledSelected = ref('option1')
const accentSelected = ref('option1')
const customSelected = ref('option1')
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-md">
        <!-- Basic radio group -->
        <div>
          <h3 class="mb-sm">
            Basic Radio Group
          </h3>
          <RadioGroup v-model="selected">
            <Radio value="option1" label="Option 1" />
            <Radio value="option2" label="Option 2" />
            <Radio value="option3" label="Option 3" />
          </RadioGroup>
        </div>

        <!-- Vertical radio group -->
        <div>
          <h3 class="mb-sm">
            Vertical Radio Group
          </h3>
          <RadioGroup v-model="verticalSelected" direction="column">
            <Radio value="option1" label="Option 1" />
            <Radio value="option2" label="Option 2" />
            <Radio value="option3" label="Option 3" />
          </RadioGroup>
        </div>

        <!-- Disabled radio group -->
        <div>
          <h3 class="mb-sm">
            Disabled Radio Group
          </h3>
          <RadioGroup v-model="disabledSelected" disabled>
            <Radio value="option1" label="Option 1" />
            <Radio value="option2" label="Option 2" />
            <Radio value="option3" label="Option 3" />
          </RadioGroup>
        </div>

        <!-- Accent radio group -->
        <div>
          <h3 class="mb-sm">
            Accent Radio Group
          </h3>
          <RadioGroup v-model="accentSelected">
            <Radio value="option1" label="Option 1" accent />
            <Radio value="option2" label="Option 2" accent />
            <Radio value="option3" label="Option 3" accent />
          </RadioGroup>
        </div>

        <!-- Custom content radio -->
        <div>
          <h3 class="mb-sm">
            Custom Content Radio
          </h3>
          <RadioGroup v-model="customSelected">
            <Radio value="option1">
              <div class="flex items-center gap-sm">
                <Icon icon="ph:star" />
                <span>Option 1</span>
              </div>
            </Radio>
            <Radio value="option2">
              <div class="flex items-center gap-sm">
                <Icon icon="ph:heart" />
                <span>Option 2</span>
              </div>
            </Radio>
          </RadioGroup>
        </div>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
