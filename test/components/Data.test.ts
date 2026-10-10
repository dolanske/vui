import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { paginate } from '../../src/components/Pagination/pagination'
import Pagination from '../../src/components/Pagination/Pagination.vue'
import * as Table from '../../src/components/Table'
import { defineTable } from '../../src/components/Table/table'
import { flush } from '../helpers'

describe('defineTable', () => {
  function setup(data: any, options?: any) {
    let table: any
    const App = defineComponent({
      setup() {
        table = defineTable(data, options)
        return () => h(Table.Root, { pin: 'first' }, {
          header: () => [h(Table.SelectAll), ...table.headers.value.map((header: any) => h(Table.Head, { header, sort: true }))],
        })
      },
    })
    const wrapper = mount(App)
    return { table, wrapper }
  }

  it('sorts reactively, naturally and with empty values last', async () => {
    const { table } = setup([
      { id: 1, name: 'item 10', age: 3 },
      { id: 2, name: 'item 2', age: null },
      { id: 3, name: 'Item 1', age: 1 },
    ])
    table.setSort('name', 'asc')
    expect(table.rows.value.map((row: any) => row.name)).toEqual(['Item 1', 'item 2', 'item 10'])
    table.setSort('age', 'desc')
    expect(table.rows.value.map((row: any) => row.age)).toEqual([3, 1, null])
  })

  it('exposes sorting and selection state accessibly', async () => {
    const data = ref([{ id: 1, name: 'a' }, { id: 2, name: 'b' }])
    const { table, wrapper } = setup(data, { select: true })
    table.setSort('name', 'desc')
    table.selectRow(data.value[0])
    await flush()

    expect(wrapper.get('.vui-table-container').classes()).toContain('selecting')
    expect(wrapper.findAll('th').map(th => th.attributes('aria-sort'))).toEqual([undefined, 'none', 'descending'])
    expect(wrapper.get('[role=checkbox]').attributes('aria-checked')).toBe('mixed')
  })

  it('only marks the selecting class while selection is enabled', () => {
    const { wrapper } = setup([{ id: 1 }])
    expect(wrapper.get('.vui-table-container').classes()).not.toContain('selecting')
  })

  it('merges options, ignores nested objects in search and clamps pages', () => {
    const { table } = setup([{ id: 1, meta: { a: 1 } }], { pagination: { enabled: true } })
    expect(table.options.value.pagination.perPage).toBe(10)
    table.search.value = 'object'
    expect(table.rows.value).toHaveLength(0)
    table.search.value = ''
    table.setPage(999)
    expect(table.pagination.value.currentPage).toBe(1)
  })

  it('selects matching rows and prunes removed ones', async () => {
    const data = ref([{ id: 1, name: 'one' }, { id: 2, name: 'two' }])
    const { table } = setup(data, { select: true })
    table.search.value = 'two'
    table.selectAllRows()
    expect(table.selectedRows.value.map((row: any) => row.id)).toEqual([2])

    table.search.value = ''
    data.value = data.value.filter(row => row.id !== 2)
    await flush()
    expect(table.selectedRows.value).toEqual([])
  })

  it('is never "all selected" for empty data', () => {
    const { table } = setup([], { select: true })
    expect(table.isSelectedAll.value).toBe(false)
  })

  it('keeps two tables of one component apart', () => {
    let one: any
    let two: any
    const App = defineComponent({
      setup() {
        one = defineTable([{ id: 1 }], { select: true })
        two = defineTable([{ id: 1 }], { select: false })
        return () => [
          h(Table.Root, { table: one, class: 'one' }, { header: () => h(Table.SelectAll) }),
          h(Table.Root, { table: two, class: 'two' }, { header: () => h(Table.SelectAll) }),
        ]
      },
    })
    const wrapper = mount(App)
    expect(wrapper.find('.one [role=checkbox]').exists()).toBe(true)
    expect(wrapper.find('.two [role=checkbox]').exists()).toBe(false)
  })
})

describe('pagination', () => {
  it('uses data bounds, the variant and navigation semantics', () => {
    const wrapper = mount(Pagination, { props: { pagination: paginate(100, 2, 10, 2), ellipsis: true, variant: 'accent' } })
    expect(wrapper.get('nav').attributes('aria-label')).toBe('Pagination')
    expect(wrapper.get('[aria-label="Next page"]').attributes('disabled')).toBeUndefined()
    const current = wrapper.get('[aria-current=page]')
    expect(current.text()).toBe('2')
    expect(current.classes()).toContain('vui-button-variant-accent')
    expect(wrapper.text().replace(/\s+/g, '')).toContain('12…10')
  })

  it('passes the correct disabled state to slots', () => {
    const wrapper = mount(Pagination, {
      props: { pagination: paginate(100, 1, 10) },
      slots: { prev: ({ disabled }: any) => h('span', { class: 'prev' }, String(disabled)) },
    })
    expect(wrapper.get('.prev').text()).toBe('true')
  })
})
