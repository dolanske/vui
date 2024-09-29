<script setup lang="ts">
import { ref } from 'vue'
import Badge from './components/Badge/Badge.vue'
import Button from './components/Button/Button.vue'
import Card from './components/Card/Card.vue'
import Checkbox from './components/Checkbox/Checkbox.vue'
import Divider from './components/Divider/Divider.vue'
import Flex from './components/Flex/Flex.vue'
import Input from './components/Input/Input.vue'
import Switch from './components/Switch/Switch.vue'
import Tab from './components/Tabs/Tab.vue'
import Tabs from './components/Tabs/Tabs.vue'
import { pushToast, removeToast } from './components/Toast/toast'
import Toasts from './components/Toast/Toasts.vue'

const checked1 = ref(false)
const checked2 = ref(false)
const input1 = ref('')
const tab = ref('home')
</script>

<template>
  <div>
    <Tabs v-model="tab">
      <Tab id="home" label="Home" icon="ph:house" />
      <Tab id="components" label="Components" />
      <Tab id="about" label="About" />
    </Tabs>
    <br>
    <br>
    <br>

    <Flex>
      <Badge>Neutral</Badge>
      <Badge variant="info">
        Info
      </Badge>
      <Badge variant="success">
        Success
      </Badge>
      <Badge variant="warning">
        Warning
      </Badge>
      <Badge variant="danger">
        Danger
      </Badge>
      <Badge outline>
        Neutral
      </Badge>
      <Badge filled>
        Neutral
      </Badge>
      <Badge filled variant="info">
        Info
      </Badge>
      <Badge filled variant="success">
        Success
      </Badge>
      <Badge filled variant="warning">
        Warning
      </Badge>
      <Badge filled variant="danger">
        Danger
      </Badge>
    </Flex>

    <br>
    <br>
    <br>

    <Card>
      <template #header>
        <h1 style="font-size: 32px">
          Hello world
        </h1>
        <p>I bring some good stuff</p>
      </template>
      <template #header-end>
        <Button square icon="ph:x" />
      </template>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores vero, eius molestiae voluptate veniam nesciunt cupiditate? Impedit tempora quae, asperiores assumenda modi qui in aliquam tenetur? Minus assumenda quam vel.</p>
      <template #footer>
        <Button>Save</Button>
      </template>
    </Card>

    <br>
    <br>
    <br>
    <Flex>
      <Button>Hello</Button>
      <Button variant="danger">
        Hello
      </Button>
      <Button variant="success">
        Hello
      </Button>
      <Button plain>
        Hello
      </Button>
      <Button disabled>
        Hello
      </Button>
      <Button icon="solar:alt-arrow-right-linear" />
    </Flex>
    <Divider />
    <Checkbox v-model="checked1" label="I hereby surrender my human rights" />
    <Divider />
    <Switch v-model="checked2" label="I hereby turn my airplane mode on." />
    <Divider />
    <Input v-model="input1" expand label="Your name" hint="Like what did your mommy call you?" limit="50" />
    <Divider />
    <!-- <Flex>
      <Spinner size="s" />
      <Spinner size="m" />
      <Spinner size="l" />
      </Flex> -->
    <Button
      @click="pushToast('Created new event', {
        description: `Event will happen at ${new Date().toISOString()}`,
        persist: true,
        action: {
          label: 'Ok',
          onClick(toastId) {
            removeToast(toastId)
          },
        },
      })"
    >
      Push Toast
    </Button>
    <Toasts />
  </div>
</template>
