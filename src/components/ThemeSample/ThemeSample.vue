<script setup lang="ts">
import { IconBell, IconGear, IconMagnifyingGlass } from '@iconify-prerendered/vue-ph'
import { computed, ref } from 'vue'
import Accordion from '../Accordion/Accordion.vue'
import Alert from '../Alert/Alert.vue'
import Avatar from '../Avatar/Avatar.vue'
import Badge from '../Badge/Badge.vue'
import BreadcrumbItem from '../Breadcrumbs/BreadcrumbItem.vue'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs.vue'
import Button from '../Button/Button.vue'
import Card from '../Card/Card.vue'
import Checkbox from '../Checkbox/Checkbox.vue'
import Input from '../Input/Input.vue'
import Kbd from '../Kbd/Kbd.vue'
import { paginate } from '../Pagination/pagination'
import Pagination from '../Pagination/Pagination.vue'
import Progress from '../Progress/Progress.vue'
import Radio from '../Radio/Radio.vue'
import RadioGroup from '../Radio/RadioGroup.vue'
import Select from '../Select/Select.vue'
import Skeleton from '../Skeleton/Skeleton.vue'
import Slider from '../Slider/Slider.vue'
import Spinner from '../Spinner/Spinner.vue'
import Switch from '../Switch/Switch.vue'
import Tab from '../Tabs/Tab.vue'
import Tabs from '../Tabs/Tabs.vue'
import Tooltip from '../Tooltip/Tooltip.vue'
import './theme-sample.scss'

interface ColorGroup {
  name: string
  tokens: string[]
}

const colorGroups: ColorGroup[] = [
  { name: 'Surface', tokens: ['bg', 'bg-medium', 'bg-raised', 'bg-lowered'] },
  { name: 'Text', tokens: ['text', 'text-light', 'text-lighter', 'text-lightest', 'text-invert'] },
  { name: 'Border', tokens: ['border-weak', 'border', 'border-strong'] },
  { name: 'Buttons', tokens: ['button-gray', 'button-gray-hover', 'button-fill', 'button-fill-hover'] },
  { name: 'Accent', tokens: ['accent', 'bg-accent-raised', 'bg-accent-lowered'] },
  { name: 'Red', tokens: ['text-red', 'bg-red-raised', 'bg-red-lowered', 'border-red'] },
  { name: 'Green', tokens: ['text-green', 'bg-green-raised', 'bg-green-lowered'] },
  { name: 'Blue', tokens: ['text-blue', 'bg-blue-raised', 'bg-blue-lowered', 'border-blue'] },
  { name: 'Yellow', tokens: ['text-yellow', 'bg-yellow-raised', 'bg-yellow-lowered', 'border-yellow'] },
  { name: 'Purple', tokens: ['text-purple', 'bg-purple-raised', 'bg-purple-lowered'] },
]

const fontSizes = ['xxxxl', 'xxxl', 'xxl', 'xl', 'l', 'm', 's', 'xs', 'xxs']
const fontWeights = ['light', 'regular', 'medium', 'semibold', 'bold', 'extrabold', 'black']
const spaces = ['xxxs', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']
const radii = ['xs', 's', 'm', 'l', 'pill']
const buttonVariants = ['fill', 'accent', 'danger', 'success', 'warning', 'info', 'note', 'link'] as const
const badgeVariants = ['neutral', 'accent', 'info', 'success', 'warning', 'danger', 'note'] as const

const options = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
]

const tab = ref('Overview')
const search = ref('')
const selected = ref([options[2]])
const checked = ref(true)
const switched = ref(true)
const radio = ref('a')
const slider = ref(60)
const progress = ref(60)
const page = ref(2)
const pagination = computed(() => paginate(50, page.value, 10, 3))

function weightVar(weight: string) {
  return weight === 'regular' ? 'var(--font-weight)' : `var(--font-weight-${weight})`
}
</script>

