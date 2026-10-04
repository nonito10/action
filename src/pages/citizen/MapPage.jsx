import { useState } from "react";
import { loadDB } from "../../data/store";

export default function MapPage() {
  const db = loadDB();
  const [selected, setSelected] = useState(null);
  const [filterCat, setFilterCat] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");

  const categories = [...new Set(db.reports.map((r) => r.category))];
  const filtered = db.reports.filter(
    (r) => (filterCat === "all" || r.category === filterCat) && (filterSeverity === "all" || r.severity === filterSeverity)
  );

  return (
    <div className="page">
      <h1 className="section-title"><span className="icon">🗺</span>Climate Map</h1>

      {/* Filters */}
      <div className="card mb-3">
        <div className="card-body">
          <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
            <div className="form-group" style={{ flex: 1, minWidth: "150px", marginBottom: 0 }}>
              <label>Category</label>
              <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}>
                <option value="all">All Categories</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ flex: 1, minWidth: "150px", marginBottom: 0 }}>
              <label>Severity</label>
              <select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)}>
                <option value="all">All Severity</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: "2fr 1fr" }}>
        {/* Map */}
        <div className="card">
          <div className="card-header"><h3>Environmental Reports Map</h3></div>
          <div className="card-body">
            <div className="map-placeholder" style={{ height: "400px" }}>
              {filtered.map((r, i) => (
                <div
                  key={r.id}
                  className={`map-marker ${r.severity.toLowerCase()}`}
                  style={{ left: `${15 + i * 18}%`, top: `${20 + (i % 4) * 18}%` }}
                  onClick={() => setSelected(r)}
                  title={`${r.category}: ${r.location}`}
                >
                  <span>{r.icon}</span>
                </div>
              ))}
            </div>
            <div className="map-legend">
              <span><span className="dot" style={{ background: "var(--red-500)" }} />High/Critical</span>
              <span><span className="dot" style={{ background: "var(--amber-500)" }} />Medium</span>
              <span><span className="dot" style={{ background: "var(--green-500)" }} />Low</span>
            </div>
          </div>
        </div>

        {/* Incident Detail */}
        <div className="card">
          <div className="card-header"><h3>Incident Details</h3></div>
          <div className="card-body">
            {selected ? (
              <>
                <p className="text-xs text-muted">{selected.id}</p>
                <h3 style={{ fontSize: "1rem", marginTop: "4px" }}>{selected.icon} {selected.category}</h3>
                <p className="text-sm mt-1">📍 {selected.location}</p>
                <p className="text-sm text-muted mt-1">📅 {selected.date}</p>
                <div className="flex gap-1 mt-1">
                  <span className={`badge ${selected.severity === "High" || selected.severity === "Critical" ? "badge-red" : selected.severity === "Medium" ? "badge-amber" : "badge-green"}`}>{selected.severity}</span>
                  <span className="badge badge-blue">{selected.status}</span>
                </div>
                <p className="text-sm mt-2">{selected.description}</p>
                {selected.photo && <p className="text-xs text-muted mt-1">📷 Photo attached</p>}
              </>
            ) : (
              <div className="empty-state">
                <div className="icon">🗺</div>
                <p>Select a marker on the map to view incident details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
