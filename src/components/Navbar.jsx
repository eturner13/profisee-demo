import { NavLink } from "react-router";
import { Bike } from 'lucide-react';
import { Button } from "./ui/button.jsx";

function Navbar() {
  return (
    <div className="bg-stone-600 text-white p-3 pl-5 grid grid-cols-3">
      <div className="flex items-center">
        <Bike className="w-8 h-8 mr-5" />
        <div>
          <div className="font-bold">BeSpoked Bikes</div>
          <div className="font-semibold italic text-stone-300">SalesTracker</div>
        </div>
      </div>
      <nav className="flex items-end mx-auto text-sm">
        <NavLink className="mr-6 transition hover:text-stone-300" to="/">Dashboard</NavLink>
        <NavLink className="mr-6 transition hover:text-stone-300" to="/sales">Sales</NavLink>
        <NavLink className="mr-6 transition hover:text-stone-300" to="/products">Products</NavLink>
        <NavLink className="mr-6 transition hover:text-stone-300" to="/customers">Customers</NavLink>
        <NavLink className="mr-6 transition hover:text-stone-300" to="/salespersons">Sales Persons</NavLink>
      </nav>
      <div className="flex justify-end items-center">
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <NavLink to="/sales/new">New Sale</NavLink>
        </Button>
      </div>
    </div>
  )
}

export default Navbar;
