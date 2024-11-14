import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Message from './Message'
import Spinner from './Spinner'

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />
  if (!cities.length) return <Message message="No countries available" />

  //   const countries = cities.map((city) => {
  //     return { country: city.country, emoji: city.emoji }
  //   })
  return (
    <ul className={styles.countryList}>
      {cities.map((city) => (
        <CountryItem city={city} key={city.id} />
      ))}
    </ul>
  )
}

export default CountryList
