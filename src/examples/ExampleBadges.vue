<script setup lang='ts'>
import Badge from '../components/Badge/Badge.vue'
import Flex from '../components/Flex/Flex.vue'

const variants = ['neutral', 'danger', 'warning', 'success', 'info'] as const
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Badges
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Base</th>
          <td>
            <Flex>
              <Badge v-for="variant in variants" :key="variant" :variant>
                Badge
              </Badge>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Outline</th>
          <td>
            <Flex>
              <Badge v-for="variant in variants" :key="variant" :variant outline>
                Badge
              </Badge>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Filled</th>
          <td>
            <Flex>
              <Badge v-for="variant in variants" :key="variant" :variant filled>
                Badge
              </Badge>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
