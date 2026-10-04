import { useState } from "react";
import { loadDB, AWARENESS_CATEGORIES, ISSUE_CATEGORIES } from "../../data/store";

export default function ClimateHub() {
  const db = loadDB();
  const [tab, setTab] = useState("awareness");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const tabs = [
    { key: "awareness", label: "Climate Awareness", icon: "📚" },
    { key: "issues", label: "Environmental Issues", icon: "⚠" },
    { key: "news", label: "Climate News", icon: "📰" },
    { key: "action", label: "Take Action", icon: "🌱" },
    { key: "tips", label: "Climate Tips", icon: "💡" },
  ];

  return (
    <div className="page">
      <h1 className="section-title"><span className="icon">🌍</span>Climate Hub</h1>

      <div className="flex gap-1 mb-3" style={{ flexWrap: "wrap" }}>
        {tabs.map((t) => (
          <button key={t.key} className={`pill ${tab === t.key ? "active" : ""}`} onClick={() => { setTab(t.key); setSelectedCategory(null); }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {tab === "awareness" && (
        <div>
          {!selectedCategory ? (
            <>
              <p className="text-sm text-muted mb-2">Explore climate awareness topics across five key areas.</p>
              <div className="grid-3">
                {AWARENESS_CATEGORIES.map((c) => (
                  <div key={c.key} className="card" style={{ cursor: "pointer" }} onClick={() => setSelectedCategory(c.key)}>
                    <div className="card-body">
                      <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{c.icon}</div>
                      <h3 style={{ fontSize: "1rem", marginBottom: "6px" }}>{c.key}</h3>
                      <ul className="text-xs text-muted" style={{ paddingLeft: "16px", listStyle: "disc" }}>
                        {c.topics.slice(0, 3).map((t) => <li key={t}>{t}</li>)}
                        {c.topics.length > 3 && <li>...and {c.topics.length - 3} more</li>}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <button className="btn btn-outline btn-sm mb-2" onClick={() => setSelectedCategory(null)}>← Back to categories</button>
              <h2 className="mb-2">{AWARENESS_CATEGORIES.find((c) => c.key === selectedCategory)?.icon} {selectedCategory}</h2>
              <div className="grid-2">
                {AWARENESS_CATEGORIES.find((c) => c.key === selectedCategory)?.topics.map((topic) => {
                  const article = db.awareness.find((a) => a.category === selectedCategory && a.title.includes(topic.split(" ")[0]));
                  return (
                    <div key={topic} className="card">
                      <div className="card-body">
                        <h3 style={{ fontSize: "0.95rem" }}>{topic}</h3>
                        {article ? (
                          <>
                            <p className="text-sm text-muted mt-1">{article.summary}</p>
                            <p className="text-xs text-muted mt-1">By {article.author} · {article.date}</p>
                          </>
                        ) : (
                          <p className="text-sm text-muted mt-1">Content coming soon. Learn about {topic.toLowerCase()} and how it affects our environment.</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {tab === "issues" && (
        <div>
          <p className="text-sm text-muted mb-2">Click a category to learn about the issue, its impacts, and how you can help.</p>
          <div className="cat-grid">
            {ISSUE_CATEGORIES.map((c) => (
              <div key={c.key} className="cat-tile" onClick={() => setSelectedCategory(c.key)}>
                <div className="cat-icon">{c.icon}</div>
                <div className="cat-name">{c.key}</div>
              </div>
            ))}
          </div>
          {selectedCategory && (
            <div className="card mt-3">
              <div className="card-header"><h3>{ISSUE_CATEGORIES.find((c) => c.key === selectedCategory)?.icon} {selectedCategory}</h3></div>
              <div className="card-body">
                <h4 className="text-sm" style={{ fontWeight: 600, marginBottom: "6px" }}>What is the issue?</h4>
                <p className="text-sm text-muted mb-2">{selectedCategory} is a significant environmental concern affecting communities.</p>
                <h4 className="text-sm" style={{ fontWeight: 600, marginBottom: "6px" }}>Why it happens</h4>
                <p className="text-sm text-muted mb-2">Caused by various human activities and environmental factors.</p>
                <h4 className="text-sm" style={{ fontWeight: 600, marginBottom: "6px" }}>How citizens can help</h4>
                <p className="text-sm text-muted mb-2">Report incidents, reduce your environmental impact, and join community activities.</p>
                <h4 className="text-sm" style={{ fontWeight: 600, marginBottom: "6px" }}>How to report it</h4>
                <p className="text-sm text-muted">Use the Report page to submit a report with photo, location, and description.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "news" && (
        <div className="grid-3">
          {db.news.filter((n) => n.status === "Published").map((n) => (
            <div key={n.id} className="news-card">
              <div className="news-image">📰</div>
              <div className="news-body">
                <div className="news-meta">{n.category} · {n.date}</div>
                <div className="news-title">{n.title}</div>
                <div className="news-excerpt">{n.excerpt}</div>
                <a href="#" className="text-xs" style={{ color: "var(--green-600)", marginTop: "6px", display: "inline-block" }}>Read More →</a>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "action" && (
        <div>
          <div className="grid-3 mb-3">
            <div className="card"><div className="card-body">
              <h3 style={{ fontSize: "1rem", marginBottom: "10px" }}>Individual Actions</h3>
              <ul className="text-sm text-muted" style={{ paddingLeft: "16px", listStyle: "disc" }}>
                <li>Reduce plastic</li><li>Save electricity</li><li>Save water</li><li>Plant trees</li><li>Use reusable products</li><li>Reduce food waste</li>
              </ul>
            </div></div>
            <div className="card"><div className="card-body">
              <h3 style={{ fontSize: "1rem", marginBottom: "10px" }}>Community Actions</h3>
              <ul className="text-sm text-muted" style={{ paddingLeft: "16px", listStyle: "disc" }}>
                <li>Cleanup drives</li><li>Tree planting</li><li>Coastal cleanup</li><li>Recycling campaigns</li><li>Environmental seminars</li><li>Awareness campaigns</li>
              </ul>
            </div></div>
            <div className="card"><div className="card-body">
              <h3 style={{ fontSize: "1rem", marginBottom: "10px" }}>Citizen Participation</h3>
              <p className="text-sm text-muted mb-1">View Details → Register → Attend → Upload Proof → Verification → Earn Climate Points</p>
            </div></div>
          </div>
          <h3 className="section-title"><span className="icon">📅</span>Upcoming Activities</h3>
          <div className="grid-2">
            {db.activities.filter((a) => a.status === "Upcoming").map((a) => (
              <div key={a.id} className="card">
                <div className="card-body">
                  <h3 style={{ fontSize: "0.95rem" }}>{a.title}</h3>
                  <p className="text-xs text-muted mt-1">{a.date} · {a.location}</p>
                  <p className="text-sm text-muted mt-1">{a.description}</p>
                  <div className="flex gap-1 mt-2 items-center">
                    <span className="badge badge-teal">{a.type}</span>
                    <span className="text-xs text-muted">{a.registered}/{a.capacity} registered</span>
                  </div>
                  <button className="btn btn-primary btn-sm btn-block mt-2">Register</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "tips" && (
        <div className="grid-2">
          {[
            { icon: "💡", tip: "Turn off lights and unplug appliances when not in use." },
            { icon: "🚿", tip: "Take shorter showers to conserve water." },
            { icon: "♻", tip: "Segregate waste into biodegradable, recyclable, and residual." },
            { icon: "🚲", tip: "Walk, bike, or take public transport to reduce emissions." },
            { icon: "🌳", tip: "Plant native trees to support local biodiversity." },
            { icon: "🥤", tip: "Use reusable bottles and bags instead of single-use plastics." },
          ].map((t, i) => (
            <div key={i} className="card">
              <div className="card-body flex gap-1 items-center">
                <span style={{ fontSize: "1.5rem" }}>{t.icon}</span>
                <p className="text-sm">{t.tip}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
