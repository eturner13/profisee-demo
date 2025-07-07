import { useState, useEffect } from 'react'
import { getSales } from '../services/sales.js'

function Sales() {

  const [sales, setSales] = useState([])

  const fetchSales = async () => {
    const data = await getSales()
    setSales(data)
  }

  useEffect(() => {
    fetchSales()
  }, [])

  return <div>
    <h1>Sales</h1>
    <ul>
      {sales.map(sale => (
        <li key={sale.id}>{sale.date}</li>
      ))}
    </ul>
  </div>
}

export default Sales
