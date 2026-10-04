import { useState } from "react";
import { loadDB, REPORT_STATUSES } from "../../data/store";

export default function MyReports() {
  const db = loadDB();
  const [filter, setFilter] = useState("all");
  const myReports = db.reports.filter((r) => r.userId === db.currentUser.id);
  const filtered = filter === "all" ? myReports : myReports.filter((r) => r.status === filter);

  const statusBadge = (status) => {
    if (status === "Resolved") return <span className="badge badge-green">{status}</span>;
    if (status === "Pending") return <span className="badge badge-amber">{status}</span>;
    return <span className="badge badge-blue">{status}</span>;
  };

  return (
    <div className="page">
      <h1 className="section-title"><span className="icon">📋</span>My Reports</h1>

      <div className="flex gap-1 mb-3" style={{ flexWrap: "wrap" }}>
        <button className={`pill ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All ({myReports.length})</button>
        {REPORT_STATUSES.filter((s) => s !== "Archived").map((s) => (
          <button key={s} className={`pill ${filter === s ? "active" : ""}`} onClick={() => setFilter(s)}>{s}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="icon">📋</div>
            <p>No reports yet. <a href="/report" style={{ color: "var(--green-600" }}>Report an issue →</a></p>
          </div>
        </div>
      ) : (
        <div className="grid-2">
          {filtered.map((r) => (
            <div key={r.id} className="card">
              <div className="card-header">
                <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>{r.icon}</span> {r.category}
                </h3>
                {statusBadge(r.status)}
              </div>
              <div className="card-body">
                <p className="text-xs text-muted">{r.id} · {r.date}</p>
                <p className="text-sm mt-1">📍 {r.location}</p>
                <p className="text-sm text-muted mt-1">{r.description}</p>
                <div className="flex gap-1 mt-2">
                  <span className={`badge ${r.severity === "High" || r.severity === "Critical" ? "badge-red" : r.severity === "Medium" ? "badge-amber" : "badge-green"}`}>{r.severity}</span>
                </div>

                <div className="divider" />
                <p className="text-xs" style={{ fontWeight: 600, marginBottom: "8px" }}>Report Tracking</p>
                <div className="timeline">
                  {REPORT_STATUSES.filter((s) => s !== "Archived").map((status) => {
                    const timelineEntry = r.timeline.find((t) => t.status === status);
                    const isDone = timelineEntry !== undefined;
                    const isCurrent = r.status === status;
                    return (
                      <div key={status} className={`timeline-step ${isDone ? "done" : ""} ${isCurrent ? "current" : ""}`}>
                        <div className="step-status">{status}</div>
                        {timelineEntry && <div className="step-date">{timelineEntry.date}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
