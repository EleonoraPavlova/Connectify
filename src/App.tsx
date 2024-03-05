import React, { useEffect } from 'react'
import './styles/App.scss'
import { Header } from './common/Header/Header'
import { Nav } from './components/Nav/Nav'
import { Footer } from './common/Footer/Footer'
import RoutesComponents from './routes'
import { SnackbarComponent } from './components/Snackbar/SnackbarComponent'
import { useAppDispatch } from './state/hooks/hooks-selectors'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import { selectAppInitialized, setAppInitializeTC } from './state/reducers/appSlice/appSlice'
import CircularProgress from '@mui/material/CircularProgress'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from 'state/reducers/authSlice/authSlice'

const App = () => {
  let initialized = useSelector(selectAppInitialized)
  let isLoggedIn = useSelector(selectIsLoggedIn)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setAppInitializeTC())
  }, [dispatch])

  useEffect(() => {
    if (!isLoggedIn && initialized) navigate('/login')
  }, [isLoggedIn, initialized, navigate])

  if (!initialized) {
    //loader во время проверки срока куки и настроек
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: '#008000', strokeWidth: 1 }} thickness={1} />
      </Box>
    )
  }

  return (
    <>
      <SnackbarComponent />
      <div className="App">
        <Header />
        <Nav />
        <RoutesComponents />
        <Footer />
      </div>
    </>
  )
}

export default App
