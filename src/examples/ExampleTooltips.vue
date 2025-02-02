<script setup lang='ts'>
import Flex from '../components/Flex/Flex.vue'
import Tooltip from '../components/Tooltip/Tooltip.vue'
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Tooltips
    </h3>

    <table>
      <tbody>
        <tr>
          <th>Base</th>
          <td>
            <Tooltip>
              <span>Hover me</span>
              <template #tooltip>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam minus labore commodi aliquid molestiae non voluptas, veritatis nesciunt. Nihil quod necessitatibus veritatis nam enim eius deleniti unde recusandae reprehenderit voluptate?</p>
              </template>
            </Tooltip>
          </td>
        </tr>
        <tr>
          <th>Hover delay</th>
          <td>
            <Tooltip :delay="500">
              <span>Hover me</span>
              <template #tooltip>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </template>
            </Tooltip>
          </td>
        </tr>
        <tr>
          <th>Custom placement</th>
          <td>
            <Flex>
              <Tooltip placement="top">
                <span>Above</span>
                <template #tooltip>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </template>
              </Tooltip>
              <Tooltip placement="right">
                <span>Right</span>
                <template #tooltip>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </template>
              </Tooltip>
              <Tooltip placement="left">
                <span>Left</span>
                <template #tooltip>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </template>
              </Tooltip>
              <Tooltip placement="bottom">
                <span>Bottom</span>
                <template #tooltip>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </template>
              </Tooltip>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
