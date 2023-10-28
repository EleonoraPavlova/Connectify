import { Routes, Route } from 'react-router-dom';
import { Profile } from "./pages/Profile/Profile";
import { Dialogs } from "./pages/Dialogs/Dialogs";
import { News } from "./pages/News/News";
import { Music } from "./pages/Music/Music";
import { Settings } from "./pages/Settings/Settings";
import { Friends } from "./pages/Friends/Friends";
import { UserDialogs } from "./pages/Dialogs/UserDialogs/UserDialogs";
import { FindUsers } from "./pages/FindUsers/FindUsers";


export const RoutesComponents = () => {
  return (<Routes>
    <Route path="/" element={<Profile />} />
    <Route path="/dialogs" element={<Dialogs welcome="Hi, my friends!" />} />
    <Route path="/friends" element={<Friends />} />
    <Route path="/find-friends" element={<FindUsers />} />
    <Route path="/news" element={<News />} />
    <Route path="/music" element={<Music />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/dialogs/:id" element={<UserDialogs name="Valentin" />} />
  </Routes>)

};

export default RoutesComponents;
