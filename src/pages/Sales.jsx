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
import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button.jsx'

function Sales() {

  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  })

  const [sales, setSales] = useState([])

  const fetchSales = async () => {
    const data = await getSales()
    if (dateRange.startDate && dateRange.endDate) {
      const filteredSales = data.filter(sale => {
        const saleDate = new Date(sale.date)
        const startDate = new Date(dateRange.startDate)
        const endDate = new Date(dateRange.endDate)
        return saleDate >= startDate && saleDate <= endDate
      })
      setSales(filteredSales.sort((a, b) => new Date(a.date) - new Date(b.date)))
      return
    }
    setSales(data.sort((a, b) => new Date(a.date) - new Date(b.date)))
  }

  useEffect(() => {
    fetchSales()
  }, [dateRange])

  return (
    <div className="p-5">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl">Sales</CardTitle>
          <div className="flex items-center justify-between">
            <div className="text-sm text-stone-500 mr-3">Filter:</div>
            <Input
                id="startDate"
                type="date"
                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
             />
             <div className="mx-2">to</div>
             <Input
                id="endDate"
                type="date"
                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
             />
             <Button
               onClick={() => setDateRange({ startDate: '', endDate: '' })}
               className="ml-3"
             >
               Clear
             </Button>
          </div>
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
