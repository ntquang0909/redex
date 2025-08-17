import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import { createOrder } from "../api/orders";

export default function PlaceOrder() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;
    mutate({ productId, quantity });
  };

  return (
    <div>
      <h2>Place Order</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product:
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
            disabled={isLoading}
          >
            <option value="">Select a product</option>
            {products?.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Quantity:
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </label>
        <button type="submit" disabled={isPending || !productId}>
          Place Order
        </button>
      </form>
      {isSuccess && (
        <div style={{ color: "green" }}>Order placed successfully!</div>
      )}
      {isError && <div style={{ color: "red" }}>Failed to place order.</div>}
    </div>
  );
}
