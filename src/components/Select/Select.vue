<!-- eslint-disable ts/consistent-type-definitions -->
<script setup lang='ts' generic="T">
import { Icon } from '@iconify/vue'
import { computed, onMounted, ref, useId, useTemplateRef } from 'vue'
import { searchString } from '../../shared/helpers'
import Button from '../Button/Button.vue'
import Dropdown from '../Dropdown/Dropdown.vue'
import DropdownItem from '../Dropdown/DropdownItem.vue'
import DropdownTitle from '../Dropdown/DropdownTitle.vue'
import Input from '../Input/Input.vue'
import '../Input/input.scss'
import './select.scss'

export type SelectOption = {
  value: any
  label: string
}

type Props = {
  single?: boolean
  readonly?: boolean
  options: SelectOption[]
  label?: string
  placeholder?: string
  required?: boolean
  expand?: boolean
  hint?: string
  search?: boolean
  maxActiveOptions?: number
  showClear?: boolean
  disabled?: boolean
  errors?: string[]
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
  maxActiveOptions,
  showClear,
  disabled,
  errors = [] as string[],
} = defineProps<Props>()

const selected = defineModel<SelectOption[] | undefined>()
const trigger = useTemplateRef('trigger')

//
function setValue(option: SelectOption) {
  if (single) {
    // Single
    if (selected.value?.some(o => o.value === option.value) && !required) {
      selected.value = undefined
    }
    else {
      selected.value = [option]
    }
  }
  else {
    if (selected.value && selected.value?.some(o => o.value === option.value)) {
      const values = selected.value.filter(o => o.value !== option.value)
      // Cant remove the last value if it's required
      if ((required && values.length > 0) || !required) {
        selected.value = values.length > 0 ? values : undefined
      }
    }
    else {
      if (!selected.value) {
        selected.value = [option]
      }
      else if (!maxActiveOptions || (selected.value.length < maxActiveOptions)) {
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
    return searchString(option.label, searchStr.value)
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
  if (selected.value.length > 3) {
    return `${selected.value.length} selected`
  }

  // Just list ALL selected optionsx
  return selected.value.map(o => o.label).join(', ')
})

onMounted(() => {
  if (readonly && showClear) {
    console.warn('[Select] readonly and showClear are mutually exclusive props. The clear button will not show up if required is present.')
  }
})

const dropdownRef = useTemplateRef('dropdown')

function clearValue() {
  selected.value = undefined
  dropdownRef.value?.close()
}

const id = useId()
</script>

<template>
  <div class="vui-input-container vui-select" :class="{ expand, required, readonly, disabled, 'has-errors': errors.length > 0 }">
    <Dropdown ref="dropdown" :expand @close="trigger?.focus({ preventScroll: true })">
      <template #trigger="{ toggle, isOpen }">
        <div class="vui-input vui-select-trigger-content">
          <label v-if="label" :for="id">{{ label }}</label>
          <p v-if="hint" class="vui-input-hint">
            {{ hint }}
          </p>

          <button
            :id
            ref="trigger"
            class="vui-input-style vui-select-trigger-container"
            :class="{ 'has-value': selected && selected.length > 0 }"
            :disabled
            @click="toggle"
          >
            <span>
              {{ renderPlaceholder }}
            </span>
            <template v-if="showClear && !required && selected">
              <div class="flex-1" />
              <Button
                plain
                icon="ph:x"
                square
                size="s"

                @click.stop="clearValue"
              />
            </template>
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
            expand
          >
            <template #start>
              <Icon icon="ph:magnifying-glass" />
            </template>
          </Input>
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
            if (single && !(required && selected && selected[0].value === option.value)) {
              close()
            }
          }"
        >
          {{ option.label }}
        </DropdownItem>
      </template>
    </Dropdown>

    <p v-if="maxActiveOptions && !single" class="vui-input-limit">
      {{ `${selected ? selected.length : 0}/${maxActiveOptions}` }}
    </p>
    <ul v-if="errors.length > 0" class="vui-input-errors">
      <li v-for="err in errors" :key="err">
        {{ err }}
      </li>
    </ul>
  </div>
</template>
