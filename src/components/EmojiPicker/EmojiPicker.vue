<script setup lang="ts">
import type { Emoji, GroupDataset } from 'emojibase'
import { IconX } from '@iconify-prerendered/vue-ph'
import { useEventListener, useIntersectionObserver } from '@vueuse/core'
import { fetchEmojis, fetchFromCDN } from 'emojibase'
import { capitalize, nextTick, onBeforeMount, onMounted, ref, shallowRef, useTemplateRef } from 'vue'
import { randomMinMax, searchString } from '../../lib/helpers.ts'
import Button from '../Button/Button.vue'
import Card from '../Card/Card.vue'
import Grid from '../Grid/Grid.vue'
import Overflow from '../Overflow/Overflow.vue'
import Tab from '../Tabs/Tab.vue'
import Tabs from '../Tabs/Tabs.vue'
import Tooltip from '../Tooltip/Tooltip.vue'
import './emoji-picker.scss'

const emit = defineEmits<{
  (e: 'select', emoji: Emoji): void
}>()

const groupData = shallowRef<GroupDataset | null>(null)
const emojiData = shallowRef<Record<string, Emoji[]> | null>(null)

const activeEmoji = ref<Emoji | null>(null)
const activeTab = ref(0)

const searchInput = useTemplateRef('input')
const search = ref('')

// Automatically scroll up when switching between tabs
const groupTitles = useTemplateRef('groupTitles')
const visibleGroups = new Set<string>()

onBeforeMount(async () => {
  await Promise.all([
    fetchFromCDN('meta/groups.json') as Promise<GroupDataset>,
    fetchEmojis('en', {
      compact: false,
    }) as Promise<Emoji[]>,
  ])
    .then(([groupsRaw, emojisRaw]) => {
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

// Capitalizes each word & replaces hyphen with slash
function formatGroupName(label: string) {
  return label.replace('-', ' / ')
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')
}

onMounted(() => {
  nextTick(() => {
    searchInput.value?.focus()
  })
})

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
    threshold: [0, 0.1, 0.25, 0.5, 1],
  },
)

function getEmojisByGroup(groupKey: string) {
  if (!emojiData.value) {
    return []
  }

  const dataset = emojiData.value[Number(groupKey)]

  if (search.value) {
    return dataset.filter(emoji => searchString([emoji.label, ...(emoji.tags ?? [])], search.value))
  }

  return dataset
}
</script>

<template>
  <Card
    v-if="groupData && emojiData"
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

      <Tabs :model-value="activeTab.toString()">
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

    <div class="vui-emoji-content">
      <Overflow ref="overflow" hide-scrollbar>
        <div class="vui-emoji-picker">
          <div v-for="(groupName, groupKey) of groupData.groups" :key="groupKey" class="vui-emoji-picker-group">
            <span ref="groupTitles" class="vui-emoji-group-title" :data-title-group="groupKey">
              {{ formatGroupName(groupName) }}
            </span>
            <Grid
              :columns="8"
              :gap="0"
              x-center
              y-center
            >
              <Button
                v-for="item in getEmojisByGroup(groupKey)"
                :key="item.hexcode"
                plain
                square
                size="l"
                @mouseover="activeEmoji = item"
                @click="emit('select', item)"
              >
                <span class="emoji-item">
                  {{ item.emoji }}
                </span>
              </Button>
            </Grid>
          </div>
        </div>
      </Overflow>
    </div>

    <template #footer>
      <div v-if="activeEmoji" class="vui-emoji-footer">
        <span class="emoji-item">
          {{ activeEmoji.emoji }}
        </span>
        <p>
          {{ capitalize(activeEmoji.label) }}
        </p>
      </div>
    </template>
  </Card>
</template>
