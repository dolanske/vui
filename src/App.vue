<script setup lang="ts">
import { ref } from 'vue'
import { Card, Slider } from '.'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')

const value = ref(50)
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container pt-xxxl">
      <Card>
        <Slider
          v-model="value"
          :min="0"
          :max="100"
          :step="1"
        />
      </Card>
    </div>
  </main>
</template>
