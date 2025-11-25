<script setup lang='ts'>
import { IconArrowLeft, IconArrowRight, IconCaretDown, IconInfo, IconTextAUnderline, IconTextBBold, IconTextBold, IconTextItalic } from '@iconify-prerendered/vue-ph'
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
              <Button v-for="btn in variants" :key="btn" :variant="btn" href="https://dolansky.dev/" target="_blank">
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
              <Button v-for="btn in variants" :key="btn" :variant="btn" square>
                <IconInfo />
              </Button>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Square + icon + small</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn" square size="s">
                <IconInfo />
              </Button>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Square + icon + large</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn" square size="l">
                <IconInfo />
              </Button>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Loading</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn" loading size="l">
                Button
              </Button>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Icon + text</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn">
                <template #start>
                  <IconArrowLeft />
                </template>
                Prev
                <template #end>
                  <IconArrowRight />
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
                <Button :variant="btn">
                  <IconCaretDown />
                </Button>
              </ButtonGroup>

              <ButtonGroup>
                <Button square active>
                  <IconTextBBold />
                </Button>
                <Button square>
                  <IconTextBold />
                </Button>
                <Button square>
                  <IconTextItalic />
                </Button>
                <Button square>
                  <IconTextAUnderline />
                </Button>
              </ButtonGroup>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
