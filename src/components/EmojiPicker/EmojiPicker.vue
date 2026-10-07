<script setup lang="ts">
import type { Emoji, GroupDataset } from 'emojibase'
import { IconArrowUp, IconX } from '@iconify-prerendered/vue-ph'
import { createReusableTemplate, useEventListener, useIntersectionObserver, useScroll } from '@vueuse/core'
import { fetchEmojis, fetchFromCDN } from 'emojibase'
import { capitalize, computed, nextTick, onMounted, ref, shallowRef, useId, useTemplateRef } from 'vue'
import { randomMinMax, searchString } from '../../lib/helpers.ts'
import { viewport } from '../../lib/viewport.ts'
import Button from '../Button/Button.vue'
import Card from '../Card/Card.vue'
import Grid from '../Grid/Grid.vue'
import Overflow from '../Overflow/Overflow.vue'
import Spinner from '../Spinner/Spinner.vue'
import Tab from '../Tabs/Tab.vue'
import Tabs from '../Tabs/Tabs.vue'
import Tooltip from '../Tooltip/Tooltip.vue'
import './emoji-picker.scss'

const {
  recent = [],
  recentLabel = 'Frequently Used',
  autofocus = false,
  cdnUrl,
} = defineProps<{
  /**
   * Raw emoji strings. These will be matched against the internal dataset and
   * displayed as selectable emojis with metadata. The section is hidden when
   * empty.
   *
   * Note, that when user is filtering, recent emoji selection is hidden.
   */
  recent?: string[]
  /**
   * Title for the recently used section.
   *
   * Defaults to "Frequently Used"
   */
  recentLabel?: string
  /**
   * Focuses the search input when the picker mounts
   */
  autofocus?: boolean
  /**
   * Base URL the emoji data is loaded from, e.g. a self hosted copy of the
   * emojibase data. Useful with a strict Content Security Policy or offline.
   */
  cdnUrl?: string
}>()

const emit = defineEmits<{
  select: [emoji: Emoji]
  error: [error: unknown]
}>()

const COLUMNS = 8

const groupData = shallowRef<GroupDataset | null>(null)
const emojiData = shallowRef<Record<string, Emoji[]> | null>(null)
const rawEmojiDataset = shallowRef<Emoji[]>([])
const status = ref<'loading' | 'ready' | 'error'>('loading')

const activeEmoji = ref<Emoji | null>(null)
const activeTab = ref(0)

const searchInput = useTemplateRef<HTMLInputElement>('input')
const search = ref('')
const searchId = useId()

// Automatically scroll up when switching between tabs
const groupTitles = useTemplateRef<HTMLSpanElement[]>('groupTitles')
const visibleGroups = new Set<string>()

async function load() {
  status.value = 'loading'

  try {
    const [groupsRaw, emojisRaw] = await Promise.all([
      // The `local` caches the response in localStorage
      fetchFromCDN<GroupDataset>('meta/groups.json', { local: true, cdnUrl }),
      fetchEmojis('en', { compact: false, local: true, cdnUrl }),
    ])

    rawEmojiDataset.value = emojisRaw

    // Get rid of skin tones group - it does not contain any emojis
    delete groupsRaw.groups['2']
    groupData.value = groupsRaw

    // Choose random emoji to show in the footer, before user hovers over it
    activeEmoji.value = emojisRaw[randomMinMax(0, emojisRaw.length - 1)]

    emojiData.value = emojisRaw.reduce((acc, emoji) => {
      if (!emoji.group) {
        // Regional indicators (alphabet squares) are ungrouped, move them to 8 (symbols)
        emoji.group = emoji.label.startsWith('regional indicator') ? 8 : 0
      }

      if (!acc[emoji.group])
        acc[emoji.group] = [emoji]
      else
        acc[emoji.group].push(emoji)

      return acc
    }, {} as Record<number, Emoji[]>)

    status.value = 'ready'
  }
  catch (error) {
    status.value = 'error'
    emit('error', error)
  }
}

load()

const recentEmojis = computed(() => rawEmojiDataset.value.filter(({ emoji }) => recent.includes(emoji)))

// Capitalizes each word & replaces every hyphen with a slash
function formatGroupName(label: string) {
  return label.replaceAll('-', ' / ')
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')
}

