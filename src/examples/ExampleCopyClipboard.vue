<script setup lang='ts'>
import { IconCopy } from '@iconify-prerendered/vue-ph'
import Button from '../components/Button/Button.vue'
import CopyClipboard from '../components/CopyClipboard/CopyClipboard.vue'
import Flex from '../components/Flex/Flex.vue'
import Input from '../components/Input/Input.vue'
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Clipboard copy
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Plain text <br> Gets button semantics</th>
          <td>
            <CopyClipboard text="Copy me!">
              <p>Copy me!</p>
            </CopyClipboard>
          </td>
        </tr>
        <tr>
          <th>Button with confirmation</th>
          <td>
            <CopyClipboard text="Copy me!" confirm>
              <Button>Copy me!</Button>
            </CopyClipboard>
          </td>
        </tr>
        <tr>
          <th>Custom confirmation text and time</th>
          <td>
            <CopyClipboard text="Copy me!" confirm="Saved to your clipboard" :confirm-time="3000" announcement="Link copied">
              <Button>
                <template #start>
                  <IconCopy />
                </template>
                Copy link
              </Button>
            </CopyClipboard>
          </td>
        </tr>
        <tr>
          <th>Custom confirm popup at the right</th>
          <td>
            <CopyClipboard text="Copy me!" confirm confirm-placement="right">
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
        <tr>
          <th>Next to an input</th>
          <td>
            <Flex gap="xs" y-end>
              <Input model-value="https://vui.dolanske.dev" readonly label="Share link" />
              <CopyClipboard text="https://vui.dolanske.dev" confirm>
                <Button square aria-label="Copy link">
                  <IconCopy />
                </Button>
              </CopyClipboard>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>No transition</th>
          <td>
            <CopyClipboard text="Copy me!" confirm transition-name="none">
              <Button>Copy me!</Button>
            </CopyClipboard>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
