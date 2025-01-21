<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import Button from '../components/Button/Button.vue'
import Divider from '../components/Divider/Divider.vue'
import Grid from '../components/Grid/Grid.vue'
import Color from '../components/Input/Color.vue'
import File from '../components/Input/File.vue'
import Input from '../components/Input/Input.vue'
import Password from '../components/Input/Password.vue'
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Inputs
    </h3>

    <Grid gap="s" :columns="3">
      <Input placeholder="Margarett Bridgetson" />
      <Input label="Name" />
      <Input label="Password" placeholder="*******" type="password" model-value="asdasdasdass" />
      <Input label="Name" hint="What is your birth name?" />
      <Input label="Name" hint="What is your birth name?" limit="65" placeholder="Your name" />
      <Input label="Name" hint="What is your birth name?" limit="65" :errors="['Your name is too short']" />
      <Input label="Name" hint="What is your birth name?" readonly model-value="Readonly value" />
      <Input label="Name" hint="What is your birth name?" required />
      <Input label="Name" hint="What is your birth name?" disabled />
      <Input label="Phone" hint="What is your phone number, sir?">
        <template #start>
          +358
        </template>
      </Input>
      <Input label="Phone" hint="What is your birth name?" placeholder="Your phone sir">
        <template #start>
          <Icon icon="ph:phone" />
        </template>
      </Input>
      <Input label="Phone" hint="What is your birth name?" placeholder="Your phone sir">
        <template #start>
          <Icon icon="ph:phone" />
        </template>
        <template #end>
          <Button>Clear</Button>
        </template>
      </Input>
      <Input label="You" placeholder="Some stuff">
        <template #start>
          <Button square icon="ph:eye" />
        </template>
        <template #end>
          <Button>Clear</Button>
        </template>
      </Input>
      <Input label="You" placeholder="Some stuff">
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
      Input types
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
      <Input label="Url" type="url" />

      <File label="File" />
    </Grid>
  </div>
</template>
