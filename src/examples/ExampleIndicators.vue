<script setup lang='ts'>
import Flex from '../components/Flex/Flex.vue'
import Indicator from '../components/Indicator/Indicator.vue'

const variants = ['alert', 'online', 'offline', 'away'] as const
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Avatars
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Default sizes</th>
          <td>
            <Flex>
              <Indicator v-for="variant in variants" :key="variant" :variant="variant" size="m" />
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
