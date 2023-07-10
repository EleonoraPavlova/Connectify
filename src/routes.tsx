import { Routes, Route } from 'react-router-dom';
import Profile from "./pages/Profile/Profile";
import Dialogs from "./pages/Dialogs/Dialogs"
import News from "./pages/News/News"
import Music from "./pages/Music/Music";
import Settings from "./pages/Settings/Settings";

const RoutesComponents = () => {
  return (<Routes>
    <Route path="/dialogs" element={<Dialogs name={"Elena"} />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/news" element={<News />} />
    <Route path="/music" element={<Music />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>)

};

export default RoutesComponents;
