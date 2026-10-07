import type { ComputedRef, InjectionKey, MaybeRefOrGetter, Ref } from 'vue'
import type { DeepRequired } from '../../lib/types'
import { computed, provide, ref, toValue, watch } from 'vue'
import { searchString } from '../../lib/helpers'
import { paginate } from '../Pagination/pagination'

export interface TableSelectionProvide<Row = any> {
  selectedRows: Ref<Map<string | number, Row>>
  selectRow: (_row: Row) => void
  selectAllRows: () => void
  enabled: ComputedRef<boolean>
  isSelectedAll: ComputedRef<boolean>
  /**
   * Some, but not all, rows are selected
   */
  isSelectedSome: ComputedRef<boolean>
}

export const TableSelectionProvideSymbol = Symbol('select-row-provide') as InjectionKey<TableSelectionProvide>

interface Sorting<K> {
  key?: K
  type: 'asc' | 'desc'
}

export interface Header {
  label: string
  sortToggle: () => void
  sortKey?: 'asc' | 'desc'
}

interface TableOptionsInput<Dataset extends any[]> {
  pagination?: {
    enabled?: boolean
    perPage?: number
    maxPages?: number
  }
  /**
   * If setting is enabled, you _must_ provide an `id` property on your dataset
   * objects, which is used for selection. The value of this property can be
   * either a string or a number and has to be unique.
   */
  select?: Dataset[number] extends { id: string | number } ? boolean : false
}

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

function isEmptyValue(value: unknown): boolean {
  return value === null || value === undefined || value === ''
}

/**
 * Compares two cell values. Numbers, dates and booleans compare naturally,
 * everything else as locale aware strings ("item 2" before "item 10").
 */
function compareValues(a: unknown, b: unknown): number {
  if (a === b)
    return 0
  if (typeof a === 'number' && typeof b === 'number')
    return a - b
  if (a instanceof Date && b instanceof Date)
    return a.getTime() - b.getTime()
  if (typeof a === 'boolean' && typeof b === 'boolean')
    return Number(a) - Number(b)
  return collator.compare(String(a), String(b))
}

// Values which make sense to search through. Nested objects would only
// match against "[object Object]".
function searchableValues(row: Record<string, unknown>): string[] {
  return Object
    .values(row)
    .filter(value => value instanceof Date || (value !== null && typeof value !== 'object' && typeof value !== 'function'))
    .map(value => `${value}`)
}

