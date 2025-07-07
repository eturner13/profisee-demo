import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav>
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/salespersons">SalesPersons</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/customers">Customers</NavLink>
      <NavLink to="/sales">Sales</NavLink>
      <NavLink to="/sales/new">New Sale</NavLink>
    </nav>
  )
}

export default Navbar;
