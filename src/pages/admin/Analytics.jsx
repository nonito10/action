import { loadDB } from "../../data/store";

export default function Analytics() {
  const db = loadDB();

  // Reports by category
  const catCounts = {};
  db.reports.forEach((r) => { catCounts[r.category] = (catCounts[r.category] || 0) + 1; });
  const catEntries = Object.entries(catCounts).sort((a, b) => b[1] - a[1]);
  const maxCat = Math.max(...Object.values(catCounts), 1);

  // Reports by barangay
  const brgyCounts = {};
  db.users.forEach((u) => { brgyCounts[u.barangay] = (brgyCounts[u.barangay] || 0) + u.reports; });
  const brgyEntries = Object.entries(brgyCounts).sort((a, b) => b[1] - a[1]);
  const maxBrgy = Math.max(...Object.values(brgyCounts), 1);

  // Resolution rate
  const resolved = db.reports.filter((r) => r.status === "Resolved").length;
  const resolutionRate = Math.round((resolved / db.reports.length) * 100);

  // Severity distribution
  const sevCounts = { Low: 0, Medium: 0, High: 0, Critical: 0 };
  db.reports.forEach((r) => { sevCounts[r.severity] = (sevCounts[r.severity] || 0) + 1; });

  return (
    <div className="admin-main" style={{ maxWidth: "1100px" }}>
      <div className="admin-topbar"><h1>Analytics</h1></div>

      {/* Environmental Analytics */}
      <h3 className="section-title mb-2"><span className="icon">📊</span>Environmental Analytics</h3>
      <div className="grid-2 mb-3">
        <div className="card">
          <div className="card-header"><h3>Reports by Category</h3></div>
          <div className="card-body">
            {catEntries.map(([cat, count]) => (
              <div key={cat} className="mb-1">
                <div className="flex justify-between text-sm mb-1"><span>{cat}</span><span className="text-muted">{count}</span></div>
                <div className="progress-bar"><div className="fill" style={{ width: `${(count / maxCat) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h3>Reports by Barangay</h3></div>
          <div className="card-body">
            {brgyEntries.map(([brgy, count]) => (
              <div key={brgy} className="mb-1">
                <div className="flex justify-between text-sm mb-1"><span>{brgy}</span><span className="text-muted">{count}</span></div>
                <div className="progress-bar"><div className="fill" style={{ width: `${(count / maxBrgy) * 100}%`, background: "var(--teal-500)" }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="stat-grid mb-3">
        <div className="stat-card"><div className="stat-icon">✅</div><div className="stat-value" style={{ color: "var(--green-600)" }}>{resolutionRate}%</div><div className="stat-label">Resolution Rate</div></div>
        <div className="stat-card"><div className="stat-icon">📋</div><div className="stat-value">{db.reports.length}</div><div className="stat-label">Total Reports</div></div>
        <div className="stat-card"><div className="stat-icon">✅</div><div className="stat-value">{resolved}</div><div className="stat-label">Resolved</div></div>
        <div className="stat-card"><div className="stat-icon">⏳</div><div className="stat-value">{db.reports.length - resolved}</div><div className="stat-label">Unresolved</div></div>
      </div>

      {/* Severity Distribution */}
      <div className="card mb-3">
        <div className="card-header"><h3>Severity Distribution</h3></div>
        <div className="card-body">
          <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
            {Object.entries(sevCounts).map(([sev, count]) => (
              <div key={sev} style={{ flex: 1, minWidth: "120px", textAlign: "center", padding: "16px", borderRadius: "var(--radius)", background: "var(--slate-50)" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: sev === "High" || sev === "Critical" ? "var(--red-500)" : sev === "Medium" ? "var(--amber-500)" : "var(--green-600)" }}>{count}</div>
                <div className="text-xs text-muted">{sev}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Analytics */}
      <h3 className="section-title mb-2"><span className="icon">👥</span>Community Analytics</h3>
      <div className="stat-grid mb-3">
        <div className="stat-card"><div className="stat-icon">👥</div><div className="stat-value">{db.users.length}</div><div className="stat-label">Registered Users</div></div>
        <div className="stat-card"><div className="stat-icon">✓</div><div className="stat-value" style={{ color: "var(--green-600)" }}>{db.users.filter((u) => u.kycStatus === "verified").length}</div><div className="stat-label">KYC Verified</div></div>
        <div className="stat-card"><div className="stat-icon">📅</div><div className="stat-value">{db.activities.reduce((s, a) => s + a.registered, 0)}</div><div className="stat-label">Activity Participation</div></div>
        <div className="stat-card"><div className="stat-icon">🧠</div><div className="stat-value">{db.quizResults.length}</div><div className="stat-label">Quiz Participation</div></div>
      </div>

      {/* Content Analytics */}
      <h3 className="section-title mb-2"><span className="icon">📰</span>Content Analytics</h3>
      <div className="stat-grid">
        <div className="stat-card"><div className="stat-icon">📰</div><div className="stat-value">{db.news.length}</div><div className="stat-label">News Articles</div></div>
        <div className="stat-card"><div className="stat-icon">📚</div><div className="stat-value">{db.awareness.length}</div><div className="stat-label">Awareness Articles</div></div>
        <div className="stat-card"><div className="stat-icon">⚠</div><div className="stat-value">{db.advisories.length}</div><div className="stat-label">Active Advisories</div></div>
        <div className="stat-card"><div className="stat-icon">📖</div><div className="stat-value">{db.communityStories.length}</div><div className="stat-label">Community Stories</div></div>
      </div>
    </div>
  );
}