// eslint-disable-next-line ts/explicit-function-return-type
export function defineTable<const Dataset extends any[]>(
  computedDataset: MaybeRefOrGetter<Dataset>,
  tableOptions?: TableOptionsInput<Dataset>,
) {
  const $data = computed(() => toValue(computedDataset))

  //
  // Reactive options + defaults. Nested pagination options are merged, so
  // passing only `{ enabled: true }` keeps the default `perPage`.
  const options = ref({
    ...tableOptions,
    pagination: {
      enabled: false,
      perPage: 10,
      maxPages: 3,
      ...tableOptions?.pagination,
    },
    select: tableOptions?.select ?? false,
  } as DeepRequired<TableOptionsInput<Dataset>>)

  //
  // Searching
  const search = ref<string>()

  //
  // Sorting. A regular ref, so changing its properties is reactive.

  const sorting = ref<Sorting<keyof Dataset[number]>>({
    key: undefined,
    type: 'asc',
  }) as Ref<Sorting<keyof Dataset[number]>>

  const setSort = (key: keyof Dataset[number], type: 'asc' | 'desc' | 'toggle' = 'asc'): void => {
    const nextType = type === 'toggle'
      // Toggle between descending & ascending whenever the set sort fn is called
      ? sorting.value.key === key && sorting.value.type === 'asc' ? 'desc' : 'asc'
      : type

    sorting.value = { key, type: nextType }
  }

  const clearSort = (): void => {
    sorting.value = { key: undefined, type: 'asc' }
  }

  //
  // Dataset formatting
  const filteredRows = computed<Dataset>(() => {
    const searchValue = search.value
    let final = $data.value

    if (searchValue) {
      final = final.filter((row: Dataset[number]) => searchString(searchableValues(row), searchValue)) as Dataset
    }

    const { key, type } = sorting.value

    if (key) {
      const direction = type === 'asc' ? 1 : -1
      final = [...final].sort((a: Dataset[number], b: Dataset[number]) => {
        const aValue = a[key]
        const bValue = b[key]

        // Empty values always go last, regardless of the direction
        const aEmpty = isEmptyValue(aValue)
        const bEmpty = isEmptyValue(bValue)
        if (aEmpty || bEmpty)
          return aEmpty === bEmpty ? 0 : aEmpty ? 1 : -1

        return compareValues(aValue, bValue) * direction
      }) as Dataset
    }

    return final
  })

  //
  // Pagination
  const currentPage = ref(1)

  const pagination = computed(() => paginate(
    filteredRows.value.length,
    currentPage.value,
    options.value.pagination?.perPage,
    options.value.pagination?.maxPages,
  ))

  // Keep the current page valid when the data shrinks (e.g. while searching)
  watch(() => pagination.value.totalPages, (totalPages) => {
    if (currentPage.value > totalPages)
      currentPage.value = totalPages
  })

  const canNextPage = computed(() => pagination.value.currentPage < pagination.value.totalPages)
  const canPrevPage = computed(() => pagination.value.currentPage > 1)

  /**
   * Sets the currently active data page. Please note that you provide the page
   * number, no its index. So this is 1-indexed input. Values outside of the
   * available pages are clamped.
   *
   * @param page Page number
   */
  const setPage = (page: number): void => {
    currentPage.value = Math.min(Math.max(1, Math.floor(page) || 1), pagination.value.totalPages)
  }

  const headers = computed(() => Object
    .keys($data.value[0] || {})
    .map((key) => {
      const typedKey = key as keyof Dataset[number]
      return {
        label: key,
        sortKey: sorting.value.key === typedKey ? sorting.value.type : undefined,
        sortToggle: () => {
          // 3-way toggle asc -> desc -> turn off (reset to undefined)
          if (sorting.value.key === typedKey) {
            if (sorting.value.type === 'asc')
              sorting.value = { key: typedKey, type: 'desc' }
            else
              clearSort()
          }
          else {
            setSort(typedKey)
          }
        },
      } as Header
    }),
  )

  const rows = computed<Dataset>(() => {
    if (options.value.pagination?.enabled === true) {
      return filteredRows.value.slice(
        pagination.value.startIndex,
        pagination.value.endIndex + 1,
      ) as Dataset
    }
    return filteredRows.value as Dataset
  })

  //
  // Row selecting
  const selectedRows = ref<Map<string | number, Dataset[number]>>(new Map())
  const selectingEnabled = computed(() => options.value.select as boolean)

  // Rows removed from the dataset can not stay selected
  watch($data, (data) => {
    if (selectedRows.value.size === 0)
      return
    const ids = new Set(data.map(row => row.id))
    const next = new Map([...selectedRows.value].filter(([id]) => ids.has(id)))
    if (next.size !== selectedRows.value.size)
      selectedRows.value = next
  })

  /**
   * Checks whether the provided row is already selected. If it is, it deselects it.
   * Uses `row.id` as the Map key for O(1) lookup, so paginated rows (new references, same data) work correctly.
   */
  function selectRow(row: Dataset[number]): void {
    if (selectedRows.value.has(row.id)) {
      selectedRows.value.delete(row.id)
    }
    else {
      selectedRows.value.set(row.id, row)
    }
  }

  // "All" refers to the rows matching the current search
  const isSelectedAll = computed(() => filteredRows.value.length > 0
    && filteredRows.value.every(row => selectedRows.value.has(row.id)))

  const isSelectedSome = computed(() => !isSelectedAll.value
    && filteredRows.value.some(row => selectedRows.value.has(row.id)))

  /**
   * Selects every row matching the current search, or deselects them when they
   * are all selected already
   */
  function selectAllRows(): void {
    const next = new Map(selectedRows.value)

    if (isSelectedAll.value) {
      for (const row of filteredRows.value)
        next.delete(row.id)
    }
    else {
      for (const row of filteredRows.value)
        next.set(row.id, row)
    }

    selectedRows.value = next
  }

  function deselectAllRows(): void {
    selectedRows.value = new Map()
  }

  const selection: TableSelectionProvide<Dataset[number]> = {
    selectedRows,
    selectRow,
    selectAllRows,
    enabled: selectingEnabled,
    isSelectedAll,
    isSelectedSome,
  }

  // Provided for backwards compatibility. When a component defines more than
  // one table, pass the table to <Table.Root :table="..."> instead.
  provide(TableSelectionProvideSymbol as InjectionKey<TableSelectionProvide<Dataset[number]>>, selection)

  return {
    setSort,
    clearSort,
    search,
    sorting,
    rows,
    allRows: filteredRows,
    selectedRows: computed(() => [...selectedRows.value.values()]),
    headers,
    pagination,
    canPrevPage,
    canNextPage,
    setPage,
    options,
    selectRow,
    selectAllRows,
    isSelectedAll,
    isSelectedSome,
    deselectAllRows,
    selection,
  }
}
