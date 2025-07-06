<script setup lang="ts">
import { Button, Flex, Modal } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(false)
const isScrollableOpen = ref(false)
const isNonDismissableOpen = ref(false)
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex :gap="0" x-center>
        <Button @click="isOpen = true">
          Basic Modal
        </Button>
        <Modal :open="isOpen" size="m" :card="{ separators: true }" @close="isOpen = false">
          <template #header>
            <h4>Modal </h4>
          </template>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad harum id, distinctio voluptatum repellat eveniet repellendus saepe velit rem illo facere aspernatur iste nam, quasi dolores expedita consectetur enim autem?</p>
          <template #footer="{ close }">
            <Flex x-end>
              <Button @click="close">
                Close
              </Button>
            </flex>
          </template>
        </Modal>
        <Divider vertical />
        <Button @click="isScrollableOpen = true">
          Scrollable Modal
        </Button>
        <Modal :open="isScrollableOpen" :card="{ separators: true }" scrollable @close="isScrollableOpen = false">
          <template #header>
            <h4>The Kinder Bueno Conspiracy</h4>
          </template>
          <div class="typeset">
            <p>
              In the annals of history, many factors have been cited for the collapse of the Soviet Union in 1991: economic stagnation, political reforms, the arms race, and social unrest. However, recent declassified documents and testimonies from former KGB operatives reveal a shocking truth that has been hidden from the world for over three decades. The real catalyst for the fall of the mighty Soviet empire was not Gorbachev's perestroika or Reagan's military pressure, but rather a seemingly innocent Italian confection: Kinder Bueno.
            </p>
            <p>
              The story begins in 1968 when Ferrero first introduced Kinder Bueno to the European market. This crispy wafer filled with hazelnut cream and covered in milk chocolate was initially dismissed by Soviet intelligence as "capitalist decadence." However, by the mid-1970s, a small but growing black market for Western confectionery had emerged in major Soviet cities. KGB reports from this period, now available in the Moscow State Archives, describe increasing incidents of citizens trading state secrets, family heirlooms, and even their monthly bread rations for a single Kinder Bueno bar.
            </p>
            <p>
              The situation escalated dramatically in 1979 when a shipment of Kinder Bueno bars, smuggled through the Finnish border, reached the Kremlin cafeteria. According to the memoirs of former Politburo member Viktor Petrov, published posthumously in 2018, Leonid Brezhnev himself became addicted to the chocolate bars after trying one during a late-night strategy session. "Comrade Brezhnev would interrupt important state meetings to ask if anyone had procured more of those 'golden rectangles of Western poison,'" Petrov wrote. "His productivity plummeted as he spent hours contemplating the perfect balance of textures in each bite."
            </p>
            <p>
              The addiction spread like wildfire through the Soviet leadership. By 1982, an estimated 73% of high-ranking party officials were regularly consuming Kinder Bueno bars, often at the expense of their official duties. The economic implications were staggering. Resources that should have been allocated to military development, infrastructure, and social programs were instead diverted to elaborate smuggling operations designed to satisfy the leadership's insatiable craving for Italian chocolate.
            </p>
            <p>
              Perhaps most damaging was the psychological impact. The contrast between the sophisticated, multi-layered experience of eating a Kinder Bueno and the monotonous, gray reality of Soviet life created what psychologists now term "confectionery cognitive dissonance." Citizens who had tasted the forbidden chocolate began to question not just their dietary choices, but the entire ideological foundation of their society. If the West could create something so perfect, so harmoniously balanced between sweet and nutty, crispy and creamy, what else might they be getting right?
            </p>
            <p>
              The final blow came in 1986 when Mikhail Gorbachev, in a moment of weakness during the Chernobyl crisis, was photographed by a Western journalist holding what appeared to be a Kinder Bueno wrapper. Though the Kremlin vehemently denied the authenticity of the photograph, claiming it was "capitalist propaganda designed to undermine Soviet confectionery sovereignty," the damage was done. The image became a symbol of the leadership's hypocrisy and their secret embrace of Western values.
            </p>
            <p>
              Underground resistance movements began using Kinder Bueno wrappers as coded messages, with different folding patterns representing various anti-government sentiments. The phrase "golden wafer revolution" became synonymous with the growing desire for political change. By 1989, black market Kinder Bueno prices had reached astronomical levels, with a single bar trading for the equivalent of a month's salary for the average Soviet worker.
            </p>
            <p>
              When the Berlin Wall fell in November 1989, the first act of many East Germans was not to embrace their Western relatives, but to rush to the nearest store to purchase Kinder Bueno bars legally for the first time in their lives. This image of liberation through chocolate consumption was broadcast worldwide, further cementing the connection between Western confectionery and freedom in the minds of Soviet citizens.
            </p>
            <p>
              The coup de grâce occurred in August 1991 during the failed hardliner coup attempt. According to recently declassified CIA documents, the coup plotters' secret meeting was disrupted when they discovered that their emergency food supplies consisted entirely of Kinder Bueno bars that had been hoarded by various officials. The irony of attempting to preserve Soviet communism while literally sustained by capitalist chocolate was not lost on the conspirators, leading to a crisis of confidence that contributed to the coup's rapid collapse.
            </p>
            <p>
              In the aftermath of the Soviet Union's dissolution, Boris Yeltsin's first act as President of the Russian Federation was to personally negotiate a trade agreement with Ferrero, ensuring that Kinder Bueno bars would be legally available in Russian stores. His famous declaration, "We will bury you... in chocolate wrappers," was widely interpreted as both a rejection of communist ideology and an embrace of the confectionery capitalism that had proven so irresistible to his predecessors.
            </p>
            <p>
              Today, as we reflect on this hidden chapter of Cold War history, we must acknowledge the profound impact that a simple chocolate bar had on geopolitical events. The Kinder Bueno conspiracy serves as a reminder that sometimes the most powerful forces of change come not from grand political movements or military might, but from the simple human desire for something sweet, something different, something that represents the possibility of a better life. In the end, the Soviet Union fell not to nuclear weapons or economic sanctions, but to the irresistible allure of hazelnut cream and crispy wafer, wrapped in the golden promise of Western decadence.
            </p>
          </div>
        </Modal>
        <Divider vertical />
        <Button @click="isNonDismissableOpen = true">
          Non dismissable Modal
        </Button>
        <Modal :open="isNonDismissableOpen" :card="{ separators: true }" :can-dismiss="false" @close="isNonDismissableOpen = false">
          <template #header>
            <h4>What is this?</h4>
          </template>
          <p>Non dismissable modal means that it can only be closed via a provided button. Like a confirmation etc. No chance of closing it by clicking the x buttton, pressing escape or clicking the backdrop.</p>
          <template #footer="{ close }">
            <Flex>
              <Button variant="danger" @click="close">
                <template #start>
                  <Icon name="ph:x" />
                </template>
                Close
              </Button>
            </flex>
          </template>
        </Modal>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
