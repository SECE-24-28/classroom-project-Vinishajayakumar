const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Data files
const productsFile = path.join(__dirname, 'data', 'products.json');
const cartFile = path.join(__dirname, 'data', 'cart.json');
const ordersFile = path.join(__dirname, 'data', 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// Helper functions
const readData = (file) => {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf8'));
};

const writeData = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// Routes
app.get('/api/products', (req, res) => {
  const products = readData(productsFile);
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const products = readData(productsFile);
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  writeData(productsFile, products);
  res.json(newProduct);
});

app.get('/api/cart', (req, res) => {
  const cart = readData(cartFile);
  res.json(cart);
});

app.post('/api/cart', (req, res) => {
  const cart = readData(cartFile);
  cart.push(req.body);
  writeData(cartFile, cart);
  res.json(req.body);
});

app.delete('/api/cart/:id', (req, res) => {
  const cart = readData(cartFile);
  const filteredCart = cart.filter(item => item.id != req.params.id);
  writeData(cartFile, filteredCart);
  res.json({ message: 'Item removed' });
});

app.post('/api/orders', (req, res) => {
  const orders = readData(ordersFile);
  const newOrder = { id: Date.now(), ...req.body, date: new Date() };
  orders.push(newOrder);
  writeData(ordersFile, orders);
  // Clear cart after order
  writeData(cartFile, []);
  res.json(newOrder);
});

app.get('/api/orders', (req, res) => {
  const orders = readData(ordersFile);
  res.json(orders);
});

app.post('/api/contact', (req, res) => {
  // For simplicity, just log the contact
  console.log('Contact form:', req.body);
  res.json({ message: 'Message sent' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});