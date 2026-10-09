import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { h } from 'vue'
import Alert from '../../src/components/Alert/Alert.vue'
import AspectRatio from '../../src/components/AspectRatio/AspectRatio.vue'
import Avatar from '../../src/components/Avatar/Avatar.vue'
import Badge from '../../src/components/Badge/Badge.vue'
import Histogram from '../../src/components/Charts/Histogram.vue'
import Grid from '../../src/components/Grid/Grid.vue'
import Indicator from '../../src/components/Indicator/Indicator.vue'
import Kbd from '../../src/components/Kbd/Kbd.vue'
import Marquee from '../../src/components/Marquee/Marquee.vue'
import Progress from '../../src/components/Progress/Progress.vue'
import ResizableView from '../../src/components/ResizableView/ResizableView.vue'
import Skeleton from '../../src/components/Skeleton/Skeleton.vue'
import Spinner from '../../src/components/Spinner/Spinner.vue'
import { pushToast, removeToast, toasts, updateToast } from '../../src/components/Toast/toast'
import Toasts from '../../src/components/Toast/Toasts.vue'
import { flush, pressKey } from '../helpers'

describe('display components', () => {
  it('alert is announced, dismissible and renders everything', async () => {
    const wrapper = mount(Alert, { props: { variant: 'danger', title: 'T', description: 'D', dismissible: true }, slots: { default: 'Extra' } })
    expect(wrapper.attributes('role')).toBe('alert')
    expect(wrapper.text()).toContain('T')
    expect(wrapper.text()).toContain('D')
    expect(wrapper.text()).toContain('Extra')
    await wrapper.get('.vui-alert-dismiss').trigger('click')
    expect(wrapper.emitted('dismiss')).toHaveLength(1)
  })

  it('aspect ratio guards invalid ratios', () => {
    expect(mount(AspectRatio, { props: { ratio: 0 } }).attributes('style')).toContain('--vui-aspect-ratio: 1')
  })

  it('avatar radius, fallback and retries', async () => {
    const wrapper: any = mount(Avatar, { props: { radius: 8, fallback: 'JD', url: 'bad.png' } })
    expect(wrapper.attributes('style')).toContain('--vui-avatar-border-radius: 8px')
    await wrapper.get('img').trigger('error')
    expect(wrapper.text()).toBe('JD')
    await wrapper.setProps({ url: 'good.png' })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.get('img').attributes('alt')).toBe('')
    expect(mount(Avatar, { props: { fallback: 'AB' } }).text()).toBe('AB')
  })

  it('badge is inline and removable', async () => {
    const wrapper = mount(Badge, { props: { removable: true } })
    expect(wrapper.element.tagName).toBe('SPAN')
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('remove')).toHaveLength(1)
  })

  it('grid generates valid rows and justify content', () => {
    const style = mount(Grid, { props: { rows: 3, xBetween: true } }).attributes('style')
    expect(style).toContain('--vui-grid-rows: 1fr 1fr 1fr')
    expect(style).toContain('--vui-grid-justify-content: space-between')
    expect(mount(Grid, { props: { as: 'ul' } }).element.tagName).toBe('UL')
  })

  it('indicator has a label and no undefined class', () => {
    const wrapper = mount(Indicator, { props: { label: 'Online' } })
    expect(wrapper.text()).toBe('Online')
    expect(wrapper.classes()).not.toContain('position-undefined')
  })

  it('histogram handles empty and negative data', () => {
    const empty = mount(Histogram, { props: { data: [] } })
    expect(empty.attributes('role')).toBe('img')
    expect(empty.attributes('aria-label')).toBeTruthy()

    const negative = mount(Histogram, { props: { data: [-1, 0, 5] } })
    const heights = negative.findAll('.vui-histogram-datacell').map(cell => cell.attributes('style'))
    expect(heights).toEqual(['height: 0%;', 'height: 0%;', 'height: 100%;'])
  })

  it('progress, skeleton and spinner semantics', () => {
    const progress = mount(Progress, { props: { modelValue: 40 } })
    expect(progress.attributes('role')).toBe('progressbar')
    expect(progress.attributes('aria-valuenow')).toBe('40')
    expect(mount(Progress, { props: { indeterminate: true } }).attributes('aria-valuenow')).toBeUndefined()

    const circle = mount(Skeleton, { props: { circle: true, height: 40 } })
    expect(circle.attributes('style')).toContain('width: 40px')
    expect(circle.attributes('aria-hidden')).toBe('true')

    const spinner = mount(Spinner)
    expect(spinner.attributes('role')).toBe('status')
    expect(spinner.classes()).not.toContain('size')
  })

  it('marquee pauses on hover by default', () => {
    expect(mount(Marquee).classes()).toContain('pause-on-hover')
    expect(mount(Marquee, { props: { pauseOnHover: false } }).classes()).not.toContain('pause-on-hover')
  })

  it('kbd ignores single keys while typing and highlights modifier combos', async () => {
    let fired = 0
    const trigger = mount(Kbd, { props: { keys: 'S', onTrigger: () => fired++ }, attachTo: document.body })
    const input = document.createElement('input')
    document.body.appendChild(input)
    pressKey(input, 's')
    expect(fired).toBe(0)
    pressKey(document.body, 's')
    expect(fired).toBe(1)
    trigger.unmount()
    input.remove()

    const highlight = mount(Kbd, { props: { keys: 'Ctrl+A', highlight: true }, attachTo: document.body })
    pressKey(document, 'Control', { ctrlKey: true })
    pressKey(document, 'a', { ctrlKey: true })
    await flush()
    expect(highlight.classes()).toContain('active')
    highlight.unmount()
  })
})

