<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import Button from '../components/Button/Button.vue'
import ButtonGroup from '../components/ButtonGroup/ButtonGroup.vue'
import Flex from '../components/Flex/Flex.vue'

const variants = ['gray', 'fill', 'danger', 'success', 'link', 'accent'] as const
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
          <th>Outline</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn" outline>
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
          <th>Square + icon</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn" square icon="ph:info" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Square + icon + small</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn" square icon="ph:info" size="s" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Square + icon + large</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn" square icon="ph:info" size="l" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Loading</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn" loading size="l" />
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
        <tr>
          <td>Button group</td>
          <td>
            <Flex gap="s" wrap>
              <ButtonGroup v-for="btn in variants" :key="btn">
                <Button :variant="btn">
                  Hello
                </Button>
                <Button :variant="btn" icon="ph:caret-down" />
              </ButtonGroup>

              <ButtonGroup>
                <Button square icon="ph:text-b-bold" active />
                <Button square icon="ph:text-bold" />
                <Button square icon="ph:text-italic" />
                <Button square icon="ph:text-a-underline" />
              </ButtonGroup>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
