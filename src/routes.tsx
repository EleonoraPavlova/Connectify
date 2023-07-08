import { Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";

function RoutesComponents() {
  <Routes>
    <Route path="/dialogs" element={<Dialogs name="Elena" />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
};

export default RoutesComponents;
