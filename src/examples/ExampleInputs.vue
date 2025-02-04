<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import Button from '../components/Button/Button.vue'
import Divider from '../components/Divider/Divider.vue'
import Flex from '../components/Flex/Flex.vue'
import Grid from '../components/Grid/Grid.vue'
import Color from '../components/Input/Color.vue'
import Counter from '../components/Input/Counter.vue'
import Dropzone from '../components/Input/Dropzone.vue'
import File from '../components/Input/File.vue'
import Input from '../components/Input/Input.vue'
import Password from '../components/Input/Password.vue'
import Textarea from '../components/Input/Textarea.vue'
import OTP from '../components/OTP/OTP.vue'
import OTPItem from '../components/OTP/OTPItem.vue'
import Select from '../components/Select/Select.vue'

const options = [
  { value: 0, label: 'Jan' },
  { value: 1, label: 'Andrew' },
  { value: 2, label: 'Felix' },
]

const longOptions = [
  ...options,
  {
    value: 3,
    label: 'Kasper',
  },
  {
    value: 4,
    label: 'Margarett',
  },
  {
    value: 5,
    label: 'Bridgetson',
  },
  {
    value: 6,
    label: 'Jenifer',
  },
  {
    value: 7,
    label: 'Christopher',
  },
]

const selected = ref([])
const selected1 = ref([])
const selected2 = ref([])
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Inputs
    </h3>

    <h6 class="mb-l">
      Input extensions
    </h6>

    <Grid gap="l" :columns="3">
      <Input placeholder="Margarett Bridgetson" />
      <Input label="Default" />
      <Input label="Password" placeholder="*******" type="password" model-value="asdasdasdass" />
      <Input label="Has hint" hint="What is your birth name?" />
      <Input label="Limited" hint="What is your birth name?" limit="65" placeholder="Your name" />
      <Input label="With errors" hint="What is your birth name?" limit="65" :errors="['Your name is too short']" />
      <Input label="Readonly" hint="What is your birth name?" readonly model-value="Readonly value" />
      <Input label="Required" hint="What is your birth name?" required />
      <Input label="Disabled" hint="What is your birth name?" disabled />
      <Input label="With slot" hint="What is your phone number, sir?">
        <template #start>
          +358
        </template>
      </Input>
      <Input label="With icon" hint="What is your birth name?" placeholder="Your phone sir">
        <template #start>
          <Icon icon="ph:phone" />
        </template>
      </Input>
      <Input label="With button" hint="What is your birth name?" placeholder="Your phone sir">
        <template #start>
          <Icon icon="ph:phone" />
        </template>
        <template #end>
          <Button>Clear</Button>
        </template>
      </Input>
      <Input label="Two buttons" placeholder="Some stuff">
        <template #start>
          <Button square icon="ph:eye" />
        </template>
        <template #end>
          <Button>Clear</Button>
        </template>
      </Input>
      <Input label="Icon and button" placeholder="Some stuff">
        <template #start>
          <Button>Start</Button>
        </template>
        <template #end>
          <Icon icon="ph:phone" />
        </template>
      </Input>
    </Grid>

    <Divider :size="48" />

    <h6 class="mb-l">
      Default input types
    </h6>

    <Grid gap="m" :columns="3">
      <Input label="Text" />
      <Password label="Password" />
      <Color placeholder="Erm uhmm" label="Pick color" hint="A bonus hint idk" />
      <Input label="Date" type="date" />
      <Input label="Email" type="email" />
      <Input label="Number" type="number" />
      <Input label="Range" type="range" />
      <Input label="Search" type="search" />
      <Input label="Tel" type="tel" />
      <Input label="Time" type="time" />
      <Input label="Url" type="url" :errors="['Bro didnt count enough']" />
      <File label="File" />
      <Counter label="Counter" hint="It counts!!" />
    </Grid>

    <Divider :size="48" />

    <h6 class="mb-l">
      Textarea
    </h6>

    <Grid :columns="2" gap="m">
      <Textarea label="Your story" hint="tell me everything" :resize="false" required />
      <Textarea expand label="With limit" :limit="64" :resize="false" placeholder="Bro tell me a short story" />
      <Textarea expand label="Resize vertical" />
      <Textarea expand label="Resize horizontal" resize="horizontal" />
      <Textarea expand label="Resize both" :resize="true" :errors="['Just an error test carry on', 'Whoops another issue']" />
      <Textarea expand label="Autoresize" hint="This is not supported in firefox yet" />
      <Textarea expand label="Readonly" model-value="Hiiiiiiiii uwuwuwu" readonly />
      <Textarea expand label="Disabled" disabled />
    </Grid>

    <Divider :size="48" />

    <h6 class="mb-l">
      Dropzone
    </h6>

    <Dropzone expand />

    <Divider :size="48" />

    <h6 class="mb-l">
      Select
    </h6>
    <Grid gap="xl" :columns="3">
      <Select expand :options="longOptions" label="Base, single, search, showClear" search show-clear />
      <Select expand :options="options" label="Base readonly" readonly />
      <Select expand :options="options" label="Base disabled" disabled placeholder="Custom placeholder bro" />
      <Select :options="options" label="Required (single)" expand required />
      <Select :options="options" label="Base + errors" expand :errors="['Hello bro']" />
      <Select v-model="selected" :options="options" label="Base multi" expand :single="false" />
      <Select v-model="selected2" :options="options" label="Multi, max options 2" expand :single="false" :max-active-options="2" />
      <Select v-model="selected1" :options="options" label="Multi required" required expand :single="false" hint="Must always have at least one option selected" />

      <select>
        <option value="" disabled>
          Select option
        </option>
        <option value="Jan">
          Jan
        </option>
        <option value="Andrew">
          Andrew
        </option>
        <option value="Kasper">
          Kasper
        </option>
      </select>
    </Grid>
    <Divider :size="48" />

    <h6 class="mb-l">
      OTP
    </h6>

    <table>
      <tbody>
        <tr>
          <th>Base</th>
          <td>
            <OTP>
              <Flex :gap="0" align-center>
                <OTPItem :i="0" />
                <OTPItem :i="1" />
                <OTPItem :i="2" />
                <span class="ml-m mr-m">-</span>
                <OTPItem :i="3" />
                <OTPItem :i="4" />
                <OTPItem :i="5" />
              </Flex>
            </OTP>
          </td>
        </tr>
        <tr>
          <th>Redacted + only numbers</th>
          <td>
            <OTP redacted mode="num">
              <OTPItem :i="0" />
              <OTPItem :i="1" />
              <OTPItem :i="2" />
            </OTP>
          </td>
        </tr>
        <tr>
          <th>Only characters</th>
          <td>
            <OTP redacted mode="char">
              <OTPItem :i="0" />
              <OTPItem :i="1" />
              <OTPItem :i="2" />
            </OTP>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
