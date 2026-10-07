import { mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import Commands from '../../src/components/Commands/Commands.vue'
import ContextMenu from '../../src/components/ContextMenu/ContextMenu.vue'
import CopyClipboard from '../../src/components/CopyClipboard/CopyClipboard.vue'
import Dropdown from '../../src/components/Dropdown/Dropdown.vue'
import DropdownItem from '../../src/components/Dropdown/DropdownItem.vue'
import Menubar from '../../src/components/Menubar/Menubar.vue'
import MenuItem from '../../src/components/Menubar/MenuItem.vue'
import Modal from '../../src/components/Modal/Modal.vue'
import Tooltip from '../../src/components/Tooltip/Tooltip.vue'
import { flush, mockLayout, pressKey, withTransitions } from '../helpers'

beforeAll(mockLayout)

const settle = () => flush(80)

describe('dropdown', () => {
  it('is a keyboard operable menu which never steals focus', async () => {
    let clicked = 0
    const App = defineComponent({
      render: () => h(Modal, { open: true }, {
        default: () => [
          h('input', { id: 'other' }),
          h(Dropdown, null, {
            trigger: ({ toggle }: any) => h('button', { id: 'trigger', onClick: toggle }, 'Menu'),
            default: () => [
              h(DropdownItem, { onClick: () => clicked++ }, () => 'Apple'),
              h(DropdownItem, { disabled: true }, () => 'Banana'),
              h(DropdownItem, null, () => 'Cherry'),
            ],
          }),
        ],
      }),
    })
    const wrapper = mount(App, withTransitions)
    await settle()

    const trigger = document.getElementById('trigger')!
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu')
    expect(trigger.parentElement?.getAttribute('role')).toBeNull()

    trigger.focus()
    pressKey(trigger, 'ArrowDown')
    await settle()
    const menu = document.querySelector('.vui-dropdown')!
    expect(menu.getAttribute('role')).toBe('menu')
    expect(trigger.getAttribute('aria-controls')).toBe(menu.id)
    expect(document.activeElement?.textContent?.trim()).toBe('Apple')

    pressKey(document.activeElement!, 'ArrowDown')
    expect(document.activeElement?.textContent?.trim()).toBe('Cherry')
    pressKey(document.activeElement!, 'Home')
    expect(document.activeElement?.textContent?.trim()).toBe('Apple')
    pressKey(document.activeElement!, 'c')
    expect(document.activeElement?.textContent?.trim()).toBe('Cherry')

    // Escape closes the menu only, not the modal it is in
    pressKey(document.activeElement!, 'Escape')
    await settle()
    expect(document.querySelector('.vui-dropdown')).toBeNull()
    expect(document.querySelector('.vui-modal')).not.toBeNull()
    expect(document.activeElement).toBe(trigger)

    trigger.click()
    await settle()
    ;(document.querySelector('.vui-dropdown-item') as HTMLElement).click()
    await settle()
    expect(clicked).toBe(1)
    expect(document.querySelector('.vui-dropdown')).toBeNull()

    trigger.click()
    await settle()
    const other = document.getElementById('other')!
    other.focus()
    await settle()
    expect(document.querySelector('.vui-dropdown')).toBeNull()
    expect(document.activeElement).toBe(other)
    wrapper.unmount()
  })
})

describe('context menu', () => {
  it('only opens the innermost nested menu', async () => {
    const App = defineComponent({
      render: () => h(ContextMenu, null, {
        menu: () => h(DropdownItem, { class: 'outer-item' }, () => 'Outer'),
        default: () => h(ContextMenu, null, {
          menu: () => h(DropdownItem, { class: 'inner-item' }, () => 'Inner'),
          default: () => h('div', { class: 'target' }, 'target'),
        }),
      }),
    })
    const wrapper = mount(App, withTransitions)
    await settle()

    wrapper.get('.target').element.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 20, clientY: 20, button: 2 }))
    await settle()
    expect(document.querySelector('.outer-item')).toBeNull()
    expect(document.querySelector('.inner-item')).not.toBeNull()
    expect(document.activeElement?.textContent?.trim()).toBe('Inner')

    pressKey(document.activeElement!, 'Escape')
    await settle()
    expect(document.querySelector('.inner-item')).toBeNull()
    wrapper.unmount()
  })
})

