import React, { useEffect, useState } from 'react';
import { fetchItems, createItem } from './api/client.js';

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      const data = await fetchItems();
      setItems(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function onAdd(e) {
    e.preventDefault();
    setError('');
    try {
      const created = await createItem(name);
      setItems(prev => [created, ...prev]);
      setName('');
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: '40px auto', fontFamily: 'system-ui' }}>
      <h1>MERN Items</h1>
      <p style={{ color: '#666' }}>
        Backend: {import.meta.env.VITE_API_URL}
      </p>

      <form onSubmit={onAdd} style={{ display: 'flex', gap: 8 }}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="New item name"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Add</button>
      </form>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {loading ? <p>Loading...</p> : (
        <ul>
          {items.map(i => (
            <li key={i._id}>{i.name} <small style={{ color: '#999' }}>
              ({new Date(i.createdAt).toLocaleString()})
            </small></li>
          ))}
        </ul>
      )}
    </div>
  );
}
