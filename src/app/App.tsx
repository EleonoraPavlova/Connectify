import React, { useEffect } from 'react'
import './App.scss'
import { Header } from '../components/Header/Header'
import { Nav } from '../components/Nav/Nav'
import RoutesComponents from '../routes/routes'
import { useAppDispatch } from '../state/hooks/selectors'
import Box from '@mui/material/Box'
import { appThunks, selectAppInitialized } from '../state/reducers/appSlice/appSlice'
import CircularProgress from '@mui/material/CircularProgress'
import { useSelector } from 'react-redux'
import { Footer } from 'components/Footer'
import { SnackBar } from 'components/Snackbar'
import { useNavigate } from 'react-router-dom'
import { selectIsLoggedIn } from 'state/reducers/authSlice/authSlice'

const App = () => {
  let initialized = useSelector(selectAppInitialized)
  let isLoggedIn = useSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(appThunks.setAppInitializeTC())
  }, [dispatch])

  useEffect(() => {
    if (!isLoggedIn && initialized) {
      navigate('/login')
    } else {
      navigate('/')
    }
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
      <SnackBar />
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
