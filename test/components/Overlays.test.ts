import { mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import Confirm from '../../src/components/Modal/Confirm.vue'
import Modal from '../../src/components/Modal/Modal.vue'
import Sheet from '../../src/components/Sheet/Sheet.vue'
import { flush, mockLayout, pressKey, withTransitions } from '../helpers'

beforeAll(mockLayout)

describe('modal', () => {
  it('is a labelled dialog which traps and restores focus', async () => {
    const trigger = document.createElement('button')
    document.body.appendChild(trigger)
    trigger.focus()

    const open = ref(true)
    const App = defineComponent({
      render: () => h(Modal, { 'open': open.value, 'transitionName': 'none', 'onUpdate:open': (value: boolean) => open.value = value }, {
        header: () => h('h3', 'Title'),
        default: () => [h('input'), h('button', 'last')],
      }),
    })
    const wrapper = mount(App, withTransitions)
    await flush()

    const dialog = document.querySelector('.vui-modal')!
    expect(dialog.getAttribute('role')).toBe('dialog')
    expect(dialog.getAttribute('aria-modal')).toBe('true')
    expect(document.getElementById(dialog.getAttribute('aria-labelledby')!)?.textContent?.trim()).toBe('Title')
    expect(document.querySelector('.vui-modal-close')?.getAttribute('aria-label')).toBe('Close')
    expect(dialog.contains(document.activeElement)).toBe(true)
    expect(document.documentElement.style.overflow).toBe('hidden')

    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('button, input'))
    focusable.at(-1)!.focus()
    pressKey(document, 'Tab')
    expect(document.activeElement).toBe(focusable[0])

    pressKey(document, 'Escape')
    await flush()
    expect(open.value).toBe(false)
    expect(document.querySelector('.vui-modal')).toBeNull()
    expect(document.activeElement).toBe(trigger)
    expect(document.documentElement.style.overflow).toBe('')

    wrapper.unmount()
    trigger.remove()
  })

  it('only the top layer handles Escape', async () => {
    const outer = ref(true)
    const inner = ref(true)
    const closes: string[] = []
    const App = defineComponent({
      render: () => [
        h(Modal, { 'open': outer.value, 'transitionName': 'none', 'onUpdate:open': (value: boolean) => outer.value = value, 'onClose': () => closes.push('outer') }, { default: () => h('button', 'outer') }),
        h(Modal, { 'open': inner.value, 'transitionName': 'none', 'canDismiss': false, 'onUpdate:open': (value: boolean) => inner.value = value, 'onClose': () => closes.push('inner') }, { default: () => h('button', 'inner') }),
      ],
    })
    const wrapper = mount(App, withTransitions)
    await flush()

    // A non-dismissable modal swallows Escape instead of passing it down
    pressKey(document, 'Escape')
    await flush()
    expect(closes).toEqual([])

    inner.value = false
    await flush()
    pressKey(document, 'Escape')
    await flush()
    expect(closes).toEqual(['outer'])
    wrapper.unmount()
  })
})

describe('confirm', () => {
  it('renders title and content, focuses cancel and cancels on dismiss', async () => {
    const events: string[] = []
    const wrapper = mount(Confirm, {
      ...withTransitions,
      props: {
        open: true,
        title: 'Delete?',
        content: 'Are you sure',
        onCancel: () => events.push('cancel'),
        onClose: () => events.push('close'),
        onConfirm: () => events.push('confirm'),
      },
    })
    await flush()

    const dialog = document.querySelector('.vui-modal')!
    expect(dialog.getAttribute('role')).toBe('alertdialog')
    expect(dialog.querySelector('.vui-confirm-title')?.textContent?.trim()).toBe('Delete?')
    expect(dialog.textContent).toContain('Are you sure')
    expect(dialog.hasAttribute('title')).toBe(false)
    expect(document.activeElement?.textContent?.trim()).toBe('Cancel')

    pressKey(document, 'Escape')
    await flush()
    expect(events).toEqual(['cancel', 'close'])
    wrapper.unmount()
  })
})

describe('sheet', () => {
  it('is a dialog and applies size to bottom sheets', async () => {
    const wrapper = mount(Sheet, {
      ...withTransitions,
      props: { open: true, position: 'bottom', size: 200 },
      slots: { header: () => 'Title', default: () => h('button', 'inside') },
    })
    await flush()
    const sheet = document.querySelector('.vui-sheet') as HTMLElement
    expect(sheet.getAttribute('role')).toBe('dialog')
    expect(sheet.style.getPropertyValue('--vui-sheet-max-height')).toBe('200px')
    expect(sheet.contains(document.activeElement)).toBe(true)
    wrapper.unmount()
  })
})
