import { useState } from 'react'
import { Navigate } from 'react-router-dom'

const PrivateProfile = ({ Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return isAuthenticated ? <Component /> : <Navigate to="/login" />
}
export default PrivateProfile
