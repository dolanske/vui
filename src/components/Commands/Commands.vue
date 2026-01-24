<script lang="ts" setup>
import type { VNode } from 'vue'
import { IconArrowDown, IconArrowUp, IconX } from '@iconify-prerendered/vue-ph'
import { useMagicKeys, whenever } from '@vueuse/core'
import { computed, ref, useTemplateRef, watch } from 'vue'
import { searchString } from '../../shared/helpers'
import Button from '../Button/Button.vue'
import Flex from '../Flex/Flex.vue'
import Input from '../Input/Input.vue'
import Kbd from '../Kbd/Kbd.vue'
import Modal from '../Modal/Modal.vue'
import './commands.scss'

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Write a command..',
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const EMPTY_GROUP_KEY = '##ungrouped##'

// TODO: add layers and browsing through them
// A layer is a group of commands that are related to a specific command and are displayed when this command is entered

export interface Command {
  title: string
  description?: string
  group?: string
  // Icon component
  icon?: VNode
  shortcut?: string
  href?: string
  handler?: () => void
}

interface Props {
  open: boolean
  search?: string
  placeholder?: string
  commands: Command[]
}

const searchValue = ref(props.search)

const results = computed(() => {
  return props.commands
    .filter(item => searchString(
      [item.title, item.description, item.group, item.href],
      searchValue.value,
    ))
})

// Group results for rendering
const groupedResults = computed<Record<string, Command[]> | null>(() => {
  if (results.value.length === 0) {
    return null
  }

  const grouped = Object.groupBy(results.value, (item) => {
    return item.group ?? EMPTY_GROUP_KEY
  })

  return Object.fromEntries(
    Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)),
  ) as Record<string, Command[]>
})

// Precompute group offsets for O(1) global index calculation in template
const groupOffsets = computed<number[]>(() => {
  if (!groupedResults.value)
    return []
  const offsets: number[] = []
  let acc = 0
  for (const group of Object.values(groupedResults.value as Record<string, Command[]>)) {
    offsets.push(acc)
    acc += group.length
  }
  return offsets
})

// Flattened list in the displayed order for navigation/selection
const flattenedResults = computed<Command[]>(() => {
  if (!groupedResults.value)
    return []
  return Object.values(groupedResults.value as Record<string, Command[]>).flat()
})

const keys = useMagicKeys()
const focusedIndex = ref(0)

// Register shortcut watchers
watch(() => props.commands.length, () => {
  for (const command of props.commands) {
    if (command.shortcut) {
      whenever(keys[command.shortcut], () => {
        handleSelect(command)
      })
    }
  }
})

// Reset when search value is reset
whenever(() => !!searchValue.value, () => {
  focusedIndex.value = 0
})

// Focus items when arrow keys are pressed
whenever(keys.ArrowUp, () => {
  if (focusedIndex.value > 0) {
    focusedIndex.value--
  }
  else {
    focusedIndex.value = flattenedResults.value.length - 1
  }
})
whenever(keys.ArrowDown, () => {
  if (focusedIndex.value < flattenedResults.value.length - 1) {
    focusedIndex.value++
  }
  else {
    focusedIndex.value = 0
  }
})

// Auto scroll to focused index
watch(focusedIndex, (value) => {
  const el = document.querySelector(`[data-index="${value}"]`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }
})

whenever(keys.Enter, () => {
  handleSelect(flattenedResults.value[focusedIndex.value])
})

function handleSelect(result: Command) {
  if (result.handler) {
    result.handler()
  }
  else if (result.href) {
    window.open(result.href, '_blank')
  }
}

whenever(keys.Escape, () => {
  emit('close')
})

// Reset seach & refocus input when opened
const search = useTemplateRef('searchRef')

function resetSearch() {
  searchValue.value = ''
  search.value?.focus()
}
</script>

<template>
  <Modal
    :open="props.open"
    hide-close-button
    :card="{ separators: true, padding: false }"
    class="vui-commands"
    @close="emit('close')"
  >
    <template #header>
      <div class="py-xs">
        <Input
          ref="searchRef"
          v-model="searchValue"
          focus
          expand
          :placeholder="props.placeholder"
        >
          <template #end>
            <Button v-if="searchValue" plain square @click="resetSearch">
              <IconX />
            </Button>
          </template>
        </Input>
      </div>
    </template>
    <template #footer>
      <Flex gap="xs" y-center>
        <span class="text-color-lighter">Move</span>
        <Kbd>
          <IconArrowUp />
        </Kbd>
        <Kbd>
          <IconArrowDown />
        </Kbd>
        <div />
        <span class="text-color-lighter">Select</span>
        <Kbd>
          Enter
        </Kbd>
        <div />
        <span class="text-color-lighter">Close</span>
        <Kbd>
          Esc
        </Kbd>
      </Flex>
    </template>

    <div v-if="!groupedResults" class="vui-commands-empty">
      <p>No results found</p>
    </div>

    <div v-for="(group, groupKey, groupIndex) in groupedResults" v-else :key="groupKey" class="vui-commands-group">
      <span v-if="groupKey !== EMPTY_GROUP_KEY" class="vui-commands-group-title">
        {{ groupKey }}
      </span>

      <ul class="vui-commands-list" tabindex="-1">
        <li
          v-for="(result, index) in group"
          :key="result.title"
          :data-index="groupOffsets[groupIndex] + index"
          :class="{ 'vui-commands-list-item-focused': focusedIndex === groupOffsets[groupIndex] + index }"
          @click="handleSelect(result)"
        >
          <button>
            <div class="vui-commands-list-item-icon">
              <component :is="result.icon" />
            </div>
            <div class="vui-command-body">
              <span>
                {{ result.title }}
              </span>
              <p v-if="result.description">
                {{ result.description }}
              </p>
            </div>
            <Flex v-if="result.shortcut" gap="xxs">
              <Kbd v-for="shortcut in result.shortcut.split('+')" :key="shortcut" class="vui-commands-list-item-shortcut" :keys="shortcut" />
            </Flex>
          </button>
        </li>
      </ul>
    </div>
  </Modal>
</template>
