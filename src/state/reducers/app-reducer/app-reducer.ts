export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'//server interaction status


export type InitialStateType = {
  status: RequestStatusType,
  error: string | null,
  //download: string | null
}

export type SetErrorApp = ReturnType<typeof setErrorAppAC>
export type SetStatusApp = ReturnType<typeof setStatusAppAC>

export type ActionAppType = SetErrorApp | SetStatusApp

export const appInitialStatusState: InitialStateType = {
  status: 'idle',
  error: null
}

export let InitialState: InitialStateType = {
  status: 'idle',
  error: null,
  //download: null
}

export const appReducer = (state: InitialStateType = InitialState, action: ActionAppType): InitialStateType => {
  switch (action.type) {
    case "SET-APP-ERROR":
      return { ...state, error: action.error }
    case "SET-APP-STATUS":
      return { ...state, status: action.status }
    default: return { ...state }
  }
}

//action creator
export const setErrorAppAC = (error: string | null) => {
  return {
    type: "SET-APP-ERROR",
    error
  } as const
}

export const setStatusAppAC = (status: RequestStatusType) => {
  return {
    type: "SET-APP-STATUS",
    status
  } as const
}