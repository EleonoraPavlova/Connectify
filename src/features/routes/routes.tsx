import { Dialogs } from 'features/pages/Dialogs/Dialogs'
import { UserDialogs } from 'features/pages/Dialogs/UserDialogs'
import { Users } from 'features/pages/FindUsers'
import { Friends } from 'features/pages/Friends'
import { Login } from 'features/pages/Login'
import { Music } from 'features/pages/Music/Music'
import { News } from 'features/pages/News/News'
import { NotFound } from 'features/pages/NotFound/NotFound'
import { Profile } from 'features/pages/Profile'
import { Settings } from 'features/pages/Settings/Settings'
import { Navigate, Route, Routes } from 'react-router-dom'

export const RoutesComponents = () => {
  return (
    <Routes>
      <Route path="/" element={<Profile />} />
      <Route path="/dialogs" element={<Dialogs welcome="Hi, my friends!" />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/findUsers" element={<Users />} />
      <Route path="/news" element={<News />} />
      <Route path="/music" element={<Music />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dialogs/:id" element={<UserDialogs name="Valentin" />} />
      <Route path="404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  )
}

export default RoutesComponents
