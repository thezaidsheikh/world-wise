import { useReducer } from 'react'
import { useCallback } from 'react'
import { useContext } from 'react'
import { createContext, useEffect } from 'react'

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:3001'

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true }

    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload }

    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload }

    case 'city/created':
      return { ...state, cities: [...state.cities, action.payload], isLoading: false, currentCity: action.payload }

    case 'city/deleted':
      return { ...state, cities: state.cities.filter((city) => city.id !== action.payload), isLoading: false, currentCity: {} }

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload }

    case 'loaded':
      return { ...state, isLoading: false }

    default:
      throw new Error('unknown action type')
  }
}

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
}
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState)

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: 'loading' })
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        dispatch({ type: 'cities/loaded', payload: data })
      } catch {
        dispatch({ type: 'rejected', payload: 'There was an error loading cities...' })
      }
    }
    fetchCities()
  }, [])

  // Get city detail
  const getCity = useCallback(
    async (id) => {
      try {
        if (id === currentCity.id) return
        dispatch({ type: 'loading' })
        const res = await fetch(`${BASE_URL}/cities/${id}`)
        const data = await res.json()
        dispatch({ type: 'city/loaded', payload: data })
      } catch {
        dispatch({ type: 'rejected', payload: 'There was an error fetching city...' })
      }
    },
    [currentCity.id]
  )

  const createCity = async (newCity) => {
    try {
      dispatch({ type: 'loading' })
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      dispatch({ type: 'city/created', payload: data })
    } catch {
      dispatch({ type: 'rejected', payload: 'There was an error creating city...' })
    }
  }

  const deleteCity = async (cityId) => {
    try {
      dispatch({ type: 'loading' })
      await fetch(`${BASE_URL}/cities/${cityId}`, {
        method: 'DELETE',
      })
      dispatch({ type: 'city/deleted', payload: cityId })
    } catch {
      dispatch({ type: 'rejected', payload: 'There was an error deleting city...' })
    }
  }
  return <CitiesContext.Provider value={{ cities, isLoading, getCity, currentCity, createCity, deleteCity }}>{children}</CitiesContext.Provider>
}

const useCitiesContext = () => {
  const context = useContext(CitiesContext)
  return context
}

export { CitiesProvider, useCitiesContext }
