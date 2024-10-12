export function createArray(length: number, startOffset: number = 0): number[] {
  return Array
    .from({ length })
    .map((_, index) => startOffset + index)
}

// Searches through the input and checkes wether it contains match
// It searches the input by splitting it by whitespace and matching each
// word against the string
export function searchInStr(match: string | string[], input: string): boolean {
  if (!match)
    return false

  const joint: string = Array.isArray(match) ? match.join(' ') : match

  const split = input.trim().split(/\s+/)
  return split.every(s => joint.toLowerCase().includes(s.toLowerCase()))
}

// Calculate pagination
interface Pagination {
  totalItems: number
  currentPage: number
  pageSize: number
  totalPages: number
  startPage: number
  endPage: number
  startIndex: number
  endIndex: number
  pages: number[]
}

export function paginate(
  totalItems: number,
  currentPage: number = 1,
  pageSize: number = 10,
  maxPages: number = 10,
): Pagination {
  // calculate total pages
  const totalPages = Math.ceil(totalItems / pageSize)

  // ensure current page isn't out of range
  if (currentPage < 1) {
    currentPage = 1
  }
  else if (currentPage > totalPages) {
    currentPage = totalPages
  }

  let startPage: number, endPage: number
  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1
    endPage = totalPages
  }
  else {
    // total pages more than max so calculate start and end pages
    const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2)
    const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1
      endPage = maxPages
    }
    else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1
      endPage = totalPages
    }
    else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage
      endPage = currentPage + maxPagesAfterCurrentPage
    }
  }

  // calculate start and end item indexes
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)

  // create an array of pages to ng-repeat in the pager control
  const pages = createArray((endPage + 1) - startPage).map(i => startPage + i)

  // return object with all pager properties required by the view
  return {
    totalItems,
    currentPage,
    pageSize,
    totalPages,
    startPage,
    endPage,
    startIndex,
    endIndex,
    pages,
  }
}
