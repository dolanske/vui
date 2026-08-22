<script setup lang="ts">
import type { Emoji, GroupDataset } from 'emojibase'
import { IconArrowUp, IconX } from '@iconify-prerendered/vue-ph'
import { createReusableTemplate, useEventListener, useIntersectionObserver, useScroll } from '@vueuse/core'
import { fetchEmojis, fetchFromCDN } from 'emojibase'
import { capitalize, computed, nextTick, onBeforeMount, onMounted, ref, shallowRef, useTemplateRef } from 'vue'
import { randomMinMax, searchString } from '../../lib/helpers.ts'
import { viewport } from '../../lib/viewport.ts'
import Button from '../Button/Button.vue'
import Card from '../Card/Card.vue'
import Grid from '../Grid/Grid.vue'
import Overflow from '../Overflow/Overflow.vue'
import Tab from '../Tabs/Tab.vue'
import Tabs from '../Tabs/Tabs.vue'
import Tooltip from '../Tooltip/Tooltip.vue'
import './emoji-picker.scss'

const {
  recent,
  recentLabel = 'Frequently Used',
} = defineProps<{
  /**
   * Raw emoji strings. These will be matched against the internal dataset and
   * displayed as selectable emojis with metadata.
   *
   * Note, that when user is filtering, recent emoji selection is hidden.
   */
  recent: string[]
  /**
   * Title for the recently used section.
   *
   * Defaults to "Frequently used"
   */
  recentLabel?: string
}>()

const emit = defineEmits<{
  select: [emoji: Emoji]
}>()

const groupData = shallowRef<GroupDataset | null>(null)
const emojiData = shallowRef<Record<string, Emoji[]> | null>(null)
const rawEmojiDataset = shallowRef<Emoji[]>([])

const activeEmoji = ref<Emoji | null>(null)
const activeTab = ref(0)

const searchInput = useTemplateRef('input')
const search = ref('')

// Automatically scroll up when switching between tabs
const groupTitles = useTemplateRef<HTMLSpanElement[]>('groupTitles')
const visibleGroups = new Set<string>()

onBeforeMount(async () => {
  await Promise.all([
    // The `local` caches the response in localStorage
    fetchFromCDN<GroupDataset>('meta/groups.json', {
      local: true,
    }),
    fetchEmojis('en', {
      compact: false,
      local: true,
    }),
  ])
    .then(([groupsRaw, emojisRaw]) => {
      rawEmojiDataset.value = emojisRaw

      // Get rid of skin tones group - it does not contain any emojis
      delete groupsRaw.groups['2']
      groupData.value = groupsRaw

      // Choose random emoji to show in the footer, before user hovers over it
      activeEmoji.value = emojisRaw[randomMinMax(0, emojisRaw.length - 1)]

      emojiData.value = emojisRaw.reduce((acc, emoji) => {
        if (!emoji.group) {
          if (emoji.label.startsWith('regional indicator')) {
            // Regional indicators (alphabet squares) are ungrouped, move them to 8 (symbols)
            emoji.group = 8
          }
          else {
            emoji.group = 0
          }
        }

        if (!acc[emoji.group]) {
          acc[emoji.group] = [emoji]
        }
        else {
          acc[emoji.group].push(emoji)
        }

        return acc
      }, {} as Record<number, Emoji[]>)
    })
})

const recentEmojis = computed(() => rawEmojiDataset.value.filter(({ emoji }) => recent.includes(emoji)))

// Capitalizes each word & replaces hyphen with slash
function formatGroupName(label: string) {
  return label.replace('-', ' / ')
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')
}

useEventListener(searchInput, 'keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
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
      if (container) {
        const containerRect = container.getBoundingClientRect()
        const targetRect = target.getBoundingClientRect()
        const top = container.scrollTop + (targetRect.top - containerRect.top) + SCROLL_OFFSET

        container.scrollTo({
          top: Math.max(0, top),
          behavior: 'instant',
        })
      }
    }
  })
}

onMounted(() => {
  nextTick(() => {
    searchInput.value?.focus()
  })
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

function scrollUp() {
  overflow.value?.contentRef?.scrollTo({ top: 0, behavior: 'instant' })
}

const { y } = useScroll(() => overflow.value?.contentRef)

const [DefineEmojiList, EmojiList] = createReusableTemplate<{ emojis: Emoji[] }>()
</script>

<template>
  <DefineEmojiList v-slot="{ emojis }">
    <Grid
      :columns="8"
      :gap="0"
      x-center
      y-center
    >
      <button
        v-for="item in emojis"
        :key="item.hexcode"
        @mouseover="activeEmoji = item"
        @click="emit('select', item)"
      >
        <span class="emoji-item">
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
        <label class="visually-hidden" for="emoji-search">Search for an emoji</label>
        <input ref="input" v-model="search" name="emoji-search" type="text" placeholder="Seach for an emoji...">
        <Button v-if="search" square size="s" plain @click="resetSearch">
          <IconX />
        </Button>
      </div>

      <Tabs v-if="groupData && emojiData" :model-value="activeTab.toString()">
        <Tab v-for="(item, key) in groupData.groups" :key="item" :value="key" @click="handleTabClick(key)">
          <Tooltip>
            <span class="emoji-item">
              {{ emojiData[key][1].emoji }}
            </span>
            <template #tooltip>
              <p>{{ formatGroupName(item) }}</p>
            </template>
          </Tooltip>
        </Tab>
      </Tabs>
    </template>

    <div v-if="groupData && emojiData" class="vui-emoji-content">
      <Overflow ref="overflow" hide-scrollbar>
        <div class="vui-emoji-picker-inner">
          <div v-if="recent" v-show="!search" class="vui-emoji-picker-group">
            <span class="vui-emoji-group-title">{{ recentLabel }}</span>
            <EmojiList :emojis="recentEmojis" />
          </div>

          <div v-for="(groupName, groupKey) of groupData.groups" :key="groupKey" class="vui-emoji-picker-group">
            <span ref="groupTitles" class="vui-emoji-group-title" :data-title-group="groupKey">
              {{ formatGroupName(groupName) }}
            </span>
            <EmojiList :emojis="filteredEmojisByGroup[groupKey]" />
          </div>
        </div>
      </Overflow>
    </div>

    <template #footer>
      <div v-if="activeEmoji && !viewport.s" class="vui-emoji-footer">
        <span class="emoji-item">
          {{ activeEmoji.emoji }}
        </span>
        <p>
          {{ capitalize(activeEmoji.label) }}
        </p>
        <Button v-show="y > 64" square plain @click="scrollUp">
          <IconArrowUp />
        </Button>
      </div>
    </template>
  </Card>
</template>
