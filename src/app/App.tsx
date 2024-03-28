import React, { useEffect } from 'react'
import './App.scss'
import { Header } from '../common/Header/Header'
import { Nav } from '../components/Nav/Nav'
import RoutesComponents from '../routes/routes'
import { SnackbarComponent } from '../components/Snackbar/SnackbarComponent'
import { useAppDispatch } from '../state/hooks/selectors'
import Box from '@mui/material/Box'
import { selectAppInitialized, setAppInitializeTC } from '../state/reducers/appSlice/appSlice'
import CircularProgress from '@mui/material/CircularProgress'
import { useSelector } from 'react-redux'
import { Footer } from 'common/Footer'

const App = () => {
  let initialized = useSelector(selectAppInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setAppInitializeTC())
  }, [dispatch])

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
