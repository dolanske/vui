<script setup lang='ts'>
import type { ViewNode } from '../components/ResizableView/resizableView'
import { shallowRef } from 'vue'
import Button from '../components/Button/Button.vue'
import Flex from '../components/Flex/Flex.vue'
import ResizableView from '../components/ResizableView/ResizableView.vue'

function createLayout(): ViewNode[] {
  return [
    { tabs: [{ path: 'index.ts' }, { path: 'App.vue' }, { path: 'main.scss', label: 'Styles' }] },
    [
      { tabs: [{ path: 'README.md' }] },
      [
        { tabs: [{ path: 'package.json' }] },
        { tabs: [{ path: 'tsconfig.json' }, { path: 'vite.config.ts' }] },
      ],
    ],
  ]
}

const views = shallowRef<ViewNode[]>(createLayout())
const single = shallowRef<ViewNode[]>([{ tabs: [{ path: 'only-file.ts' }] }])
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Resizable view
    </h3>
    <p class="mb-m">
      Drag tabs between panels, onto panel edges to split or onto the center to move. With a focused tab, use Alt + Arrow to reorder and Alt + Shift + Arrow to split.
    </p>

    <Flex gap="s" class="mb-m">
      <Button size="s" @click="views = createLayout()">
        Reset layout
      </Button>
    </Flex>

    <ResizableView v-model="views" style="--vui-resizable-view-height: 480px">
      <template #tab="{ tab, panel }">
        <div class="p-m">
          <strong>{{ tab?.label ?? tab?.path }}</strong>
          <p class="text-color-light">
            Panel {{ panel.id }}
          </p>
        </div>
      </template>
    </ResizableView>

    <h4 class="mt-xl mb-m">
      Model
    </h4>
    <pre class="model">{{ JSON.stringify(views, null, 2) }}</pre>

    <h4 class="mt-xl mb-m">
      Single panel
    </h4>
    <ResizableView v-model="single" style="--vui-resizable-view-height: 200px">
      <template #tab="{ tab }">
        <div class="p-m">
          {{ tab?.path }}
        </div>
      </template>
    </ResizableView>
  </div>
</template>

<style scoped>
.model {
  max-height: 240px;
  overflow: auto;
  font-size: var(--font-size-xs);
}
</style>
