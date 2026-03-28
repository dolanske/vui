<script setup lang='ts'>
import { ref } from 'vue'
import Button from '../components/Button/Button.vue'
import Carousel from '../components/Carousel/Carousel.vue'
import Flex from '../components/Flex/Flex.vue'

const items = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  label: `Item ${i + 1}`,
  color: `hsl(${(i * 30) % 360}, 60%, 50%)`,
}))

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
          <th>Gap sizes and hidden scrollbar & shadows</th>
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
            <Carousel :gap="activeGap" style="max-width: 480px" hide-scrollbar hide-shadows>
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
      </tbody>
    </table>
  </div>
</template>
