import { useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import { useNavigate } from 'react-router-dom'

function Map() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate('form')
      }}>
      <p>Lat - {lat}</p>
      <p>Lat - {lng}</p>
      <button
        className="btn btn-primary"
        onClick={() => {
          setSearchParams({ lat: '1212', lng: '2323' })
        }}>
        Change
      </button>
    </div>
  )
}

export default Map
