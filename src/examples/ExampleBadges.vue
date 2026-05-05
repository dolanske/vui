<script setup lang='ts'>
import { IconHeadphones, IconMicrophone } from '@iconify-prerendered/vue-ph'
import Badge from '../components/Badge/Badge.vue'
import BadgeGroup from '../components/Badge/BadgeGroup.vue'
import Flex from '../components/Flex/Flex.vue'
import Tooltip from '../components/Tooltip/Tooltip.vue'

const sizes = ['s', 'm', 'l'] as const
const variants = ['neutral', 'danger', 'warning', 'success', 'info', 'accent'] as const
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Badges
    </h3>
    <table class="mb-m">
      <tbody>
        <tr>
          <th width="25%">
            Badge group outline
          </th>
          <td>
            <Flex gap="l">
              <BadgeGroup :gap="2">
                <Tooltip>
                  <Badge filled circle>
                    <IconHeadphones />
                  </Badge>
                  <template #tooltip>
                    <p>Mute sound</p>
                  </template>
                </Tooltip>
                <Badge filled circle>
                  <IconMicrophone />
                </Badge>
              </BadgeGroup>

              <BadgeGroup :gap="2">
                <Badge variant="success">
                  Success
                </Badge>
                <Badge variant="danger">
                  Fail
                </Badge>
              </BadgeGroup>

              <BadgeGroup>
                <Badge variant="warning" outline>
                  Offline
                </Badge>
                <Badge variant="warning" outline circle>
                  5
                </Badge>
              </BadgeGroup>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>

    <template v-for="size in sizes" :key="size">
      <table class="mb-m">
        <tbody>
          <tr>
            <th width="20%">
              Base {{ size }}
            </th>
            <td>
              <Flex>
                <Badge v-for="variant in variants" :key="variant" :size :variant>
                  Badge
                </Badge>
              </Flex>
            </td>
          </tr>
          <tr>
            <th width="20%">
              Outline {{ size }}
            </th>
            <td>
              <Flex>
                <Badge v-for="variant in variants" :key="variant" :size :variant outline>
                  Badge
                </Badge>
              </Flex>
            </td>
          </tr>
          <tr>
            <th width="20%">
              Filled {{ size }}
            </th>
            <td>
              <Flex>
                <Badge v-for="variant in variants" :key="variant" :size :variant filled>
                  Badge
                </Badge>
              </Flex>
            </td>
          </tr>
        </tbody>
      </table>
    </template>

    <template v-for="size in sizes" :key="size">
      <table class="mb-m">
        <tbody>
          <tr>
            <th width="20%">
              Base circle {{ size }}
            </th>
            <td>
              <Flex>
                <Badge v-for="(variant, index) in variants" :key="variant" circle :size :variant>
                  {{ 10 ** index }}
                </Badge>
              </Flex>
            </td>
          </tr>
          <tr>
            <th width="20%">
              Outline circle {{ size }}
            </th>
            <td>
              <Flex>
                <Badge v-for="(variant, index) in variants" :key="variant" circle :size :variant outline>
                  {{ 10 ** index }}
                </Badge>
              </Flex>
            </td>
          </tr>
          <tr>
            <th width="20%">
              Filled circle {{ size }}
            </th>
            <td>
              <Flex>
                <Badge v-for="(variant, index) in variants" :key="variant" circle :size :variant filled>
                  {{ 10 ** index }}
                </Badge>
              </Flex>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>
