<script setup lang="ts">
import type { Emoji } from 'emojibase'
import { ref } from 'vue'
import Button from '../components/Button/Button.vue'
import Dropdown from '../components/Dropdown/Dropdown.vue'
import EmojiPicker from '../components/EmojiPicker/EmojiPicker.vue'
import Flex from '../components/Flex/Flex.vue'
import Modal from '../components/Modal/Modal.vue'

const picked = ref<Emoji | null>(null)
const recent = ref<string[]>(['😄', '👍', '🔥'])
const modalOpen = ref(false)
const lastError = ref('-')

function onSelect(emoji: Emoji) {
  picked.value = emoji
  recent.value = [emoji.emoji, ...recent.value.filter(item => item !== emoji.emoji)].slice(0, 16)
}
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Emoji picker
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Selected</th>
          <td>
            <span>{{ picked ? `${picked.emoji} ${picked.label}` : '-' }}</span>
          </td>
        </tr>
        <tr>
          <th>Inside a dropdown <br> Autofocus, footer stays interactive</th>
          <td>
            <Dropdown role="dialog">
              <template #trigger="{ toggle }">
                <Button size="s" @click="toggle">
                  Choose emoji
                </Button>
              </template>
              <template #default="{ close }">
                <EmojiPicker autofocus :recent @select="emoji => { onSelect(emoji); close() }" />
              </template>
            </Dropdown>
          </td>
        </tr>
        <tr>
          <th>Inside a dropdown, stays open</th>
          <td>
            <Dropdown role="dialog">
              <template #trigger="{ toggle }">
                <Button size="s" @click="toggle">
                  Pick many
                </Button>
              </template>
              <EmojiPicker :recent recent-label="Recently picked" @select="onSelect" />
            </Dropdown>
          </td>
        </tr>
        <tr>
          <th>Inside a modal <br> Escape clears the search first</th>
          <td>
            <Button size="s" @click="modalOpen = true">
              Open modal
            </Button>
            <Modal v-model:open="modalOpen" size="s">
              <template #header>
                <h3>Pick an emoji</h3>
              </template>
              <EmojiPicker @select="emoji => { onSelect(emoji); modalOpen = false }" />
            </Modal>
          </td>
        </tr>
        <tr>
          <th>Inline, with recent</th>
          <td>
            <EmojiPicker :recent @select="onSelect" />
          </td>
        </tr>
        <tr>
          <th>Error state <br> Invalid CDN url</th>
          <td>
            <Flex column gap="s">
              <EmojiPicker cdn-url="https://invalid.localhost/emojibase" @error="error => lastError = String(error)" />
              <span>Error: {{ lastError }}</span>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
