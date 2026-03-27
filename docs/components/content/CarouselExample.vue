<script setup lang="ts">
import { Button, Card, Carousel, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample full>
    <template #component>
      <div style="padding: var(--space-xl) var(--space-xxl);">
        <Carousel :sheet-width="400">
          <template #header="{ toggle }">
            <Flex x-between y-center class="mb-s">
              <strong>Featured Albums</strong>
              <Button size="s" plain @click="toggle">
                See all
              </Button>
            </Flex>
          </template>

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
            <strong style="display: block;">{{ album.title }}</strong>
            <small style="opacity: 0.6;">{{ album.artist }}</small>
          </Card>

          <template #sheet-header="{ close }">
            <Flex x-between y-center>
              <h4 style="margin: 0;">
                All Albums
              </h4>
              <Button plain size="s" @click="close">
                <Icon name="ph:x" />
              </Button>
            </Flex>
          </template>

          <template #sheet-content>
            <Flex column gap="s">
              <Flex
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
                y-center
                gap="m"
              >
                <div
                  :style="{
                    width: '40px',
                    height: '40px',
                    borderRadius: '6px',
                    flexShrink: 0,
                    background: `hsl(${i * 40 % 360}, 55%, 48%)`,
                  }"
                />
                <div>
                  <strong style="display: block;">{{ album.title }}</strong>
                  <small style="opacity: 0.6;">{{ album.artist }}</small>
                </div>
              </Flex>
            </Flex>
          </template>
        </Carousel>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
