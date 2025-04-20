<script setup lang="ts">
import { ref } from 'vue'
import Flex from '../components/Flex/Flex.vue'
import Grid from '../components/Grid/Grid.vue'

const cols = ref(3)
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Layouts
    </h3>

    <h6 class="block mb-m">
      Flex
    </h6>

    <table class="mb-l">
      <tbody>
        <tr>
          <th>Flex + gaps <br> (gap can either be set as a size or a number)</th>
          <td class="w-85">
            <Flex gap="l" column>
              <Flex v-for="size in ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'] as const" :key="size" expand :gap="size">
                <div v-for="key in 3" :key class="example flex-1">
                  {{ size.toUpperCase() }}
                </div>
              </Flex>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>

    <p class="mb-s">
      All of the following props are boolean props
    </p>

    <table class="mb-xl">
      <tbody>
        <tr>
          <th>Display props</th>
          <td>
            <Flex>
              <code>inline</code><code>wrap</code><code>wrap-reverse</code><code>expand</code>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Flow props</th>
          <td>
            <Flex>
              <code>row</code><code>column</code><code>row-reverse</code><code>column-reverse</code>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Justify props</th>
          <td>
            <Flex>
              <code>justify-start</code><code>justify-end</code><code>justify-center</code>
              <code>space-between</code><code>space-around</code><code>space-evenly</code>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Align props</th>
          <td>
            <Flex>
              <code>align-start</code><code>align-end</code><code>align-center</code>
              <code>align-baseline</code>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>

    <h6 class="block mb-m">
      Grid
    </h6>

    <p class="mb-s">
      This grid utility is mostly meant for simple grid layouts. For anything mroe complicated, write your layouts in CSS. It supports setting <code>rows</code> or <code>columns</code> prop with a number or a string (the same way you'd write the CSS properties)
    </p>

    <p class="mb-s">
      You can also set the `inlin` boolean prop and the `gap` prop which is a size prop or a number
    </p>

    <table>
      <tbody>
        <tr>
          <th>
            Base
            <select v-model="cols" class="mt-s block">
              <option v-for="key in 5" :key :value="key + 1">
                Cols: {{ key + 1 }}
              </option>
            </select>
          </th>
          <td class="w-85">
            <Grid :columns="cols" gap="l">
              <div v-for="key in 9" :key class="example">
                {{ key }}
              </div>
            </Grid>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.example {
  display: block;
  width: 100%;
  height: 24px;
  border-radius: var(--border-radius-m);
  background-color: var(--color-border);
  text-align: center;
}
</style>
