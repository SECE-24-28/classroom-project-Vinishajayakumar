import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5003/api/products`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        const prod = data.find(p => p.id === parseInt(id));
        if (!prod) throw new Error('Product not found');
        setProduct(prod);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    fetch('http://127.0.0.1:5003/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    }).then(() => alert('Added to cart!')).catch(err => console.error('Error adding to cart:', err));
  };

  if (loading) return <div className="page"><p>Loading product...</p></div>;
  if (error) return <div className="page"><p>Error: {error}</p></div>;
  if (!product) return <div className="page"><p>Product not found</p></div>;

  return (
    <div className="page">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ width: '300px', borderRadius: '10px' }} />
      <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>{product.description}</p>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <button className="btn" onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;