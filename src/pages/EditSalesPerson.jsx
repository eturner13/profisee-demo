import { useState, useEffect } from 'react'
import { getSalesPerson, updateSalesPerson } from '../services/salespersons.js'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Label } from '@/components/ui/label.jsx'
import { useParams, useNavigate } from 'react-router'

function EditSalesPerson() {

  const params = useParams()
  const navigate = useNavigate()

  const [salesperson, setSalesPerson] = useState([])

  const fetchSalesPerson = async () => {
    const data = await getSalesPerson(params.id)
    setSalesPerson(data)
  }

  useEffect(() => {
    fetchSalesPerson()
  }, [])

  return (
    <div className="p-5">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Edit Sales Person</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center justify-center'>
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={salesperson.firstName || ''}
                onChange={(e) => setSalesPerson({ ...salesperson, firstName: e.target.value })}
              />
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={salesperson.lastName || ''}
                onChange={(e) => setSalesPerson({ ...salesperson, lastName: e.target.value })}
              />
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                onFocus={(e) => e.target.type = 'date'}
                value={new Date(salesperson.startDate).toLocaleDateString("en-US", {day: '2-digit', month: '2-digit', year: 'numeric'}) || ''}
                onChange={(e) => setSalesPerson({ ...salesperson, startDate: e.target.value })}
              />
              <Label htmlFor="terminationDate">Termination Date</Label>
              <Input
                id="terminationDate"
                onFocus={(e) => e.target.type = 'date'}
                value={new Date(salesperson.terminationDate).toLocaleDateString("en-US", {day: '2-digit', month: '2-digit', year: 'numeric'}) || ''}
                onChange={(e) => setSalesPerson({ ...salesperson, terminationDate: e.target.value })}
              />
              <Label htmlFor="manager">Manager</Label>
              <Input
                id="manager"
                value={salesperson.manager || ''}
                onChange={(e) => setSalesPerson({ ...salesperson, manager: e.target.value })}
              />
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={salesperson.phone || ''}
                onChange={(e) => setSalesPerson({ ...salesperson, phone: e.target.value })}
              />
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={salesperson.address || ''}
                onChange={(e) => setSalesPerson({ ...salesperson, address: e.target.value })}
              />
              <Button
                className="bg-stone-600 hover:bg-stone-700 text-white mt-5"
                onClick={async () => {
                  await updateSalesPerson(salesperson)
                  navigate('/salespersons')
                }}
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  navigate('/salespersons')
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditSalesPerson
