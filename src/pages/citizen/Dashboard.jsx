import { Link } from "react-router-dom";
import { loadDB, AWARENESS_CATEGORIES, ISSUE_CATEGORIES } from "../../data/store";

export default function Dashboard() {
  const db = loadDB();
  const myReports = db.reports.filter((r) => r.userId === db.currentUser.id);
  const pending = myReports.filter((r) => r.status === "Pending").length;
  const inProgress = myReports.filter((r) => ["Verified", "Assigned", "Investigation"].includes(r.status)).length;
  const resolved = myReports.filter((r) => r.status === "Resolved").length;
  const activeAdvisory = db.advisories.find((a) => a.status === "Active" && a.priority === "High");
  const publishedNews = db.news.filter((n) => n.status === "Published").slice(0, 3);
  const upcomingActivities = db.activities.filter((a) => a.status === "Upcoming").slice(0, 3);
  const tip = "Turn off lights and unplug appliances when not in use — it saves energy and reduces your carbon footprint.";

  return (
    <div className="page">
      {activeAdvisory && (
        <div className={`alert-banner ${activeAdvisory.priority.toLowerCase()}`}>
          <span className="alert-icon">⚠</span>
          <div className="alert-content">
            <h4>{activeAdvisory.title}</h4>
            <p>{activeAdvisory.message}</p>
          </div>
        </div>
      )}

      {/* Today's Climate Status */}
      <div className="card mb-3">
        <div className="card-header"><h3>Today's Climate Status</h3></div>
        <div className="card-body">
          <div className="status-row">
            <div className="status-item">
              <div className="status-value" style={{ color: "var(--amber-500)" }}>32°C</div>
              <div className="status-label">Temperature</div>
            </div>
            <div className="status-divider" />
            <div className="status-item">
              <div className="status-value" style={{ color: "var(--red-500)" }}>40°C</div>
              <div className="status-label">Heat Index</div>
            </div>
            <div className="status-divider" />
            <div className="status-item">
              <div className="status-value" style={{ color: "var(--amber-500)" }}>112</div>
              <div className="status-label">AQI (Moderate)</div>
            </div>
            <div className="status-divider" />
            <div className="status-item">
              <div className="status-value" style={{ color: "var(--blue-500)" }}>70%</div>
              <div className="status-label">Rain Risk</div>
            </div>
          </div>
          <p className="status-source">Source: PAGASA / Official Advisory</p>
        </div>
      </div>

      {/* My Climate Activity */}
      <div className="card mb-3">
        <div className="card-header">
          <h3>My Climate Activity</h3>
          <Link to="/my-reports" className="card-link">View all →</Link>
        </div>
        <div className="card-body">
          <div className="stat-grid">
            <div className="stat-card" style={{ boxShadow: "none", border: "1px solid var(--slate-200)" }}>
              <div className="stat-value">{myReports.length}</div>
              <div className="stat-label">Total Reports</div>
            </div>
            <div className="stat-card" style={{ boxShadow: "none", border: "1px solid var(--slate-200)" }}>
              <div className="stat-value" style={{ color: "var(--amber-500)" }}>{pending}</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="stat-card" style={{ boxShadow: "none", border: "1px solid var(--slate-200)" }}>
              <div className="stat-value" style={{ color: "var(--blue-500)" }}>{inProgress}</div>
              <div className="stat-label">In Progress</div>
            </div>
            <div className="stat-card" style={{ boxShadow: "none", border: "1px solid var(--slate-200)" }}>
              <div className="stat-value" style={{ color: "var(--green-600)" }}>{resolved}</div>
              <div className="stat-label">Resolved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Report CTA */}
      <div className="card mb-3" style={{ background: "linear-gradient(135deg, var(--green-600), var(--teal-600))", color: "white", border: "none" }}>
        <div className="card-body" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "4px" }}>🚨 Report an Environmental Issue</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.9 }}>Flooding · Pollution · Waste · Burning · Trees</p>
          </div>
          <Link to="/report" className="btn" style={{ background: "white", color: "var(--green-700)" }}>Report Now →</Link>
        </div>
      </div>

      {/* Latest News */}
      <div className="card mb-3">
        <div className="card-header">
          <h3>📰 Latest Climate News & Updates</h3>
          <Link to="/climate-hub" className="card-link">View all →</Link>
        </div>
        <div className="card-body">
          <div className="grid-3">
            {publishedNews.map((n) => (
              <div key={n.id} className="news-card">
                <div className="news-image">📰</div>
                <div className="news-body">
                  <div className="news-meta">{n.category} · {n.date}</div>
                  <div className="news-title">{n.title}</div>
                  <div className="news-excerpt">{n.excerpt}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Environmental Issues Map */}
      <div className="card mb-3">
        <div className="card-header">
          <h3>🌍 Environmental Issues in Your Community</h3>
          <Link to="/map" className="card-link">Open Climate Map →</Link>
        </div>
        <div className="card-body">
          <div className="map-placeholder">
            {db.reports.map((r, i) => (
              <div
                key={r.id}
                className={`map-marker ${r.severity.toLowerCase()}`}
                style={{ left: `${20 + i * 20}%`, top: `${30 + (i % 3) * 20}%` }}
                title={`${r.category}: ${r.location}`}
              >
                <span>{r.icon}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Climate Awareness */}
      <div className="card mb-3">
        <div className="card-header">
          <h3>📚 Climate Awareness</h3>
          <Link to="/climate-hub" className="card-link">View all →</Link>
        </div>
        <div className="card-body">
          <div className="cat-grid">
            {AWARENESS_CATEGORIES.map((c) => (
              <Link key={c.key} to="/climate-hub" className="cat-tile">
                <div className="cat-icon">{c.icon}</div>
                <div className="cat-name">{c.key}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Take Climate Action */}
      <div className="card mb-3">
        <div className="card-header">
          <h3>🌱 Take Climate Action</h3>
          <Link to="/community" className="card-link">View all →</Link>
        </div>
        <div className="card-body">
          <div className="grid-3">
            {upcomingActivities.map((a) => (
              <div key={a.id} className="card" style={{ boxShadow: "none" }}>
                <div className="card-body" style={{ padding: "14px" }}>
                  <div className="text-sm" style={{ fontWeight: 600 }}>{a.title}</div>
                  <div className="text-xs text-muted mt-1">{a.date} · {a.location}</div>
                  <div className="text-xs text-muted mt-1">{a.registered}/{a.capacity} registered</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Climate Challenge */}
      <div className="card mb-3" style={{ background: "linear-gradient(135deg, #4f46e5, #6366f1)", color: "white", border: "none" }}>
        <div className="card-body" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "4px" }}>🧠 Climate Challenge</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.9 }}>Learn · Quiz · Earn Points · Badges</p>
            <p style={{ fontSize: "0.8rem", opacity: 0.8, marginTop: "4px" }}>Your level: {db.currentUser.level} · {db.currentUser.points} pts</p>
          </div>
          <Link to="/quiz" className="btn" style={{ background: "white", color: "#4f46e5" }}>Take Challenge →</Link>
        </div>
      </div>

      {/* Today's Tip */}
      <div className="card">
        <div className="card-header"><h3>💡 Today's Climate Tip</h3></div>
        <div className="card-body">
          <p className="text-sm">{tip}</p>
        </div>
      </div>
    </div>
  );
}
