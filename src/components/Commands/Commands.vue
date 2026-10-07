<script lang="ts" setup>
import type { VNode } from 'vue'
import { IconArrowDown, IconArrowUp, IconX } from '@iconify-prerendered/vue-ph'
import { useEventListener } from '@vueuse/core'
import { computed, nextTick, ref, useId, useTemplateRef, watch } from 'vue'
import { searchString } from '../../lib/helpers.ts'
import { hasModifier, isTypingTarget, matchesShortcut, parseShortcut } from '../../lib/keys.ts'
import { viewport } from '../../lib/viewport.ts'
import Badge from '../Badge/Badge.vue'
import Button from '../Button/Button.vue'
import Carousel from '../Carousel/Carousel.vue'
import Flex from '../Flex/Flex.vue'
import Kbd from '../Kbd/Kbd.vue'
import Modal from '../Modal/Modal.vue'
import Overflow from '../Overflow/Overflow.vue'

import Spinner from '../Spinner/Spinner.vue'
import './commands.scss'

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Type a command..',
  closeOnSelect: true,
})

const emit = defineEmits<{
  'close': []
  'update:open': [value: boolean]
  /**
   * Emitted whenever a command is selected, before its handler runs. Useful
   * for router navigation or analytics.
   */
  'select': [command: Command]
}>()

const EMPTY_GROUP_KEY = '##ungrouped##'
// Internal value for "every group". Kept separate from group labels, so a
// user group named "All" does not collide with it.
const ALL_GROUPS = '##all##'

export interface Command {
  title: string
  description?: string
  group?: string
  keywords?: string[]
  // Icon component
  icon?: VNode
  shortcut?: string
  href?: string
  /**
   * Where `href` opens. Defaults to `_self` for same-origin links and `_blank`
   * for external ones.
   */
  target?: '_self' | '_blank'
  handler?: () => void
}

interface Props {
  /**
   * Controls whether the commands modal is visible. Supports `v-model:open`.
   */
  open: boolean
  /**
   * Placeholder text shown in the search input
   */
  placeholder?: string
  /**
   * List of commands to display and search through
   */
  commands: Command[]
  /**
   * Shows a spinner in place of the search icon while true. Useful if external
   * async data related to commands is loading.
   */
  loading?: boolean
  /**
   * Renders the commands palette in a compact layout
   */
  compact?: boolean
  /**
   * Closes the palette after a command is selected
   */
  closeOnSelect?: boolean
}

const searchValue = defineModel<string>('search', { default: '' })

/**
 * Active group filter. `null` (or the legacy value `'All'`, as long as no
 * command group is named "All") shows every group.
 */
const activeGroupModel = defineModel<string | null>('group', { default: null })

const hasGroupNamedAll = computed(() => props.commands.some(command => command.group === 'All'))

const activeGroup = computed<string>({
  get() {
    const value = activeGroupModel.value
    if (value === null || value === undefined || (value === 'All' && !hasGroupNamedAll.value))
      return ALL_GROUPS
    return value
  },
  set(value) {
    activeGroupModel.value = value === ALL_GROUPS ? null : value
  },
})

const results = computed(() => {
  return props.commands
    .filter((item) => {
      if (activeGroup.value !== ALL_GROUPS) {
        return (item.group ?? EMPTY_GROUP_KEY) === activeGroup.value
      }
      return true
    })
    .filter(item => searchString(
      [item.title, item.description, ...(item.keywords ?? [])],
      searchValue.value,
    ))
})

// Same order everywhere: alphabetical, ungrouped commands last
function compareGroups(a: string, b: string): number {
  if (a === EMPTY_GROUP_KEY)
    return 1
  if (b === EMPTY_GROUP_KEY)
    return -1
  return a.localeCompare(b)
}

