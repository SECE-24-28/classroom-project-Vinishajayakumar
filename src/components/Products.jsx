import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5003/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        console.log('Products:', data);
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    fetch('http://127.0.0.1:5003/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="page">
      <h1>Products</h1>
      {loading && <p>Loading products...</p>}
      {error && <p>Error: {error}</p>}
      <div className="product-grid">
        {products.map(p => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} />
            <div className="content">
              <h3>{p.name}</h3>
              <p>Price: ${p.price}</p>
              <p>Stock: {p.stock}</p>
              <Link to={`/products/${p.id}`}><button className="btn">View Details</button></Link>
              <button className="btn" onClick={() => addToCart(p)} style={{ marginLeft: '0.5rem' }}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;