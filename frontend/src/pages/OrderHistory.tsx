import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../api/orders";

export default function OrderHistory() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Failed to load orders.</div>;

  return (
    <div>
      <h2>Order History</h2>
      <ul>
        {data!.map((order) => (
          <li key={order.id}>
            Product: <strong>{order.product.name}</strong> | Quantity:{" "}
            {order.quantity} | Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
