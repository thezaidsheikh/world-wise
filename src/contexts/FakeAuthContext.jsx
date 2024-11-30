import { useReducer } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'

const FakeAuthContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true }

    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true }

    case 'logout':
      return { ...state, user: {}, isAuthenticated: false }

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload }

    case 'loaded':
      return { ...state, isLoading: false }

    default:
      throw new Error('unknown action type')
  }
}

const initialState = {
  user: {},
  isAuthenticated: false,
  isLoading: false,
}

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
}

function FakeAuthProvider({ children }) {
  const [{ user, isAuthenticated, isLoading }, dispatch] = useReducer(reducer, initialState)
  const login = async (payload) => {
    try {
      dispatch({ type: 'loading' })
      if (payload.email === FAKE_USER.email && payload.password == FAKE_USER.password) {
        dispatch({ type: 'login', payload: FAKE_USER })
      } else dispatch({ type: 'rejected', payload: 'Email or password are incorrect' })
    } catch {
      dispatch({ type: 'rejected', payload: 'There was an error to login...' })
    }
  }

  const logout = async () => {
    try {
      dispatch({ type: 'logout' })
    } catch {
      dispatch({ type: 'rejected', payload: 'There was an error to login...' })
    }
  }
  return <FakeAuthContext.Provider value={{ login, isAuthenticated, user, isLoading, logout }}>{children}</FakeAuthContext.Provider>
}

const useFakeAuthContext = () => {
  const context = useContext(FakeAuthContext)
  return context
}

export { FakeAuthProvider, useFakeAuthContext }
