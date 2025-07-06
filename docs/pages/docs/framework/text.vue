<script setup lang="ts">
import TokenItem from '~/components/docs/TokenItem.vue'
import { fontSizeClasses } from '~/utils/constants'

const textAlignmentClasses = [
  {
    name: 'Left alignment',
    className: 'text-left',
    indicatorStyle: { textAlign: 'left' },
  },
  {
    name: 'Center alignment',
    className: 'text-center',
    indicatorStyle: { textAlign: 'center' },
  },
  {
    name: 'Right alignment',
    className: 'text-right',
    indicatorStyle: { textAlign: 'right' },
  },
]
</script>

<template>
  <div>
    <h1>Text</h1>
    <p>VUI provides utility text classes for quick styling. Use these sparingly when creating dedicated CSS classes would be overkill.</p>
    <p>
      Text classes are automatically generated from <NuxtLink to="/docs/tokens/text">
        CSS design tokens
      </NuxtLink>, so token updates automatically propagate to all utility classes.
    </p>

    <h2 class="mb-xl">
      Text size
    </h2>
    <TokenItem
      v-for="item in fontSizeClasses"
      v-bind="{ ...item }"
      :key="item.token"
    />

    <h2 class="mb-xl">
      Font weight
    </h2>

    <TokenItem
      v-for="item in fontWeightClasses"
      v-bind="{ ...item }"
      :key="item.token"
      :indicator-style="{ fontWeight: item.weight, fontSize: '1.8rem' }"
    >
      <template #text>
        Red fox
      </template>
      <template #value>
        {{ item.weight }}
      </template>
    </TokenItem>

    <h2>
      Text utilities
    </h2>

    <p>
      Text utilities are useful when composing simple UI with components only and no dedicated CSS classes.
    </p>

    <h4 class="mb-xl">
      Alignment
    </h4>

    <TokenItem
      v-for="item in textAlignmentClasses"
      :key="item.name"
      :name="item.name"
      :class-name="item.className"
      :indicator-style="{
        ...item.indicatorStyle,
        width: '100%',
        display: 'block',
        padding: '0 var(--space-m)',
        borderLeft: '1px solid var(--color-border-strong)',
        borderRight: '1px solid var(--color-border-strong)',
      }"
    >
      <template #text>
        Hello bro
      </template>
    </TokenItem>

    <h4>
      Truncation
    </h4>

    <p class="mb-xl">
      Use the <code>.text-overflow-#</code> classes to truncate text. Vui supports up to 10 lines of truncation.
    </p>

    <TokenItem
      name="Two line truncation"
      class-name="text-overflow-2"
      indicator-class-name="text-overflow-2"
    >
      <template #text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore magni itaque impedit quas facilis dolorum quo ab earum, praesentium non rem ipsa ullam autem consequatur. Nihil, tempora. Nam, adipisci fugit.
      </template>
      <template #value>
        .text-overflow-2
      </template>
    </TokenItem>

    <TokenItem
      name="Five line truncation"
      class-name="text-overflow-5"
      indicator-class-name="text-overflow-5"
    >
      <template #text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore magni itaque impedit quas facilis dolorum quo ab earum, praesentium non rem ipsa ullam autem consequatur. Nihil, tempora. Nam, adipisci fugit.
      </template>
      <template #value>
        .text-overflow-5
      </template>
    </TokenItem>

    <h4>White space</h4>

    <p class="mb-xl">
      Use the <code>.ws-wrap</code>, <code>.ws-pre</code>, <code>.ws-prewrap</code>, and <code>.ws-nowrap</code> classes to control how text wraps and displays.
    </p>
  </div>
</template>
