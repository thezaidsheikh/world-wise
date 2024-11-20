import { useNavigate } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import styles from './Map.module.css'
import { useCitiesContext } from '../contexts/CitiesContext'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'

function Map() {
  const { cities } = useCitiesContext()
  const [position, setPosition] = useState([40, 0])
  const [searchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  useEffect(
    function () {
      if (lat && lng) setPosition([lat, lng])
    },
    [lat, lng]
  )
  return (
    <div className={styles.mapContainer}>
      <MapContainer center={position} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

const ChangeCenter = ({ position }) => {
  const map = useMap()
  map.setView(position)
  return null
}

const DetectClick = () => {
  const navigate = useNavigate()
  useMapEvents({
    click: (e) => {
      navigate(`form/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    },
  })
  return null
}
export default Map
