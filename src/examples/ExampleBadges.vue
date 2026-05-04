<script setup lang='ts'>
import Badge from '../components/Badge/Badge.vue'
import Flex from '../components/Flex/Flex.vue'

const sizes = ['s', 'm', 'l'] as const
const variants = ['neutral', 'danger', 'warning', 'success', 'info', 'accent'] as const
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Badges
    </h3>
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
