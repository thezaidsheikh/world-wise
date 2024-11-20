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

import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import { CitiesProvider } from './contexts/CitiesContext'

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/product" element={<Product />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="cities" replace />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:cityId" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  )
}

export default App
