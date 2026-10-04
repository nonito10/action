import { useState } from "react";
import { loadDB, markNotificationRead, markAllNotificationsRead } from "../../data/store";

export default function Notifications() {
  const db = loadDB();
  const [filter, setFilter] = useState("all");
  const [, force] = useState(0);

  const categories = ["all", "Reports", "Climate", "Community", "System"];
  const filtered = filter === "all" ? db.notifications : db.notifications.filter((n) => n.category === filter);
  const unread = db.notifications.filter((n) => !n.read).length;

  const handleRead = (id) => {
    markNotificationRead(id);
    force((x) => x + 1);
  };

  const handleAll = () => {
    markAllNotificationsRead();
    force((x) => x + 1);
  };

  const iconFor = (cat) => ({ Reports: "📋", Climate: "🌍", Community: "👥", System: "⚙" }[cat] || "🔔");

  return (
    <div className="page page-narrow">
      <div className="flex justify-between items-center mb-3">
        <h1 className="section-title" style={{ marginBottom: 0 }}><span className="icon">🔔</span>Notifications</h1>
        {unread > 0 && <button className="btn btn-outline btn-sm" onClick={handleAll}>Mark all read</button>}
      </div>

      <div className="flex gap-1 mb-3" style={{ flexWrap: "wrap" }}>
        {categories.map((c) => (
          <button key={c} className={`pill ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>
            {c === "all" ? "All" : c}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          {filtered.length === 0 ? (
            <div className="empty-state"><div className="icon">🔔</div><p>No notifications.</p></div>
          ) : (
            filtered.map((n) => (
              <div
                key={n.id}
                className="list-item"
                style={{ padding: "14px 20px", background: n.read ? "transparent" : "var(--green-50)", cursor: "pointer" }}
                onClick={() => handleRead(n.id)}
              >
                <div className="item-icon">{iconFor(n.category)}</div>
                <div className="item-body">
                  <div className="item-title">{n.title}{!n.read && <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "var(--green-500)", marginLeft: "8px" }} />}</div>
                  <div className="item-sub">{n.message}</div>
                  <div className="item-sub" style={{ fontSize: "0.7rem" }}>{n.date} · {n.category}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