<template>
  <Card class="vui-theme-sample" header-separator :padding="false">
    <div class="vui-theme-sample-list">
      <!-- Typography, spacing, shapes -->
      <div class="vui-theme-sample-column">
        <h4>Type</h4>
        <div class="vui-theme-sample-type">
          <div v-for="size in fontSizes" :key="size" class="vui-theme-sample-type-row">
            <code>{{ size }}</code>
            <span :style="{ fontSize: `var(--font-size-${size})` }">The quick brown fox</span>
          </div>
        </div>
        <div class="vui-theme-sample-weights">
          <span v-for="weight in fontWeights" :key="weight" :style="{ fontWeight: weightVar(weight) }" :title="weight">Aa</span>
          <code class="vui-theme-sample-mono">font-mono 0123</code>
        </div>

        <h4>Spacing</h4>
        <div class="vui-theme-sample-spaces">
          <div v-for="space in spaces" :key="space" class="vui-theme-sample-space-row">
            <code>{{ space }}</code>
            <span class="vui-theme-sample-space-bar" :style="{ width: `var(--space-${space})` }" />
          </div>
        </div>

        <h4>Radius, shadow, height</h4>
        <div class="vui-theme-sample-shapes">
          <div v-for="radius in radii" :key="radius" class="vui-theme-sample-shape" :style="{ borderRadius: `var(--border-radius-${radius})` }">
            <code>{{ radius }}</code>
          </div>
        </div>
        <div class="vui-theme-sample-shapes">
          <div class="vui-theme-sample-shape vui-theme-sample-shadow" style="box-shadow: var(--box-shadow)">
            <code>shadow</code>
          </div>
          <div class="vui-theme-sample-shape vui-theme-sample-shadow" style="box-shadow: var(--box-shadow-strong)">
            <code>strong</code>
          </div>
          <div class="vui-theme-sample-heights">
            <span style="height: var(--interactive-el-height-s)" title="--interactive-el-height-s" />
            <span style="height: var(--interactive-el-height)" title="--interactive-el-height" />
            <span style="height: var(--interactive-el-height-l)" title="--interactive-el-height-l" />
          </div>
        </div>
      </div>

      <!-- Components -->
      <div class="vui-theme-sample-column">
        <h4>Components</h4>
        <div class="vui-theme-sample-row">
          <Button>Default</Button>
          <Button v-for="variant in buttonVariants" :key="variant" :variant>
            {{ variant }}
          </Button>
          <Button outline>
            Outline
          </Button>
          <Button plain>
            Plain
          </Button>
          <Button disabled>
            Disabled
          </Button>
        </div>

        <div class="vui-theme-sample-row">
          <Input v-model="search" placeholder="Search..." size="s" class="vui-theme-sample-grow">
            <template #start>
              <IconMagnifyingGlass />
            </template>
          </Input>
          <Select v-model="selected" :options size="s" aria-label="Theme" style="width: 120px" />
        </div>

        <div class="vui-theme-sample-row">
          <Checkbox v-model="checked" label="Checkbox" />
          <Switch v-model="switched" label="Switch" />
          <RadioGroup v-model="radio" gap="s">
            <Radio value="a" label="Radio" />
            <Radio value="b" label="Other" />
          </RadioGroup>
        </div>

        <div class="vui-theme-sample-row">
          <Badge v-for="variant in badgeVariants" :key="variant" :variant size="s">
            {{ variant }}
          </Badge>
        </div>

        <Tabs v-model="tab">
          <Tab value="Overview" />
          <Tab value="Activity" />
          <Tab value="Settings" />
        </Tabs>

        <Alert variant="info" title="Heads up" description="Alerts use the status colors of the theme." />

        <div class="vui-theme-sample-row">
          <Slider v-model="slider" label="Volume" class="vui-theme-sample-grow" />
          <Progress v-model="progress" class="vui-theme-sample-grow" label="Progress" />
        </div>

        <div class="vui-theme-sample-card">
          <Avatar :size="36" fallback="VU" />
          <div class="vui-theme-sample-grow">
            <strong>Jane Doe</strong>
            <p>Updated the theme <Kbd keys="Ctrl+S" /></p>
          </div>
          <Tooltip>
            <Button square plain aria-label="Notifications">
              <IconBell />
            </Button>
            <template #tooltip>
              <p>Tooltip</p>
            </template>
          </Tooltip>
          <Button square aria-label="Settings">
            <IconGear />
          </Button>
        </div>

        <div class="vui-theme-sample-row vui-theme-sample-between">
          <Breadcrumbs>
            <BreadcrumbItem href="#" label="Docs" @click.prevent />
            <BreadcrumbItem href="#" label="Theme" @click.prevent />
            <BreadcrumbItem label="Sample" />
          </Breadcrumbs>
          <Pagination :pagination :first-last="false" @change="page = $event" />
        </div>

        <Accordion label="Accordion" card open>
          <p>Collapsible content uses the surface and border tokens.</p>
        </Accordion>

        <div class="vui-theme-sample-card">
          <Skeleton circle :width="36" />
          <div class="vui-theme-sample-grow vui-theme-sample-skeleton">
            <Skeleton :height="12" width="40%" />
            <Skeleton :height="10" width="70%" />
          </div>
          <Spinner size="m" />
        </div>
      </div>

      <!-- Colors -->
      <div class="vui-theme-sample-column">
        <h4>Colors</h4>
        <div v-for="group in colorGroups" :key="group.name" class="vui-theme-sample-color-group">
          <span class="vui-theme-sample-label">{{ group.name }}</span>
          <div class="vui-theme-sample-swatches">
            <div v-for="token in group.tokens" :key="token" class="vui-theme-sample-swatch" :title="`--color-${token}`">
              <span class="vui-theme-sample-swatch-color" :style="{ backgroundColor: `var(--color-${token})` }" />
              <code>{{ token }}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>
