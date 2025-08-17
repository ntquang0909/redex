import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/products";
import type { CreateProductInput } from "../api/products";

export default function CreateProduct() {
  const [form, setForm] = useState<CreateProductInput>({
    name: "",
    price: 0,
    description: "",
  });
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setForm({ name: "", price: 0, description: "" });
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || form.price <= 0) return;
    mutate(form);
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div>
          <label>
            Name:
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              autoFocus
            />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input
              name="price"
              type="number"
              min={0.01}
              step={0.01}
              value={form.price}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
            />
          </label>
        </div>
        <button type="submit" disabled={isPending}>
          Create Product
        </button>
      </form>
      {isSuccess && <div style={{ color: "green" }}>Product created!</div>}
      {isError && <div style={{ color: "red" }}>Failed to create product.</div>}
    </div>
  );
}
