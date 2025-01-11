<script setup lang="ts">
import { ref } from 'vue'
import Avatar from './components/Avatar/Avatar.vue'
import Button from './components/Button/Button.vue'
import Divider from './components/Divider/Divider.vue'

import Dropdown from './components/Dropdown/Dropdown.vue'
import DropdownItem from './components/Dropdown/DropdownItem.vue'
import Flex from './components/Flex/Flex.vue'
import Sidebar from './components/Sidebar/Sidebar.vue'
import Tab from './components/Tabs/Tab.vue'
import Tabs from './components/Tabs/Tabs.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'

const tab = ref('components')

const sidebarOpen = ref(false)
</script>

<template>
  <div class="vui-sidebar-layout">
    <Sidebar v-model="sidebarOpen" floaty>
      <template #header>
        <h2>Sidebar</h2>
        <Divider size="1" />
      </template>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita laudantium, veritatis, harum hic quia voluptates soluta deleniti sit non debitis sequi illo, eligendi consequuntur. Est molestias maiores voluptatibus at corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam tempora iure voluptatum. Nam dolore animi, cumque mollitia repellendus facilis nobis qui voluptate architecto ipsum dolorum eos optio ipsam voluptatem magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis temporibus minus sed corrupti laboriosam fugit repudiandae quis sunt, nobis eaque autem recusandae accusantium. Dicta placeat aut modi porro nulla hic. Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem blanditiis, aliquid molestias atque eaque cumque fugit nobis necessitatibus voluptas labore dignissimos dolores quas vel voluptatum magni dicta hic quod quasi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio esse laborum, cum deleniti ab delectus corrupti sequi magni possimus beatae aspernatur. Tempora, doloremque facilis. Ad eveniet a unde laboriosam deleniti.</p>
      <template #footer>
        <Button size="l" expand variant="danger">
          Sign out
        </Button>
      </template>
    </Sidebar>

    <main vaul-drawer-wrapper>
      <Button icon="ph:sidebar-simple-bold" square @click="sidebarOpen = !sidebarOpen" />
      <Tabs v-model="tab" expand>
        <Tab id="home" label="Home" icon="ph:house" />
        <Tab id="components" label="Components" />
        <Tab id="typography" label="Typography" />
      </Tabs>
      <div style="margin-bottom: 64px;" />
      <div v-if="tab === 'home'">
        home
      </div>

      <div v-if="tab === 'components'">
        <h1 class="mb-xl">
          Hii
          <span class="counter text-color-accent">129</span>
        </h1>
        <p>I am down</p>

        <Flex>
          <Avatar size="s" />
          <Avatar size="m" />
          <Avatar size="l" />
          <Avatar :size="80" />
        </Flex>

        <Divider />

        <Tooltip>
          <span class="block mb-xl">Hello world</span>
          <template #tooltip>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, animi! Nobis maxime neque cumque, in a amet voluptatibus tenetur dicta eos delectus illo soluta aliquam voluptatum nulla? In, incidunt asperiores?
            </p>
          </template>
        </Tooltip>

        <Dropdown>
          <template #trigger="{ toggle }">
            <Button aria-label="Dropdown menu trigger" square icon="ph:x" @click="toggle" />
          </template>
          <DropdownItem>Hiiii</DropdownItem>
        </Dropdown>
      </div>
      <div v-else-if="tab === 'typography'" class="typeset" :style="{ maxWidth: '688px', margin: 'auto' }">
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
        <p>The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax. Jokester was declared a hero, and the kingdom lived happily ever after.</p>
        <p>The moral of the story is: never <code>underestimate</code> the power of a good laugh and always be careful of bad ideas.</p>

        <pre data-lang="JSON">
{
  "type": "Feature",
  "properties": {
    "mag": 1.5,
    "place": "77kmNWofSkwentna,Alaska",
    "time": 1668256022741,
    "updated": 1668256203692,
    "tz": null,
    "url": "https://earthquake.usgs.gov/earthquakes/eventpage/ak022eit4nup",
    "detail": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ak022eit4nup.geojson",
    "felt": null,
    "cdi": null,
    "mmi": null,
    "alert": null,
    "status": "automatic",
    "tsunami": 0,
    "sig": 35,
    "net": "ak",
    "code": "022eit4nup",
    "ids": ",ak022eit4nup,",
    "sources": ",ak,",
    "types": ",origin,phase-data,",
    "nst": null,
    "dmin": null,
    "rms": 0.55,
    "gap": null,
    "magType": "ml",
    "type": "earthquake",
    "title": "M1.5-77kmNWofSkwentna,Alaska"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [
      -152.2722,
      62.5489,
      4.5
    ]
  },
  "id": "ak022eit4nup"
},
      </pre>
      </div>
    </main>
  </div>
</template>
