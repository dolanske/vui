<script setup>
import { Button, Grid, Tooltip } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Grid gap="l" :columns="2">
        <div>
          <strong class="text-m mb-s block text-semibold">
            Basic Usage
          </strong>
          <Tooltip>
            <Button>Hover me</Button>
            <template #tooltip>
              <p>This is a tooltip</p>
            </template>
          </Tooltip>
        </div>

        <div>
          <strong class="text-m mb-s block text-semibold">
            Different Placements
          </strong>
          <Flex gap="m">
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
          </Flex>
        </div>

        <div>
          <strong class="text-m mb-s block text-semibold">
            With Delay
          </strong>
          <Tooltip delay="500">
            <Button>Hover me (500ms delay)</Button>
            <template #tooltip>
              <p>This tooltip appears after 500ms</p>
            </template>
          </Tooltip>
        </div>

        <div>
          <strong class="text-m mb-s block text-semibold">
            With Icon
          </strong>
          <Tooltip>
            <Icon :size="24" name="ph:info" />
            <template #tooltip>
              <p>Additional information</p>
            </template>
          </Tooltip>
        </div>

        <div>
          <strong class="text-m mb-s block text-semibold">
            With Formatted Content
          </strong>
          <Tooltip>
            <Button>Hover for details</Button>
            <template #tooltip>
              <div class="p-s">
                <strong class="mb-s block text-semibold">
                  Title
                </strong>
                <p>Detailed description goes here</p>
              </div>
            </template>
          </Tooltip>
        </div>
      </Grid>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style scoped>
:deep(p) {
  margin: 0;
}
</style>
