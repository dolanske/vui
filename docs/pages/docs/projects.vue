<script setup lang="ts">
import { Card } from '@dolanske/vui'

const projects = [
  {
    title: 'Hivecom',
    description: 'Community hub for my online friends',
    url: 'https://dev.hivecom.net/',
  },
  {
    title: 'VUI docs',
    description: 'This documentation website was fully created using the library.',
    url: '/',
  },
] as const
</script>

<template>
  <div>
    <h1>Projects using VUI</h1>
    <ul>
      <li v-for="project in projects" :key="project.url">
        <Card>
          <article>
            <h3>{{ project.title }}</h3>
          </article>
        </Card>
      </li>
      <li>Hivecom net</li>
      <li>VUI documentation</li>
    </ul>
  </div>
</template>
