import { useState, useEffect } from 'react'
import { getProducts } from '@/services/products.js'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card.jsx'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table.jsx'
import { NavLink } from 'react-router'
import { SquarePen } from 'lucide-react'

function Products() {

  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    const data = await getProducts()
    setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="p-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="font-bold">Name</TableCell>    
                <TableCell className="font-bold">Manufacturer</TableCell>
                <TableCell className="font-bold">Style</TableCell>
                <TableCell className="font-bold text-right">Purchase Price</TableCell>
                <TableCell className="font-bold text-right">Sale Price</TableCell>
                <TableCell className="font-bold text-right">Quantity</TableCell>
                <TableCell className="font-bold text-right">Commission</TableCell>
                <TableCell className="font-bold"></TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.manufacturer}</TableCell>
                  <TableCell>{product.style}</TableCell>
                  <TableCell className="text-right">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(product.purchasePrice)}</TableCell>
                  <TableCell className="text-right">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(product.salePrice)}</TableCell>
                  <TableCell className="text-right">{product.qtyOnHand}</TableCell>
                  <TableCell className="text-right">{product.commissionPercentage.toFixed(2)}%</TableCell>
                  <TableCell className="text-right">
                    <NavLink to={`/products/${product.id}`} className="pointer">
                      <SquarePen className="inline-block mr-1" />
                    </NavLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Products
