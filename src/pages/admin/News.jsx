import { useState } from "react";
import { loadDB } from "../../data/store";

export default function News() {
  const db = loadDB();
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? db.news : db.news.filter((n) => n.status === filter);

  return (
    <div className="admin-main" style={{ maxWidth: "1100px" }}>
      <div className="admin-topbar">
        <h1>News & Updates</h1>
        <button className="btn btn-primary">+ Create News</button>
      </div>

      <div className="flex gap-1 mb-3" style={{ flexWrap: "wrap" }}>
        {["all", "Draft", "Published", "Archived"].map((s) => (
          <button key={s} className={`pill ${filter === s ? "active" : ""}`} onClick={() => setFilter(s)}>{s}</button>
        ))}
      </div>

      <div className="grid-3">
        {filtered.map((n) => (
          <div key={n.id} className="news-card">
            <div className="news-image">📰</div>
            <div className="news-body">
              <div className="news-meta">{n.category} · {n.date}</div>
              <div className="news-title">{n.title}</div>
              <div className="news-excerpt">{n.excerpt}</div>
              <div className="flex gap-1 mt-1 items-center">
                <span className={`badge ${n.status === "Published" ? "badge-green" : "badge-amber"}`}>{n.status}</span>
                <button className="btn btn-outline btn-sm">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
