import { Action, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { dialogsPageReducer } from "src/state/reducers/dialogs/dialogsPageReducer";
import { friendsPageReducer } from "src/state/reducers/friends/friendsPageReducer";
import { usersReducer } from "src/state/reducers/users/usersReducer";
import { profileReducer } from "src/state/reducers/profile/profileReducer";
import { userProfileReducer } from "./reducers/userProfile/userProfileReducer";
import { appReducer } from "./reducers/app-reducer/app-reducer";
import { authReducer } from "./reducers/auth/authReducer";

//обязательно Provider в App
//одельный reducer отвечает за каждую ветку

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  dialogsPage: dialogsPageReducer,
  profilePage: profileReducer,
  friendsPage: friendsPageReducer,
  usersPage: usersReducer,
  userProfile: userProfileReducer,
  app: appReducer,
  auth: authReducer
})

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  Action<string>
>
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, Action>


//@ts-ignore
window.store = store