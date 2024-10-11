<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import Dropdown from '../Dropdown/Dropdown.vue'
import DropdownItem from '../Dropdown/DropdownItem.vue'
import '../Input/input.scss'
import './select.scss'

interface Option {
  value: any
  label: string
}

interface Props {
  single?: boolean
  readonly?: boolean
  options: Option[]
  label?: string
  placeholder?: string
  required?: boolean
  expand?: boolean
  hint?: string
  canClear?: boolean
  search?: boolean
}

const {
  expand,
  readonly,
  required,
  hint,
  placeholder,
  options,
  single = true,
  search = true,
} = defineProps<Props>()

// TODO: type single options (use GENERICS)
const selected = defineModel<Option[]>()

//
function setValue(option: Option) {
  if (single) {
    // TODO: add toggle
    selected.value = [option]
  }
}
</script>

<template>
  <div class="vui-input-container vui-select" :class="{ expand, required, readonly }">
    <Dropdown>
      <template #trigger="{ toggle, isOpen }">
        <div class="vui-input vui-select-trigger-content">
          <label v-if="label" for="id">{{ label }}</label>
          <p v-if="hint" class="vui-input-hint">
            {{ hint }}
          </p>

          <button class="vui-input-style vui-select-trigger-container" @click="toggle">
            {{ placeholder }}
            <!-- TODO: add canclear button -->

            <Icon :icon="isOpen ? 'ph:caret-up' : 'ph:caret-down'" />
          </button>
        </div>
      </template>

      <template #default="{ close }">
        <DropdownItem
          v-for="option in options"
          :key="option.value"
          :class="{ selected: selected?.find(v => v.value === option.value) }"
          :icon="selected?.find(v => v.value === option.value) ? 'ph:dot-fill' : ''"
          @click="() => {
            setValue(option)
            close()
          }"
        >
          {{ option.label }}
        </DropdownItem>
      </template>
    </Dropdown>
  </div>
</template>
