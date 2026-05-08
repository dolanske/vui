<script setup lang="ts">
import { Card, Carousel } from '@dolanske/vui'
</script>

<template>
  <DocsExample full>
    <template #component>
      <div style="padding: var(--space-xl) var(--space-xxl);">
        <Carousel class="example-carousel" hide-scrollbar>
          <Card
            v-for="(album, i) in [
              { title: 'Midnight Drive', artist: 'The Neon Owls' },
              { title: 'Glass Mountains', artist: 'Vera Lune' },
              { title: 'Parallel Lines', artist: 'Static People' },
              { title: 'Ocean Protocol', artist: 'Deep Format' },
              { title: 'Soft Machine', artist: 'Elliot Marsh' },
              { title: 'Northern Lights', artist: 'Aurora Band' },
              { title: 'City Silence', artist: 'Mono Block' },
              { title: 'The Long Way', artist: 'Drift & Co.' },
            ]"
            :key="album.title"
            :draggable="false"
            style="min-width: 160px"
          >
            <div
              :style="{
                width: '100%',
                height: '96px',
                borderRadius: '4px',
                marginBottom: '8px',
                background: `hsl(${i * 40 % 360}, 55%, 48%)`,
              }"
            />
            <strong style="display: block;margin-bottom:0.5rem;">{{ album.title }}</strong>
            <small style="opacity: 0.6;">{{ album.artist }}</small>
          </Card>
        </Carousel>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style>
.example-carousel {
  --vui-overflow-shadow-color: var(--color-bg-lowered);
}
</style>
