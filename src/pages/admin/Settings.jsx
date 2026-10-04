import { useState } from "react";
import { loadDB, updateSettings } from "../../data/store";

export default function Settings() {
  const db = loadDB();
  const [tab, setTab] = useState("branding");
  const [settings, setSettings] = useState(db.settings);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { key: "branding", label: "Branding", icon: "🎨" },
    { key: "homepage", label: "Homepage", icon: "🏠" },
    { key: "about", label: "About", icon: "ℹ" },
    { key: "staff", label: "Staff & Roles", icon: "👥" },
  ];

  return (
    <div className="admin-main" style={{ maxWidth: "800px" }}>
      <div className="admin-topbar"><h1>CMS Settings</h1></div>

      <div className="flex gap-1 mb-3" style={{ flexWrap: "wrap" }}>
        {tabs.map((t) => (
          <button key={t.key} className={`pill ${tab === t.key ? "active" : ""}`} onClick={() => setTab(t.key)}>{t.icon} {t.label}</button>
        ))}
      </div>

      {saved && <div className="success-msg mb-2">✓ Settings saved successfully!</div>}

      {tab === "branding" && (
        <div className="card">
          <div className="card-header"><h3>Website Branding</h3></div>
          <div className="card-body">
            <div className="form-group"><label>Website Name</label><input value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} /></div>
            <div className="form-group"><label>Tagline</label><input value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} /></div>
            <div className="grid-2">
              <div className="form-group"><label>Primary Color</label><input type="color" value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} style={{ height: "40px" }} /></div>
              <div className="form-group"><label>Secondary Color</label><input type="color" value={settings.secondaryColor} onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })} style={{ height: "40px" }} /></div>
            </div>
            <div className="form-group"><label>Footer Text</label><input value={settings.footerText} onChange={(e) => setSettings({ ...settings, footerText: e.target.value })} /></div>
            <div className="form-group"><label>Contact Email</label><input value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} /></div>
            <button className="btn btn-primary" onClick={save}>Save Changes</button>
          </div>
        </div>
      )}

      {tab === "homepage" && (
        <div className="card">
          <div className="card-header"><h3>Homepage Editor</h3></div>
          <div className="card-body">
            <div className="form-group"><label>Hero Title</label><input value={settings.heroTitle} onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })} /></div>
            <div className="form-group"><label>Hero Description</label><textarea value={settings.heroDescription} onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })} /></div>
            <button className="btn btn-primary" onClick={save}>Save Changes</button>
          </div>
        </div>
      )}

      {tab === "about" && (
        <div className="card">
          <div className="card-header"><h3>About Website</h3></div>
          <div className="card-body">
            <div className="form-group"><label>About Text</label><textarea value={settings.aboutText} onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })} style={{ minHeight: "120px" }} /></div>
            <button className="btn btn-primary" onClick={save}>Save Changes</button>
          </div>
        </div>
      )}

      {tab === "staff" && (
        <div className="card">
          <div className="card-header"><h3>Staff & Sub-Admins</h3></div>
          <div className="card-body" style={{ padding: 0 }}>
            <table className="table">
              <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr></thead>
              <tbody>
                {db.staff.map((s) => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 600 }}>{s.name}</td>
                    <td className="text-xs">{s.email}</td>
                    <td><span className={`badge ${s.role === "Super Admin" ? "badge-red" : "badge-blue"}`}>{s.role}</span></td>
                    <td><span className="badge badge-green">{s.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
