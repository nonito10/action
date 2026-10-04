import { loadDB } from "../../data/store";

export default function Quiz() {
  const db = loadDB();
  return (
    <div className="admin-main" style={{ maxWidth: "1100px" }}>
      <div className="admin-topbar">
        <h1>Quiz Management</h1>
        <button className="btn btn-primary">+ Add Question</button>
      </div>

      <div className="stat-grid mb-3">
        <div className="stat-card"><div className="stat-icon">🧠</div><div className="stat-value">{db.quizQuestions.length}</div><div className="stat-label">Questions</div></div>
        <div className="stat-card"><div className="stat-icon">📂</div><div className="stat-value">{new Set(db.quizQuestions.map((q) => q.category)).size}</div><div className="stat-label">Categories</div></div>
        <div className="stat-card"><div className="stat-icon">📊</div><div className="stat-value">{db.quizResults.length}</div><div className="stat-label">Quiz Results</div></div>
        <div className="stat-card"><div className="stat-icon">⭐</div><div className="stat-value">{db.quizResults.reduce((s, r) => s + r.score, 0)}</div><div className="stat-label">Points Awarded</div></div>
      </div>

      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          <table className="table">
            <thead><tr><th>Question</th><th>Category</th><th>Options</th><th>Correct</th><th>Points</th><th>Actions</th></tr></thead>
            <tbody>
              {db.quizQuestions.map((q) => (
                <tr key={q.id}>
                  <td style={{ fontWeight: 600 }}>{q.question}</td>
                  <td><span className="badge badge-teal">{q.category}</span></td>
                  <td className="text-xs">{q.options.length} options</td>
                  <td className="text-xs">{q.options[q.correctAnswer]}</td>
                  <td>{q.points}</td>
                  <td><button className="btn btn-outline btn-sm">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
