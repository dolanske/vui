<!-- eslint-disable ts/consistent-type-definitions -->
<script setup lang='ts' generic="T">
import type { Sizes } from '../../lib/types.ts'
import { IconCaretDown, IconCaretUp, IconMagnifyingGlass, IconX } from '@iconify-prerendered/vue-ph'
import { computed, onMounted, ref, useId, useTemplateRef } from 'vue'
import { searchString } from '../../lib/helpers.ts'
import { getInputSizeStyle, joinIds } from '../../lib/input.ts'
import { viewport } from '../../lib/viewport.ts'
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
  /**
   * The option is shown but can not be selected
   */
  disabled?: boolean
  /**
   * Options sharing a group name are rendered together under a heading
   */
  group?: string
}

type Props = {
  single?: boolean
  readonly?: boolean
  options: SelectOption[]
  label?: string
  placeholder?: string
  required?: boolean
  hint?: string
  search?: boolean
  maxActiveOptions?: number
  showClear?: boolean
  disabled?: boolean
  errors?: string[]
  size?: Sizes
  /**
   * Native `name`. When set, hidden inputs with the selected values are
   * rendered so the Select participates in native form submission.
   */
  name?: string
  /**
   * Set he max height of the dropdown element before it starts scrolling
   */
  maxHeight?: number | string
  /**
   * Disable mobile drawer behavior, always use the floating dropdown.
   */
  noMobileDrawer?: boolean
  /**
   * By default, elements with transition already use a default fade transition. This can be replaced by a custom vue transition class name.
   *
   * Setting the value to `none` will not apply any transition. This is useful when using viewTransitions to prevent conflicts between default animation and the view transition
   */
  transitionName?: string | 'none'
}

const {
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
  size = 'm',
  noMobileDrawer = false,
  transitionName,
  maxHeight,
  name,
} = defineProps<Props>()

const selected = defineModel<SelectOption[] | undefined>()
const triggerRef = useTemplateRef('trigger')

function isSelected(option: SelectOption) {
  return !!selected.value?.some(o => o.value === option.value)
}

// The model is always replaced instead of mutated, so that parent watchers
// fire and readonly / store backed arrays work
function setValue(option: SelectOption) {
  const current = selected.value ?? []

  if (single) {
    if (isSelected(option) && !required)
      selected.value = undefined
    else
      selected.value = [option]
    return
  }

  if (isSelected(option)) {
    const values = current.filter(o => o.value !== option.value)
    // Cant remove the last value if it's required
    if (!required || values.length > 0)
      selected.value = values.length > 0 ? values : undefined
  }
  else if (!maxActiveOptions || current.length < maxActiveOptions) {
    selected.value = [...current, option]
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

// Options grouped by their `group` while keeping the original order
const groupedOptions = computed(() => {
  const groups: Array<{ name?: string, options: SelectOption[] }> = []
  for (const option of filteredOptions.value) {
    let group = groups.find(g => g.name === option.group)
    if (!group) {
      group = { name: option.group, options: [] }
      groups.push(group)
    }
    group.options.push(option)
  }
  return groups
})

function selectOption(option: SelectOption, close: () => void) {
  if (readonly || option.disabled)
    return

  setValue(option)
  // In single mode, close the dropdown after picking (focus returns to the trigger)
  if (single && !(required && selected.value && selected.value[0].value === option.value))
    close()
}

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

  // Just list ALL selected options
  return selected.value.map(o => o.label).join(', ')
})

const hasValue = computed(() => !!selected.value && selected.value.length > 0)
const canClear = computed(() => showClear && !required && !readonly && !disabled && hasValue.value)

onMounted(() => {
  if (readonly && showClear) {
    console.warn('[Select] readonly and showClear are mutually exclusive props. The clear button will not show up while readonly is set.')
  }
})

const dropdownRef = useTemplateRef('dropdown')

function clearValue() {
  selected.value = undefined
  dropdownRef.value?.close()
  triggerRef.value?.focus({ preventScroll: true })
}

const id = useId()
const hintId = `${id}-hint`
const errorsId = `${id}-errors`
const limitId = `${id}-limit`

