<script setup lang="ts">
import type { InputProps } from './Input.vue'
import { Icon } from '@iconify/vue'
import { useAttrs, useId } from 'vue'
import Input from './Input.vue'

const props = defineProps<InputProps>()

const attrs = useAttrs()
const color = defineModel<string>()
const id = useId()
</script>

<template>
  <Input v-bind="{ ...attrs, ...props }" type="color" class="vui-input-color">
    <template #__internal_replace_input>
      <input :id v-model="color" type="color" tabindex="0">
      <label :for="id">
        <div class="vui-input-color-indicator" :style="{ backgroundColor: color }">
          <Icon v-if="!color" icon="ph:palette" />
        </div>
        <input v-model="color" type="text" :placeholder="props.placeholder">
      </label>
    </template>
  </Input>
</template>
