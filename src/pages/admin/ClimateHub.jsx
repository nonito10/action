import { useState } from "react";
import { loadDB, AWARENESS_CATEGORIES } from "../../data/store";

export default function ClimateHub() {
  const db = loadDB();
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? db.awareness : db.awareness.filter((a) => a.category === filter);

  return (
    <div className="admin-main" style={{ maxWidth: "1100px" }}>
      <div className="admin-topbar">
        <h1>Climate Hub</h1>
        <button className="btn btn-primary">+ Create Article</button>
      </div>

      <div className="flex gap-1 mb-3" style={{ flexWrap: "wrap" }}>
        <button className={`pill ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
        {AWARENESS_CATEGORIES.map((c) => (
          <button key={c.key} className={`pill ${filter === c.key ? "active" : ""}`} onClick={() => setFilter(c.key)}>{c.icon} {c.key}</button>
        ))}
      </div>

      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          <table className="table">
            <thead><tr><th>Title</th><th>Category</th><th>Author</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 600 }}>{a.title}</td>
                  <td>{a.category}</td>
                  <td className="text-xs">{a.author}</td>
                  <td className="text-xs">{a.date}</td>
                  <td><span className={`badge ${a.status === "Published" ? "badge-green" : "badge-amber"}`}>{a.status}</span></td>
                  <td><button className="btn btn-outline btn-sm">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
