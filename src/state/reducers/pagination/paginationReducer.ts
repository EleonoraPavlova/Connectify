export type AuthActionType = ReturnType<typeof setPaginationParamsAC>

export type initialPaginationType = {
  count: number,
  page: number,
  pageSize: number,
  currentPage: number
}

const initialPagination: initialPaginationType = {
  count: 1,
  page: 1,
  pageSize: 5,
  currentPage: 1
}

export const paginationReducer = (state = initialPagination, action: AuthActionType): initialPaginationType => {
  switch (action.type) {
    case "SET-PAGINATION-PARAMS":
      return { ...state, ...action.params }
    default:
      return state
  }
}

//action creator
export const setPaginationParamsAC = (params: initialPaginationType) => {
  return {
    type: "SET-PAGINATION-PARAMS", params
  } as const
}