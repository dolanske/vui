<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import Alert from '../components/Alert/Alert.vue'
import Button from '../components/Button/Button.vue'
import Flex from '../components/Flex/Flex.vue'

const variants = ['neutral', 'danger', 'warning', 'success', 'info'] as const
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Alerts
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
              <Alert
                v-for="variant in variants"
                :key="variant"
                :variant
                title="Warranty discounts 2025"
                description="We'd like to get in touch about your car's extended warranty."
              />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Title + description + filled</th>
          <td>
            <Flex column>
              <Alert v-for="variant in variants" :key="variant" :variant title="Warranty discounts 2025" filled description="We'd like to get in touch about your car's extended warranty." />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Custom</th>
          <td>
            <Alert variant="warning">
              <Flex align-center space-between>
                <p>Unfortunately we can't help you.</p>
                <Button>
                  <template #start>
                    <Icon icon="ph:x" />
                  </template>
                  Ignore
                </Button>
              </Flex>
            </Alert>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
