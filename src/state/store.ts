import { combineReducers, legacy_createStore } from "redux";
import { dialogsPageReducer } from "src/reducers/dialogs/dialogsPageReducer";
import { friendsPageReducer } from "src/reducers/friends/friendsPageReducer";
import { profilePageReducer } from "src/reducers/profile/profilePageReducer";
import { usersPageReducer } from "src/reducers/users/usersPageReducer";

//обязательно Provider в App
//одельный reducer отвечает за каждую ветку

export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  //все dispatch приходят в rootReducer, а он самостоятельно раскидывает их
  //по нужным напрвлениям
  dialogsPage: dialogsPageReducer,
  profilePage: profilePageReducer,
  friendsPage: friendsPageReducer,
  usersPage: usersPageReducer
})

export const store = legacy_createStore(rootReducer)


//@ts-ignore
window.store = store

