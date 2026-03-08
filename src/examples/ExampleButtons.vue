<script setup lang='ts'>
import { IconArrowLeft, IconArrowRight, IconCaretDown, IconInfo, IconTextAUnderline, IconTextBBold, IconTextBold, IconTextItalic } from '@iconify-prerendered/vue-ph'
import Button from '../components/Button/Button.vue'
import ButtonGroup from '../components/ButtonGroup/ButtonGroup.vue'
import CopyClipboard from '../components/CopyClipboard/CopyClipboard.vue'
import Dropdown from '../components/Dropdown/Dropdown.vue'
import DropdownItem from '../components/Dropdown/DropdownItem.vue'
import Flex from '../components/Flex/Flex.vue'
import Tooltip from '../components/Tooltip/Tooltip.vue'

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
          <th>Only start slot</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn" href="https://dolansky.dev/" target="_blank">
                <template #start>
                  <IconArrowLeft />
                </template>
              </Button>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Only end slot</th>
          <td>
            <Flex gap="s">
              <Button v-for="btn in variants" :key="btn" :variant="btn" href="https://dolansky.dev/" target="_blank">
                <template #end>
                  <IconArrowRight />
                </template>
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
                <Button :variant="btn" square>
                  <IconCaretDown />
                </Button>
              </ButtonGroup>

              <ButtonGroup>
                <Tooltip>
                  <Button square active>
                    <IconTextBBold />
                  </Button>
                  <template #tooltip>
                    Bold
                  </template>
                </Tooltip>
                <CopyClipboard text="Hello from ButtonGroup!" confirm="Copied!">
                  <Tooltip>
                    <Button square>
                      <IconTextItalic />
                    </Button>
                    <template #tooltip>
                      Click to copy
                    </template>
                  </Tooltip>
                </CopyClipboard>
                <Tooltip>
                  <Button square active>
                    <IconTextAUnderline />
                  </Button>
                  <template #tooltip>
                    Underline
                  </template>
                </Tooltip>
              </ButtonGroup>

              <ButtonGroup vertical>
                <Button square active>
                  <IconTextBBold />
                </Button>
                <Button square>
                  <IconTextBold />
                </Button>
                <Button square>
                  <IconTextItalic />
                </Button>
                <Dropdown placement="bottom-end">
                  <template #trigger="{ toggle }">
                    <Button square @click="toggle">
                      <IconCaretDown />
                    </Button>
                  </template>
                  <DropdownItem>Deploy to staging</DropdownItem>
                  <DropdownItem>Deploy to production</DropdownItem>
                  <DropdownItem>Rollback</DropdownItem>
                </Dropdown>
              </ButtonGroup>

              <ButtonGroup>
                <Button square active size="s">
                  <IconTextBBold />
                </Button>
              </ButtonGroup>

              <ButtonGroup>
                <Button>Deploy</Button>
                <Dropdown placement="bottom-end">
                  <template #trigger="{ toggle }">
                    <Button square @click="toggle">
                      <IconCaretDown />
                    </Button>
                  </template>
                  <DropdownItem>Deploy to staging</DropdownItem>
                  <DropdownItem>Deploy to production</DropdownItem>
                  <DropdownItem>Rollback</DropdownItem>
                </Dropdown>
              </ButtonGroup>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
