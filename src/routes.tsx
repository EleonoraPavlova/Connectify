import { Routes, Route } from 'react-router-dom';
import Profile from "./pages/Profile/Profile";
import Dialogs from "./pages/Dialogs/Dialogs";
import News from "./pages/News/News";
import Music from "./pages/Music/Music";
import Settings from "./pages/Settings/Settings";
import dataState from "./dataState";
import { DialogsPage, ProfilePage } from "./dataState";

type RoutesComponentsProps = DialogsPage & ProfilePage;

const RoutesComponents = (props: RoutesComponentsProps) => {
  return (<Routes>
    <Route path="/profile" element={<Profile postsData={dataState.profilePage.postsData} />} />
    <Route path="/dialogs" element={<Dialogs dialogsData={dataState.dialogsPage.dialogsData} messagesData={dataState.dialogsPage.messagesData}
      welcome="Hi, my friends!" />} />
    <Route path="/news" element={<News />} />
    <Route path="/music" element={<Music />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>)

};

export default RoutesComponents;
