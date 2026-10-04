import { loadDB } from "../../data/store";

export default function Profile() {
  const db = loadDB();
  const user = db.currentUser;
  const myReports = db.reports.filter((r) => r.userId === user.id);
  const myActivities = db.activities.filter((a) => a.status === "Completed").length;
  const initials = user.name.split(" ").map((w) => w[0]).join("");

  return (
    <div className="page page-narrow">
      <h1 className="section-title"><span className="icon">👤</span>Profile</h1>

      {/* Profile header */}
      <div className="card mb-3">
        <div className="card-body flex gap-2 items-center">
          <div className="avatar-btn" style={{ width: "64px", height: "64px", fontSize: "1.5rem" }}>{initials}</div>
          <div className="flex-1">
            <h2 style={{ fontSize: "1.25rem" }}>{user.name}</h2>
            <p className="text-sm text-muted">{user.email}</p>
            <div className="flex gap-1 mt-1">
              <span className={`badge ${user.kycStatus === "verified" ? "badge-green" : "badge-amber"}`}>
                {user.kycStatus === "verified" ? "✓ KYC Verified" : "KYC " + user.kycStatus}
              </span>
              <span className="badge badge-teal">{user.level}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="card mb-3">
        <div className="card-header"><h3>Personal Information</h3></div>
        <div className="card-body">
          <div className="grid-2">
            <div><p className="text-xs text-muted">Name</p><p className="text-sm">{user.name}</p></div>
            <div><p className="text-xs text-muted">Email</p><p className="text-sm">{user.email}</p></div>
            <div><p className="text-xs text-muted">Phone</p><p className="text-sm">{user.phone}</p></div>
            <div><p className="text-xs text-muted">Barangay</p><p className="text-sm">{user.barangay}</p></div>
            <div style={{ gridColumn: "span 2" }}><p className="text-xs text-muted">Address</p><p className="text-sm">{user.address}</p></div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid mb-3">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-value">{myReports.length}</div>
          <div className="stat-label">My Reports</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-value">{myActivities}</div>
          <div className="stat-label">My Activities</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{user.points}</div>
          <div className="stat-label">My Points</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏅</div>
          <div className="stat-value">{user.badges.length}</div>
          <div className="stat-label">My Badges</div>
        </div>
      </div>

      {/* Badges */}
      <div className="card mb-3">
        <div className="card-header"><h3>My Badges</h3></div>
        <div className="card-body">
          <div className="flex gap-1" style={{ flexWrap: "wrap" }}>
            {user.badges.map((b) => (
              <span key={b} className="badge badge-green" style={{ fontSize: "0.85rem", padding: "6px 14px" }}>🏅 {b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="card">
        <div className="card-header"><h3>Account Settings</h3></div>
        <div className="card-body" style={{ padding: 0 }}>
          {[
            { icon: "🔒", label: "Security", sub: "Password and account security" },
            { icon: "🔔", label: "Notifications", sub: "Manage notification preferences" },
            { icon: "🛡", label: "Privacy", sub: "Control your data and privacy" },
          ].map((s) => (
            <div key={s.label} className="list-item" style={{ padding: "14px 20px" }}>
              <div className="item-icon">{s.icon}</div>
              <div className="item-body">
                <div className="item-title">{s.label}</div>
                <div className="item-sub">{s.sub}</div>
              </div>
              <span className="text-muted">→</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
