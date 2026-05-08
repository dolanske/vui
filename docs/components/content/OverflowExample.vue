<script setup lang="ts">
import { Avatar, Card, Flex, Overflow } from '@dolanske/vui'

const avatars = [
  { name: 'dolanske', url: 'https://github.com/dolanske.png' },
  { name: 'Jokler', url: 'https://github.com/Jokler.png' },
  { name: 'zealsprince', url: 'https://github.com/zealsprince.png' },
  { name: 'kilmanio', url: 'https://github.com/kilmanio.png' },
]
</script>

<template>
  <DocsExample>
    <template #component>
      <Card :padding="false">
        <Overflow class="p-m" hide-scrollbar>
          <div style="height:200px">
            <Card v-for="item in avatars" :key="item.name" class="p-s mb-m">
              <Flex y-center>
                <Avatar :url="item.url" />
                <strong class="text-l">{{ item.name }}</strong>
              </Flex>
            </Card>
          </div>
        </Overflow>
      </Card>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
