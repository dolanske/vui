<script setup lang="ts">
import TokenItem from '~/components/docs/TokenItem.vue'
import { containerClasses, displayClasses, flexClasses, heightClasses, widthClasses } from '~/utils/constants'
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
        <span class="text-xl"> {{ item.value }}</span>
      </template>
    </TokenItem>

    <blockquote class="mb-xl">
      <strong>Note:</strong> The <code>.container</code> class is required to make other container sizes work.
    </blockquote>

    <h2 class="mb-l">
      Width
    </h2>
    <p class="mb-xl">
      Width utility classes control element width using percentage values. These classes are generated in increments of 5% from 10% to 100%, plus some additional utility classes.
    </p>
    <p class="mb-xl">
      <strong>Pattern:</strong> <code>.w-{percentage}</code> where percentage ranges from 10 to 100 in increments of 5.
    </p>

    <TokenItem
      v-for="item in widthClasses"
      :key="item.className"
      :name="item.name"
      :class-name="item.className"
    >
      <template #indicator>
        <div class="size-indicator-wrap updated-horizontal-indicator">
          <div class="size-indicator" :style="{ width: item.value }" />
        </div>
      </template>
    </TokenItem>

    <h2 class="mb-l">
      Height
    </h2>
    <p class="mb-xl">
      Height utility classes control element height using percentage values. These classes follow the same pattern as width classes, generated in increments of 5% from 10% to 100%.
    </p>
    <p class="mb-xl">
      <strong>Pattern:</strong> <code>.h-{percentage}</code> where percentage ranges from 10 to 100 in increments of 5.
    </p>

    <TokenItem
      v-for="item in heightClasses"
      :key="item.className"
      :name="item.name"
      :class-name="item.className"
    >
      <template #indicator>
        <div class="size-indicator-wrap updated-vertical-indicator">
          <div class="size-indicator" :style="{ height: item.value }" />
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
    >
      <template #indicator>
        <div class="display-indicator">
          <Icon name="ph:squares-four" size="18" />
        </div>
      </template>
      <template #value>
        display: {{ item.value }}
      </template>
    </TokenItem>

    <h2 class="mb-l">
      Flex
    </h2>
    <p class="mb-xl">
      Classes for flexbox layout control. The intended use of this class is to stretch an element inside a flexbox to fill the available space.
    </p>

    <TokenItem
      v-for="item in flexClasses"
      :key="item.className"
      :name="item.name"
      :class-name="item.className"
    >
      <template #indicator>
        <div class="flex-indicator">
          <Icon name="ph:arrows-out-line-horizontal" size="18" />
        </div>
      </template>
      <template #value>
        {{ item.property }}
      </template>
    </TokenItem>
  </div>
</template>

<style scoped lang="scss">
.updated-vertical-indicator,
.updated-horizontal-indicator {
  width: 100%;
  height: 32px;
  padding-inline: var(--space-xs);
  background-color: var(--color-bg-medium);
  border-radius: var(--border-radius-s);

  .size-indicator {
    border-color: var(--color-accent);

    &::before,
    &:after {
      background-color: var(--color-accent);
    }
  }
}

.updated-vertical-indicator {
  justify-content: center;
  width: 48px;
  height: 56px;
  align-items: flex-end;
  padding-block: var(--space-xs);

  .size-indicator {
    width: 1px;
    border-bottom: unset;
    border-right: 1px solid var(--color-accent);

    &::before,
    &:after {
      top: 0;
      width: 12px;
      height: 1px;
      left: 50%;
      transform: translateX(-50%);
    }

    &:after {
      top: unset;
      bottom: 0;
    }
  }
}

.flex-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  background: var(--color-bg-medium);
  border-radius: 4px;
  color: var(--color-text-light);
}
</style>
