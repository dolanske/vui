import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Accordion from '../../src/components/Accordion/Accordion.vue'
import AccordionGroup from '../../src/components/Accordion/AccordionGroup.vue'

describe('component:AccordionGroup', () => {
  it('closes sibling accordions when single mode is enabled', async () => {
    const wrapper = mount(AccordionGroup, {
      props: {
        single: true,
      },
      slots: {
        default: `
          <Accordion label="One" />
          <Accordion label="Two" />
          <Accordion label="Three" />
        `,
      },
      global: {
        components: {
          Accordion,
        },
      },
    })

    const buttons = wrapper.findAll('button.vui-accordion-header')

    await buttons[0].trigger('click')
    await buttons[1].trigger('click')

    const items = wrapper.findAll('.vui-accordion')

    expect(items[0].classes()).not.toContain('open')
    expect(items[1].classes()).toContain('open')
    expect(items[2].classes()).not.toContain('open')
  })
})
