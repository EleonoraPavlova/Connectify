import { combineReducers, legacy_createStore } from "redux";
import { dialogsPageReducer } from "src/reducers/dialogsPageReducer";
import { profilePageReducer } from "src/reducers/profilePageReducer";

//обязательно Provider в App
//одельный reducer отвечает за каждую ветку

export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  //все dispatch приходят в rootReducer, а он самостоятельно раскидывает их
  //по нужным напрвлениям
  dialogsPage: dialogsPageReducer,
  profilePage: profilePageReducer
})

export const store = legacy_createStore(rootReducer)


//@ts-ignore
window.store = store

