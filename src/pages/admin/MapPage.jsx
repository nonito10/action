import { useState } from "react";
import { loadDB } from "../../data/store";

export default function MapPage() {
  const db = loadDB();
  const [filterCat, setFilterCat] = useState("all");
  const categories = [...new Set(db.reports.map((r) => r.category))];
  const filtered = filterCat === "all" ? db.reports : db.reports.filter((r) => r.category === filterCat);

  return (
    <div className="admin-main" style={{ maxWidth: "1100px" }}>
      <div className="admin-topbar"><h1>GIS Map</h1></div>

      <div className="card mb-3">
        <div className="card-body">
          <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
            <div className="form-group" style={{ flex: 1, minWidth: "150px", marginBottom: 0 }}>
              <label>Layer / Category</label>
              <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}>
                <option value="all">All Layers</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h3>Map Layers: Reports, Locations, Categories, Severity</h3></div>
        <div className="card-body">
          <div className="map-placeholder" style={{ height: "400px" }}>
            {filtered.map((r, i) => (
              <div key={r.id} className={`map-marker ${r.severity.toLowerCase()}`} style={{ left: `${15 + i * 18}%`, top: `${20 + (i % 4) * 18}%` }} title={`${r.category}: ${r.location}`}>
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
    </div>
  );
}