// Group results for rendering. Grouping is done manually instead of with
// `Object.groupBy`, which is not available in older browsers.
const groupedResults = computed<Array<[string, Command[]]> | null>(() => {
  if (results.value.length === 0) {
    return null
  }

  const grouped = new Map<string, Command[]>()
  for (const item of results.value) {
    const key = item.group ?? EMPTY_GROUP_KEY
    const list = grouped.get(key)
    if (list)
      list.push(item)
    else
      grouped.set(key, [item])
  }

  return [...grouped.entries()].sort(([a], [b]) => compareGroups(a, b))
})

const groupButtons = computed(() => {
  const groups = new Set<string>()

  for (const command of props.commands) {
    groups.add(command.group ?? EMPTY_GROUP_KEY)
  }

  return [ALL_GROUPS, ...[...groups].sort(compareGroups)]
})

function groupLabel(group: string): string {
  if (group === ALL_GROUPS)
    return 'All'
  if (group === EMPTY_GROUP_KEY)
    return 'Other'
  return group
}

// Precompute group offsets for O(1) global index calculation in template
const groupOffsets = computed<number[]>(() => {
  const offsets: number[] = []
  let acc = 0
  for (const [, group] of groupedResults.value ?? []) {
    offsets.push(acc)
    acc += group.length
  }
  return offsets
})

// Flattened list in the displayed order for navigation/selection
const flattenedResults = computed<Command[]>(() => (groupedResults.value ?? []).flatMap(([, group]) => group))

const focusedIndex = ref(0)
const id = useId()
const listId = `${id}-list`
const optionId = (index: number) => `${id}-option-${index}`

// Start at the top whenever the results change, and never point past the end
watch([searchValue, activeGroup], () => {
  focusedIndex.value = 0
})

watch(() => flattenedResults.value.length, (length) => {
  if (focusedIndex.value >= length)
    focusedIndex.value = Math.max(0, length - 1)
})

const listRef = useTemplateRef<HTMLElement>('list')

// Auto scroll to focused index, scoped to this palette
watch(focusedIndex, async (value) => {
  await nextTick()
  const el = listRef.value?.querySelector(`[data-index="${value}"]`)
  el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
})

function close() {
  emit('update:open', false)
  emit('close')
}

function handleSelect(result: Command | undefined) {
  if (!props.open || !result) {
    return
  }

  emit('select', result)

  if (result.handler) {
    result.handler()
  }
  else if (result.href) {
    const url = new URL(result.href, window.location.href)
    const target = result.target ?? (url.origin === window.location.origin ? '_self' : '_blank')

    if (target === '_blank')
      window.open(url.href, '_blank', 'noopener,noreferrer')
    else
      window.location.assign(url.href)
  }

  if (props.closeOnSelect)
    close()
}

const parsedShortcuts = computed(() => props.commands
  .filter(command => command.shortcut)
  .map(command => ({ command, shortcut: parseShortcut(command.shortcut!) })))

// Keys are only handled while the palette is open. Escape is handled by the
// Modal, which emits `close` exactly once.
useEventListener(document, 'keydown', (event: KeyboardEvent) => {
  if (!props.open || event.defaultPrevented || event.isComposing)
    return

  const target = event.target as HTMLElement | null
  const isGroupButton = !!target?.closest('.vui-commands-group-buttons')

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      focusedIndex.value = flattenedResults.value.length === 0
        ? 0
        : (focusedIndex.value + 1) % flattenedResults.value.length
      return
    case 'ArrowUp':
      event.preventDefault()
      focusedIndex.value = flattenedResults.value.length === 0
        ? 0
        : (focusedIndex.value - 1 + flattenedResults.value.length) % flattenedResults.value.length
      return
    case 'Enter':
      // Enter on a group filter activates that filter, not a command
      if (isGroupButton)
        return
      event.preventDefault()
      handleSelect(flattenedResults.value[focusedIndex.value])
      return
  }

  // Command shortcuts. Single keys are ignored while typing in the search.
  for (const { command, shortcut } of parsedShortcuts.value) {
    if (!hasModifier(shortcut) && isTypingTarget(target))
      continue

    if (matchesShortcut(event, shortcut)) {
      event.preventDefault()
      handleSelect(command)
      return
    }
  }
})

