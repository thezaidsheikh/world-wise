import { useCitiesContext } from '../contexts/CitiesContext'
import CityItem from './CityItem'
import styles from './CityList.module.css'
import Message from './Message'
import Spinner from './Spinner'

function CityList() {
  const { cities, isLoading } = useCitiesContext()
  if (isLoading) return <Spinner />
  if (!cities.length) return <Message message="No cities available" />

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  )
}

export default CityList
