# E-Commerce Website

A full-stack React e-commerce website with home, products, cart, and contact pages, backed by Node.js Express API.

## Getting Started

1. Install frontend dependencies: `npm install`
2. Install backend dependencies: `cd backend && npm install`
3. Run backend: `node backend/server.js` (runs on http://localhost:5003)
4. Run frontend: `npm run dev` (runs on http://localhost:5173)

## Features

- Home: Welcome page
- Products: Fetch and display products, add to cart
- Product Details: View full product info, add to cart
- Cart: View and remove cart items, proceed to checkout
- Checkout: Place orders with shipping details
- Contact: Send contact form

## API Endpoints

- GET http://localhost:5003/api/products: Get all products
- POST http://localhost:5003/api/products: Add a product
- GET http://localhost:5003/api/cart: Get cart items
- POST http://localhost:5003/api/cart: Add to cart
- DELETE http://localhost:5003/api/cart/:id: Remove from cart
- POST http://localhost:5003/api/orders: Place an order
- GET http://localhost:5003/api/orders: Get all orders
- POST http://localhost:5003/api/contact: Send contact message
