<script setup lang="ts">
import { IconArrowRight, IconCaretRight, IconCommand, IconTrash, IconUser, IconX } from '@iconify-prerendered/vue-ph'
import Button from '../components/Button/Button.vue'
import Divider from '../components/Divider/Divider.vue'
import Dropdown from '../components/Dropdown/Dropdown.vue'
import DropdownItem from '../components/Dropdown/DropdownItem.vue'
import DropdownTitle from '../components/Dropdown/DropdownTitle.vue'
import Flex from '../components/Flex/Flex.vue'
import PopoutHover from '../components/Popout/PopoutHover.vue'

const placements = ['top', 'bottom', 'left', 'right'] as const
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Dropdowns
    </h3>

    <table class="mb-xxl">
      <tbody>
        <tr>
          <th>
            Base
          </th>
          <td>
            <Dropdown>
              <template #trigger="{ toggle }">
                <Button class="btn btn-primary" @click="toggle">
                  Dropdown
                </Button>
              </template>
              <PopoutHover placement="right-start">
                <template #trigger>
                  <DropdownItem>
                    New user
                    <template #iconEnd>
                      <IconCaretRight />
                    </template>
                  </DropdownItem>
                </template>
                <div class="vui-dropdown">
                  <DropdownItem>Anonymous</DropdownItem>
                  <DropdownItem>Template</DropdownItem>
                </div>
              </PopoutHover>
              <DropdownItem>Update</DropdownItem>
              <DropdownItem>
                <template #icon>
                  <IconX />
                </template>
                Cancel all requests
              </DropdownItem>
            </Dropdown>
          </td>
        </tr>
        <tr>
          <th>
            Placements (some)
          </th>
          <td>
            <Flex>
              <Dropdown v-for="placement in placements" :key="placement" :placement="placement">
                <template #trigger="{ toggle }">
                  <Button class="btn btn-primary" @click="toggle">
                    {{ placement }}
                  </Button>
                </template>

                <DropdownItem>New user</DropdownItem>
                <DropdownItem>Update</DropdownItem>
                <DropdownItem>Cancel</DropdownItem>
              </Dropdown>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Complex</th>
          <td>
            <Flex>
              <Dropdown>
                <template #trigger="{ toggle }">
                  <Button class="btn btn-primary" @click="toggle">
                    Dropdown
                  </Button>
                </template>

                <DropdownTitle>
                  Actions
                  <template #end>
                    3
                  </template>
                </DropdownTitle>

                <DropdownItem>
                  <template #icon>
                    <IconUser />
                  </template>

                  New user
                  <template #hint>
                    <IconCommand />
                    + C
                  </template>
                </DropdownItem>
                <DropdownItem>
                  <template #icon>
                    <IconArrowRight />
                  </template>

                  Update
                </DropdownItem>
                <DropdownItem>Cancel</DropdownItem>

                <Divider />

                <DropdownItem disabled>
                  <template #icon>
                    <IconX />
                  </template>

                  Disabled option
                </DropdownItem>
                <DropdownItem>
                  <template #icon>
                    <IconTrash />
                  </template>

                  Delete
                </DropdownItem>
              </Dropdown>

              <Dropdown>
                <template #trigger="{ toggle }">
                  <Button class="btn btn-primary" @click="toggle">
                    Small
                  </Button>
                </template>

                <DropdownTitle>
                  Actions
                  <template #end>
                    3
                  </template>
                </DropdownTitle>

                <DropdownItem size="s">
                  <template #icon>
                    <IconUser />
                  </template>

                  New user
                  <template #hint>
                    <IconCommand />
                    + C
                  </template>
                </DropdownItem>
                <DropdownItem size="s">
                  <template #icon>
                    <IconArrowRight />
                  </template>
                  Update
                </DropdownItem>
                <DropdownItem size="s">
                  Cancel
                </DropdownItem>

                <Divider />

                <DropdownItem disabled size="s">
                  <template #icon>
                    <IconX />
                  </template>

                  Disabled option
                </DropdownItem>
                <DropdownItem size="s">
                  <template #icon>
                    <IconTrash />
                  </template>

                  Delete
                </DropdownItem>
              </Dropdown>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Disabled</th>
          <td>
            <Dropdown>
              <template #trigger="{ toggle }">
                <Button class="btn btn-primary" disabled @click="toggle">
                  Dropdown
                </Button>
              </template>
              <DropdownItem>New user</DropdownItem>
              <DropdownItem>Update</DropdownItem>
              <DropdownItem>Cancel</DropdownItem>
            </Dropdown>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
