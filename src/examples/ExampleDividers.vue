<script setup lang='ts'>
import Avatar from '../components/Avatar/Avatar.vue'
import Divider from '../components/Divider/Divider.vue'
import Flex from '../components/Flex/Flex.vue'
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Dividers
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Default</th>
          <td>
            <Divider />
          </td>
        </tr>
        <tr>
          <th>Sizes</th>
          <td>
            <Flex column gap="m">
              <Divider :size="1" />
              <Divider :size="2" />
              <Divider size="4px" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Types</th>
          <td>
            <Flex column gap="m">
              <Divider type="solid" :size="2" />
              <Divider type="dashed" :size="2" />
              <Divider type="dotted" :size="2" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Vertical</th>
          <td>
            <Flex y-center gap="m">
              <span>One</span>
              <Divider vertical height="16px" />
              <span>Two</span>
              <Divider vertical :height="32" :size="4" />
              <span>Three</span>
              <Divider vertical :height="24" type="dashed" />
              <span>Four</span>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Vertical, stretched by its parent</th>
          <td>
            <Flex gap="m" style="height: 64px">
              <span>Left</span>
              <Divider vertical />
              <span>Right</span>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Slot content</th>
          <td>
            <Flex column gap="l">
              <Divider>
                <Avatar :size="32" />
              </Divider>
              <Divider>
                <span class="text-color-light">or continue with</span>
              </Divider>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
