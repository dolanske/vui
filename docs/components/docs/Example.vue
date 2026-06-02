<script setup lang="ts">
import { Tab, Tabs } from '@dolanske/vui'

const props = defineProps<{
  full?: boolean
  sourcePath?: string
}>()

defineSlots<{
  component: () => VNode
  code: () => VNode
}>()

const tab = ref('Preview')
</script>

<template>
  <div class="mt-l example-root">
    <Tabs v-model="tab" class="mb-m">
      <Tab value="Preview">
        Preview
      </Tab>
      <Tab value="Code">
        Code
      </Tab>

      <template #end>
        <Button v-if="props.sourcePath" outline size="s" :href="`https://github.com/dolanske/vui/blob/main/src/components/${props.sourcePath}`" target="_blank" rel="noopener noreferrer">
          <template #start>
            <Icon name="ph:code" />
          </template>
          Source
        </Button>
      </template>
    </Tabs>
    <div v-if="tab === 'Preview'" class="example-component" :class="{ full: props.full }">
      <slot name="component" />
    </div>
    <div v-else-if="tab === 'Code'" class="example-code">
      <slot name="code" />
    </div>
  </div>
</template>

<style lang="scss">
.example-root {
  position: relative;
  // overflow: hidden;

  .vui-sidebar-layout {
    overflow: hidden;
    border-radius: var(--border-radius-m);
  }
}

.example-component,
.example-code {
  border: 1px solid var(--color-border-weak);
  background-color: var(--color-bg-lowered);
  border-radius: var(--border-radius-m);
}

.example-code pre {
  margin-top: 0 !important;
  border: none;
}

.example-component.full {
  padding: 0;
  // overflow: hidden;
}

.example-component {
  padding: var(--space-xxl) 128px;

  p {
    margin-top: 0 !important;
  }
}

@media screen and (max-width: 768px) {
  .example-component {
    padding: var(--space-m);
  }
}
</style>
