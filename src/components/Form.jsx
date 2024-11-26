// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'
import styles from './Form.module.css'
import Button from './Button'
import BackButton from './BackButton'
import { useUrlPosition } from '../hooks/useUrlPosition'
import { useEffect } from 'react'
import Spinner from './Spinner'
import Message from './Message'
import { useCitiesContext } from '../contexts/CitiesContext'

const BASE_URL = 'https://api.bigdatacloud.net'

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

function Form() {
  const [lat, lng] = useUrlPosition()
  const [isLoading, setIsLoading] = useState(false)
  const [cityName, setCityName] = useState('')
  const [country, setCountry] = useState('')
  const [emoji, setEmoji] = useState('')
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState('')
  const { createCity } = useCitiesContext()
  const navigate = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault()
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    }
    await createCity(newCity)
    navigate('/app/cities')
  }

  useEffect(
    function () {
      if (!lat && !lng) []
      async function fetchPostionInfo() {
        try {
          setIsLoading(true)
          const res = await fetch(`${BASE_URL}/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
          const data = await res.json()
          if (!data.countryCode) throw new Error('This place is not a city')
          setCityName(data.city || '')
          setCountry(data.countryName)
          console.log(country)
          setEmoji(convertToEmoji(data.countryCode))
          console.log(data)
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchPostionInfo()
    },
    [lat, lng]
  )
  if (isLoading) return <Spinner />
  if (!lat && !lng) return <Message message="Start by clicking on the map" />
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input id="cityName" onChange={(e) => setCityName(e.target.value)} value={cityName} />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={() => {}}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  )
}

export default Form
