import { loadDB } from "../../data/store";

export default function Activities() {
  const db = loadDB();
  return (
    <div className="admin-main" style={{ maxWidth: "1100px" }}>
      <div className="admin-topbar">
        <h1>Activities</h1>
        <button className="btn btn-primary">+ Create Activity</button>
      </div>

      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          <table className="table">
            <thead><tr><th>Activity</th><th>Type</th><th>Date</th><th>Location</th><th>Registered</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {db.activities.map((a) => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 600 }}>{a.title}</td>
                  <td><span className="badge badge-teal">{a.type}</span></td>
                  <td className="text-xs">{a.date}</td>
                  <td className="text-xs">{a.location}</td>
                  <td>{a.registered}/{a.capacity}</td>
                  <td><span className={`badge ${a.status === "Upcoming" ? "badge-blue" : "badge-green"}`}>{a.status}</span></td>
                  <td><button className="btn btn-outline btn-sm">Manage</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
