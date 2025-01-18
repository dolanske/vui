<script setup lang='ts'>
import Avatar from '../components/Avatar/Avatar.vue'
import Flex from '../components/Flex/Flex.vue'

const variants = ['s', 'm', 'l', 80] as const
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Avatars
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Base S, M, L  <br> + custom size</th>
          <td>
            <Flex>
              <Avatar v-for="size in variants" :key="size" :size />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Photo</th>
          <td>
            <Flex>
              <Avatar v-for="size in variants" :key="size" :size url="https://i.imgur.com/bHWgZfD.jpeg" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Abbreviation</th>
          <td>
            <Flex>
              <Avatar v-for="size in variants" :key="size" :size>
                AB
              </Avatar>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
