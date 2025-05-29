<script setup>
import { Button, Icon, Tooltip } from '@dolanske/vui'
</script>

<template>
  <div class="space-y-l">
    <div>
      <h3 class="text-m mb-s">
        Basic Usage
      </h3>
      <Tooltip>
        <Button>Hover me</Button>
        <template #tooltip>
          <p>This is a tooltip</p>
        </template>
      </Tooltip>
    </div>

    <div>
      <h3 class="text-m mb-s">
        Different Placements
      </h3>
      <div class="flex gap-m">
        <Tooltip placement="top">
          <Button>Top</Button>
          <template #tooltip>
            <p>Top tooltip</p>
          </template>
        </Tooltip>

        <Tooltip placement="right">
          <Button>Right</Button>
          <template #tooltip>
            <p>Right tooltip</p>
          </template>
        </Tooltip>

        <Tooltip placement="bottom">
          <Button>Bottom</Button>
          <template #tooltip>
            <p>Bottom tooltip</p>
          </template>
        </Tooltip>

        <Tooltip placement="left">
          <Button>Left</Button>
          <template #tooltip>
            <p>Left tooltip</p>
          </template>
        </Tooltip>
      </div>
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Delay
      </h3>
      <Tooltip delay="500">
        <Button>Hover me (500ms delay)</Button>
        <template #tooltip>
          <p>This tooltip appears after 500ms</p>
        </template>
      </Tooltip>
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Icon
      </h3>
      <Tooltip>
        <Icon icon="ph:info" />
        <template #tooltip>
          <p>Additional information</p>
        </template>
      </Tooltip>
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Formatted Content
      </h3>
      <Tooltip>
        <Button>Hover for details</Button>
        <template #tooltip>
          <div class="p-s">
            <h4 class="mb-s">
              Title
            </h4>
            <p>Detailed description goes here</p>
          </div>
        </template>
      </Tooltip>
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Multiple Lines
      </h3>
      <Tooltip>
        <Button>Hover for help</Button>
        <template #tooltip>
          <div class="p-s">
            <p class="mb-s">
              First line of help text
            </p>
            <p>Second line of help text</p>
          </div>
        </template>
      </Tooltip>
    </div>
  </div>
</template>
