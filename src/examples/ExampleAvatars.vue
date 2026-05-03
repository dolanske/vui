<script setup lang='ts'>
import Avatar from '../components/Avatar/Avatar.vue'
import AvatarGroup from '../components/Avatar/AvatarGroup.vue'
import Flex from '../components/Flex/Flex.vue'

const variants = ['s', 'm', 'l', 96] as const
const radius = ['xs', 's', 'm', 'l', 48] as const

const avatars = [
  {
    name: 'dolanske',
    url: 'https://github.com/dolanske.png',
  },
  {
    name: 'Jokler',
    url: 'https://github.com/Jokler.png',
  },
  {
    name: 'zealsprince',
    url: 'https://github.com/zealsprince.png',
  },
  {
    name: 'kilmanio',
    url: 'https://github.com/kilmanio.png',
  },
]
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
        <tr>
          <th>Radius</th>
          <td>
            <Flex>
              <Avatar v-for="r in radius" :key="r" :radius="r" size="l">
                AB
              </Avatar>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Avatar Group</th>
          <td>
            <AvatarGroup>
              <Avatar v-for="avatar in avatars" :key="avatar.name" :url="avatar.url" />
            </AvatarGroup>
          </td>
        </tr>
        <tr>
          <th>Avatar Group cluster + limit</th>
          <td>
            <AvatarGroup :limit="2" limit-size="m" cluster>
              <a v-for="avatar in avatars" :key="avatar.name" href="https://google.com">
                <Avatar size="m" :url="avatar.url" />
              </a>
            </AvatarGroup>
          </td>
        </tr>
        <tr>
          <th>Avatar Group cluster + limit</th>
          <td>
            <AvatarGroup :limit="2" limit-size="m" cluster column>
              <a v-for="avatar in avatars" :key="avatar.name" href="https://google.com">
                <Avatar size="m" :url="avatar.url" />
              </a>
            </AvatarGroup>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
