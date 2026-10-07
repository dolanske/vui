<script setup lang="ts">
import { IconArrowRight, IconCaretRight, IconCommand, IconTrash, IconUser, IconX } from '@iconify-prerendered/vue-ph'
import { ref } from 'vue'
import Button from '../components/Button/Button.vue'
import Checkbox from '../components/Checkbox/Checkbox.vue'
import Divider from '../components/Divider/Divider.vue'
import Dropdown from '../components/Dropdown/Dropdown.vue'
import DropdownItem from '../components/Dropdown/DropdownItem.vue'
import DropdownTitle from '../components/Dropdown/DropdownTitle.vue'
import Flex from '../components/Flex/Flex.vue'
import Input from '../components/Input/Input.vue'
import Modal from '../components/Modal/Modal.vue'
import PopoutHover from '../components/Popout/PopoutHover.vue'

const placements = ['top', 'bottom', 'left', 'right'] as const
const keepOpenCount = ref(0)
const filterText = ref('')
const filterArchived = ref(false)
const modalOpen = ref(false)
const countries = ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'Chile', 'Czechia', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Japan', 'Mexico', 'Norway', 'Poland', 'Portugal', 'Slovakia', 'Spain', 'Sweden', 'Switzerland']
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
        <tr>
          <th>Disabled items, keep open</th>
          <td>
            <Dropdown>
              <template #trigger="{ toggle }">
                <Button @click="toggle">
                  Options
                </Button>
              </template>
              <DropdownItem>Enabled</DropdownItem>
              <DropdownItem disabled>
                Disabled
              </DropdownItem>
              <DropdownItem keep-open @click="keepOpenCount++">
                Click me, I stay open ({{ keepOpenCount }})
              </DropdownItem>
            </Dropdown>
          </td>
        </tr>
        <tr>
          <th>Dialog role, plain content <br> Clicking text keeps it open</th>
          <td>
            <Dropdown role="dialog" :min-width="280">
              <template #trigger="{ toggle }">
                <Button @click="toggle">
                  Filters
                </Button>
              </template>
              <template #default="{ close }">
                <div class="p-s">
                  <p class="mb-s">
                    Plain text inside the dropdown. Clicking it must not close the dropdown.
                  </p>
                  <Input v-model="filterText" label="Search" class="mb-s" />
                  <Checkbox v-model="filterArchived" label="Include archived" class="mb-m" />
                  <Flex x-end gap="s">
                    <Button size="s" @click="close">
                      Apply
                    </Button>
                  </Flex>
                </div>
              </template>
            </Dropdown>
          </td>
        </tr>
        <tr>
          <th>Match trigger width</th>
          <td>
            <Dropdown match-width>
              <template #trigger="{ toggle }">
                <Button style="width: 320px" @click="toggle">
                  As wide as this button
                </Button>
              </template>
              <DropdownItem>One</DropdownItem>
              <DropdownItem>Two</DropdownItem>
            </Dropdown>
          </td>
        </tr>
        <tr>
          <th>Max height, typeahead <br> Type a letter to jump</th>
          <td>
            <Dropdown max-height="240px">
              <template #trigger="{ toggle }">
                <Button @click="toggle">
                  Countries
                </Button>
              </template>
              <DropdownItem v-for="country in countries" :key="country">
                {{ country }}
              </DropdownItem>
            </Dropdown>
          </td>
        </tr>
        <tr>
          <th>Inside a modal <br> Escape closes the menu first</th>
          <td>
            <Button @click="modalOpen = true">
              Open modal
            </Button>
            <Modal v-model:open="modalOpen">
              <template #header>
                <h3>Modal with a dropdown</h3>
              </template>
              <Dropdown>
                <template #trigger="{ toggle }">
                  <Button @click="toggle">
                    Open menu
                  </Button>
                </template>
                <DropdownItem>Rename</DropdownItem>
                <DropdownItem>Duplicate</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </Dropdown>
            </Modal>
          </td>
        </tr>
        <tr>
          <th>No mobile drawer, no transition</th>
          <td>
            <Dropdown no-mobile-drawer transition-name="none">
              <template #trigger="{ toggle }">
                <Button @click="toggle">
                  Instant
                </Button>
              </template>
              <DropdownItem>One</DropdownItem>
              <DropdownItem>Two</DropdownItem>
            </Dropdown>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
