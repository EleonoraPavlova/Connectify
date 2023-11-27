import { AnyAction, combineReducers, legacy_createStore } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { dialogsPageReducer } from "src/reducers/dialogs/dialogsPageReducer";
import { friendsPageReducer } from "src/reducers/friends/friendsPageReducer";
import { profilePageReducer } from "src/reducers/profile/profilePageReducer";
import { usersPageReducer } from "src/reducers/users/usersPageReducer";

//обязательно Provider в App
//одельный reducer отвечает за каждую ветку

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  //все dispatch приходят в rootReducer, а он самостоятельно раскидывает их
  //по нужным напрвлениям
  dialogsPage: dialogsPageReducer,
  profilePage: profilePageReducer,
  friendsPage: friendsPageReducer,
  usersPage: usersPageReducer
})

export const store = legacy_createStore(rootReducer)
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction> //будет приниматься любой action


//@ts-ignore
window.store = store

