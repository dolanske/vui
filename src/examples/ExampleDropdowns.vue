<script setup lang="ts">
import { IconArrowRight, IconCommand, IconTrash, IconUser, IconX } from '@iconify-prerendered/vue-ph'
import Button from '../components/Button/Button.vue'
import Dropdown from '../components/Dropdown/Dropdown.vue'
import DropdownItem from '../components/Dropdown/DropdownItem.vue'
import DropdownTitle from '../components/Dropdown/DropdownTitle.vue'
import Flex from '../components/Flex/Flex.vue'

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
            Base + expand <br> (dropdown takes width of the trigger)
          </th>
          <td>
            <Dropdown expand>
              <template #trigger="{ toggle }">
                <Button class="btn btn-primary" expand @click="toggle">
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

              <DropdownTitle>Yourself</DropdownTitle>
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
          </td>
        </tr>
        <tr>
          <th>Disabled</th>
          <td>
            <Dropdown expand>
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
