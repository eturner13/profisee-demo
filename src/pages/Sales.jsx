import { useState, useEffect } from 'react'
import { getSales } from '../services/sales.js'
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

function Sales() {

  const [sales, setSales] = useState([])

  const fetchSales = async () => {
    const data = await getSales()
    setSales(data)
  }

  useEffect(() => {
    fetchSales()
  }, [])

  return (
    <div className="p-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="font-bold">Date</TableCell>
                <TableCell className="font-bold">Product</TableCell>
                <TableCell className="font-bold">Customer</TableCell>
                <TableCell className="font-bold">Sales Person</TableCell>
                <TableCell className="font-bold text-right">Sale Price</TableCell>
                <TableCell className="font-bold text-right">Commission</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{new Date(sale.date).toLocaleDateString("en-US", {day: '2-digit', month: '2-digit', year: 'numeric'})}</TableCell>
                  <TableCell>{sale.product.name}</TableCell>
                  <TableCell>{sale.customer.firstName + ' ' + sale.customer.lastName}</TableCell>
                  <TableCell>{sale.salesPerson.firstName + ' ' + sale.salesPerson.lastName}</TableCell>
                  <TableCell className="text-right">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(sale.product.salePrice)}</TableCell>
                  <TableCell className="text-right">{sale.product.commissionPercentage.toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Sales
