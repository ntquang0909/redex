import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import { Link } from "react-router-dom";

export default function ProductList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Failed to load products.</div>;

  return (
    <div>
      <h2>Product List</h2>
      <Link to="/products/create">
        <button>Create New Product</button>
      </Link>
      <ul>
        {data!.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> - ${p.price}
            <div>{p.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
