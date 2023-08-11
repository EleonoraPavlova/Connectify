import { Routes, Route } from 'react-router-dom';
import Profile from "./pages/Profile/Profile";
import Dialogs from "./pages/Dialogs/Dialogs";
import News from "./pages/News/News";
import Music from "./pages/Music/Music";
import Settings from "./pages/Settings/Settings";
import dataState from "./state/dataState";
import { DialogsPage, ProfilePage, FriendsPage } from "./state/dataState";
import Friends from "./pages/Friends/Friends";
import UserDialogs from "./pages/Dialogs/UserDialogs/UserDialogs";

type RoutesComponentsProps = DialogsPage & ProfilePage & FriendsPage;

const RoutesComponents = (props: RoutesComponentsProps) => {
  return (<Routes>
    <Route path="/" element={<Profile postsData={dataState.profilePage.postsData} />} />
    <Route path="/dialogs" element={<Dialogs dialogsData={dataState.dialogsPage.dialogsData} messagesData={dataState.dialogsPage.messagesData}
      welcome="Hi, my friends!" />} />
    <Route path="/friends" element={<Friends friendsData={dataState.friendsPage.friendsData} />} />
    <Route path="/news" element={<News />} />
    <Route path="/music" element={<Music />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/dialogs/:id" element={<UserDialogs name="Valentin" />} />
  </Routes>)

};

export default RoutesComponents;
