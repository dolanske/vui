<script setup lang="ts">
import Card from '../components/Card/Card.vue'
import EmojiPicker from '../components/EmojiPicker/EmojiPicker.vue'
</script>

<template>
  <div>
    <Card :padding="false" inline>
      <EmojiPicker />
    </Card>
    <!-- {{ unicodeToEmoji(data.smileys_people[0].u) }} -->
  </div>
</template>
