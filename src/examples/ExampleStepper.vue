<script setup lang="ts">
import { IconArrowLeft, IconArrowRight } from '@iconify-prerendered/vue-ph'
import { ref } from 'vue'
import Button from '../components/Button/Button.vue'
import ButtonGroup from '../components/Button/ButtonGroup.vue'
import Flex from '../components/Flex/Flex.vue'
import Stepper from '../components/Stepper/Stepper.vue'

const step = ref(0)
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Stepper
    </h3>

    <table>
      <tbody>
        <tr>
          <th>Default (dots)</th>
          <td>
            <Flex y-center x-between>
              <Stepper v-model="step" :steps="5" />

              <ButtonGroup>
                <Button size="s" square @click="step -= 1">
                  <IconArrowLeft />
                </Button>
                <Button size="s" square @click="step += 1">
                  <IconArrowRight />
                </Button>
              </ButtonGroup>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
