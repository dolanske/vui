<script setup>
import { Textarea } from '@dolanske/vui'
import { ref } from 'vue'

const text = ref('')
const labeledText = ref('')
const limitedText = ref('')
const autoResizeText = ref('')
const customResizeText = ref('')
const validatedText = ref('')
const errors = ref([])

function validateText(value) {
  errors.value = []
  if (value.length < 10) {
    errors.value.push('Text must be at least 10 characters long')
  }
}
</script>

<template>
  <div class="space-y-l">
    <div>
      <h3 class="text-m mb-s">
        Basic Usage
      </h3>
      <Textarea v-model="text" />
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Label and Placeholder
      </h3>
      <Textarea
        v-model="labeledText"
        label="Description"
        placeholder="Enter your description"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Character Limit
      </h3>
      <Textarea
        v-model="limitedText"
        label="Bio"
        :limit="280"
        placeholder="Tell us about yourself"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Auto-resize
      </h3>
      <Textarea
        v-model="autoResizeText"
        label="Notes"
        auto-resize
        placeholder="Enter your notes"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Custom Resize
      </h3>
      <Textarea
        v-model="customResizeText"
        label="Content"
        resize="horizontal"
        placeholder="Enter content"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Validation
      </h3>
      <Textarea
        v-model="validatedText"
        label="Feedback"
        :errors="errors"
        @update:model-value="validateText"
      />
    </div>
  </div>
</template>
