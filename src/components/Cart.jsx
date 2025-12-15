import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5003/api/cart')
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  const removeFromCart = (id) => {
    fetch(`http://127.0.0.1:5003/api/cart/${id}`, { method: 'DELETE' })
      .then(() => setCart(cart.filter(item => item.id != id)));
  };

  return (
    <div className="page">
      <h1>Your Cart</h1>
      <div className="cart-grid">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="info">
              <h4>{item.name}</h4>
              <p>${item.price}</p>
            </div>
            <button className="btn" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      {cart.length > 0 && <Link to="/checkout"><button className="btn" style={{ marginTop: '2rem' }}>Proceed to Checkout</button></Link>}
    </div>
  );
}

export default Cart;