<script setup lang='ts'>
import Flex from '../components/Flex/Flex.vue'
import Skeleton from '../components/Skeleton/Skeleton.vue'
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Skeletons
    </h3>
    <table>
      <tbody>
        <tr>
          <th>No defaults <br> Width, height, roundness must be specified</th>
          <td>
            <Flex gap="s">
              <Skeleton :width="80" :height="48" :radius="8" />
              <Skeleton :width="48" :height="48" :radius="8" />
              <Skeleton :width="48" :height="48" :radius="32" />
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
