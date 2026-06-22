import type { ComputedRef, InjectionKey, MaybeRefOrGetter, Ref } from 'vue'
import type { DeepRequired } from '../../lib/types'
import { computed, provide, ref, shallowRef, toValue } from 'vue'
import { searchString } from '../../lib/helpers'
import { paginate } from '../Pagination/pagination'

export interface TableSelectionProvide<Row = any> {
  selectedRows: Ref<Map<string | number, Row>>
  selectRow: (row: Row) => void
  selectAllRows: () => void
  enabled: ComputedRef<boolean>
  isSelectedAll: ComputedRef<boolean>
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

// eslint-disable-next-line ts/explicit-function-return-type
export function defineTable<const Dataset extends any[]>(
  computedDataset: MaybeRefOrGetter<Dataset>,
  tableOptions?: TableOptionsInput<Dataset>,
) {
  const $data = computed(() => toValue(computedDataset))

  //
  // Reactive options + defaults
  const options = ref({
    pagination: {
      enabled: false,
      perPage: 10,
      maxPages: 3,
    },
    select: false,
    ...tableOptions,
  } as DeepRequired<TableOptionsInput<Dataset>>)

  //
  // Pagination
  const currentPage = ref(1)

  const pagination = computed(() => paginate(
    $data.value.length,
    currentPage.value,
    options.value.pagination?.perPage,
    options.value.pagination?.maxPages,
  ))

  const canNextPage = computed(() => pagination.value.currentPage < pagination.value.endPage)
  const canPrevPage = computed(() => pagination.value.currentPage > pagination.value.startPage)

  /**
   * Sets the currently active data page. Please note that you provide the page
   * number, no its index. So this is 1-indexed input
   *
   * @param page Page number
   */
  const setPage = (page: number): void => {
    if ((page > currentPage.value && canNextPage.value)
      || (page < currentPage.value && canPrevPage.value)) {
      currentPage.value = page
    }
  }

  //
  // Sorting

  const sorting = shallowRef<Sorting<keyof Dataset[number]>>({
    key: undefined,
    type: 'asc',
  })

  const setSort = (key: keyof Dataset[number], type: 'asc' | 'desc' | 'toggle' = 'asc'): void => {
    sorting.value.key = key
    sorting.value.type = type === 'toggle'
      // Toggle between descending & ascending whenever the set sort fn is called
      ? sorting.value.type === 'asc' ? 'desc' : 'asc'
      : type
  }

  const clearSort = (): void => {
    sorting.value.key = undefined
    sorting.value.type = 'asc'
  }

  //
  // Searching
  const search = ref<string>()

  //
  // Dataset formatting
  const filteredRows = computed<Dataset>(() => {
    const searchValue = search.value
    let final = $data.value

    if (searchValue) {
      final = final.filter((row: Dataset[number]) => {
        const matches = Object
          .values(row)
          .map(row => `${row}`)
        return searchString(matches, searchValue)
      }) as Dataset
    }

    const key = sorting.value.key

    if (key) {
      final = final.toSorted((a: Dataset[number], b: Dataset[number]) => {
        const aValue = a[key]
        const bValue = b[key]
        return sorting.value.type === 'asc'
          ? aValue > bValue ? 1 : -1
          : aValue > bValue ? -1 : 1
      }) as Dataset
    }

    return final
  })

  const headers = computed(() => Object
    .keys($data.value[0] || {})
    .map((key) => {
      const typedKey = key as keyof Dataset[number]
      return {
        label: key,
        sortKey: sorting.value.key === typedKey && sorting.value.type,
        sortToggle: () => {
          // 3-way toggle asc -> desc -> turn off (reset to undefined)
          if (sorting.value.key === typedKey) {
            switch (sorting.value.type) {
              case 'asc': {
                sorting.value.type = 'desc'
                break
              }
              case 'desc': {
                sorting.value.key = undefined
                sorting.value.type = 'asc'
                break
              }
              default: {
                sorting.value.key = typedKey
                sorting.value.type = 'asc'
                break
              }
            }
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

  const isSelectedAll = computed(() => $data.value.length === selectedRows.value.size)

  /**
   * Selects the entire dataset
   */
  function selectAllRows(): void {
    if (isSelectedAll.value) {
      // If the selected indexes have the same length as the data array, we can
      // assume all of them are selected. Therefore we toggle it by deselecting
      // all of them
      selectedRows.value = new Map()
    }
    else {
      selectedRows.value = new Map($data.value.map(row => [row.id, row]))
    }
  }

  function deselectAllRows(): void {
    selectedRows.value = new Map()
  }

  provide(TableSelectionProvideSymbol as InjectionKey<TableSelectionProvide<Dataset[number]>>, {
    selectedRows,
    selectRow,
    selectAllRows,
    enabled: selectingEnabled,
    isSelectedAll,
  })

  return {
    setSort,
    clearSort,
    search,
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
    deselectAllRows,
  }
}
