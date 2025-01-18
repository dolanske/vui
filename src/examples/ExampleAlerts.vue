<script setup lang='ts'>
import Alert from '../components/Alert/Alert.vue'
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
            <Flex column>
              <Alert v-for="variant in variants" :key="variant" :variant>
                We'd like to get in touch about your car's extended warranty.
              </Alert>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Filled</th>
          <td>
            <Flex column>
              <Alert v-for="variant in variants" :key="variant" :variant filled>
                We'd like to get in touch about your car's extended warranty.
              </Alert>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Title + description</th>
          <td>
            <Flex column>
              <Alert v-for="variant in variants" :key="variant" :variant title="Warranty discounts 2025">
                We'd like to get in touch about your car's extended warranty.
              </Alert>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Title + description + filled</th>
          <td>
            <Flex column>
              <Alert v-for="variant in variants" :key="variant" :variant title="Warranty discounts 2025" filled>
                We'd like to get in touch about your car's extended warranty.
              </Alert>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