describe('menubar', () => {
  it('follows the menubar keyboard pattern', async () => {
    const App = defineComponent({
      render: () => h(Menubar, null, () => [
        h(MenuItem, null, { default: () => h('button', { id: 'file' }, 'File'), menu: () => h(DropdownItem, null, () => 'New') }),
        h(MenuItem, null, { default: () => h('button', { id: 'edit' }, 'Edit'), menu: () => h(DropdownItem, null, () => 'Undo') }),
      ]),
    })
    const wrapper = mount(App, withTransitions)
    await settle()

    const file = document.getElementById('file')!
    const edit = document.getElementById('edit')!
    expect(wrapper.find('[role=menubar]').exists()).toBe(true)
    expect(file.getAttribute('role')).toBe('menuitem')
    expect([file.getAttribute('tabindex'), edit.getAttribute('tabindex')]).toEqual(['0', '-1'])

    file.focus()
    pressKey(file, 'ArrowRight')
    await settle()
    expect(document.activeElement).toBe(edit)

    pressKey(edit, 'ArrowDown')
    await settle()
    expect(document.activeElement?.textContent?.trim()).toBe('Undo')

    pressKey(document.activeElement!, 'ArrowLeft')
    await settle()
    expect(document.activeElement?.textContent?.trim()).toBe('New')

    ;(document.activeElement as HTMLElement).click()
    await settle()
    expect(document.querySelector('[role=menu]')).toBeNull()
    wrapper.unmount()
  })
})

describe('tooltip', () => {
  it('shows on keyboard focus and hides on Escape', async () => {
    const wrapper = mount(Tooltip, { ...withTransitions, slots: { default: () => h('button', { id: 'tip-trigger' }, 'hi'), tooltip: () => 'Tip' } })
    const trigger = document.getElementById('tip-trigger')!
    const matches = Element.prototype.matches
    Element.prototype.matches = function (selector: string) {
      return selector === ':focus-visible' ? true : matches.call(this, selector)
    }

    trigger.focus()
    await settle()
    const tip = document.querySelector('[role=tooltip]')
    expect(tip).not.toBeNull()
    expect(trigger.getAttribute('aria-describedby')).toBe(tip?.id)

    pressKey(trigger, 'Escape')
    await settle()
    expect(document.querySelector('[role=tooltip]')).toBeNull()

    Element.prototype.matches = matches
    wrapper.unmount()
  })
})

describe('copy clipboard', () => {
  it('only adds button semantics to plain content', async () => {
    const plain = mount(CopyClipboard, { props: { text: 'x' }, slots: { default: () => 'text' } })
    await flush()
    expect(plain.get('.vui-copy-clipboard-trigger').attributes('role')).toBe('button')
    expect(plain.get('.vui-copy-clipboard-trigger').attributes('tabindex')).toBe('0')
    expect(plain.find('[aria-live]').exists()).toBe(true)

    const withButton = mount(CopyClipboard, { props: { text: 'x' }, slots: { default: () => h('button', 'Copy') } })
    await flush()
    expect(withButton.get('.vui-copy-clipboard-trigger').attributes('role')).toBeUndefined()
  })
})

describe('commands', () => {
  it('handles keys safely and closes once', async () => {
    const selected: string[] = []
    const commands = [
      { title: 'Alpha', group: 'All', handler: () => selected.push('alpha') },
      { title: 'Beta', shortcut: 'g', handler: () => selected.push('beta') },
    ]
    const wrapper: any = mount(Commands, {
      ...withTransitions,
      props: {
        'open': true,
        commands,
        'search': '',
        'onUpdate:search': (value: string) => wrapper.setProps({ search: value }),
        'onUpdate:open': (value: boolean) => wrapper.setProps({ open: value }),
      },
    })
    await settle()

    const input = document.querySelector('.vui-commands-input input') as HTMLInputElement
    expect(input.getAttribute('role')).toBe('combobox')
    expect(input.hasAttribute('autofocus')).toBe(false)
    expect(document.getElementById(input.getAttribute('aria-activedescendant')!)).not.toBeNull()

    // A group named "All" does not collide with the "all groups" filter
    expect([...document.querySelectorAll('.vui-commands-group-buttons button')].map(button => button.textContent?.trim())).toEqual(['All', 'All', 'Other'])

    input.focus()
    pressKey(input, 'g')
    expect(selected).toEqual([])

    await wrapper.setProps({ search: 'zzz' })
    await settle()
    pressKey(input, 'Enter')
    expect(selected).toEqual([])

    await wrapper.setProps({ search: 'Beta' })
    await settle()
    pressKey(input, 'Enter')
    await settle()
    expect(selected).toEqual(['beta'])
    expect(wrapper.props('open')).toBe(false)
    expect(wrapper.emitted('close')).toHaveLength(1)

    pressKey(document, 'Escape')
    expect(wrapper.emitted('close')).toHaveLength(1)
    wrapper.unmount()
  })
})
