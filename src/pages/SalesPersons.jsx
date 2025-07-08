import { useState, useEffect } from 'react'
import { getSalesPersons } from '@/services/salespersons.js'
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

function SalesPersons() {

  const [salespersons, setSalesPersons] = useState([])

  const fetchSalesPersons = async () => {
    const data = await getSalesPersons()
    setSalesPersons(data)
  }

  useEffect(() => {
    fetchSalesPersons()
  }, [])

  return (
    <div className="p-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sales Persons</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="font-bold">Name</TableCell>    
                <TableCell className="font-bold">Start Date</TableCell>
                <TableCell className="font-bold">Termination Date</TableCell>
                <TableCell className="font-bold">Manager</TableCell>
                <TableCell className="font-bold">Phone</TableCell>
                <TableCell className="font-bold">Address</TableCell>
                <TableCell className="font-bold"></TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salespersons.map((salesperson) => (
                <TableRow key={salesperson.id}>
                  <TableCell>{salesperson.firstName + ' ' + salesperson.lastName}</TableCell>
                  <TableCell>{new Date(salesperson.startDate).toLocaleDateString("en-US", {day: '2-digit', month: '2-digit', year: 'numeric'})}</TableCell>
                  <TableCell>{new Date(salesperson.terminationDate).toLocaleDateString("en-US", {day: '2-digit', month: '2-digit', year: 'numeric'})}</TableCell>
                  <TableCell>{salesperson.manager}</TableCell>
                  <TableCell>{salesperson.phone}</TableCell>
                  <TableCell>{salesperson.address}</TableCell>
                  <TableCell className="text-right">
                    <NavLink to={`/salespersons/${salesperson.id}`} className="pointer">
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

export default SalesPersons
