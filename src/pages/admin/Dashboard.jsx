import { Link } from "react-router-dom";
import { loadDB } from "../../data/store";

export default function Dashboard() {
  const db = loadDB();
  const totalUsers = db.users.length;
  const kycPending = db.users.filter((u) => u.kycStatus === "pending" || u.kycStatus === "under_review").length;
  const totalReports = db.reports.length;
  const totalActivities = db.activities.length;

  const pending = db.reports.filter((r) => r.status === "Pending").length;
  const verified = db.reports.filter((r) => r.status === "Verified").length;
  const investigation = db.reports.filter((r) => r.status === "Investigation").length;
  const resolved = db.reports.filter((r) => r.status === "Resolved").length;

  // Monthly report chart data
  const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  const monthlyData = [8, 12, 15, 10, 18, totalReports];
  const maxMonthly = Math.max(...monthlyData);

  const recentReports = db.reports.slice(0, 5);
  const kycPendingUsers = db.users.filter((u) => u.kycStatus === "pending" || u.kycStatus === "under_review").slice(0, 3);

  return (
    <div className="admin-main" style={{ maxWidth: "1100px" }}>
      <div className="admin-topbar">
        <h1>Dashboard</h1>
        <div className="admin-user">👤 Admin User</div>
      </div>

      {/* Stats */}
      <div className="stat-grid mb-3">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{totalUsers}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-value" style={{ color: "var(--amber-500)" }}>{kycPending}</div>
          <div className="stat-label">KYC Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-value">{totalReports}</div>
          <div className="stat-label">Reports</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-value">{totalActivities}</div>
          <div className="stat-label">Activities</div>
        </div>
      </div>

      {/* Report Activity Chart */}
      <div className="card mb-3">
        <div className="card-header"><h3>Report Activity</h3></div>
        <div className="card-body">
          <div className="bar-chart">
            {monthlyData.map((val, i) => (
              <div key={i} className="bar-col">
                <div className="bar" style={{ height: `${(val / maxMonthly) * 100}%`, background: i === 5 ? "var(--green-600)" : "var(--green-500)" }} />
                <div className="bar-label">{months[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Status */}
      <div className="card mb-3">
        <div className="card-header"><h3>Report Status</h3></div>
        <div className="card-body">
          <div className="stat-grid">
            <div className="stat-card" style={{ boxShadow: "none", border: "1px solid var(--slate-200)" }}>
              <div className="stat-value" style={{ color: "var(--amber-500)" }}>{pending}</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="stat-card" style={{ boxShadow: "none", border: "1px solid var(--slate-200)" }}>
              <div className="stat-value" style={{ color: "var(--blue-500)" }}>{verified}</div>
              <div className="stat-label">Verified</div>
            </div>
            <div className="stat-card" style={{ boxShadow: "none", border: "1px solid var(--slate-200)" }}>
              <div className="stat-value" style={{ color: "var(--teal-600)" }}>{investigation}</div>
              <div className="stat-label">Investigation</div>
            </div>
            <div className="stat-card" style={{ boxShadow: "none", border: "1px solid var(--slate-200)" }}>
              <div className="stat-value" style={{ color: "var(--green-600)" }}>{resolved}</div>
              <div className="stat-label">Resolved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="card mb-3">
        <div className="card-header">
          <h3>Recent Reports</h3>
          <Link to="/admin/reports" className="card-link">View all →</Link>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="table">
            <thead><tr><th>ID</th><th>Category</th><th>Location</th><th>Severity</th><th>Status</th></tr></thead>
            <tbody>
              {recentReports.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 600 }}>{r.id}</td>
                  <td>{r.icon} {r.category}</td>
                  <td className="text-xs">{r.location}</td>
                  <td><span className={`badge ${r.severity === "High" || r.severity === "Critical" ? "badge-red" : r.severity === "Medium" ? "badge-amber" : "badge-green"}`}>{r.severity}</span></td>
                  <td><span className={`badge ${r.status === "Resolved" ? "badge-green" : r.status === "Pending" ? "badge-amber" : "badge-blue"}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* KYC Verification */}
      <div className="card mb-3">
        <div className="card-header"><h3>KYC Verification</h3></div>
        <div className="card-body" style={{ padding: 0 }}>
          {kycPendingUsers.length === 0 ? (
            <div className="empty-state"><div className="icon">✅</div><p>No pending KYC verifications.</p></div>
          ) : (
            kycPendingUsers.map((u) => (
              <div key={u.id} className="list-item" style={{ padding: "14px 20px" }}>
                <div className="item-icon">👤</div>
                <div className="item-body">
                  <div className="item-title">{u.name}</div>
                  <div className="item-sub">{u.barangay} · {u.kycStatus}</div>
                </div>
                <div className="flex gap-1">
                  <button className="btn btn-primary btn-sm">Approve</button>
                  <button className="btn btn-outline btn-sm">Review</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Community Activity */}
      <div className="card">
        <div className="card-header"><h3>Community Activity</h3></div>
        <div className="card-body">
          <div className="stat-grid">
            <div className="stat-card" style={{ boxShadow: "none", border: "1px solid var(--slate-200)" }}>
              <div className="stat-value">{db.activities.filter((a) => a.status === "Upcoming").length}</div>
              <div className="stat-label">Upcoming</div>
            </div>
            <div className="stat-card" style={{ boxShadow: "none", border: "1px solid var(--slate-200)" }}>
              <div className="stat-value">{db.activities.filter((a) => a.status === "Completed").length}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-card" style={{ boxShadow: "none", border: "1px solid var(--slate-200)" }}>
              <div className="stat-value">{db.activities.reduce((s, a) => s + a.registered, 0)}</div>
              <div className="stat-label">Total Registrations</div>
            </div>
            <div className="stat-card" style={{ boxShadow: "none", border: "1px solid var(--slate-200)" }}>
              <div className="stat-value">{db.communityStories.length}</div>
              <div className="stat-label">Community Stories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
