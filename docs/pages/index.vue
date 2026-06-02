<script setup lang="ts">
import { Avatar, AvatarGroup, Badge, Card, Checkbox, Divider, Dropdown, DropdownItem, Indicator, Marquee, PopoutHover, pushToast, setColorTheme, Slider, Switch, Textarea, theme, Tooltip } from '@dolanske/vui'
import { nextTick, onMounted } from 'vue'

const avatars = [
  { name: 'kilmanio', url: 'https://github.com/kilmanio.png' },
  { name: 'zealsprince', url: 'https://github.com/zealsprince.png' },
  { name: 'Jokler', url: 'https://github.com/Jokler.png' },
]

const form = reactive({
  firstName: '',
  lastName: '',
  description: '',
  agree: true,
})

function submit() {
  pushToast('Feedback submitted!', {
    description: `I (${form.firstName.length > 0 ? form.firstName : 'Unnamed'} ${form.lastName.length > 0 ? form.lastName : 'Fan'}) agree that this library is awesome, because ${form.description.length > 0 ? form.description : '...'}! ${form.agree === false ? 'Yeah I know you unchecked that damn checkbox. I see who you are. I know everything' : 'THANKS!!!!!!!!!!!!'}`,
  })
}

const slider = ref(90)

const version = ref('unknown')
onBeforeMount(async () => {
  version.value = await $fetch('https://registry.npmjs.org/@dolanske/vui')
    .then((res: any) => {
      return res['dist-tags']?.latest
    })
    .catch(() => {
      return 'unknown'
    })
})

const isDarkOn = computed({
  get: () => theme.value === 'dark',
  set: value => setColorTheme(value ? 'dark' : 'light'),
})

const ratingEmoji = computed(() => {
  if (slider.value >= 80)
    return '🤩'
  if (slider.value >= 60)
    return '😀'
  if (slider.value >= 40)
    return '😐'
  if (slider.value >= 20)
    return '😕'
  return '😭'
})

onMounted(async () => {
  await nextTick()
  const center = document.querySelector('.cta-card')
  const examples = Array.from(document.querySelectorAll('.example-fade')) as HTMLElement[]

  if (!center || !examples.length)
    return

  const centerRect = center.getBoundingClientRect()

  examples.forEach((el, i) => {
    if (!el)
      return

    const rect = el.getBoundingClientRect()

    const dx = rect.left + rect.width / 2 - (centerRect.left + centerRect.width / 2)
    const dy = rect.top + rect.height / 2 - (centerRect.top + centerRect.height / 2)

    const len = Math.sqrt(dx * dx + dy * dy) || 1
    const tx = (dx / len) * 32
    const ty = (dy / len) * 32

    el.style.opacity = '0'
    el.style.transform = `translate(${-tx}px, ${-ty}px)`
    el.style.transition = 'opacity 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1)'

    setTimeout(() => {
      el.style.opacity = '1'
      el.style.transform = 'translate(0,0)'
    }, 100 * (i + 1))
  })
})

const hoveredBadge = ref<string | null>(null)
</script>

