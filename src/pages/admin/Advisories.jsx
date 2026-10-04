import { useState } from "react";
import { loadDB } from "../../data/store";

export default function Advisories() {
  const db = loadDB();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", type: "Climate Advisory", priority: "Medium", message: "", date: new Date().toISOString().slice(0, 10), expiry: "", status: "Active" });

  return (
    <div className="admin-main" style={{ maxWidth: "1100px" }}>
      <div className="admin-topbar">
        <h1>Advisories</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "+ Create Advisory"}</button>
      </div>

      {showForm && (
        <div className="card mb-3">
          <div className="card-header"><h3>Announcement Composer</h3></div>
          <div className="card-body">
            <div className="grid-2">
              <div className="form-group">
                <label>Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Advisory title" />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option>Climate Advisory</option><option>Weather Advisory</option><option>Emergency Notice</option><option>Public Announcement</option>
                </select>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                  <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
                </select>
              </div>
              <div className="form-group">
                <label>Expiration Date</label>
                <input type="date" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Advisory message..." />
            </div>
            <button className="btn btn-primary" onClick={() => setShowForm(false)}>Publish Advisory</button>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          {db.advisories.map((a) => (
            <div key={a.id} className="list-item" style={{ padding: "14px 20px" }}>
              <div className="item-icon">{a.priority === "High" || a.priority === "Critical" ? "⚠" : "📢"}</div>
              <div className="item-body">
                <div className="item-title">{a.title}</div>
                <div className="item-sub">{a.message}</div>
                <div className="item-sub" style={{ fontSize: "0.7rem" }}>{a.type} · {a.date} → expires {a.expiry}</div>
              </div>
              <div className="flex gap-1">
                <span className={`badge ${a.priority === "High" || a.priority === "Critical" ? "badge-red" : "badge-amber"}`}>{a.priority}</span>
                <span className="badge badge-green">{a.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
