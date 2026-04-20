<script setup lang="ts">
import { Tooltip } from '@dolanske/vui'
import TokenItem from '~/components/docs/TokenItem.vue'
import { containerTokens, interactiveElementHeightTokens } from '~/utils/constants'
import { getContainerPercent } from '~/utils/format'
</script>

<template>
  <div>
    <h1>Layout</h1>
    <p class="mb-xl">
      Layout tokens define the core sizing constraints used across the framework. These values power container widths and the default heights of interactive UI elements.
    </p>

    <h2 class="mb-l">
      Containers
    </h2>

    <p class="mb-xl">
      Container tokens define the maximum widths used by the framework <NuxtLink to="/docs/framework/layout">
        layout utilities
      </NuxtLink>. They let you keep page widths consistent without hard-coding values into components.
    </p>

    <TokenItem
      v-for="item in containerTokens"
      :key="item.token"
      :name="item.name"
      :class-name="item.token"
      :copyable="false"
      prefix=""
    >
      <template #indicator>
        <Tooltip>
          <Flex y-center style="height:32px">
            <div class="size-indicator-wrap container">
              <div class="size-indicator" :style="{ width: getContainerPercent(item.size) }" />
            </div>
          </Flex>
          <template #tooltip>
            <p style="max-width:292px">
              On a <code>1920px</code> screen, the container will take up <code>{{ getContainerPercent(item.size) }}</code> of the available width.
            </p>
          </template>
        </Tooltip>
      </template>
      <template #value>
        {{ item.size }}
      </template>
      <template #actions>
        <CopyClipboard :text="item.token" confirm="Copied!">
          <Button plain>
            <template #start>
              <Badge>
                {{ item.token }}
              </Badge>
            </template>
            <template #end>
              <Icon name="ph:copy" size="18" />
            </template>
          </Button>
        </CopyClipboard>
      </template>
    </TokenItem>

    <h2 class="mb-l">
      Interactive element height
    </h2>

    <p class="mb-xl">
      These tokens define the default heights used by compact and regular interactive elements such as buttons, inputs, and related controls.
    </p>

    <TokenItem
      v-for="item in interactiveElementHeightTokens"
      :key="item.token"
      :name="item.name"
      :class-name="item.token"
      :copyable="false"
      prefix=""
    >
      <template #indicator>
        <div class="interactive-height-wrap">
          <div class="interactive-height-bar" :style="{ height: item.size, width: '64px' }" />
          <div class="interactive-height-bar" :style="{ height: item.size, width: item.size }" />
        </div>
      </template>
      <template #value>
        {{ item.size }}
      </template>
      <template #actions>
        <CopyClipboard :text="item.token" confirm="Copied!">
          <Button plain>
            <template #start>
              <Badge>
                {{ item.token }}
              </Badge>
            </template>
            <template #end>
              <Icon name="ph:copy" size="18" />
            </template>
          </Button>
        </CopyClipboard>
      </template>
    </TokenItem>
  </div>
</template>

<style scoped lang="scss">
.interactive-height-wrap {
  width: 144px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  justify-content: center;
  background-color: var(--color-bg-medium);
  border-radius: var(--border-radius-s);
}

.interactive-height-bar {
  border-radius: var(--border-radius-s);
  background-color: var(--color-text-lightest);
  box-shadow: var(--box-shadow);
}
</style>
