import { Action } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { appReducer } from './reducers/appSlice/appSlice'
import { saveState } from 'utils/localStorage-utils'
import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/authSlice/authSlice'
import { usersReducer } from './reducers/usersSlice/usersSlice'
import { userProfileReducer } from './reducers/userProfileSlice/userProfileSlice'
import { dialogsReducer } from './reducers/dialogsSlice/dialogsSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    dialogs: dialogsReducer,
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
