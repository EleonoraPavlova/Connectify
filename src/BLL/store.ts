import { Action } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { appReducer, authReducer, userProfileReducer, usersReducer } from './reducers'
import { saveState } from 'common/utils/localStorage'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    users: usersReducer,
    userProfile: userProfileReducer,
  },
})

export type AppRootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, Action<string>>

store.subscribe(() => {
  saveState({
    userProfile: store.getState().userProfile,
  })
})

export type AppDispatch = ThunkDispatch<AppRootState, unknown, Action>

//@ts-ignore
window.store = store