<template>
  <div class="landing">
    <div class="container-s">
      <div class="relative">
        <Card separators class="cta-card" :padding="false">
          <div class="d-landing">
            <h1>VUI.</h1>
          </div>
          <p class="text-xl line-height-loose p-l text-center">
            Component & design system <br> for your next project
          </p>
          <template #footer>
            <Flex class="p-m">
              <NuxtLink to="/docs" class="w-100">
                <Button expand variant="accent" size="l">
                  Get started
                </Button>
              </NuxtLink>

              <Commands large />
            </Flex>
          </template>
        </Card>

        <div class="glow" />

        <!-- EXAMPLE COMPONENTS START -->
        <Card class="example-fade w-auto floater-components" separators>
          <Flex>
            <NuxtLink to="/docs/components">
              <Badge variant="success" :filled="hoveredBadge === 'first'" @mouseenter="hoveredBadge = 'first'" @mouseleave="hoveredBadge = null">
                Components
              </Badge>
            </NuxtLink>
            <NuxtLink to="/docs/classes">
              <Badge variant="note" :filled="hoveredBadge === 'second'" @mouseenter="hoveredBadge = 'second'" @mouseleave="hoveredBadge = null">
                CSS
              </Badge>
            </NuxtLink>
            <NuxtLink to="/docs/tokens">
              <Badge variant="info" :filled="hoveredBadge === 'third'" @mouseenter="hoveredBadge = 'third'" @mouseleave="hoveredBadge = null">
                Tokens
              </Badge>
            </NuxtLink>
          </Flex>
          <template #footer>
            <p>All the good stuff</p>
          </template>
        </Card>

        <ButtonGroup class="example-fade floater-docs">
          <Button href="/docs">
            Docs
          </Button>
          <Dropdown>
            <template #trigger="{ toggle }">
              <Button square outline @click="toggle">
                <Icon name="ph:caret-down" />
              </Button>
            </template>

            <template #default="{ close }">
              <NuxtLink v-for="tab in documentationTabs" :key="tab.label" :to="tab.path">
                <DropdownItem>
                  <template #icon>
                    <Icon :name="tab.icon" />
                  </template>
                  {{ tab.label }}
                </DropdownItem>
              </NuxtLink>

              <Divider />

              <DropdownItem @click="close">
                Close
              </DropdownItem>
            </template>
          </Dropdown>
        </ButtonGroup>

        <Card class="example-fade floater-rating" separators>
          <template #header>
            <p style="font-variant-numeric: tabular-nums">
              Rating: {{ slider / 10 }}/10 {{ ratingEmoji }}
            </p>
          </template>
          <template #header-end>
            <Button size="s" @click="slider = 90">
              Reset
            </Button>
          </template>

          <Slider v-model="slider" :min="0" :max="100" :steps="10" />
        </Card>

        <BadgeGroup class="example-fade floater-badges" :gap="2">
          <Badge variant="success">
            Stable
          </Badge>
          <Badge>
            v{{ version }}
          </Badge>
        </BadgeGroup>

        <Card border-style="dashed" centered class="example-fade floater-about">
          <strong class="mb-s">About VUI</strong>
          <p class="text-center mb-m">
            Originally, I built this library just as a starter template for my personal projects, but it's now so much more!
          </p>

          <NuxtLink to="/docs/projects" class="btn-project">
            Projects using VUI
          </NuxtLink>
        </Card>

        <Marquee class="marquee-example example-fade floater-marquee" direction="left" :speed="20">
          <a v-for="key in 3" :key href="https://github.com/dolanske/vui" target="_blank" rel="noopener noreferrer">Star the project on github &nbsp;</a>
        </Marquee>

        <Card class="w-auto example-fade floater-avatar" centered>
          <p class="mb-xs">
            Hover him <Icon name="ph:arrow-down" />
          </p>
          <PopoutHover class="popout-hover-example" placement="bottom">
            <template #trigger>
              <Avatar size="l" url="https://github.com/dolanske.png">
                <template #overlay>
                  <Indicator variant="online" position="top-right" ripple />
                </template>
              </Avatar>
            </template>
            <Flex y-start gap="m" expand>
              <button class="pointer" @click="pushToast('boop :3')">
                <Avatar :size="56" url="https://github.com/dolanske.png" />
              </button>
              <div>
                <span class="text-bold block text-l mb-xs">dolanske</span>
                <p class="text-color-light text-s block mb-xs">
                  Frontend engineer. The guy who made all of this yayyy! :D
                </p>
                <p class="text-color-light text-s">
                  Checkout my <a href="https://dolansky.dev" target="_blank" rel="noopener noreferrer">Portfolio</a> or <a href="https://github.com/dolanske" target="_blank" rel="noopener noreferrer">Github</a>
                </p>
              </div>
            </Flex>
          </PopoutHover>
        </Card>

        <Switch v-model="isDarkOn" class="example-fade floater-switch" label="Dark mode" accent reversed />

        <Card separators class="w-auto example-fade floater-form">
          <Flex column>
            <Input v-model="form.firstName" expand label="First name" required />
            <Input v-model="form.lastName" expand label="Last name" required />
            <Textarea v-model="form.description" expand :rows="3" label="Message" placeholder="What do you think?" />
            <Checkbox v-model="form.agree" label="I agree that this library is awesome" />
            <Button expand variant="fill" plain @click="submit">
              Submit
            </Button>
          </Flex>
        </Card>

        <AvatarGroup class="example-fade floater-avatars" cluster column>
          <Tooltip v-for="(avatar, index) in avatars" :key="avatar.name">
            <Avatar :url="avatar.url" size="l" />
            <template #tooltip>
              <p>Friend #{{ index + 1 }}</p>
            </template>
          </Tooltip>
        </AvatarGroup>
        <!-- EXAMPLE COMPONENTS END -->
      </div>
    </div>
  </div>
</template>

<style>
.popout-hover-example {
  padding: var(--space-m);
  width: 324px;
}
</style>

