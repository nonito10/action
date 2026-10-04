import { useState } from "react";
import { loadDB } from "../../data/store";

export default function Users() {
  const db = loadDB();
  const [search, setSearch] = useState("");
  const [filterKyc, setFilterKyc] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = db.users.filter(
    (u) =>
      (search === "" || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())) &&
      (filterKyc === "all" || u.kycStatus === filterKyc)
  );

  return (
    <div className="admin-main" style={{ maxWidth: "1100px" }}>
      <div className="admin-topbar"><h1>Users</h1></div>

      <div className="card mb-3">
        <div className="card-body">
          <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
            <div className="form-group" style={{ flex: 1, minWidth: "200px", marginBottom: 0 }}>
              <label>Search</label>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email..." />
            </div>
            <div className="form-group" style={{ flex: 1, minWidth: "150px", marginBottom: 0 }}>
              <label>KYC Status</label>
              <select value={filterKyc} onChange={(e) => setFilterKyc(e.target.value)}>
                <option value="all">All</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: "2fr 1fr" }}>
        <div className="card">
          <div className="card-body" style={{ padding: 0 }}>
            <table className="table">
              <thead><tr><th>Name</th><th>Barangay</th><th>KYC</th><th>Status</th><th>Reports</th><th>Points</th></tr></thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} onClick={() => setSelected(u)} style={{ cursor: "pointer", background: selected?.id === u.id ? "var(--green-50)" : "" }}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{u.name}</div>
                      <div className="text-xs text-muted">{u.email}</div>
                    </td>
                    <td className="text-xs">{u.barangay}</td>
                    <td><span className={`badge ${u.kycStatus === "verified" ? "badge-green" : u.kycStatus === "pending" ? "badge-amber" : "badge-blue"}`}>{u.kycStatus}</span></td>
                    <td><span className={`badge ${u.accountStatus === "Active" ? "badge-green" : "badge-red"}`}>{u.accountStatus}</span></td>
                    <td>{u.reports}</td>
                    <td>{u.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3>User Profile</h3></div>
          <div className="card-body">
            {selected ? (
              <>
                <h3 style={{ fontSize: "1rem" }}>{selected.name}</h3>
                <p className="text-sm text-muted">{selected.email}</p>
                <div className="divider" />
                <div className="text-sm" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div><span className="text-xs text-muted">Phone: </span>{selected.phone}</div>
                  <div><span className="text-xs text-muted">Barangay: </span>{selected.barangay}</div>
                  <div><span className="text-xs text-muted">KYC: </span><span className={`badge ${selected.kycStatus === "verified" ? "badge-green" : "badge-amber"}`}>{selected.kycStatus}</span></div>
                  <div><span className="text-xs text-muted">Account: </span><span className={`badge ${selected.accountStatus === "Active" ? "badge-green" : "badge-red"}`}>{selected.accountStatus}</span></div>
                  <div><span className="text-xs text-muted">Reports: </span>{selected.reports}</div>
                  <div><span className="text-xs text-muted">Activities: </span>{selected.activities}</div>
                  <div><span className="text-xs text-muted">Points: </span>{selected.points}</div>
                  <div><span className="text-xs text-muted">Registered: </span>{selected.registrationDate}</div>
                  <div><span className="text-xs text-muted">Last Login: </span>{selected.lastLogin}</div>
                </div>
                <div className="flex gap-1 mt-2">
                  {selected.kycStatus !== "verified" && <button className="btn btn-primary btn-sm">Verify KYC</button>}
                  <button className="btn btn-outline btn-sm">{selected.accountStatus === "Active" ? "Suspend" : "Activate"}</button>
                </div>
              </>
            ) : (
              <div className="empty-state"><div className="icon">👤</div><p>Select a user.</p></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
