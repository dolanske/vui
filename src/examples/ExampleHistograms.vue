<script setup lang='ts'>
import { ref } from 'vue'
import Histogram from '../components/Charts/Histogram.vue'
import Flex from '../components/Flex/Flex.vue'

const data = [4, 9, 6, 2, 8, 5, 7, 3, 10, 1]
const many = Array.from({ length: 120 }, (_, i) => Math.round(50 + Math.sin(i / 6) * 30 + (i % 7) * 3))
const lastClicked = ref<number | null>(null)

function formatVisits(value: number, index: number) {
  return `Day ${index + 1}: ${value} visits`
}
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Histograms
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Default</th>
          <td>
            <Histogram :data style="max-width: 320px" />
          </td>
        </tr>
        <tr>
          <th>Custom tooltip</th>
          <td>
            <Histogram :data style="max-width: 320px">
              <template #tooltip="{ value }">
                <p>Capacity: {{ value }}</p>
              </template>
            </Histogram>
          </td>
        </tr>
        <tr>
          <th>Format value, label</th>
          <td>
            <Histogram :data :format-value="formatVisits" label="Visits over the last 10 days" style="max-width: 320px" />
          </td>
        </tr>
        <tr>
          <th>Height, gap</th>
          <td>
            <Flex gap="l" y-end>
              <Histogram :data :height="24" gap="xxs" style="width: 160px" />
              <Histogram :data :height="80" :gap="8" style="width: 240px" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Compact, many values</th>
          <td>
            <Histogram :data="many" compact />
          </td>
        </tr>
        <tr>
          <th>Expand</th>
          <td>
            <Histogram :data expand />
          </td>
        </tr>
        <tr>
          <th>Cell click</th>
          <td>
            <Flex column gap="xs">
              <Histogram :data style="max-width: 320px" @cell-click="index => lastClicked = index" />
              <span>Last clicked: {{ lastClicked === null ? '-' : lastClicked + 1 }}</span>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Edge cases <br> Empty, negative, all zero, single</th>
          <td>
            <Flex gap="l" y-end>
              <Histogram :data="[]" style="width: 80px" />
              <Histogram :data="[-4, 2, -1, 6]" style="width: 80px" />
              <Histogram :data="[0, 0, 0, 0]" style="width: 80px" />
              <Histogram :data="[5]" style="width: 80px" />
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
