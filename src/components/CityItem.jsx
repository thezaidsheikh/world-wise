import { Link } from 'react-router-dom'
import styles from './CityItem.module.css'
import { useCitiesContext } from '../contexts/CitiesContext'

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCitiesContext()
  const { cityName, emoji, date, id, position } = city

  async function handleDeleteCity(id) {
    await deleteCity(id)
  }
  return (
    <Link className={`${styles.cityItem} ${currentCity?.id == id ? styles['cityItem--active'] : ''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button
        className={styles.deleteBtn}
        onClick={(e) => {
          e.preventDefault()
          handleDeleteCity(id)
        }}>
        &times;
      </button>
    </Link>
  )
}

export default CityItem
