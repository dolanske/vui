<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import Button from '../components/Button/Button.vue'
import Flex from '../components/Flex/Flex.vue'

const variants = ['default', 'danger', 'success', 'link', 'blue', 'accent'] as const
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Buttons
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Base</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn">
                Button
              </Button>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Base + large</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn" size="l">
                Button
              </Button>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Base + small</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn" size="s">
                Button
              </Button>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Active</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn" active>
                Button
              </Button>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Plain</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn" plain>
                Button
              </Button>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Dashed</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn" dashed>
                Button
              </Button>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Disabled</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn" disabled>
                Button
              </Button>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Squar + icon</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn" square icon="ph:info" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Squar + icon + small</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn" square icon="ph:info" size="s" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Squar + icon + large</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn" square icon="ph:info" size="l" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Icon + text</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn">
                <template #start>
                  <Icon icon="ph:arrow-left" />
                </template>
                Prev
                <template #end>
                  <Icon icon="ph:arrow-right" />
                </template>
              </Button>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
