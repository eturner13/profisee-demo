import { useState, useEffect } from 'react'
import { getCustomers } from '../services/customers.js'

function Customers() {

  const [customers, setCustomers] = useState([])

  const fetchCustomers = async () => {
    const data = await getCustomers()
    setCustomers(data)
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  return <div>
    <h1>Customers</h1>
    <ul>
      {customers.map(customer => (
        <li key={customer.id}>{customer.firstName}</li>
      ))}
    </ul>
  </div>
}

export default Customers