describe('toasts', () => {
  afterEach(() => {
    for (const id of [...toasts.value.keys()])
      removeToast(id)
  })

  it('live region, dismiss buttons, stack limit and updates', async () => {
    const wrapper = mount(Toasts, { props: { max: 2 }, attachTo: document.body })
    const first = pushToast('One', { variant: 'success' })
    pushToast('Two')
    pushToast('Three', { variant: 'danger' })
    await flush()

    expect(toasts.value.size).toBe(2)
    expect(toasts.value.has(first.id)).toBe(false)
    expect(document.querySelector('.vui-toast-list')?.getAttribute('aria-live')).toBe('polite')
    expect(document.querySelector('.vui-toast-variant-danger')?.getAttribute('role')).toBe('alert')
    expect(document.querySelectorAll('.vui-toast-dismiss')).toHaveLength(2)

    const last = [...toasts.value.values()].at(-1)!
    updateToast(last.id, { title: 'Updated' })
    await flush()
    expect(document.body.textContent).toContain('Updated')
    wrapper.unmount()
  })
})

describe('resizable view', () => {
  it('splits at any depth without mutating the model', async () => {
    let views: any = [[[{ tabs: [{ path: 'a' }, { path: 'b' }] }, { tabs: [{ path: 'c' }] }], { tabs: [{ path: 'd' }] }]]
    let wrapper: any = null
    wrapper = mount(ResizableView, {
      attachTo: document.body,
      props: {
        'modelValue': views,
        'onUpdate:modelValue': (value: any) => {
          views = value
          wrapper?.setProps({ modelValue: value })
        },
      },
      slots: { tab: ({ tab }: any) => h('span', tab.path) },
    })
    await wrapper.setProps({ modelValue: views })
    await flush()

    const before = views
    pressKey(wrapper.get('.vui-tab').element, 'ArrowDown', { altKey: true, shiftKey: true })
    await flush()

    expect(wrapper.findAll('.view-wrap')).toHaveLength(4)
    expect(views).not.toBe(before)
    expect(before[0][0][0].tabs.map((tab: any) => tab.path)).toEqual(['a', 'b'])
    wrapper.unmount()
  })
})
