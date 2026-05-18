<script setup lang='ts'>
import { ref } from 'vue'
import Flex from '../components/Flex/Flex.vue'
import Slider from '../components/Slider/Slider.vue'

const singleValue = ref(50)
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Skeletons
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Default</th>
          <td style="vertical-align: middle;">
            <Slider v-model="singleValue" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
