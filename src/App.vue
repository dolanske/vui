<script setup lang="ts">
import { ref } from 'vue'
import Button from './components/Button/Button.vue'
import Checkbox from './components/Checkbox/Checkbox.vue'
import Divider from './components/Divider/Divider.vue'
import Flex from './components/Flex/Flex.vue'
import Input from './components/Input/Input.vue'
import Spinner from './components/Spinner/Spinner.vue'
import Switch from './components/Switch/Switch.vue'

const checked1 = ref(false)
const checked2 = ref(false)
const input1 = ref('')
</script>

<template>
  <div>
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
    <Flex>
      <Spinner size="s" />
      <Spinner size="m" />
      <Spinner size="l" />
    </Flex>
  </div>
</template>
