import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { loadDB } from "../../data/store";

export default function Layout() {
  const db = loadDB();
  const unread = db.notifications.filter((n) => !n.read).length;
  const initials = db.currentUser.name.split(" ").map((w) => w[0]).join("");

  return (
    <div className="app-shell">
      <header className="citizen-header">
        <Link to="/" className="logo"><span>🌱</span>{db.settings.siteName}</Link>
        <nav className="citizen-nav">
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/report">Report</NavLink>
          <NavLink to="/my-reports">My Reports</NavLink>
          <NavLink to="/climate-hub">Climate Hub</NavLink>
          <NavLink to="/community">Community</NavLink>
          <NavLink to="/map">Map</NavLink>
        </nav>
        <div className="actions">
          <Link to="/notifications" className="icon-btn" aria-label="Notifications">
            🔔{unread > 0 && <span className="badge-dot" />}
          </Link>
          <Link to="/profile" className="avatar-btn">{initials}</Link>
        </div>
      </header>

      <Outlet />

      <nav className="bottom-nav">
        <NavLink to="/" end><span className="nav-icon">🏠</span>Home</NavLink>
        <NavLink to="/report"><span className="nav-icon">📝</span>Report</NavLink>
        <NavLink to="/map"><span className="nav-icon">🗺</span>Map</NavLink>
        <NavLink to="/climate-hub"><span className="nav-icon">🌍</span>Climate</NavLink>
        <NavLink to="/profile"><span className="nav-icon">👤</span>Profile</NavLink>
      </nav>
    </div>
  );
}
