import { useEffect } from 'react'
import { useFakeAuthContext } from '../contexts/FakeAuthContext'
import { useNavigate } from 'react-router-dom'

function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useFakeAuthContext()
  const navigate = useNavigate()
  useEffect(
    function () {
      if (!isAuthenticated) navigate('/login')
    },
    [isAuthenticated, navigate]
  )
  return children
}

export default ProtectedRoutes