<style scoped>
.example-fade {
  opacity: 0;
}

.floater-components {
  position: absolute;
  top: -154px;
  left: -176px !important;
  width: fit-content !important;
}

.floater-docs {
  position: absolute;
  top: -96px;
  left: 172px;
}

.floater-rating {
  position: absolute;
  top: -125px;
  right: -96px;
  width: 256px;
}

.floater-badges {
  position: absolute;
  top: 50px;
  right: -188px;
}

.floater-about {
  position: absolute;
  top: 132px;
  right: -280px;
  width: 256px;
}

.floater-marquee {
  position: absolute;
  bottom: 50px;
  right: -164px;
  width: 192px;
  padding-bottom: 8px;
}

.floater-avatar {
  position: absolute;
  bottom: -140px;
  right: -86px;
}

.floater-switch {
  position: absolute;
  left: 183px;
  bottom: -80px;
  width: auto !important;
}

.floater-form {
  position: absolute;
  left: -256px;
  bottom: -108px;

  .vui-input-container .vui-input textarea {
    height: 64px;
  }
}

.floater-avatars {
  position: absolute;
  left: -104px;
  top: 28px;
}

:deep(.vui-badge) {
  transition: all var(--transition-fast);
}

.glow {
  position: absolute;
  width: 680px;
  height: 680px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(1);
  background: radial-gradient(circle, var(--color-accent) 0%, var(--color-bg) 70%);
  opacity: 0.2;
  z-index: 0;
  animation: glow-radius 10s linear infinite alternate;
}

@keyframes glow-radius {
  from {
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    transform: translate(-50%, -50%) scale(1.5);
  }
}

.marquee-example {
  &:after {
    content: '';
    z-index: 2;
    width: 20px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    background: linear-gradient(to left, var(--color-bg) 0%, transparent 100%);
  }

  a:hover {
    color: var(--color-accent);
    text-decoration: underline;
  }
}

.btn-project {
  font-size: var(--font-size-xs);
  text-decoration: underline;
  color: var(--color-accent);

  &:hover {
    text-decoration: none;
  }
}

.landing {
  display: flex;
  align-items: center;
  height: calc(100vh - var(--space-xxxl));
  padding-block: var(--space-xl);
  overflow-x: hidden;
}

.relative {
  display: block;
  position: relative;
  z-index: 1;
}

.floater {
  z-index: 1;
}

.cta-card {
  background-color: var(--color-bg-medium);
  z-index: 10;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 30px 10px var(--dark-color-bg-lowered);

  p {
    color: var(--color-text);
  }
}

.d-landing {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 268px;
  position: relative;
  z-index: 4;
  transform: translateY(-8px);
  margin-bottom: -8px;

  --bg: var(--color-bg-medium);
  --stripe-width: 4px;
  --stripe-gap: 24px;

  h1 {
    font-size: 13rem;
    text-transform: uppercase;
    color: var(--color-bg-medium);
  }

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    inset: 0;
  }

  &:before {
    z-index: -1;
    background: #833ab4;
    background: linear-gradient(135deg, rgb(195, 46, 225) 0%, rgb(253, 115, 29) 50%, rgb(249, 212, 5) 100%);
  }

  &:after {
    z-index: 2;
    background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) var(--stripe-width),
      var(--bg) var(--stripe-width),
      var(--bg) calc(var(--stripe-gap) / 2),
      rgba(0, 0, 0, 0) calc(var(--stripe-gap) / 2),
      rgba(0, 0, 0, 0) calc((var(--stripe-gap) / 2) + var(--stripe-width)),
      var(--bg) calc((var(--stripe-gap) / 2) + var(--stripe-width)),
      var(--bg) var(--stripe-gap)
    );
    background-size: var(--stripe-gap) var(--stripe-gap);
  }
}

:root.light {
  .d-landing {
    filter: saturate(300%);
    --stripe-width: 7px;
    --stripe-gap: 24px;
  }

  .cta-card {
    box-shadow: var(--box-shadow-strong);
  }

  .glow {
    opacity: 0.5;
  }
}

@media screen and (max-width: 1024px) {
  .popout-hover-example,
  .floater-components,
  .floater-docs,
  .floater-rating,
  .floater-badges,
  .floater-about,
  .floater-marquee,
  .floater-avatar,
  .floater-switch,
  .floater-form,
  .floater-avatars {
    display: none;
  }

  .glow {
    width: 512px;
    height: 512px;
  }

  .landing {
    overflow: hidden;
  }

  main:has(.landing) {
    padding-bottom: 0;
  }
}
</style>
