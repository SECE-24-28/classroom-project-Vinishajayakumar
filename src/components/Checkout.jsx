import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({ name: '', address: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:5003/api/cart')
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5003/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, items: cart, total })
    }).then(() => {
      alert('Order placed successfully!');
      navigate('/');
    });
  };

  return (
    <div className="page">
      <h1>Checkout</h1>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <h2>Order Summary</h2>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <img src={item.image} alt={item.name} style={{ width: '50px', marginRight: '1rem' }} />
              <div>
                <p>{item.name}</p>
                <p>${item.price}</p>
              </div>
            </div>
          ))}
          <h3>Total: ${total}</h3>
        </div>
        <div style={{ flex: 1 }}>
          <h2>Shipping Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            </div>
            <button type="submit" className="btn">Place Order</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;