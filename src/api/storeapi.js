const API_BASE = 'https://dummyjson.com';

export async function getAllProducts() {
  const url = `${API_BASE}/products`;
  const res = await fetch(url);
  return res.json();
}

export async function getCategoryProducts(category) {
  const res = await fetch(`${API_BASE}/products/category/${category}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function getProduct(id) {
  const url = `${API_BASE}/products/${id}`;
  const res = await fetch(url);
  return res.json();
}

export async function getCart() {
  const url = `${API_BASE}/carts`;
  const res = await fetch(url);

  return res.json();
}
