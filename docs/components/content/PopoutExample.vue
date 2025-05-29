<script setup lang="ts">
import { Button, Popout } from '@dolanske/vui'
import { ref } from 'vue'

const isVisible = ref(false)
const isRightVisible = ref(false)
const isOffsetVisible = ref(false)
const isComplexVisible = ref(false)

const anchorRef = ref(null)
const rightAnchorRef = ref(null)
const offsetAnchorRef = ref(null)
const complexAnchorRef = ref(null)
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-md">
        <!-- Basic popout -->
        <div>
          <h3 class="mb-sm">
            Basic Popout
          </h3>
          <div ref="anchorRef">
            <Button @click="isVisible = !isVisible">
              Toggle Popout
            </Button>
          </div>

          <Popout
            :anchor="anchorRef"
            :visible="isVisible"
            @click-outside="isVisible = false"
          >
            <div class="p-md bg-white shadow-lg rounded">
              Basic popout content
            </div>
          </Popout>
        </div>

        <!-- Custom placement -->
        <div>
          <h3 class="mb-sm">
            Custom Placement
          </h3>
          <div ref="rightAnchorRef">
            <Button @click="isRightVisible = !isRightVisible">
              Toggle Right Popout
            </Button>
          </div>

          <Popout
            :anchor="rightAnchorRef"
            :visible="isRightVisible"
            placement="right"
            @click-outside="isRightVisible = false"
          >
            <div class="p-md bg-white shadow-lg rounded">
              Popout on the right
            </div>
          </Popout>
        </div>

        <!-- Custom offset -->
        <div>
          <h3 class="mb-sm">
            Custom Offset
          </h3>
          <div ref="offsetAnchorRef">
            <Button @click="isOffsetVisible = !isOffsetVisible">
              Toggle Offset Popout
            </Button>
          </div>

          <Popout
            :anchor="offsetAnchorRef"
            :visible="isOffsetVisible"
            :offset="16"
            @click-outside="isOffsetVisible = false"
          >
            <div class="p-md bg-white shadow-lg rounded">
              Popout with larger offset
            </div>
          </Popout>
        </div>

        <!-- Complex content -->
        <div>
          <h3 class="mb-sm">
            Complex Content
          </h3>
          <div ref="complexAnchorRef">
            <Button @click="isComplexVisible = !isComplexVisible">
              Toggle Complex Popout
            </Button>
          </div>

          <Popout
            :anchor="complexAnchorRef"
            :visible="isComplexVisible"
            @click-outside="isComplexVisible = false"
          >
            <div class="p-md bg-white shadow-lg rounded">
              <h3 class="text-lg font-semibold mb-sm">
                Popout Title
              </h3>
              <p class="text-gray-600">
                This is a more complex popout with multiple elements.
              </p>
              <div class="mt-md flex justify-end">
                <Button @click="isComplexVisible = false">
                  Close
                </Button>
              </div>
            </div>
          </Popout>
        </div>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
