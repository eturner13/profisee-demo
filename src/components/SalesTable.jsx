import {
  Card,
  CardContent,
} from '@/components/ui/card.jsx'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table.jsx'

function SalesTable({ sales }) {

  return (
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
            {sales?.map((person) => (
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
  )
}

export default SalesTable
