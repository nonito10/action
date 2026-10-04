import { useEffect, useState } from "react";

const STORAGE_KEY = "action.items";
const FILTERS = ["all", "open", "done"];

function loadItems() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

export default function App() {
  const [items, setItems] = useState(loadItems);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (e) => {
    e.preventDefault();
    const title = text.trim();
    if (!title) return;
    setItems([{ id: crypto.randomUUID(), title, done: false }, ...items]);
    setText("");
  };

  const toggle = (id) =>
    setItems(items.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));

  const remove = (id) => setItems(items.filter((i) => i.id !== id));

  const visible = items.filter(
    (i) => filter === "all" || (filter === "done") === i.done
  );
  const openCount = items.filter((i) => !i.done).length;

  return (
    <main className="app">
      <h1>Action</h1>
      <p className="subtitle">
        {openCount} open · {items.length - openCount} done
      </p>

      <form className="add" onSubmit={addItem}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to happen?"
          aria-label="New action item"
        />
        <button type="submit">Add</button>
      </form>

      <nav className="filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={f === filter ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </nav>

      <ul className="list">
        {visible.map((item) => (
          <li key={item.id} className={item.done ? "done" : ""}>
            <label>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggle(item.id)}
              />
              <span>{item.title}</span>
            </label>
            <button
              className="remove"
              onClick={() => remove(item.id)}
              aria-label={`Delete ${item.title}`}
            >
              ×
            </button>
          </li>
        ))}
        {visible.length === 0 && <li className="empty">Nothing here yet.</li>}
      </ul>
    </main>
  );
}