// Escape clears the search. Only an empty search lets Escape through, so the
// first press does not also close a surrounding dropdown or modal.
useEventListener(searchInput, 'keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape' && search.value) {
    e.preventDefault()
    e.stopPropagation()
    search.value = ''
  }
})

function resetSearch() {
  search.value = ''
  searchInput.value?.focus()
}

// When pressing tab, user is automatically & instantly scrolled to the proper group,
// but observer might still retriger and making the tab underline animation stutter.
const observerPaused = ref(false)
const overflow = useTemplateRef('overflow')
const SCROLL_OFFSET = -16

function handleTabClick(key: string) {
  if (search.value) {
    search.value = ''
  }

  activeTab.value = Number(key)
  observerPaused.value = true

  setTimeout(() => {
    observerPaused.value = false
  }, 100)

  nextTick(() => {
    const target = groupTitles.value?.find((el: HTMLElement) => el.dataset.titleGroup === key)?.nextElementSibling
    const container = overflow.value?.contentRef

    if (target && container) {
      const containerRect = container.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      const top = container.scrollTop + (targetRect.top - containerRect.top) + SCROLL_OFFSET

      container.scrollTo({
        top: Math.max(0, top),
        behavior: 'instant',
      })
    }
  })
}

onMounted(() => {
  if (autofocus) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})

// As we scroll, make sure to change tabs depending on the highlighted section
useIntersectionObserver(
  () => groupTitles.value ?? [],
  (entries) => {
    if (observerPaused.value) {
      return
    }

    for (const entry of entries) {
      const key = (entry.target as HTMLElement).dataset.titleGroup

      if (!key) {
        continue
      }

      if (entry.isIntersecting) {
        visibleGroups.add(key)
      }
      else {
        visibleGroups.delete(key)
      }
    }

    if (!groupTitles.value?.length || !visibleGroups.size) {
      return
    }

    // Pick the first visible title
    const firstVisibleTitle = groupTitles.value.find((el: HTMLElement) => {
      const key = el.dataset.titleGroup
      return key ? visibleGroups.has(key) : false
    })

    activeTab.value = Number(firstVisibleTitle?.dataset.titleGroup)
  },
  {
    threshold: [0],
  },
)

const filteredEmojisByGroup = computed(() => {
  if (!emojiData.value) {
    return {}
  }

  const result: Record<string, Emoji[]> = {}

  for (const [groupKey, emojis] of Object.entries(emojiData.value)) {
    if (search.value) {
      result[groupKey] = emojis.filter(emoji =>
        searchString([emoji.label, ...(emoji.tags ?? [])], search.value),
      )
    }
    else {
      result[groupKey] = emojis
    }
  }

  return result
})

const hasResults = computed(() => Object.values(filteredEmojisByGroup.value).some(group => group.length > 0))

function scrollUp() {
  overflow.value?.contentRef?.scrollTo({ top: 0, behavior: 'instant' })
}

const { y } = useScroll(() => overflow.value?.contentRef)

//
// Grid keyboard navigation with a roving tabindex: only one emoji is in the
// Tab order, the arrow keys move between emojis.

const focusedHexcode = ref<string | null>(null)

function getEmojiButtons(): HTMLElement[] {
  const container = overflow.value?.contentRef as HTMLElement | undefined
  return container ? Array.from(container.querySelectorAll<HTMLElement>('.vui-emoji-button')) : []
}

function onGridKeydown(event: KeyboardEvent) {
  const buttons = getEmojiButtons()
  const index = buttons.indexOf(document.activeElement as HTMLElement)
  if (index === -1)
    return

  const map: Record<string, number> = {
    ArrowRight: 1,
    ArrowLeft: -1,
    ArrowDown: COLUMNS,
    ArrowUp: -COLUMNS,
  }

  let next: number | undefined
  if (event.key in map)
    next = index + map[event.key]
  else if (event.key === 'Home')
    next = 0
  else if (event.key === 'End')
    next = buttons.length - 1

  if (next === undefined)
    return

  event.preventDefault()
  const target = buttons[Math.min(Math.max(0, next), buttons.length - 1)]
  target?.focus()
  target?.scrollIntoView({ block: 'nearest' })
}

const firstListKey = computed(() => {
  if (recentEmojis.value.length > 0 && !search.value)
    return 'recent'
  return Object.keys(filteredEmojisByGroup.value).find(key => filteredEmojisByGroup.value[key].length > 0)
})

