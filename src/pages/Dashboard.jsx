import { useState, useEffect } from 'react'
import { getSales } from '@/services/sales.js'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card.jsx'
import SalesChart from '@/components/SalesChart.jsx'
import SalesTable from '@/components/SalesTable'

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

      <SalesChart sales={saleData.salesByPerson} />

      <SalesTable sales={saleData.salesByPerson} />
    </div>
  )
}

export default Dashboard
