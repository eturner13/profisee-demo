import { useState, useEffect } from 'react'
import { getCustomers } from '@/services/customers.js'
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

function Customers() {

  const [customers, setCustomers] = useState([])

  const fetchCustomers = async () => {
    const data = await getCustomers()
    setCustomers(data)
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  return (
    <div className="p-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="font-bold">Name</TableCell>    
                <TableCell className="font-bold">Start Date</TableCell>
                <TableCell className="font-bold">Phone</TableCell>
                <TableCell className="font-bold">Address</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.firstName + ' ' + customer.lastName}</TableCell>
                  <TableCell>{new Date(customer.startDate).toLocaleDateString("en-US", {day: '2-digit', month: '2-digit', year: 'numeric'})}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Customers
