import { useContext } from 'react'
import { createContext, useState, useEffect } from 'react'

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:3001'

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState({})
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      } catch {
        alert('There was an error loading data...')
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])

  // Get city detail
  const getCity = async (id) => {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()
      setCurrentCity(data)
    } catch {
      alert('There was an error loading data...')
    } finally {
      setIsLoading(false)
    }
  }
  return <CitiesContext.Provider value={{ cities, setCities, isLoading, setIsLoading, getCity, currentCity }}>{children}</CitiesContext.Provider>
}

const useCitiesContext = () => {
  const context = useContext(CitiesContext)
  return context
}
export { CitiesProvider, useCitiesContext }
