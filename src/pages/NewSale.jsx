import { useState } from 'react'
import { createNewSale } from '../services/sales.js'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Label } from '@/components/ui/label.jsx'
import { useNavigate } from 'react-router'

function NewSale() {

  const navigate = useNavigate()

  const [sale, setSale] = useState([])

  const completeSale = async () => {
    const data = await createNewSale(sale)
    navigate('/sales')
  }

  return (
    <div className="p-5">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">New Sale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center justify-center'>
            <div className="grid w-full max-w-sm items-center gap-3">
              
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

export default NewSale
