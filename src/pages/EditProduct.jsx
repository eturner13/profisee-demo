import { useState, useEffect } from 'react'
import { getProduct, updateProduct } from '@/services/products.js'
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

function EditProduct() {

  const params = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState([])

  const fetchProduct = async () => {
    const data = await getProduct(params.id)
    setProduct(data)
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <div className="p-5">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Edit Product</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center justify-center'>
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="firstName"
                value={product.name || ''}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
              />
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <Input
                id="manufacturer"
                value={product.manufacturer || ''}
                onChange={(e) => setProduct({ ...product, manufacturer: e.target.value })}
              />
              <Label htmlFor="style">Style</Label>
              <Input
                id="style"
                value={product.style || ''}
                onChange={(e) => setProduct({ ...product, style: e.target.value })}
              />
              <Label htmlFor="purchasePrice">Purchase Price</Label>
              <Input
                id="purchasePrice"
                type="number"
                value={product.purchasePrice || ''}
                onChange={(e) => setProduct({ ...product, purchasePrice: parseFloat(e.target.value) })}
              />
              <Label htmlFor="salePrice">Sale Price</Label>
              <Input
                id="salePrice"
                type="number"
                value={product.salePrice || ''}
                onChange={(e) => setProduct({ ...product, salePrice: parseFloat(e.target.value) })}
              />
              <Label htmlFor="qtyOnHand">Quantity on Hand</Label>
              <Input
                id="qtyOnHand"
                type="number"
                value={product.qtyOnHand || ''}
                onChange={(e) => setProduct({ ...product, qtyOnHand: parseInt(e.target.value) })}
              />
              <Label htmlFor="commissionPercentage">Commission Percentage</Label>
              <Input
                id="commissionPercentage"
                type="number"
                step="0.01"
                value={product.commissionPercentage || ''}
                onChange={(e) => setProduct({ ...product, commissionPercentage: parseFloat(e.target.value) })}
              />
              <Button
                className="bg-stone-600 hover:bg-stone-700 text-white mt-5"
                onClick={async () => {
                  await updateProduct(product)
                  navigate('/products')
                }}
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  navigate('/products')
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

export default EditProduct
