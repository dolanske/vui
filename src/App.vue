<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import Alert from './components/Alert/Alert.vue'
import Avatar from './components/Avatar/Avatar.vue'
import Badge from './components/Badge/Badge.vue'
import Button from './components/Button/Button.vue'
import Card from './components/Card/Card.vue'
import Checkbox from './components/Checkbox/Checkbox.vue'
import Divider from './components/Divider/Divider.vue'
import Flex from './components/Flex/Flex.vue'
import Input from './components/Input/Input.vue'
import Modal from './components/Modal/Modal.vue'
import Sheet from './components/Sheet/Sheet.vue'
import Switch from './components/Switch/Switch.vue'
import Tab from './components/Tabs/Tab.vue'
import Tabs from './components/Tabs/Tabs.vue'
import { pushToast, removeToast } from './components/Toast/toast'
import Toasts from './components/Toast/Toasts.vue'

const checked1 = ref(false)
const checked2 = ref(false)
const input1 = ref('')
const tab = ref('home')
const modal = ref(false)
const sheet = ref(false)
</script>

<template>
  <div>
    <Tabs v-model="tab">
      <Tab id="home" label="Home" icon="ph:house" />
      <Tab id="components" label="Components" />
      <Tab id="about" label="About" />
    </Tabs>
    <br>
    <Tabs v-model="tab" expand>
      <Tab id="home" label="Home" icon="ph:house" />
      <Tab id="components" label="Components" />
      <Tab id="about" label="About" />
    </Tabs>
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
    <Alert title="We chilling" description="This just kinda looks like card with an icon bro we smokin">
      <template #end>
        <Button square plain icon="ph:x" />
      </template>
    </Alert>
    <br>
    <Alert variant="info" title="Hello world" description="This is your new profile page" />
    <br>
    <Alert variant="success" title="Sucess!!" description="Update your profile to the latest data or something" />
    <br>
    <Alert variant="warning" title="This action has consequences" description="Your account will be affected by this action." />
    <br>
    <Alert variant="danger" title="Are you sure?" description="This will delete all your saved data" />
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
    <Divider />
    <Flex>
      <Avatar url="https://i.imgur.com/xTbZ8nd.png" size="s" />
      <Avatar url="https://i.imgur.com/xTbZ8nd.png" size="m" />
      <Avatar url="https://i.imgur.com/xTbZ8nd.png" size="l" />
      <Divider :size="48" vertical>
        <Avatar size="s" icon="ph:arrow-right" />
      </Divider>
      <Avatar url="https://i.imgur.com/xTbZ8nd____.png" size="s" fallback="HD" />
      <Avatar url="https://i.imgur.com/xTbZ8nd____.png" size="m" fallback="HD" />
      <Avatar url="https://i.imgur.com/xTbZ8nd____.png" size="l" fallback="HD" />
      <Divider :size="48" vertical>
        <Avatar size="s" icon="ph:arrow-right" />
      </Divider>
      <Avatar size="s" />
      <Avatar size="m" />
      <Avatar size="l" />
    </Flex>

    <Divider />

    <Button @click="modal = true">
      Open modal
    </Button>
    <Modal v-model="modal" :card="{ headerSeparator: true }" scrollable>
      <template #header>
        <h1 style="font-size: 3rem; font-weight: 600;">
          Confirm
        </h1>
      </template>
      Confirm you are kinda done Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque odit, recusandae possimus eveniet architecto corporis natus eligendi incidunt quas, blanditiis nemo, dolor alias! Maiores rerum perferendis consequatur impedit. Ipsa, explicabo?
      <!-- <div style="height: 80vh;" /> -->
      <!-- Nullam nec pulvinar justo. Curabitur ante dui, tristique eget viverra vitae, pretium nec mi. Integer in nibh faucibus, sollicitudin turpis id, condimentum risus. Aliquam sit amet elementum orci. Integer nisl tellus, venenatis vitae molestie a, laoreet at sem. Vivamus malesuada dolor purus, vitae sollicitudin lacus fringilla at. Sed egestas urna vulputate mauris pulvinar congue. Aliquam aliquet facilisis tortor, sit amet hendrerit ante. Cras pulvinar, magna eget viverra facilisis, velit erat efficitur dui, non pellentesque ipsum sem in ipsum. Morbi eleifend orci lacus, ut porttitor leo blandit nec. Vivamus condimentum nisl at sodales aliquam. In elementum laoreet enim, nec sagittis nisi malesuada id. Nulla interdum cursus quam, eget ultricies sem fringilla vel. -->
      <template #footer="{ close }">
        <Flex justify-end>
          <Button @click="close">
            Cancel
          </Button>
          <Button variant="danger">
            Delete
          </Button>
        </Flex>
      </template>
    </Modal>
    <Divider />

    <Button @click="sheet = true">
      Open sheet
    </Button>
    <Sheet v-model="sheet" separator position="right" size="512px">
      <template #header>
        <h1 style="font-size: 3rem; font-weight: 600;">
          Edit user
        </h1>
      </template>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab dolorum debitis beatae, accusantium natus provident ullam fugiat magnam delectus illum reprehenderit error reiciendis similique tenetur minima incidunt at iste exercitationem?</p>
      <!-- <div style="height: 80vh;" /> -->
      <!-- <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab dolorum debitis beatae, accusantium natus provident ullam fugiat magnam delectus illum reprehenderit error reiciendis similique tenetur minima incidunt at iste exercitationem?</p> -->
    </Sheet>
  </div>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
</template>
