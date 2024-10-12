<script setup lang='ts' generic="T">
import { Icon } from '@iconify/vue'
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import { searchInStr } from '../../shared/helpers'
import Dropdown from '../Dropdown/Dropdown.vue'
import DropdownItem from '../Dropdown/DropdownItem.vue'
import DropdownTitle from '../Dropdown/DropdownTitle.vue'
import Input from '../Input/Input.vue'
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
  maxActiveOptions?: number
}

const {
  expand,
  readonly,
  required,
  hint,
  placeholder,
  options,
  single = true,
  search,
  maxActiveOptions = 3,
} = defineProps<Props>()

const selected = defineModel<Option[] | undefined>()

//
function setValue(option: Option) {
  if (single) {
    // Single
    if (selected.value?.some(o => o.value === option.value)) {
      selected.value = undefined
    }
    else {
      selected.value = [option]
    }
  }
  else {
    if (selected.value && selected.value?.some(o => o.value === option.value)) {
      const values = selected.value.filter(o => o.value !== option.value)
      selected.value = values.length > 0 ? values : undefined
    }
    else {
      if (!selected.value) {
        selected.value = [option]
      }
      else {
        selected.value?.push(option)
      }
    }
  }
}

// Search
const searchStr = ref()
const filteredOptions = computed(() => {
  if (!searchStr.value || searchStr.value.length === 0)
    return options

  return options.filter((option) => {
    return searchInStr(option.label, searchStr.value)
  })
})

// Render text inside the button
const renderPlaceholder = computed(() => {
  // Render placeholder or a default select option
  if (!selected.value || selected.value.length === 0)
    return placeholder ?? 'Select an option'

  // Selected values
  if (single)
    return selected.value[0].label

  // If amount of selected exceeds the active capacity
  if (selected.value.length > maxActiveOptions) {
    return `${selected.value.length} selected`
  }

  // Just list ALL selected optionsx
  return selected.value.map(o => o.label).join(', ')
})
</script>

<template>
  <div class="vui-input-container vui-select" :class="{ expand, required, readonly }">
    <Dropdown :expand>
      <template #trigger="{ toggle, isOpen }">
        <div class="vui-input vui-select-trigger-content">
          <label v-if="label" for="id">{{ label }}</label>
          <p v-if="hint" class="vui-input-hint">
            {{ hint }}
          </p>

          <button class="vui-input-style vui-select-trigger-container" @click="toggle">
            <span>
              {{ renderPlaceholder }}
            </span>
            <!-- TODO: add canclear button -->

            <Icon :icon="isOpen ? 'ph:caret-up' : 'ph:caret-down'" />
          </button>
        </div>
      </template>

      <template #default="{ close, isOpen }">
        <DropdownTitle v-if="search">
          <Input
            v-model="searchStr"
            placeholder="Search..."
            :focus="isOpen"
          />
        </DropdownTitle>

        <p v-if="filteredOptions.length === 0" class="vue-select-no-results">
          No results...
        </p>

        <DropdownItem
          v-for="option in filteredOptions"
          :key="option.value"
          :class="{ selected: selected?.find(v => v.value === option.value) }"
          :icon="selected?.find(v => v.value === option.value) ? 'ph:check-bold' : ''"
          @click="() => {
            setValue(option)
            // In single mode, close modal after clicking
            if (single)
              close()
          }"
        >
          {{ option.label }}
        </DropdownItem>
      </template>
    </Dropdown>
  </div>
</template>
