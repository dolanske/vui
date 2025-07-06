<script setup lang="ts">
import TokenItem from '~/components/docs/TokenItem.vue'
import { autoMarginClasses, marginClasses, paddingClasses, spaceClasses } from '~/utils/constants'

// Add size '0' to the available sizes since it's mentioned in the documentation
const availableSizes = [
  { name: 'No spacing', className: '0', size: '0px' },
  ...spaceClasses.map(item => ({
    name: item.name,
    className: item.className.replace('space-', ''),
    size: item.size,
  })),
]

// Function to copy to clipboard
function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}

// Function to replace {size} with actual size
function replaceSize(className: string, size: string) {
  return className.replace('{size}', size)
}
</script>

<template>
  <div>
    <h1>Spacing</h1>

    <p class="mb-xl">
      VUI provides a comprehensive set of spacing utility classes that create consistent spacing throughout your application. These utilities use predefined design tokens to ensure visual harmony and consistent layout spacing across all components and pages.
    </p>

    <h2>
      Spacing Values
    </h2>

    <p class="mb-xl">
      The spacing system includes utilities for margins, padding, and automatic margin alignment. All spacing values are defined as CSS custom properties and are responsive on mobile devices.
    </p>

    <TokenItem
      v-for="item in spaceClasses"
      :key="item.className"
      :name="item.name"
      :class-name="item.className" :copyable="false"
    >
      <template #indicator>
        <div class="size-indicator-wrap">
          <div class="size-indicator" :style="{ width: item.size }" />
          <span>{{ item.size }}</span>
        </div>
      </template>
    </TokenItem>

    <blockquote class="mb-xl">
      <strong>Note:</strong> On mobile devices (screens ≤ 572px), some spacing values are automatically reduced to optimize for smaller screens.
    </blockquote>

    <h2 class="mb-l">
      Auto margin
    </h2>
    <p class="mb-xl">
      Classes for automatic margin alignment.
    </p>

    <TokenItem
      v-for="item in autoMarginClasses"
      :key="item.className"
      :name="item.name" :class-name="item.className"
      :indicator-class-name="`block ${item.className}`"
      :indicator-style="{ width: 'fit-content' }"
    >
      <template #value>
        {{ item.property }}
      </template>
    </TokenItem>

    <h2 class="mb-l">
      Margin
    </h2>
    <p class="mb-xl">
      Margin utility classes using the spacing tokens. Available sizes: <code>0</code>, <code>xxs</code>, <code>xs</code>, <code>s</code>, <code>m</code>, <code>l</code>, <code>xl</code>, <code>xxl</code>, <code>xxxl</code>.
    </p>

    <TokenItem
      v-for="item in marginClasses"
      :key="item.className"
      :name="item.name" :class-name="item.className"
    >
      <template #indicator>
        <Icon :name="item.icon" size="18" />
      </template>
      <template #value>
        {{ item.property }}
      </template>
      <template #actions>
        <Dropdown :max-height="512">
          <template #trigger="{ toggle }">
            <Button plain expand @click="toggle">
              <template #start>
                <Badge>
                  .{{ item.className }}
                </Badge>
              </template>
              <template #end>
                <Icon name="ph:caret-down" size="18" />
              </template>
            </Button>
          </template>
          <template #default="{ toggle }">
            <DropdownItem
              v-for="size in availableSizes"
              :key="size.className"
              @click="() => {
                copyToClipboard(replaceSize(item.className, size.className))
                toggle()
              }"
            >
              .{{ replaceSize(item.className, size.className) }}
              <template #hint>
                {{ size.size }}
              </template>
            </DropdownItem>
          </template>
        </Dropdown>
      </template>
    </TokenItem>

    <h2 class="mb-l">
      Padding
    </h2>
    <p class="mb-xl">
      Padding utility classes using the spacing tokens. Available sizes: <code>0</code>, <code>xxs</code>, <code>xs</code>, <code>s</code>, <code>m</code>, <code>l</code>, <code>xl</code>, <code>xxl</code>, <code>xxxl</code>.
    </p>

    <TokenItem
      v-for="item in paddingClasses"
      :key="item.className"
      :name="item.name" :class-name="item.className"
    >
      <template #indicator>
        <Icon :name="item.icon" size="18" />
      </template>
      <template #value>
        {{ item.property }}
      </template>
      <template #actions>
        <Dropdown :max-height="512">
          <template #trigger="{ toggle }">
            <Button plain expand @click="toggle">
              <template #start>
                <Badge>
                  .{{ item.className }}
                </Badge>
              </template>
              <template #end>
                <Icon name="ph:caret-down" size="18" />
              </template>
            </Button>
          </template>
          <template #default="{ toggle }">
            <DropdownItem
              v-for="size in availableSizes"
              :key="size.className"
              @click="() => {
                copyToClipboard(replaceSize(item.className, size.className))
                toggle()
              }"
            >
              .{{ replaceSize(item.className, size.className) }}
              <template #hint>
                {{ size.size }}
              </template>
            </DropdownItem>
          </template>
        </Dropdown>
      </template>
    </TokenItem>
  </div>
</template>
