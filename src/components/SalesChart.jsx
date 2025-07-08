import {
  Card,
  CardContent,
} from '@/components/ui/card.jsx'
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

function SalesChart({ sales }) {
  return (
      <Card className="mt-5">
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sales}>
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
  )
}

export default SalesChart
