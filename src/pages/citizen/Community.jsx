import { loadDB } from "../../data/store";

export default function Community() {
  const db = loadDB();
  const upcoming = db.activities.filter((a) => a.status === "Upcoming");
  const stories = db.communityStories.filter((s) => s.status === "Approved");

  // Real system data
  const totalParticipants = db.users.length;
  const activitiesCompleted = db.activities.filter((a) => a.status === "Completed").length;
  const treesPlanted = db.activities.filter((a) => a.type === "Tree Planting").reduce((sum, a) => sum + a.registered * 10, 0);
  const wasteCollected = db.activities.filter((a) => a.type === "Coastal Cleanup").reduce((sum, a) => sum + a.registered * 5, 0);
  const issuesReported = db.reports.length;

  return (
    <div className="page">
      <h1 className="section-title"><span className="icon">👥</span>Community</h1>

      {/* Community Impact */}
      <div className="stat-grid mb-3">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{totalParticipants}</div>
          <div className="stat-label">Citizens Participating</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{activitiesCompleted}</div>
          <div className="stat-label">Activities Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🌳</div>
          <div className="stat-value">{treesPlanted}</div>
          <div className="stat-label">Trees Planted</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">♻</div>
          <div className="stat-value">{wasteCollected} kg</div>
          <div className="stat-label">Waste Collected</div>
        </div>
      </div>
      <p className="text-xs text-muted mb-3">📊 {issuesReported} environmental issues reported</p>

      {/* Upcoming Activities */}
      <div className="card mb-3">
        <div className="card-header"><h3>📅 Community Activities</h3></div>
        <div className="card-body">
          {upcoming.map((a) => (
            <div key={a.id} className="list-item">
              <div className="item-icon">📅</div>
              <div className="item-body">
                <div className="item-title">{a.title}</div>
                <div className="item-sub">{a.date} · {a.location} · {a.registered}/{a.capacity} registered</div>
              </div>
              <button className="btn btn-primary btn-sm">Register</button>
            </div>
          ))}
        </div>
      </div>

      {/* Community Stories */}
      <div className="card mb-3">
        <div className="card-header"><h3>📖 Community Stories</h3></div>
        <div className="card-body">
          {stories.map((s) => (
            <div key={s.id} className="list-item">
              <div className="item-icon">📖</div>
              <div className="item-body">
                <div className="item-title">{s.title}</div>
                <div className="item-sub">By {s.author} · {s.date}</div>
              </div>
              <button className="btn btn-outline btn-sm">Read</button>
            </div>
          ))}
        </div>
      </div>

      {/* Climate Champions */}
      <div className="card mb-3">
        <div className="card-header"><h3>🏆 Climate Champions</h3></div>
        <div className="card-body">
          {db.champions.map((c) => (
            <div key={c.id} className="list-item">
              <div className="item-icon" style={{ fontSize: c.rank === 1 ? "1.5rem" : "1.25rem" }}>{["🥇", "🥈", "🥉"][c.rank - 1]}</div>
              <div className="item-body">
                <div className="item-title">{c.name}</div>
                <div className="item-sub">{c.points} points · {c.badges} badges · {c.activities} activities</div>
              </div>
              <span className="badge badge-green">Rank #{c.rank}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Volunteer Opportunities */}
      <div className="card">
        <div className="card-header"><h3>🤝 Volunteer Opportunities</h3></div>
        <div className="card-body">
          {upcoming.filter((a) => a.registered < a.capacity).map((a) => (
            <div key={a.id} className="list-item">
              <div className="item-icon">🤝</div>
              <div className="item-body">
                <div className="item-title">{a.title}</div>
                <div className="item-sub">{a.date} · {a.location} · {a.capacity - a.registered} slots left</div>
              </div>
              <button className="btn btn-teal btn-sm">Join</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
