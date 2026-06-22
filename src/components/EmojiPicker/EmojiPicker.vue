<script setup lang="ts">
import type { Emoji, GroupDataset } from 'emojibase'
import { IconX } from '@iconify-prerendered/vue-ph'
import { refDebounced, useEventListener } from '@vueuse/core'
import { fetchEmojis, fetchFromCDN } from 'emojibase'
import { capitalize, computed, nextTick, onBeforeMount, onMounted, ref, shallowRef, useTemplateRef, watch } from 'vue'
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
const searchDebounced = refDebounced(search, 350)

// Automatically scroll up when switching between tabs
const overflow = useTemplateRef('overflow')
watch(activeTab, () => {
  if (overflow.value?.contentRef) {
    overflow.value.contentRef.scrollTop = 0
  }
})

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

// Merge groups & emojis into one array. When filtering, this array is flat and lists all emojis
const filteredData = computed(() => {
  if (!emojiData.value || !groupData.value) {
    return []
  }

  // Search through emojis as a flat array
  if (searchDebounced.value) {
    return Object.values(emojiData.value)
      .flat()
      .filter(emoji => searchString([emoji.label, ...(emoji.tags ?? [])], searchDebounced.value))
  }

  return emojiData.value[Number(activeTab.value)]
})
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

      <Tabs v-model="activeTab">
        <Tab v-for="(item, key) in groupData.groups" :key="item" :value="key">
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
          <Grid
            :columns="8"
            :gap="0"
            x-center
            y-center
          >
            <Button
              v-for="item in filteredData"
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
