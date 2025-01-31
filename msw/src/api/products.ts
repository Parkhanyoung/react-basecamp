import { PRODUCTS_ENDPOINT } from "./endpoints";

const LAST_PAGE = 21;
export async function fetchProducts(page: number, limit: number) {
  const response = await fetch(`${PRODUCTS_ENDPOINT}?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return { data, isLastPage: page === LAST_PAGE };
}
