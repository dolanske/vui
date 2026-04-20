<script lang="ts" setup>
import type { VNode } from 'vue'
import { IconArrowDown, IconArrowUp, IconMagnifyingGlass, IconX } from '@iconify-prerendered/vue-ph'
import { useMagicKeys, whenever } from '@vueuse/core'
import { computed, nextTick, ref, useTemplateRef, watch, watchEffect } from 'vue'
import { Breakpoints, useBreakpoint } from '../../shared/breakpoints'
import { searchString } from '../../shared/helpers'
import Badge from '../Badge/Badge.vue'
import Button from '../Button/Button.vue'
import Carousel from '../Carousel/Carousel.vue'
import Flex from '../Flex/Flex.vue'
import Kbd from '../Kbd/Kbd.vue'
import Modal from '../Modal/Modal.vue'
import Spinner from '../Spinner/Spinner.vue'
import './commands.scss'

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Write a command..',
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const EMPTY_GROUP_KEY = '##ungrouped##'

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
  placeholder?: string
  commands: Command[]
  loading?: boolean
}

const searchValue = defineModel<string>('search', { default: '' })

// For simplicity, groups are stored and handled as their labels. This way we
// can omit keys when creating them
const activeGroup = defineModel<string | null>('group', { default: 'All' })

const results = computed(() => {
  return props.commands
    .filter((item) => {
      if (activeGroup.value && activeGroup.value !== 'All') {
        return (item.group ?? EMPTY_GROUP_KEY) === activeGroup.value
      }
      return true
    })
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

const groupButtons = computed(() => {
  const groups = new Set<string>()

  for (const command of props.commands) {
    groups.add(command.group ?? EMPTY_GROUP_KEY)
  }

  const sortedGroups = [...groups].toSorted((a, b) => {
    if (a === EMPTY_GROUP_KEY)
      return 1
    if (b === EMPTY_GROUP_KEY)
      return -1

    return a.localeCompare(b)
  })

  sortedGroups.unshift('All')

  return sortedGroups
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

// Register shortcut watchers if commands have any
watchEffect(() => {
  for (const command of props.commands) {
    if (command.shortcut && keys[command.shortcut].value) {
      handleSelect(command)
      break
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
  if (!props.open) {
    return
  }

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
  search.value?.focus({ preventScroll: true })
}

watch(
  () => props.open,
  async (open) => {
    if (!open)
      return

    await nextTick()
    requestAnimationFrame(resetSearch)
  },
  { flush: 'post' },
)

const isMobile = useBreakpoint(Breakpoints.Mobile)
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
      <div class="vui-commands-input">
        <div class="vui-commands-input-icon">
          <Spinner v-if="loading" size="s" />
          <IconMagnifyingGlass v-else />
        </div>

        <input ref="searchRef" v-model="searchValue" type="text" autofocus :placeholder="props.placeholder">

        <Flex :gap="2">
          <Button v-if="searchValue" size="s" square @click="resetSearch">
            <IconX class="text-color-light" />
          </Button>

          <Button v-if="isMobile" size="s" @click="emit('close')">
            Close
          </Button>
        </Flex>
      </div>

      <div class="vui-commands-group-buttons">
        <Carousel gap="xs">
          <button
            v-for="group in groupButtons"
            :key="group"
            :tabindex="0"
            @click="activeGroup = group"
          >
            <Badge
              :variant="group === activeGroup ? 'accent' : 'neutral'"
              role="button"
            >
              {{ group === EMPTY_GROUP_KEY ? 'Other' : group }}
            </Badge>
          </button>
        </Carousel>
      </div>
    </template>
    <template #footer>
      <Flex gap="xxs" y-center>
        <Kbd>
          <IconArrowUp />
        </Kbd>
        <Kbd>
          <IconArrowDown />
        </Kbd>
        <span class="text-color-lighter mr-s">Move</span>
        <Kbd>
          Enter
        </Kbd>
        <span class="text-color-lighter mr-s">Select</span>
        <Kbd>
          Esc
        </Kbd>
        <span class="text-color-lighter">Close</span>
      </Flex>
    </template>

    <div v-if="!groupedResults" class="vui-commands-empty">
      <p>No results found</p>
    </div>

    <slot v-else :commands="groupedResults">
      <div v-for="(group, groupKey, groupIndex) in groupedResults" :key="groupKey" class="vui-commands-group">
        <span v-if="groupKey !== EMPTY_GROUP_KEY && activeGroup === 'All'" class="vui-commands-group-title">
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
            <slot :command="result" :group="groupKey" name="command">
              <button class="vui-commands-list-item">
                <div v-if="result.icon || $slots.icon" class="vui-commands-list-item-icon">
                  <slot :command="result" name="icon">
                    <component :is="result.icon" />
                  </slot>
                </div>
                <div class="vui-command-body">
                  <span>
                    {{ result.title }}
                  </span>
                  <p v-if="result.description" class="text-overflow-1">
                    {{ result.description }}
                  </p>
                </div>
                <Flex v-if="result.shortcut" gap="xxs">
                  <Kbd v-for="shortcut in result.shortcut.split('+')" :key="shortcut" class="vui-commands-list-item-shortcut" :keys="shortcut" />
                </Flex>
              </button>
            </slot>
          </li>
        </ul>
      </div>
    </slot>
  </Modal>
</template>
