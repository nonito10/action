import { Outlet, NavLink, Link } from "react-router-dom";
import { loadDB } from "../../data/store";

export default function Layout() {
  const db = loadDB();
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="logo"><span>🌱</span>{db.settings.siteName}</div>
          <p>CMS Admin Portal</p>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin" end>📊 Dashboard</NavLink>
          <div className="nav-section">Management</div>
          <NavLink to="/admin/reports">📋 Reports</NavLink>
          <NavLink to="/admin/users">👥 Users</NavLink>
          <div className="nav-section">Content</div>
          <NavLink to="/admin/climate-hub">🌍 Climate Hub</NavLink>
          <NavLink to="/admin/news">📰 News & Updates</NavLink>
          <NavLink to="/admin/advisories">⚠ Advisories</NavLink>
          <NavLink to="/admin/activities">📅 Activities</NavLink>
          <NavLink to="/admin/community">👥 Community</NavLink>
          <NavLink to="/admin/quiz">🧠 Quiz</NavLink>
          <div className="nav-section">Data & System</div>
          <NavLink to="/admin/map">🗺 GIS Map</NavLink>
          <NavLink to="/admin/analytics">📈 Analytics</NavLink>
          <NavLink to="/admin/settings">⚙ CMS Settings</NavLink>
          <div className="nav-section">View Site</div>
          <Link to="/" style={{ paddingLeft: "20px" }}>🌐 Open Citizen Portal</Link>
        </nav>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
