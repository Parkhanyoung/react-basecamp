import { CartItem, Product } from "../types";
import { generateBasicToken } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL as string;
const USER_ID = import.meta.env.VITE_USERNAME as string;
const USER_PASSWORD = import.meta.env.VITE_PASSWORD as string;

if (!API_URL || !USER_ID || !USER_PASSWORD) {
  throw new Error("API_URL, USERNAME, PASSWORD environment variables are not set");
}

export async function fetchProducts(): Promise<Product[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/products`, {
    method: "GET",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data.content;
}

export async function fetchCartItems(): Promise<CartItem[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items`, {
    method: "GET",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart items");
  }

  const data = await response.json();
  return data.content;
}

export async function addCartItem(productId: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    throw new Error("Failed to add cart item");
  }
}

export async function removeCartItem(cartItemId: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to remove cart item");
  }
}
