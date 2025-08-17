import axios from "axios";

const PRODUCT_API = "http://localhost:3000/products";

export interface CreateProductInput {
  name: string;
  price: number;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export const createProduct = async (
  input: CreateProductInput
): Promise<Product> => {
  const res = await axios.post<Product>(PRODUCT_API, input);
  return res.data;
};

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get<Product[]>(PRODUCT_API);
  return res.data;
};