// Reset seach & refocus input when opened
const search = useTemplateRef('searchRef')

function resetSearch() {
  searchValue.value = ''

  // On small screens focusing would open the on-screen keyboard (issue #196)
  if (!viewport.s) {
    search.value?.focus({ preventScroll: true })
  }
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
</script>

<template>
  <Modal
    :open="props.open"
    hide-close-button
    :card="{ separators: true, padding: false }"
    class="vui-commands"
    :class="{ compact: props.compact }"
    :size="props.compact ? 's' : 'm'"
    aria-label="Command palette"
    @close="close"
  >
    <template #header>
      <div class="vui-commands-input">
        <input
          ref="searchRef"
          v-model="searchValue"
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded="true"
          :aria-controls="listId"
          :aria-activedescendant="flattenedResults.length > 0 ? optionId(focusedIndex) : undefined"
          aria-label="Search commands"
          :placeholder="props.placeholder"
        >

        <Flex :gap="2">
          <Spinner v-if="loading" size="s" />

          <Button v-else-if="searchValue" size="s" square aria-label="Clear search" @click="resetSearch">
            <IconX class="text-color-light" />
          </Button>

          <Button v-if="viewport.s" size="s" @click="close">
            Close
          </Button>
        </Flex>
      </div>

      <div class="vui-commands-group-buttons">
        <Carousel :gap="props.compact ? 'xxs' : 'xs'" hide-scrollbar hide-shadows>
          <button
            v-for="group in groupButtons"
            :key="group"
            type="button"
            :aria-pressed="group === activeGroup"
            @click="activeGroup = group"
          >
            <Badge :variant="group === activeGroup ? 'accent' : 'neutral'">
              {{ groupLabel(group) }}
            </Badge>
          </button>
        </Carousel>
      </div>
    </template>
    <template v-if="!props.compact" #footer>
      <Flex gap="xxs" y-center aria-hidden="true">
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

    <div v-if="!groupedResults" class="vui-commands-empty" role="status">
      <p>No results found</p>
    </div>

    <Overflow v-else>
      <div :id="listId" ref="list" role="listbox" aria-label="Commands">
        <slot :commands="Object.fromEntries(groupedResults)">
          <div
            v-for="([groupKey, group], groupIndex) in groupedResults"
            :key="groupKey"
            class="vui-commands-group"
            role="group"
            :aria-labelledby="`${id}-group-${groupIndex}`"
          >
            <span
              :id="`${id}-group-${groupIndex}`"
              class="vui-commands-group-title"
              :class="{ 'visually-hidden': groupKey === EMPTY_GROUP_KEY || activeGroup !== ALL_GROUPS }"
            >
              {{ groupLabel(groupKey) }}
            </span>

            <ul class="vui-commands-list" role="presentation">
              <li
                v-for="(result, index) in group"
                :id="optionId(groupOffsets[groupIndex] + index)"
                :key="`${groupKey}-${index}-${result.title}`"
                role="option"
                :aria-selected="focusedIndex === groupOffsets[groupIndex] + index"
                :data-index="groupOffsets[groupIndex] + index"
                :class="{ 'vui-commands-list-item-focused': focusedIndex === groupOffsets[groupIndex] + index }"
                @click="handleSelect(result)"
                @mousemove="focusedIndex = groupOffsets[groupIndex] + index"
              >
                <slot :command="result" :group="groupKey" name="command">
                  <div class="vui-commands-list-item">
                    <div v-if="result.icon || $slots.icon" class="vui-commands-list-item-icon" aria-hidden="true">
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
                    <Flex v-if="result.shortcut" gap="xxs" aria-hidden="true">
                      <Kbd v-for="shortcut in result.shortcut.split('+')" :key="shortcut" class="vui-commands-list-item-shortcut" :label="shortcut" />
                    </Flex>
                  </div>
                </slot>
              </li>
            </ul>
          </div>
        </slot>
      </div>
    </Overflow>
  </Modal>
</template>
