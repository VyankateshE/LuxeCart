# LuxeCart Full-Stack eCommerce

Luxury-themed full-stack eCommerce web app using React (Vite), Node.js (Express), and PostgreSQL.

## Tech Stack
- Frontend: React + Vite + Axios + React Router
- Backend: Node.js + Express + JWT + bcrypt + CORS
- Database: PostgreSQL
- API style: REST

## Project Structure
- `client` - React Vite frontend
- `server` - Node.js Express backend (MVC)
- `server/database` - PostgreSQL schema and seed SQL

## Features Implemented
- JWT signup/login and protected profile endpoint
- Product listing, filtering, search, and detail page
- Add/view/remove/update-quantity cart items + checkout endpoint
- Add/view/remove wishlist items
- Profile dashboard with order history and purchased items
- Luxury responsive UI (black/gold palette, premium typography, smooth animations)
- Loading skeletons, toasts, transitions, and product sorting

## Backend Setup
1. Install server dependencies:
```bash
cd server
npm install
```
2. Create env file:
```bash
cp .env.example .env
```
3. Create database and run schema + seed:
```bash
createdb luxury_ecommerce
psql -U postgres -d luxury_ecommerce -f database/schema.sql
psql -U postgres -d luxury_ecommerce -f database/seed.sql
```
4. Start server:
```bash
npm run dev
```
Server runs at `http://localhost:5000`.

## Frontend Setup
1. Install client dependencies:
```bash
cd client
npm install
```
2. Create env file:
```bash
cp .env.example .env
```
3. Start client:
```bash
npm run dev
```
Client runs at `http://localhost:5173`.

## Quick Root Commands
From repository root:
```bash
npm run install:all
npm run dev:server
npm run dev:client
```

## Environment Variables
### `server/.env`
- `PORT=5000`
- `CLIENT_URL=http://localhost:5173` (or comma-separated origins)
- `DATABASE_URL=postgresql://postgres:password@localhost:5432/luxury_ecommerce`
- `DB_SSL=false` (set `true` on Render Postgres)
- `DB_SSL_REJECT_UNAUTHORIZED=false`
- `JWT_SECRET=replace_with_long_random_secret`
- `JWT_EXPIRES_IN=7d`
- `STRIPE_SECRET_KEY=sk_test_...`

### `client/.env`
- `VITE_API_BASE_URL=http://localhost:5000/api`
- `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...`

## Render Deployment Env
- Backend service:
  - `NODE_ENV=production`
  - `DATABASE_URL=<from Render PostgreSQL>`
  - `DB_SSL=true`
  - `DB_SSL_REJECT_UNAUTHORIZED=false`
  - `CLIENT_URL=https://<your-frontend>.onrender.com`
  - `JWT_SECRET=<long-random-secret>`
  - `JWT_EXPIRES_IN=7d`
  - `STRIPE_SECRET_KEY=sk_test_...`
- Frontend service:
  - `VITE_API_BASE_URL=https://<your-backend>.onrender.com/api`
  - `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...`

## Database Schema
Defined in [`server/database/schema.sql`](./server/database/schema.sql).

Tables:
- `users(id, name, email, password, created_at)`
- `products(id, name, description, price, category, image_url, stock, rating, created_at)`
- `cart(id, user_id, product_id, quantity)`
- `wishlist(id, user_id, product_id)`
- `orders(id, user_id, total_amount, status, created_at)`
- `order_items(id, order_id, product_id, quantity, unit_price)`

Seed products are in [`server/database/seed.sql`](./server/database/seed.sql).

## API Documentation
Base URL: `http://localhost:5000/api`

### Auth
- `POST /auth/register`
  - body: `{ "name": "Venky", "email": "venky@example.com", "password": "secret123" }`
  - response: `{ user, token }`
- `POST /auth/login`
  - body: `{ "email": "venky@example.com", "password": "secret123" }`
  - response: `{ user, token }`
- `GET /auth/profile` (Bearer token required)
  - response: `user`

### Products
- `GET /products`
  - query params (optional): `search`, `category`, `minPrice`, `maxPrice`
- `GET /products/:id`
- `POST /products`
  - body: `{ name, description, price, category, imageUrl, stock, rating }`

### Cart (Bearer token required)
- `GET /cart`
- `POST /cart`
  - body: `{ "productId": 1, "quantity": 1 }`
- `PATCH /cart/:productId`
  - body: `{ "quantity": 3 }`
- `DELETE /cart/:productId`
- `POST /cart/checkout`

### Orders (Bearer token required)
- `GET /orders/my`
  - returns user orders with nested purchased items

### Wishlist (Bearer token required)
- `GET /wishlist`
- `POST /wishlist`
  - body: `{ "productId": 1 }`
- `DELETE /wishlist/:productId`

### Payments (Bearer token required)
- `POST /payments/create-intent`
  - creates Stripe test-mode `PaymentIntent` from current cart total
  - response: `{ clientSecret, amount, currency }`

## Notes
- This implementation follows MVC separation in backend: `routes`, `controllers`, `services`, `models`.
- Passwords are hashed with bcrypt.
- JWT middleware protects cart/wishlist/profile routes.
- CORS is configured for the frontend origin from environment settings.
- Checkout now uses Stripe test mode in frontend + backend payment intent API.
