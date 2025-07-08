import { Routes, Route } from 'react-router'
import './App.css'

import Navbar from '@/components/Navbar.jsx'
import Customers from '@/pages/Customers.jsx'
import Dashboard from '@/pages/Dashboard.jsx'
import EditProduct from '@/pages/EditProduct.jsx'
import EditSalesPerson from '@/pages/EditSalesPerson.jsx'
import NewSale from '@/pages/NewSale.jsx'
import Products from '@/pages/Products.jsx'
import Sales from '@/pages/Sales.jsx'
import SalesPersons from '@/pages/SalesPersons.jsx'


function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-5">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/salespersons" element={<SalesPersons />} />
          <Route path="/salespersons/:id" element={<EditSalesPerson />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<EditProduct />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/sales/new" element={<NewSale />} />
        </Routes>
      </div>
    </>
  )
}

export default App
