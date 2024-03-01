import { Action, applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { userProfileReducer } from './reducers/userProfile/userProfileReducer'
import { appReducer } from './reducers/app-reducer/appReducer'
import { authReducer } from './reducers/auth/authReducer'
import { dialogsPageReducer } from './reducers/dialogs/dialogsPageReducer'
import { friendsPageReducer } from './reducers/friends/friendsPageReducer'
import { usersReducer } from './reducers/users/usersReducer'
import { loadState, saveState } from 'utils/localStorage-utils'

export type AppRootStateType = ReturnType<typeof rootReducer>

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)

const rootReducer = combineReducers({
  dialogsPage: dialogsPageReducer,
  friendsPage: friendsPageReducer,
  usersPage: usersReducer,
  userProfile: userProfileReducer,
  app: appReducer,
  auth: authReducer,
})

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, Action<string>>
export const store = legacy_createStore(rootReducer, loadState(), composeEnhancers(applyMiddleware(thunk)))

store.subscribe(() => {
  saveState({
    usersPage: store.getState().usersPage,
  })
})

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, Action>

//@ts-ignore
window.store = store
