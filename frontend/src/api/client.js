const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchItems() {
  const res = await fetch(`${BASE_URL}/api/items`);
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
}

export async function createItem(name) {
  const res = await fetch(`${BASE_URL}/api/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  if (!res.ok) throw new Error('Failed to create item');
  return res.json();
}
