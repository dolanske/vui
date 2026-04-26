<script setup lang="ts">
import { Flex } from '@dolanske/vui'

const sizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'] as const
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex gap="l" column>
        <Flex v-for="size in sizes" :key="size" expand :gap="size" y-center>
          <div v-for="key in 3" :key class="example flex-1">
            {{ size.toUpperCase() }}
          </div>
        </Flex>

        <Flex center gap="m" expand>
          <div class="example center-chip">
            CENTER
          </div>
          <div class="example center-chip">
            BOTH AXES
          </div>
        </Flex>

        <table>
          <tbody>
            <tr>
              <th>Shorthand</th>
              <td>
                <Flex>
                  <code>center</code>
                </Flex>
              </td>
            </tr>
            <tr>
              <th>Cross axis</th>
              <td>
                <Flex>
                  <code>y-start</code><code>y-end</code><code>y-center</code><code>y-baseline</code><code>y-stretch</code>
                </Flex>
              </td>
            </tr>
          </tbody>
        </table>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style scoped>
.example {
  display: block;
  width: 100%;
  height: 24px;
  line-height: 24px;
  border-radius: var(--border-radius-m);
  background-color: var(--color-border);
  text-align: center;
}

.center-chip {
  max-width: 160px;
}
</style>
