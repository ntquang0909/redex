import axios from "axios";
import type { Product } from "./products";

const ORDER_API = "http://localhost:3001/orders";

export interface Order {
  id: string;
  quantity: number;
  status: string;
  product: Product;
  createdAt: Date;
}

export interface CreateOrderInput {
  productId: string;
  quantity: number;
}

export const createOrder = async (order: CreateOrderInput): Promise<Order> => {
  const res = await axios.post<Order>(ORDER_API, order);
  return res.data;
};

export const fetchOrders = async (): Promise<Order[]> => {
  const res = await axios.get<Order[]>(ORDER_API);
  return res.data;
};
