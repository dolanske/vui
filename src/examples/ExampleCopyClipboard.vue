<script setup lang='ts'>
import Button from '../components/Button/Button.vue'
import CopyClipboard from '../components/CopyClipboard/CopyClipboard.vue'
import Flex from '../components/Flex/Flex.vue'
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Clipboard copy
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Base</th>
          <td>
            <CopyClipboard text="Copy me!">
              <p>Copy me!</p>
            </CopyClipboard>
          </td>
        </tr>
        <tr>
          <th>Custom slot & confirmation</th>
          <td>
            <CopyClipboard text="Copy me!" confirm>
              <Button>Copy me!</Button>
            </CopyClipboard>
          </td>
        </tr>
        <tr>
          <th>Custom confirm popup</th>
          <td>
            <CopyClipboard text="Copy me!" confirm>
              <Button>Copy me!</Button>
              <template #confirm>
                <Flex column gap="s" y-center>
                  <strong>The dawg</strong>
                  <img style="width:128px;border-radius:8px" src="https://i.imgur.com/jMxIs6p.png" alt="">
                </Flex>
              </template>
            </CopyClipboard>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
