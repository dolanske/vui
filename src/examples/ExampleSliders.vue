<script setup lang='ts'>
import { ref } from 'vue'
import Flex from '../components/Flex/Flex.vue'
import Slider from '../components/Slider/Slider.vue'

const singleValue = ref(50)
const steppedValue = ref(40)

const rangeStart = ref(20)
const rangeEnd = ref(70)

const steppedRangeStart = ref(0)
const steppedRangeEnd = ref(100)
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Sliders
    </h3>
    <table style="table-layout: fixed;">
      <tbody>
        <tr>
          <th>
            <Flex x-between>
              <span>Default</span>
              <span>{{ singleValue }}</span>
            </Flex>
          </th>
          <td style="vertical-align: middle;">
            <Slider v-model="singleValue" />
          </td>
        </tr>
        <tr>
          <th>
            <Flex x-between>
              <span>Disabled</span>
            </Flex>
          </th>
          <td style="vertical-align: middle;">
            <Slider disabled />
          </td>
        </tr>
        <tr>
          <th>
            <Flex x-between>
              <span>Stepped</span>
              <span>{{ steppedValue }}</span>
            </Flex>
          </th>
          <td style="vertical-align: middle;">
            <Slider v-model="steppedValue" :steps="5" />
          </td>
        </tr>
        <tr>
          <th>
            <Flex x-between>
              <span>Range</span>
              <span>{{ rangeStart }} - {{ rangeEnd }}</span>
            </Flex>
          </th>
          <td style="vertical-align: middle;">
            <Slider v-model:start="rangeStart" v-model:end="rangeEnd" range />
          </td>
        </tr>
        <tr>
          <th>
            <Flex x-between>
              <span>Stepped range</span>
              <span>{{ steppedRangeStart }} - {{ steppedRangeEnd }}</span>
            </Flex>
          </th>
          <td style="vertical-align: middle;">
            <Slider v-model:start="steppedRangeStart" v-model:end="steppedRangeEnd" range :steps="10" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
span {
  font-size: var(--font-size-xs);
}
</style>
