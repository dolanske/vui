<script setup>
import { Kbd } from '@dolanske/vui'

function handleShortcut() {
  // Handle shortcut here
}
</script>

<template>
  <div class="space-y-l">
    <div>
      <h3 class="text-m mb-s">
        Basic Usage
      </h3>
      <Kbd keys="Escape" />
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Key Combination
      </h3>
      <Kbd keys="Ctrl+S" />
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Custom Label
      </h3>
      <Kbd
        keys="Ctrl+S"
        label="Save"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Highlight
      </h3>
      <Kbd
        keys="Ctrl+S"
        highlight
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Event Handling
      </h3>
      <Kbd
        keys="Ctrl+S"
        @trigger="handleShortcut"
      />
    </div>
  </div>
</template>
