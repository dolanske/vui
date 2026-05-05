<script setup lang='ts'>
import Avatar from '../components/Avatar/Avatar.vue'
import Badge from '../components/Badge/Badge.vue'
import Button from '../components/Button/Button.vue'
import DropdownItem from '../components/Dropdown/DropdownItem.vue'
import Flex from '../components/Flex/Flex.vue'
import Indicator from '../components/Indicator/Indicator.vue'

const variants = ['alert', 'away', 'online', 'offline'] as const
const sizes = ['s', 'm', 'l'] as const
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Indicators
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Base</th>
          <td>
            <Flex y-center>
              <template
                v-for="variant in variants"
                :key="variant"
              >
                <Indicator
                  v-for="size in sizes"
                  :key="size"
                  :variant
                  :size
                />
              </template>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Outline</th>
          <td style="background-color: var(--color-bg-raised);">
            <Flex y-center>
              <Indicator
                v-for="variant in variants"
                :key="variant"
                :variant
                outline
              />
            </Flex>
          </td>
        </tr>

        <tr>
          <th>In Avatar</th>
          <td>
            <Flex y-center>
              <Avatar v-for="size in sizes" :key="size" :size="size" url="https://github.com/dolanske.png">
                <template #overlay>
                  <Indicator
                    outline
                    :size="size === 's' ? 's' : size"
                    variant="online"
                    position="top-right"
                    ripple
                  />
                </template>
              </Avatar>
            </Flex>
          </td>
        </tr>

        <tr>
          <th>In Button</th>
          <td>
            <Button size="s">
              Click this
              <Indicator
                variant="online"
                size="s"
                position="top-right"
                ripple
              />
            </Button>
          </td>
        </tr>
        <tr>
          <th>In DropdownItem</th>
          <td>
            <DropdownItem>
              Watch out
              <Indicator
                variant="away"
                size="s"
                position="top-left"
              />
            </DropdownItem>
          </td>
        </tr>
        <tr>
          <th>In Badge</th>
          <td>
            <Badge variant="danger">
              Badge
              <Indicator
                variant="alert"
                size="s"
                position="top-right"
              />
            </Badge>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
