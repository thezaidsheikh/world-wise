import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Product from './pages/Product'
import Homepage from './pages/Homepage'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotfound'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
import { Navigate } from 'react-router-dom'
import CityList from './components/CityList'
import { useState } from 'react'
import { useEffect } from 'react'
import CountryList from './components/CountryList'
const BASE_URL = 'http://localhost:3001'
function App() {
  const [cities, setCities] = useState([])
  console.log(cities)
  const [isLoading, setIsLoading] = useState(false)
  console.log(isLoading)
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
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/product" element={<Product />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="cities" replace />} />
            <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
            <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
            <Route path="form" element={<p>Form</p>} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
