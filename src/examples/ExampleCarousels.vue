<script setup lang='ts'>
import { ref } from 'vue'
import Button from '../components/Button/Button.vue'
import Card from '../components/Card/Card.vue'
import Carousel from '../components/Carousel/Carousel.vue'
import Flex from '../components/Flex/Flex.vue'

const items = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  label: `Item ${i + 1}`,
  color: `hsl(${(i * 30) % 360}, 60%, 50%)`,
}))

const albums = [
  { title: 'Midnight Drive', artist: 'The Neon Owls', year: 2021 },
  { title: 'Glass Mountains', artist: 'Vera Lune', year: 2019 },
  { title: 'Parallel Lines', artist: 'Static People', year: 2023 },
  { title: 'Ocean Protocol', artist: 'Deep Format', year: 2020 },
  { title: 'Soft Machine', artist: 'Elliot Marsh', year: 2022 },
  { title: 'Northern Lights', artist: 'Aurora Band', year: 2018 },
  { title: 'City Silence', artist: 'Mono Block', year: 2024 },
  { title: 'The Long Way', artist: 'Drift & Co.', year: 2017 },
]

const gaps = ['s', 'm', 'l'] as const
const activeGap = ref<typeof gaps[number]>('s')
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Carousels
    </h3>

    <table>
      <tbody>
        <!-- Base usage -->
        <tr>
          <th>Base</th>
          <td>
            <Carousel style="max-width: 480px">
              <div
                v-for="item in items"
                :key="item.id"
                :draggable="false"
                :style="{
                  minWidth: '120px',
                  height: '80px',
                  borderRadius: '8px',
                  background: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '13px',
                }"
              >
                {{ item.label }}
              </div>
            </Carousel>
          </td>
        </tr>

        <!-- Gap sizes -->
        <tr>
          <th>Gap sizes</th>
          <td>
            <Flex gap="s" class="mb-s">
              <Button
                v-for="g in gaps"
                :key="g"
                size="s"
                :variant="activeGap === g ? 'fill' : undefined"
                @click="activeGap = g"
              >
                {{ g }}
              </Button>
            </Flex>
            <Carousel :gap="activeGap" style="max-width: 480px">
              <div
                v-for="item in items"
                :key="item.id"
                :draggable="false"
                :style="{
                  minWidth: '100px',
                  height: '64px',
                  borderRadius: '8px',
                  background: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '13px',
                }"
              >
                {{ item.label }}
              </div>
            </Carousel>
          </td>
        </tr>

        <!-- With Card items + header/footer slots -->
        <tr>
          <th>Header &amp; footer slots <br><small class="text-color-lighter">with "See all" sheet</small></th>
          <td style="max-width: 520px">
            <Carousel :sheet-width="400">
              <template #header="{ toggle }">
                <Flex x-between y-center class="mb-s">
                  <strong>Albums</strong>
                  <Button size="s" plain @click="toggle">
                    See all
                  </Button>
                </Flex>
              </template>

              <Card
                v-for="album in albums.slice(0, 5)"
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
                    background: `hsl(${album.title.length * 20 % 360}, 55%, 48%)`,
                  }"
                />
                <strong class="block">{{ album.title }}</strong>
                <small class="text-color-lighter">{{ album.artist }}</small>
              </Card>

              <template #sheet-header="{ close }">
                <Flex x-between y-center>
                  <h4>All Albums</h4>
                  <Button plain size="s" @click="close">
                    Close
                  </Button>
                </Flex>
              </template>

              <template #sheet-content>
                <Flex column gap="s">
                  <Flex
                    v-for="album in albums"
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
                        background: `hsl(${album.title.length * 20 % 360}, 55%, 48%)`,
                      }"
                    />
                    <div>
                      <strong class="block">{{ album.title }}</strong>
                      <small class="text-color-lighter">{{ album.artist }} · {{ album.year }}</small>
                    </div>
                  </Flex>
                </Flex>
              </template>

              <template #footer="{ toggle }">
                <Button size="s" class="mt-s" @click="toggle">
                  Browse all {{ albums.length }} albums
                </Button>
              </template>
            </Carousel>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
