<script setup>
import { Counter } from '@dolanske/vui'
import { ref } from 'vue'

const count = ref(0)
const customStepCount = ref(0)
const limitedCount = ref(0)
const hiddenButtonsCount = ref(0)
const labeledCount = ref(0)
</script>

<template>
  <div class="space-y-l">
    <div>
      <h3 class="text-m mb-s">
        Basic Usage
      </h3>
      <Counter v-model="count" />
    </div>

    <div>
      <h3 class="text-m mb-s">
        Custom Step Size
      </h3>
      <Counter
        v-model="customStepCount"
        :increment-by="5"
        :decrement-by="5"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        Limited Range (0-10)
      </h3>
      <Counter
        v-model="limitedCount"
        :increment-enabled="limitedCount < 10"
        :decrement-enabled="limitedCount > 0"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        Hidden Buttons
      </h3>
      <Counter
        v-model="hiddenButtonsCount"
        :hide-increment="true"
        :hide-decrement="true"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Label and Placeholder
      </h3>
      <Counter
        v-model="labeledCount"
        label="Quantity"
        placeholder="Enter quantity"
      />
    </div>
  </div>
</template>
