import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <h2>E-Shop</h2>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}

export default Navbar;