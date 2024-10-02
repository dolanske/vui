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
import Radio from './components/Radio/Radio.vue'
import RadioGroup from './components/Radio/RadioGroup.vue'
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
const radioModel = ref('Andrew')
const radioOptions = ['Kasper', 'Andrew', 'Jan', 'Felix']
</script>

<template>
  <div>
    <Tabs v-model="tab">
      <Tab id="home" label="Home" icon="ph:house" />
      <Tab id="components" label="Components" />
      <Tab id="typography" label="Typography" />
    </Tabs>
    <br>
    <div v-if="tab === 'home'">
      Welcome to VUI
    </div>
    <div v-if="tab === 'components'">
      <Tabs v-model="tab" expand>
        <Tab id="home" label="Home" icon="ph:house" />
        <Tab id="components" label="Components" />
        <Tab id="typography" label="Typography" />
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
      <Divider />

      <Flex align-center>
        <RadioGroup v-model="radioModel" :gap="32">
          <Radio v-for="item of radioOptions" :key="item" :disabled="item === 'Jan'" :value="item" />
        </RadioGroup>
        <Divider vertical />

        {{ radioModel }}
      </Flex>
      <br>
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
          <h3>
            Hello world
          </h3>
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
      <Checkbox v-model="checked1" label="I hereby surrender my human rights" disabled />
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
      <Modal v-model="modal" :card="{ headerSeparator: true }" scrollable centered>
        <template #header>
          <h1 style="font-size: 3rem; font-weight: 600;">
            Confirm
          </h1>
        </template>
        <p>Confirm you are kinda done Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque odit, recusandae possimus eveniet architecto corporis natus eligendi incidunt quas, blanditiis nemo, dolor alias! Maiores rerum perferendis consequatur impedit. Ipsa, explicabo?</p>
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
      <Sheet v-model="sheet" separator position="right">
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
    <div v-else-if="tab === 'typography'" class="article" :style="{ maxWidth: '688px', margin: 'auto', paddingTop: '64px' }">
      <h1>The Joke Tax Chronicles</h1>
      <p>Once upon a time, in a far-off land, there <code>was a very lazy</code> king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money</p>
      <h2>The King's Plan</h2>
      <p>The king thought long and hard, and finally came up with <a href="#">a brilliant plan</a>: he would tax the jokes in the kingdom.</p>
      <blockquote>"After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."</blockquote>
      <h3>The Joke Tax</h3>
      <p>The king's subjects were not amused. They grumbled and complained, but the king was firm:</p>
      <ul class="ul">
        <li>
          I am an item
          <ul>
            <li>1st level of puns: 5 gold coins</li>
            <li>2nd level of jokes: 10 gold coins</li>
            <li>
              3rd level of one-liners : 20 gold coins
              <ul>
                <li>1st level of puns: 5 gold coins</li>
                <li>2nd level of jokes: 10 gold coins</li>
                <li>3rd level of one-liners : 20 gold coins</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>2nd level of jokes: 10 gold coins</li>
        <li>3rd level of one-liners : 20 gold coins</li>
      </ul>
      <p>As a result, people stopped telling jokes, and the kingdom fell into a gloom. But there was one person who refused to let the king's foolishness get him down: a court jester named Jokester.</p>

      <figure>
        <img src="https://i.imgur.com/6WQYrfN.jpeg" alt="">
        <figcaption>Woah look at these mountains</figcaption>
      </figure>

      <h3>Jokester's Revolt</h3>
      <p>Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester.</p>
      <hr>
      <p>And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop.</p>
      <ol>
        <li>But the kind was stupid</li>
        <li>He was ratioed 5 times</li>
      </ol>
      <h3>The People's Rebellion</h3>
      <p>The people of the kingdom, feeling uplifted by the laughter, started to tell jokes and puns again, and soon the entire kingdom was in on the joke.</p>
      <div>
        <table>
          <thead>
            <tr>
              <th>King's Treasury</th>
              <th>People's happiness</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Empty</td>
              <td>And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop.</td>
            </tr>
            <tr>
              <td>Modest</td>
              <td>Satisfied</td>
            </tr>
            <tr>
              <td>Full</td>
              <td>Ecstatic</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax. Jokester was declared a hero, and the kingdom lived happily ever after.</p>
      <p>The moral of the story is: never underestimate the power of a good laugh and always be careful of bad ideas.</p>
    </div>
  </div>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
</template>
