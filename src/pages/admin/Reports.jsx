import { useState } from "react";
import { loadDB, updateReportStatus, REPORT_STATUSES } from "../../data/store";

export default function Reports() {
  const db = loadDB();
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [, force] = useState(0);

  const filtered = filter === "all" ? db.reports : db.reports.filter((r) => r.status === filter);

  const advance = (id, currentStatus) => {
    const idx = REPORT_STATUSES.indexOf(currentStatus);
    if (idx < REPORT_STATUSES.length - 1) {
      updateReportStatus(id, REPORT_STATUSES[idx + 1]);
      force((x) => x + 1);
    }
  };

  return (
    <div className="admin-main" style={{ maxWidth: "1100px" }}>
      <div className="admin-topbar">
        <h1>Reports Management</h1>
      </div>

      <div className="flex gap-1 mb-3" style={{ flexWrap: "wrap" }}>
        <button className={`pill ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All ({db.reports.length})</button>
        {REPORT_STATUSES.map((s) => (
          <button key={s} className={`pill ${filter === s ? "active" : ""}`} onClick={() => setFilter(s)}>{s} ({db.reports.filter((r) => r.status === s).length})</button>
        ))}
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: "2fr 1fr" }}>
        <div className="card">
          <div className="card-body" style={{ padding: 0 }}>
            <table className="table">
              <thead><tr><th>ID</th><th>Category</th><th>Location</th><th>Severity</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} onClick={() => setSelected(r)} style={{ cursor: "pointer", background: selected?.id === r.id ? "var(--green-50)" : "" }}>
                    <td style={{ fontWeight: 600 }}>{r.id}</td>
                    <td>{r.icon} {r.category}</td>
                    <td className="text-xs">{r.location}</td>
                    <td><span className={`badge ${r.severity === "High" || r.severity === "Critical" ? "badge-red" : r.severity === "Medium" ? "badge-amber" : "badge-green"}`}>{r.severity}</span></td>
                    <td><span className={`badge ${r.status === "Resolved" ? "badge-green" : r.status === "Pending" ? "badge-amber" : "badge-blue"}`}>{r.status}</span></td>
                    <td className="text-xs">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3>Report Details</h3></div>
          <div className="card-body">
            {selected ? (
              <>
                <p className="text-xs text-muted">{selected.id}</p>
                <h3 style={{ fontSize: "1rem", marginTop: "4px" }}>{selected.icon} {selected.category}</h3>
                <p className="text-sm mt-1">📍 {selected.location}</p>
                <p className="text-sm text-muted mt-1">📅 {selected.date}</p>
                <div className="flex gap-1 mt-1">
                  <span className={`badge ${selected.severity === "High" || selected.severity === "Critical" ? "badge-red" : "badge-amber"}`}>{selected.severity}</span>
                  <span className="badge badge-blue">{selected.status}</span>
                </div>
                <p className="text-sm mt-2">{selected.description}</p>

                <div className="divider" />
                <p className="text-xs" style={{ fontWeight: 600, marginBottom: "8px" }}>Timeline</p>
                <div className="timeline">
                  {selected.timeline.map((t, i) => (
                    <div key={i} className={`timeline-step ${i < selected.timeline.length ? "done" : ""} ${i === selected.timeline.length - 1 ? "current" : ""}`}>
                      <div className="step-status">{t.status}</div>
                      <div className="step-date">{t.date}</div>
                    </div>
                  ))}
                </div>

                {selected.status !== "Resolved" && selected.status !== "Archived" && (
                  <button className="btn btn-primary btn-block mt-2" onClick={() => { advance(selected.id, selected.status); setSelected(loadDB().reports.find((r) => r.id === selected.id)); }}>
                    Advance to {REPORT_STATUSES[REPORT_STATUSES.indexOf(selected.status) + 1]} →
                  </button>
                )}
              </>
            ) : (
              <div className="empty-state"><div className="icon">📋</div><p>Select a report to view details.</p></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
