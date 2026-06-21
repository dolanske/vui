<script setup lang="ts">
import type { Emoji, GroupDataset } from 'emojibase'
import { IconMagnifyingGlass, IconX } from '@iconify-prerendered/vue-ph'
import { refDebounced, useCssVar, useEventListener } from '@vueuse/core'
import { fetchEmojis, fetchFromCDN } from 'emojibase'
import { capitalize, nextTick, onBeforeMount, ref, shallowRef, useTemplateRef } from 'vue'
import { randomMinMax } from '../../lib/helpers.ts'
import Button from '../Button/Button.vue'
import Card from '../Card/Card.vue'
import Grid from '../Grid/Grid.vue'
import Overflow from '../Overflow/Overflow.vue'
import Tab from '../Tabs/Tab.vue'
import Tabs from '../Tabs/Tabs.vue'
import Tooltip from '../Tooltip/Tooltip.vue'
import './emoji-picker.scss'

const groupData = shallowRef<GroupDataset | null>(null)
const emojiData = shallowRef<Record<string, Emoji[]> | null>(null)

const activeEmoji = ref<Emoji | null>(null)
const activeTab = ref(0)

const searchInput = useTemplateRef('input')
const search = ref('')
const searchDebounced = refDebounced(search, 500)
const activeSearch = ref(false)

const showAllGroups = ref(true)

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

const root = useTemplateRef('root')
const height = useCssVar('--vui-emoji-picker-height', root)

// Capitalizes each word & replaces hyphen with slash
function formatGroupName(label: string) {
  return label.replace('-', ' / ')
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')
}

// Searching
function openSearch() {
  activeSearch.value = true

  nextTick(() => {
    searchInput.value?.focus()
  })
}

function closeSearch() {
  activeSearch.value = false
  search.value = ''
}

useEventListener(searchInput, 'keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeSearch()
  }
})

// Filter the groups
// TODO:

// Merge groups & emojis into one array. When filtering, this array is flat and lists all emojis
const filteredData = computed(() => {
  // Search through emojis as a flat array
  if (activeSearch.value && searchDebounced.value) {
    return emoji
  }

  return ''
})
</script>

<template>
  <Card
    v-if="groupData && emojiData"
    ref="root"
    class="vui-emoji-picker"
    :padding="false"
  >
    <template #header>
      <div v-if="activeSearch" class="vui-emoji-search">
        <input ref="input" type="text" placeholder="Search an emoji...">

        <Button square size="s" @click="closeSearch">
          <IconX />
        </Button>
      </div>

      <Tabs v-model="activeTab">
        <Tab v-for="(group, groupKey) in groupData.groups" :key="group" :value="groupKey">
          <Tooltip>
            <span class="emoji-item">
              {{ emojiData[groupKey][1].emoji }}
            </span>
            <template #tooltip>
              <p>{{ formatGroupName(group) }}</p>
            </template>
          </Tooltip>
        </Tab>

        <template #end>
          <Button square size="s" @click="openSearch">
            <IconMagnifyingGlass />
          </Button>
        </template>
      </Tabs>
    </template>

    <div class="vui-emoji-content">
      <Overflow hide-scrollbar :style="showAllGroups ? { height } : null">
        <div class="vui-emoji-picker">
          <template v-for="(group, groupKey) of groupData.groups" :key="group">
            <!-- No conditional rendering due to the sheer amount of items -->
            <Grid
              v-show="groupKey === activeTab.toString() || activeSearch"
              :columns="9"
              :gap="0"
              x-center
              y-center
            >
              <Button
                v-for="item in emojiData[Number(groupKey)]"
                :key="item.hexcode"
                plain
                square
                size="l"
                @mouseover="activeEmoji = item"
              >
                <span class="emoji-item">
                  {{ item.emoji }}
                </span>
              </Button>
            </Grid>
          </template>
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
