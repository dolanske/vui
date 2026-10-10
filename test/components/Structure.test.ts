import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createCommentVNode, defineComponent, h, ref } from 'vue'
import Accordion from '../../src/components/Accordion/Accordion.vue'
import AccordionGroup from '../../src/components/Accordion/AccordionGroup.vue'
import BreadcrumbItem from '../../src/components/Breadcrumbs/BreadcrumbItem.vue'
import Breadcrumbs from '../../src/components/Breadcrumbs/Breadcrumbs.vue'
import Resizable from '../../src/components/Resizable/Resizable.vue'
import Tab from '../../src/components/Tabs/Tab.vue'
import TabPanel from '../../src/components/Tabs/TabPanel.vue'
import Tabs from '../../src/components/Tabs/Tabs.vue'
import { flush, pressKey } from '../helpers'

describe('tabs', () => {
  it('survives v-if children and keeps wrappers', async () => {
    const active = ref<string>()
    const showB = ref(false)
    const App = defineComponent({
      render: () => h(Tabs, { 'modelValue': active.value, 'onUpdate:modelValue': (value: string) => active.value = value }, () => [
        h('div', { class: 'wrapper' }, [h(Tab, { value: 'a' })]),
        showB.value ? h(Tab, { value: 'b' }) : createCommentVNode('v-if', true),
        h(Tab, { value: 'c', disabled: true }),
      ]),
    })
    const wrapper = mount(App, { attachTo: document.body })
    await flush()
    expect(active.value).toBe('a')
    expect(wrapper.find('.wrapper .vui-tab').exists()).toBe(true)

    showB.value = true
    await flush()
    await wrapper.findAll('.vui-tab')[1].trigger('click')
    expect(active.value).toBe('b')

    await wrapper.findAll('.vui-tab')[2].trigger('click')
    expect(active.value).toBe('b')

    showB.value = false
    await flush()
    expect(active.value).toBe('a')
    wrapper.unmount()
  })

  it('supports roving focus, arrow keys and linked panels', async () => {
    const active = ref('a')
    const App = defineComponent({
      render: () => [
        h(Tabs, { 'id': 'tabs', 'modelValue': active.value, 'onUpdate:modelValue': (value: string) => active.value = value }, () => [
          h(Tab, { value: 'a' }),
          h(Tab, { value: 'b', disabled: true }),
          h(Tab, { value: 'c' }),
        ]),
        h(TabPanel, { tabs: 'tabs', value: active.value, active: active.value }, () => `Panel ${active.value}`),
      ],
    })
    const wrapper = mount(App, { attachTo: document.body })
    await flush()

    const tabs = wrapper.findAll('.vui-tab')
    expect(tabs.map(tab => tab.attributes('tabindex'))).toEqual(['0', '-1', '-1'])
    expect(tabs[0].attributes('aria-controls')).toBe(wrapper.get('[role=tabpanel]').attributes('id'))

    ;(tabs[0].element as HTMLElement).focus()
    pressKey(tabs[0].element, 'ArrowRight')
    await flush()
    expect(active.value).toBe('c')
    expect((document.activeElement as HTMLElement).dataset.value).toBe('c')
    expect(wrapper.get('[role=tabpanel]').text()).toBe('Panel c')
    wrapper.unmount()
  })
})

describe('accordion', () => {
  it('is accessible and does not emit on mount', async () => {
    const wrapper = mount(Accordion, { props: { label: 'A' } })
    await flush()
    const header = wrapper.get('.vui-accordion-header')
    const region = wrapper.get('[role=region]')
    expect(header.attributes('aria-expanded')).toBe('false')
    expect(header.attributes('aria-controls')).toBe(region.attributes('id'))
    expect(region.attributes('inert')).toBeDefined()
    expect(Object.keys(wrapper.emitted())).toEqual([])

    await header.trigger('click')
    await flush()
    expect(wrapper.emitted('update:open')).toEqual([[true]])
    expect(region.attributes('inert')).toBeUndefined()
  })

  it('stays closed while disabled', async () => {
    const wrapper = mount(Accordion, { props: { label: 'D', disabled: true } })
    await wrapper.get('.vui-accordion-header').trigger('click')
    expect(wrapper.classes()).not.toContain('open')
  })

  it('group supports v-model, nested and v-if children', async () => {
    const open = ref<string[]>()
    const showTwo = ref(true)
    const App = defineComponent({
      render: () => h(AccordionGroup, { 'single': true, 'modelValue': open.value, 'onUpdate:modelValue': (value: string[]) => open.value = value }, () => [
        h(Accordion, { label: 'One', value: 'one' }),
        showTwo.value ? h(Accordion, { label: 'Two', value: 'two' }) : null,
        h('section', [h(Accordion, { label: 'Three', value: 'three' })]),
      ]),
    })
    const wrapper = mount(App)
    await flush()
    expect(open.value).toBeUndefined()

    open.value = ['three']
    await flush()
    expect(wrapper.findAll('.vui-accordion')[2].classes()).toContain('open')

    await wrapper.findAll('.vui-accordion-header')[0].trigger('click')
    await flush()
    expect(open.value).toEqual(['one'])

    showTwo.value = false
    await flush()
    expect(wrapper.findAll('.vui-accordion')).toHaveLength(2)
  })

  it('group opens defaultOpen accordions', async () => {
    const wrapper = mount(AccordionGroup, { props: { defaultOpen: ['x'] }, slots: { default: () => [h(Accordion, { value: 'x' }), h(Accordion, { value: 'y' })] } })
    await flush()
    expect(wrapper.findAll('.vui-accordion').map(item => item.classes().includes('open'))).toEqual([true, false])
  })
})

describe('breadcrumbs', () => {
  it('is a navigation landmark with a current page', async () => {
    const showLast = ref(true)
    const App = defineComponent({
      render: () => h(Breadcrumbs, null, () => [
        h(BreadcrumbItem, { label: 'Home', href: '/' }),
        h(BreadcrumbItem, { label: 'Docs', href: '/docs' }),
        showLast.value ? h(BreadcrumbItem, { label: 'Page' }) : null,
      ]),
    })
    const wrapper = mount(App, { attachTo: document.body })
    await flush()

    expect(wrapper.get('nav').attributes('aria-label')).toBe('Breadcrumb')
    expect(wrapper.findAll('ol > *').every(el => el.element.tagName === 'LI')).toBe(true)
    expect(wrapper.findAll('[aria-current="page"]').map(el => el.text())).toEqual(['Page'])
    expect(wrapper.findAll('.vui-breadcrumb-separator').every(el => el.attributes('aria-hidden') === 'true')).toBe(true)

    showLast.value = false
    await flush()
    expect(wrapper.findAll('[aria-current="page"]').map(el => el.text())).toEqual(['Docs'])
    wrapper.unmount()
  })
})

describe('resizable', () => {
  it('ignores v-if panels and exposes separators', async () => {
    const App = defineComponent({ render: () => h(Resizable, null, () => [h('div', 'A'), createCommentVNode('v-if', true), h('div', 'C')]) })
    const wrapper = mount(App)
    await flush()
    expect(wrapper.findAll('.vui-resizable-panel')).toHaveLength(2)

    const handle = wrapper.get('.vui-resizable-handle')
    expect(handle.attributes('role')).toBe('separator')
    expect(handle.attributes('aria-orientation')).toBe('vertical')
    expect(handle.attributes('tabindex')).toBe('0')
  })
})
