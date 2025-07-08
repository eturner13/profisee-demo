import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { createNewSale } from '@/services/sales.js'
import { getCustomers } from '@/services/customers.js'
import { getProducts } from '@/services/products.js'
import { getSalesPersons } from '@/services/salespersons.js'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Label } from '@/components/ui/label.jsx'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select.jsx'


function NewSale() {

  const navigate = useNavigate()

  const [sale, setSale] = useState([])

  const completeSale = async () => {
    if (!sale.customerId || !sale.productId || !sale.salesPersonId) {
      alert('Please select a customer, product, and sales person.')
      return
    }
    setSale({
      ...sale,
      id: 99, // This shouldn't be hardcoded in a real app, but for demo purposes it's fine
      date: new Date().toISOString(),
    });
    const data = await createNewSale(sale)
    navigate(-1)
  }

  const [customers, setCustomers] = useState([])

  const fetchCustomers = async () => {
    const data = await getCustomers()
    setCustomers(data)
  }

  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    const data = await getProducts()
    setProducts(data)
  }

  const [salespersons, setSalesPersons] = useState([])
  
  const fetchSalesPersons = async () => {
    const data = await getSalesPersons()
    setSalesPersons(data)
  }

  useEffect(() => {
    fetchCustomers()
    fetchProducts()
    fetchSalesPersons()
  }, [])

  return (
    <div className="p-5">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">New Sale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center justify-center'>
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="customer">Customer</Label>
              <Select
                onValueChange={(value) => {
                  setSale({ ...sale, customerId: value })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.firstName + ' ' + customer.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label htmlFor="product">Product</Label>
              <Select
                onValueChange={(value) => {
                  setSale({ ...sale, productId: value })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name + ' - ' + product.salePrice.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label htmlFor="salesperson">Sales Person</Label>
              <Select
                onValueChange={(value) => {
                  setSale({ ...sale, salesPersonId: value })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Sales Person" />
                </SelectTrigger>
                <SelectContent>
                  {salespersons.map((salesperson) => (
                    <SelectItem key={salesperson.id} value={salesperson.id}>
                      {salesperson.firstName + ' ' + salesperson.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="bg-stone-600 hover:bg-stone-700 text-white mt-5"
                onClick={async () => {
                  completeSale()
                }}
              >
                Create Sale
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  navigate(-1)
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

export default NewSale
