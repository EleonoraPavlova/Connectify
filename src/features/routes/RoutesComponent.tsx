import { Box, Typography } from '@mui/material'
import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Profile = lazy(() => import('features/pages/Profile'))
const Dialogs = lazy(() => import('features/pages/Dialogs/Dialogs'))
const Friends = lazy(() => import('features/pages/Friends'))
const Users = lazy(() => import('features/pages/FindUsers'))
const News = lazy(() => import('features/pages/News'))
const Music = lazy(() => import('features/pages/Music/Music'))
const Settings = lazy(() => import('features/pages/Settings'))
const Login = lazy(() => import('features/pages/Login'))
const UserDialogs = lazy(() => import('features/pages/Dialogs/UserDialogs'))
const NotFound = lazy(() => import('features/pages/NotFound/NotFound'))

export const RoutesComponent = () => {
  return (
    <Suspense
      fallback={
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#008000' }}>
          <Typography>Loader........</Typography>
        </Box>
      }>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/dialogs" element={<Dialogs />} />
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
    </Suspense>
  )
}
