import { initialPaginationType, paginationReducer, setPaginationParamsAC } from './paginationReducer'

test('reducer should set pagination params', () => {
  const initialState: initialPaginationType = {
    count: 1,
    page: 1,
    pageSize: 5,
    currentPage: 1,
  }

  let endState = paginationReducer(
    initialState,
    setPaginationParamsAC({
      count: 3,
      page: 10,
      pageSize: 6,
      currentPage: 2,
    })
  )

  expect(initialState.count).toBe(1)
  expect(endState.count).toBe(3)
  expect(initialState.page).toBe(1)
  expect(endState.page).toBe(10)
  expect(initialState.pageSize).toBe(5)
  expect(endState.pageSize).toBe(6)
  expect(initialState.currentPage).toBe(1)
  expect(endState.currentPage).toBe(2)
})
