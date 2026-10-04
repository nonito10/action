import { useState } from "react";
import { loadDB, saveQuizResult, QUIZ_LEVELS } from "../../data/store";

export default function Quiz() {
  const db = loadDB();
  const [mode, setMode] = useState("home");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const questions = db.quizQuestions;
  const question = questions[currentQ];
  const myResults = db.quizResults.filter((r) => r.userId === db.currentUser.id);

  const startQuiz = () => {
    setMode("quiz");
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setShowResult(false);
    setScore(0);
  };

  const answer = (idx) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === question.correctAnswer) setScore((s) => s + question.points);
  };

  const next = () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      saveQuizResult(score, questions.length * 10);
      setMode("result");
    }
  };

  const currentLevel = QUIZ_LEVELS.slice().reverse().find((l) => db.currentUser.points >= l.min) || QUIZ_LEVELS[0];
  const nextLevel = QUIZ_LEVELS.find((l) => l.min > db.currentUser.points);

  if (mode === "home") {
    return (
      <div className="page page-narrow">
        <h1 className="section-title"><span className="icon">🧠</span>Climate Challenge</h1>

        <div className="card mb-3" style={{ background: "linear-gradient(135deg, #4f46e5, #6366f1)", color: "white", border: "none" }}>
          <div className="card-body" style={{ textAlign: "center", padding: "32px" }}>
            <div style={{ fontSize: "3rem", marginBottom: "8px" }}>🧠</div>
            <h2>Test Your Climate Knowledge</h2>
            <p style={{ opacity: 0.9, marginTop: "8px" }}>Answer {questions.length} questions and earn climate points!</p>
            <button className="btn btn-lg mt-2" style={{ background: "white", color: "#4f46e5" }} onClick={startQuiz}>Start Quiz →</button>
          </div>
        </div>

        <div className="grid-3 mb-3">
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-value">{db.currentUser.points}</div>
            <div className="stat-label">Total Points</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏅</div>
            <div className="stat-value">{db.currentUser.badges.length}</div>
            <div className="stat-label">Badges Earned</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-value">{myResults.length}</div>
            <div className="stat-label">Quizzes Taken</div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="card mb-3">
          <div className="card-header"><h3>Your Level</h3></div>
          <div className="card-body">
            <div className="flex items-center gap-1 mb-2">
              <span style={{ fontSize: "1.5rem" }}>🏆</span>
              <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>{currentLevel.name}</span>
            </div>
            {nextLevel && (
              <>
                <div className="progress-bar mb-1">
                  <div className="fill" style={{ width: `${Math.min(100, (db.currentUser.points / nextLevel.min) * 100)}%` }} />
                </div>
                <p className="text-xs text-muted">{nextLevel.min - db.currentUser.points} points to reach {nextLevel.name}</p>
              </>
            )}
            <div className="flex gap-1 mt-2" style={{ flexWrap: "wrap" }}>
              {QUIZ_LEVELS.map((l) => (
                <span key={l.name} className={`badge ${l.name === currentLevel.name ? "badge-green" : "badge-slate"}`}>{l.name}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Quiz History */}
        <div className="card mb-3">
          <div className="card-header"><h3>Quiz History</h3></div>
          <div className="card-body">
            {myResults.length === 0 ? (
              <p className="text-sm text-muted">No quizzes taken yet.</p>
            ) : (
              <table className="table">
                <thead><tr><th>Date</th><th>Score</th><th>Result</th></tr></thead>
                <tbody>
                  {myResults.map((r, i) => (
                    <tr key={i}>
                      <td>{r.date}</td>
                      <td>{r.score}/{r.total}</td>
                      <td>{r.score === r.total ? <span className="badge badge-green">Perfect!</span> : <span className="badge badge-blue">{Math.round((r.score / r.total) * 100)}%</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="card">
          <div className="card-header"><h3>🏆 Leaderboard</h3></div>
          <div className="card-body">
            {db.champions.map((c) => (
              <div key={c.id} className="list-item">
                <div className="item-icon" style={{ fontSize: "1.5rem" }}>{["🥇", "🥈", "🥉"][c.rank - 1]}</div>
                <div className="item-body">
                  <div className="item-title">{c.name}</div>
                  <div className="item-sub">{c.points} points · {c.badges} badges</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (mode === "quiz") {
    return (
      <div className="page page-narrow">
        <div className="flex justify-between items-center mb-3">
          <h2>Climate Quiz</h2>
          <span className="text-sm text-muted">Question {currentQ + 1} of {questions.length}</span>
        </div>
        <div className="progress-bar mb-3"><div className="fill" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} /></div>

        <div className="card">
          <div className="card-body">
            <span className="badge badge-teal mb-2">{question.category}</span>
            <h3 style={{ fontSize: "1.05rem", marginBottom: "16px" }}>{question.question}</h3>
            {question.options.map((opt, idx) => (
              <div
                key={idx}
                className={`quiz-option ${selected === idx ? (idx === question.correctAnswer ? "correct" : "wrong") : ""} ${showResult && idx === question.correctAnswer ? "correct" : ""}`}
                onClick={() => answer(idx)}
              >
                {opt}
                {showResult && idx === question.correctAnswer && " ✓"}
                {showResult && selected === idx && idx !== question.correctAnswer && " ✗"}
              </div>
            ))}
            {showResult && (
              <div className="mt-2">
                <p className="text-sm" style={{ color: selected === question.correctAnswer ? "var(--green-600)" : "var(--red-500)" }}>
                  {selected === question.correctAnswer ? "Correct! +" + question.points + " points" : "Incorrect. The correct answer is: " + question.options[question.correctAnswer]}
                </p>
                <button className="btn btn-primary mt-2" onClick={next}>
                  {currentQ + 1 < questions.length ? "Next Question →" : "See Results →"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Result
  const total = questions.length * 10;
  const pct = Math.round((score / total) * 100);
  return (
    <div className="page page-narrow">
      <div className="card">
        <div className="card-body" style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "12px" }}>{pct === 100 ? "🏆" : pct >= 60 ? "🎉" : "📚"}</div>
          <h2>Quiz Complete!</h2>
          <p style={{ fontSize: "2rem", fontWeight: 700, color: "var(--green-600)", margin: "12px 0" }}>{score}/{total}</p>
          <p className="text-muted">{pct}% correct · +{score} climate points earned</p>
          <div className="flex gap-1 mt-2" style={{ justifyContent: "center" }}>
            <button className="btn btn-primary" onClick={startQuiz}>Try Again</button>
            <button className="btn btn-outline" onClick={() => setMode("home")}>Back to Hub</button>
          </div>
        </div>
      </div>
    </div>
  );
}
