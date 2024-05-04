import React, { useEffect } from 'react'
import './App.scss'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useSelector } from 'react-redux'
import { Footer } from 'components/Footer'
import { SnackBar } from 'components/Snackbar'
import { useNavigate } from 'react-router-dom'
import { appThunks, selectAppInitialized } from 'BLL/reducers/appSlice'
import { selectIsLoggedIn } from 'BLL/reducers/authSlice'
import { Header } from 'components/Header'
import { Nav } from 'components/Nav'
import { RoutesComponent } from 'features/routes/RoutesComponent'
import { useActions } from 'common/hooks/useActions'

const App = () => {
  let initialized = useSelector(selectAppInitialized)
  let isLoggedIn = useSelector(selectIsLoggedIn)
  const { setAppInitializeTC } = useActions(appThunks)

  const navigate = useNavigate()

  useEffect(() => {
    setAppInitializeTC()
  }, [setAppInitializeTC])

  useEffect(() => {
    if (!isLoggedIn && initialized) {
      navigate('/login')
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
        <RoutesComponent />
        <Footer />
      </div>
    </>
  )
}

export default App