function isTabStop(item: Emoji, index: number, listKey: string): boolean {
  if (focusedHexcode.value)
    return focusedHexcode.value === item.hexcode
  return listKey === firstListKey.value && index === 0
}

function onEmojiFocus(item: Emoji) {
  activeEmoji.value = item
  focusedHexcode.value = item.hexcode
}

const [DefineEmojiList, EmojiList] = createReusableTemplate<{ emojis: Emoji[], listKey: string }>()
</script>

<template>
  <DefineEmojiList v-slot="{ emojis, listKey }">
    <Grid
      :columns="COLUMNS"
      :gap="0"
      x-center
      y-center
    >
      <button
        v-for="(item, index) in emojis"
        :key="item.hexcode"
        type="button"
        class="vui-emoji-button"
        :aria-label="item.label"
        :tabindex="isTabStop(item, index, listKey) ? 0 : -1"
        @mouseover="activeEmoji = item"
        @focus="onEmojiFocus(item)"
        @click="emit('select', item)"
      >
        <span class="emoji-item" aria-hidden="true">
          {{ item.emoji }}
        </span>
      </button>
    </Grid>
  </DefineEmojiList>

  <Card
    class="vui-emoji-picker"
    :padding="false"
  >
    <template #header>
      <div class="vui-emoji-search">
        <label class="visually-hidden" :for="searchId">Search for an emoji</label>
        <input :id="searchId" ref="input" v-model="search" name="emoji-search" type="search" placeholder="Search for an emoji..." autocomplete="off">
        <Button v-if="search" square size="s" plain aria-label="Clear search" @click="resetSearch">
          <IconX />
        </Button>
      </div>

      <Tabs v-if="groupData && emojiData" :model-value="activeTab.toString()">
        <!-- The tooltip wraps the tab, so nothing block-level ends up inside the button -->
        <Tooltip v-for="(item, key) in groupData.groups" :key="item">
          <Tab :value="String(key)" :aria-label="formatGroupName(item)" @click="handleTabClick(String(key))">
            <span class="emoji-item" aria-hidden="true">
              {{ emojiData[key]?.[0]?.emoji }}
            </span>
          </Tab>
          <template #tooltip>
            <p>{{ formatGroupName(item) }}</p>
          </template>
        </Tooltip>
      </Tabs>
    </template>

    <div v-if="status === 'loading'" class="vui-emoji-status" role="status">
      <Spinner size="m" label="Loading emojis" />
    </div>

    <div v-else-if="status === 'error'" class="vui-emoji-status" role="alert">
      <p>Emojis could not be loaded.</p>
      <Button size="s" @click="load">
        Try again
      </Button>
    </div>

    <div v-else-if="groupData && emojiData" class="vui-emoji-content">
      <Overflow ref="overflow" hide-scrollbar label="Emojis">
        <div class="vui-emoji-picker-inner" @keydown="onGridKeydown">
          <p v-if="search && !hasResults" class="vui-emoji-empty" role="status">
            No emojis found
          </p>

          <div v-if="recentEmojis.length > 0" v-show="!search" class="vui-emoji-picker-group">
            <span class="vui-emoji-group-title">{{ recentLabel }}</span>
            <EmojiList :emojis="recentEmojis" list-key="recent" />
          </div>

          <div v-for="(groupName, groupKey) of groupData.groups" :key="groupKey" class="vui-emoji-picker-group">
            <span ref="groupTitles" class="vui-emoji-group-title" :data-title-group="groupKey">
              {{ formatGroupName(groupName) }}
            </span>
            <EmojiList :emojis="filteredEmojisByGroup[groupKey] ?? []" :list-key="String(groupKey)" />
          </div>
        </div>
      </Overflow>
    </div>

    <template #footer>
      <div v-if="activeEmoji && !viewport.s" class="vui-emoji-footer" aria-hidden="true">
        <span class="emoji-item">
          {{ activeEmoji.emoji }}
        </span>
        <p>
          {{ capitalize(activeEmoji.label) }}
        </p>
        <Button v-show="y > 64" square plain aria-label="Scroll to top" @click="scrollUp">
          <IconArrowUp />
        </Button>
      </div>
    </template>
  </Card>
</template>
