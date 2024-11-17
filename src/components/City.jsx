// import styles from './City.module.css'

import { useSearchParams } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function City() {
  const cityId = useParams().cityId
  const [searchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  return (
    <>
      <p>City {cityId}</p>
      <p>
        Position - {lat}, {lng}
      </p>
    </>
  )
}

export default City
