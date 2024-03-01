import { Action } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { userProfileReducer } from './reducers/userProfile/userProfileReducer'
import { appReducer } from './reducers/appSlice/appSlice'
import { authReducer } from './reducers/auth/authReducer'
import { dialogsPageReducer } from './reducers/dialogs/dialogsPageReducer'
import { friendsPageReducer } from './reducers/friends/friendsPageReducer'
import { usersReducer } from './reducers/users/usersReducer'
import { saveState } from 'utils/localStorage-utils'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    dialogsPage: dialogsPageReducer,
    friendsPage: friendsPageReducer,
    usersPage: usersReducer,
    userProfile: userProfileReducer,
    app: appReducer,
    auth: authReducer,
  },
})

export type AppRootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, Action<string>>

store.subscribe(() => {
  saveState({
    usersPage: store.getState().usersPage,
  })
})

export type AppDispatch = ThunkDispatch<AppRootState, unknown, Action>

//@ts-ignore
window.store = store
