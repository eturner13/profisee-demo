import { useState, useEffect } from 'react'
import { getSalesPersons } from '../services/salespersons.js'

function SalesPersons() {

  const [salespersons, setSalesPersons] = useState([])

  const fetchSalesPersons = async () => {
    const data = await getSalesPersons()
    setSalesPersons(data)
  }

  useEffect(() => {
    fetchSalesPersons()
  }, [])

  return <div>
    <h1>SalesPersons</h1>
    <ul>
      {salespersons.map(salesperson => (
        <li key={salesperson.id}>{salesperson.firstName}</li>
      ))}
    </ul>
  </div>
}

export default SalesPersons
