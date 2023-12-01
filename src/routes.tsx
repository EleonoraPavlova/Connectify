import { Routes, Route } from 'react-router-dom';
import { Dialogs } from "./pages/Dialogs/Dialogs";
import { News } from "./pages/News/News";
import { Music } from "./pages/Music/Music";
import { Settings } from "./pages/Settings/Settings";
import { Friends } from "./pages/Friends/Friends";
import { UserDialogs } from "./pages/Dialogs/UserDialogs/UserDialogs";
import { Users } from "./pages/FindUsers/Users";
import { Profile } from "./pages/Profile/Profile";


export const RoutesComponents = () => {
  return (<Routes>
    <Route path="/" element={<Profile />} />
    <Route path="/dialogs" element={<Dialogs welcome="Hi, my friends!" />} />
    <Route path="/friends" element={<Friends />} />
    <Route path="/findUsers" element={<Users />} />
    <Route path="/news" element={<News />} />
    <Route path="/music" element={<Music />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/dialogs/:id" element={<UserDialogs name="Valentin" />} />
  </Routes>)

};

export default RoutesComponents;
