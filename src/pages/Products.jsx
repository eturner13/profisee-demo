import { useState, useEffect } from 'react'
import { getProducts } from '../services/products.js'

function Products() {

  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    const data = await getProducts()
    setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return <div>
    <h1>Products</h1>
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  </div>
}

export default Products
