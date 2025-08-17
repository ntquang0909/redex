import { Routes, Route, Link, Navigate } from "react-router-dom";
import ProductList from "./pages/ProductList";
import PlaceOrder from "./pages/PlaceOrder";
import OrderHistory from "./pages/OrderHistory";
import CreateProduct from "./pages/CreateProduct";

export default function App() {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          borderBottom: "1px solid #eee",
        }}
      >
        <Link to="/products/create">Create Product</Link>
        <Link to="/products">Products</Link>
        <Link to="/order">Place Order</Link>
        <Link to="/orders">Order History</Link>
      </nav>
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </main>
    </div>
  );
}
