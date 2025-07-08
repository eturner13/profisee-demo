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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

function Dashboard() {

  const [saleData, setSalesData] = useState([])

  const fetchSales = async () => {
    const data = await getSales()
    const totalAllSales = data.reduce((acc, sale) => acc + sale.product.salePrice, 0)
    const numberOfSales = data.length
    const groupedSalesByPerson = Object.groupBy(data, ({ salesPersonId }) => salesPersonId)
    const salesByPerson = Object.entries(groupedSalesByPerson).map(([salesPersonId, sales]) => {
      const totalSales = sales.reduce((acc, sale) => acc + sale.product.salePrice, 0)
      const totalCommission = sales.reduce((acc, sale) => {
        return acc + (sale.product.salePrice * sale.product.commissionPercentage / 100)
      }, 0)
      return {
        salesPersonId,
        name: sales[0].salesPerson.firstName + ' ' + sales[0].salesPerson.lastName,
        numberOfSales: sales.length,
        totalSales: totalSales,
        commissionTotal: totalCommission,
        percentageOfSales: (totalSales / totalAllSales * 100).toFixed(2),
      }
    })
    salesByPerson.sort((a, b) => b.totalSales - a.totalSales)
    setSalesData({
      totalAllSales,
      numberOfSales,
      salesByPerson,
    })
  }

  useEffect(() => {
    fetchSales()
  }, [])

  return (
    <div className="p-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">At a Glance</CardTitle>
        </CardHeader>
        <CardContent className="flex">
          <div className="bg-stone-100 p-5 rounded-lg mr-5">
            <div className="text-3xl font-extrabold">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(saleData.totalAllSales)}</div>
            <div className="text-lg">Total Sales Amount</div>
          </div>
          <div className="bg-stone-200 p-5 rounded-lg mr-5">
            <div className="text-3xl font-extrabold">{saleData.numberOfSales}</div>
            <div className="text-lg">Number of Sales</div>
          </div>
          <div className="bg-stone-300 p-5 rounded-lg">
            <div className="flex space-between text-3xl font-extrabold">
              <div className="mr-5">{saleData.salesByPerson?.[0]?.name}</div>
              <div className="mr-5">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(saleData.salesByPerson?.[0]?.totalSales)}</div>
            </div>
            <div className="text-lg">Sales Leader</div>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-5">
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={saleData.salesByPerson}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="commissionTotal" name="Commission" fill="#0284c7" />
              <Bar dataKey="totalSales" name="Sales" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="mt-5">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="font-bold">Sales Person</TableCell>    
                <TableCell className="font-bold text-right">Number of Sales</TableCell>
                <TableCell className="font-bold text-right">Percentage of Total Sales</TableCell>
                <TableCell className="font-bold text-right">Sales</TableCell>
                <TableCell className="font-bold text-right">Commission</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {saleData.salesByPerson?.map((person) => (
                <TableRow key={person.salesPersonId}>
                  <TableCell>{person.name}</TableCell>
                  <TableCell className="text-right">{person.numberOfSales}</TableCell>
                  <TableCell className="text-right">{person.percentageOfSales}%</TableCell>
                  <TableCell className="text-right">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(person.totalSales)}</TableCell>
                  <TableCell className="text-right">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(person.commissionTotal)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
