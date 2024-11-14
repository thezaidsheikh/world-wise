import styles from './CountryItem.module.css'

// const formatDate = (date) =>
//   new Intl.DateTimeFormat('en', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//   }).format(new Date(date))

function CountryItem({ city }) {
  const { country, emoji } = city
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  )
}

export default CountryItem
