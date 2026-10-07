<script setup lang='ts'>
import { ref } from 'vue'
import Avatar from '../components/Avatar/Avatar.vue'
import Button from '../components/Button/Button.vue'
import Card from '../components/Card/Card.vue'
import Flex from '../components/Flex/Flex.vue'
import Skeleton from '../components/Skeleton/Skeleton.vue'

const loading = ref(true)
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Skeletons
    </h3>
    <table>
      <tbody>
        <tr>
          <th>No defaults <br> Width, height, roundness must be specified</th>
          <td>
            <Flex gap="s">
              <Skeleton :width="80" :height="48" />
              <Skeleton :width="80" :height="48" :radius="8" />
              <Skeleton :width="48" :height="48" radius="16px" />
              <Skeleton :width="48" circle />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Relative units</th>
          <td>
            <Flex column gap="xs">
              <Skeleton width="100%" :height="12" :radius="4" />
              <Skeleton width="75%" :height="12" :radius="4" />
              <Skeleton width="10rem" :height="12" :radius="4" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Loading a card</th>
          <td>
            <Button size="s" class="mb-s" @click="loading = !loading">
              {{ loading ? 'Finish loading' : 'Load again' }}
            </Button>
            <Card style="max-width: 360px" :aria-busy="loading">
              <Flex gap="m" y-center>
                <Skeleton v-if="loading" :width="48" circle />
                <Avatar v-else :size="48" fallback="JD" />
                <Flex column gap="xs" expand>
                  <template v-if="loading">
                    <Skeleton width="60%" :height="14" :radius="4" />
                    <Skeleton width="40%" :height="12" :radius="4" />
                  </template>
                  <template v-else>
                    <strong>Jane Doe</strong>
                    <span class="text-color-light">Product designer</span>
                  </template>
                </Flex>
              </Flex>
            </Card>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
