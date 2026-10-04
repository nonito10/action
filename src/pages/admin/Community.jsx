import { loadDB } from "../../data/store";

export default function Community() {
  const db = loadDB();
  return (
    <div className="admin-main" style={{ maxWidth: "1100px" }}>
      <div className="admin-topbar"><h1>Community</h1></div>

      <div className="grid-2 mb-3">
        <div className="card">
          <div className="card-header"><h3>📖 Community Stories</h3></div>
          <div className="card-body" style={{ padding: 0 }}>
            {db.communityStories.map((s) => (
              <div key={s.id} className="list-item" style={{ padding: "14px 20px" }}>
                <div className="item-icon">📖</div>
                <div className="item-body">
                  <div className="item-title">{s.title}</div>
                  <div className="item-sub">By {s.author} · {s.date}</div>
                </div>
                <span className={`badge ${s.status === "Approved" ? "badge-green" : "badge-amber"}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3>🏆 Climate Champions</h3></div>
          <div className="card-body" style={{ padding: 0 }}>
            {db.champions.map((c) => (
              <div key={c.id} className="list-item" style={{ padding: "14px 20px" }}>
                <div className="item-icon" style={{ fontSize: "1.5rem" }}>{["🥇", "🥈", "🥉"][c.rank - 1]}</div>
                <div className="item-body">
                  <div className="item-title">{c.name}</div>
                  <div className="item-sub">{c.points} points · {c.badges} badges</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
