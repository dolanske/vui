<script setup lang="ts">
import { Flex, Tooltip } from '@dolanske/vui'
import TokenItem from '~/components/docs/TokenItem.vue'
import { containerClasses, displayClasses, heightClasses, widthClasses } from '~/utils/constants'
import { getContainerPercent } from '~/utils/format'
</script>

<template>
  <div>
    <h1>Layout Classes</h1>

    <p class="mb-xl">
      This page documents the CSS utility classes available for controlling layout in VUI. These classes provide responsive containers, width and height utilities, display properties, and flexbox controls to help you build layouts quickly and consistently.
    </p>

    <h2 class="mb-l">
      Container
    </h2>
    <p class="mb-xl">
      Container classes provide responsive containers with different maximum widths and consistent padding.
    </p>

    <TokenItem
      v-for="item in containerClasses"
      :key="item.className"
      :name="item.name"
      :class-name="item.className"
      :indicator-style="{ width: 0 }"
    >
      <template #indicator>
        <Tooltip>
          <Flex y-center style="height:32px">
            <div class="size-indicator-wrap container">
              <div class="size-indicator" :style="{ width: getContainerPercent(item.value) }" />
            </div>
          </Flex>
          <template #tooltip>
            <p style="max-width:292px">
              On a <code>1920px</code> screen, the container will take up <code>{{ getContainerPercent(item.value) }}</code> of the available width.
            </p>
          </template>
        </Tooltip>
      </template>
    </TokenItem>

    <h2 class="mb-l">
      Width
    </h2>
    <p class="mb-xl">
      Width utility classes control element width using percentage values. These classes are generated in increments of 5% from 0% to 100%, plus an additional utility class.
    </p>
    <p class="mb-xl">
      <strong>Pattern:</strong> <code>.w-{percentage}</code> where percentage ranges from 0 to 100 in increments of 5.
    </p>

    <TokenItem
      v-for="item in widthClasses"
      :key="item.className"
      :name="item.name"
      :class-name="item.className"
    >
      <template #indicator>
        <div class="size-indicator-wrap container left">
          <div class="size-indicator" :style="{ width: item.value }" />
        </div>
      </template>
    </TokenItem>

    <h2 class="mb-l">
      Height
    </h2>
    <p class="mb-xl">
      Height utility classes control element height using percentage values. These classes follow the same pattern as width classes, generated in increments of 5% from 0% to 100%.
    </p>
    <p class="mb-xl">
      <strong>Pattern:</strong> <code>.h-{percentage}</code> where percentage ranges from 0 to 100 in increments of 5.
    </p>

    <TokenItem
      v-for="item in heightClasses"
      :key="item.className"
      :name="item.name"
      :class-name="item.className"
    >
      <template #indicator>
        <div class="vertical-size-indicator-wrap">
          <div class="vertical-size-indicator" :style="{ height: item.value }" />
        </div>
      </template>
    </TokenItem>

    <h2 class="mb-l">
      Display
    </h2>
    <p class="mb-xl">
      Classes for controlling the display property of elements.
    </p>

    <TokenItem
      v-for="item in displayClasses"
      :key="item.className"
      :name="item.name"
      :class-name="item.className"
      :indicator="false"
    >
      <template #value>
        display: {{ item.value }}
      </template>
    </TokenItem>

    <h2 class="mb-l">
      Flex
    </h2>
    <p class="mb-xl">
      Classes for flexbox layout control. You should almost always use the <NuxtLink to="/docs/components/flex">
        Flex
      </NuxtLink> component.
    </p>

    <TokenItem name="Flex 1" class-name="flex-1">
      <template #indicator>
        <Flex gap="m">
          <div class="flex-indicator" />
          <div class="flex-indicator" />
          <div class="flex-indicator flex-1" />
          <div class="flex-indicator" />
        </Flex>
      </template>
      <template #value>
        The highlighted element has a <code class="inline-code">flex: 1</code> applied to it. This makes the element grow to fill available space in a flex container.
      </template>
    </TokenItem>

    <p>When needed, you can use the `no-shrink` class to prevent an element from shrinking in a flex container.</p>
  </div>
</template>

<style scoped lang="scss">
.flex-indicator {
  height: 8px;
  min-width: 24px;
  background-color: var(--color-border-strong);
  border-radius: 999px;

  &.flex-1 {
    background-color: var(--color-accent);
  }
}

.inline-code {
  font-size: var(--font-size-xxs);
  padding: 1px 2px;
  min-height: unset;
}
</style>