const describedBy = computed(() => joinIds(
  hint && hintId,
  errors.length > 0 && errorsId,
  !!maxActiveOptions && !single && limitId,
))

// Hidden form values. Objects are serialized, primitives submitted as-is.
const nativeValues = computed(() => (selected.value ?? []).map(option =>
  typeof option.value === 'object' && option.value !== null ? JSON.stringify(option.value) : String(option.value),
))
</script>

<template>
  <div
    class="vui-input-container vui-select"
    :class="{ required, readonly, disabled, 'has-errors': errors.length > 0 }"
    :style="getInputSizeStyle(size)"
  >
    <Dropdown
      ref="dropdown"
      :max-height
      :transition-name
      :no-mobile-drawer="noMobileDrawer"
      role="listbox"
      match-width
      :aria-multiselectable="!single || undefined"
      @close="searchStr = ''"
    >
      <template #trigger="{ toggle, isOpen }">
        <div class="vui-input vui-select-trigger-content">
          <label v-if="label" :for="id">{{ label }}</label>
          <p v-if="hint" :id="hintId" class="vui-input-hint">
            {{ hint }}
          </p>

          <div class="vui-select-trigger-wrap">
            <button
              :id
              ref="trigger"
              type="button"
              class="vui-input-style vui-select-trigger-container"
              :class="{ 'has-value': hasValue, 'has-clear': canClear }"
              :disabled
              :aria-describedby="describedBy"
              :aria-invalid="errors.length > 0 ? true : undefined"
              @click="toggle"
            >
              <span class="vui-select-value">
                {{ renderPlaceholder }}
              </span>
              <!-- Reserves space for the absolutely positioned clear button -->
              <span v-if="canClear" class="vui-select-clear-spacer" aria-hidden="true" />
              <IconCaretUp v-if="isOpen" />
              <IconCaretDown v-else />
            </button>
            <!-- Sibling of the trigger, interactive elements cannot be nested inside a button -->
            <Button
              v-if="canClear"
              class="vui-select-clear"
              plain
              square
              size="s"
              aria-label="Clear selection"
              @click.stop="clearValue"
            >
              <IconX />
            </Button>
          </div>
        </div>
      </template>

      <template #default="{ close, isOpen }">
        <DropdownTitle v-if="search" sticky>
          <Input
            v-model="searchStr"
            placeholder="Search..."
            :focus="isOpen && !viewport.s"
            expand
          >
            <template #start>
              <IconMagnifyingGlass />
            </template>
          </Input>
        </DropdownTitle>

        <p v-if="filteredOptions.length === 0" class="vui-select-no-results">
          No results...
        </p>

        <div
          v-for="(group, groupIndex) in groupedOptions"
          :key="group.name ?? '__ungrouped'"
          :role="group.name ? 'group' : 'presentation'"
          :aria-labelledby="group.name ? `${id}-group-${groupIndex}` : undefined"
          class="vui-select-group"
        >
          <DropdownTitle v-if="group.name" :id="`${id}-group-${groupIndex}`">
            {{ group.name }}
          </DropdownTitle>

          <DropdownItem
            v-for="option in group.options"
            :key="option.value"
            role="option"
            keep-open
            :aria-selected="isSelected(option)"
            :disabled="option.disabled"
            :class="{ selected: isSelected(option) }"
            @click="selectOption(option, close)"
          >
            <slot name="option" :option :selected="isSelected(option)">
              {{ option.label }}
            </slot>
          </DropdownItem>
        </div>
      </template>
    </Dropdown>

    <template v-if="name">
      <input
        v-for="(nativeValue, index) in nativeValues"
        :key="index"
        type="hidden"
        :name
        :value="nativeValue"
      >
    </template>

    <p v-if="maxActiveOptions && !single" :id="limitId" class="vui-input-limit">
      {{ `${selected ? selected.length : 0}/${maxActiveOptions}` }}
    </p>
    <ul v-if="errors.length > 0" :id="errorsId" class="vui-input-errors">
      <li v-for="(err, index) in errors" :key="index">
        {{ err }}
      </li>
    </ul>
  </div>
</template>
