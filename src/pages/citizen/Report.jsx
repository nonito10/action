import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addReport, ISSUE_CATEGORIES } from "../../data/store";

const STEPS = ["Choose Issue", "Photo", "Location", "Describe", "Severity", "Review"];

export default function ReportPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    category: "",
    icon: "",
    photo: null,
    location: "",
    lat: 14.676,
    lng: 121.043,
    description: "",
    severity: "Medium",
  });
  const [submitted, setSubmitted] = useState(null);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    const report = addReport(form);
    setSubmitted(report);
  };

  if (submitted) {
    return (
      <div className="page page-narrow">
        <div className="card">
          <div className="card-body" style={{ textAlign: "center", padding: "40px" }}>
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>✅</div>
            <h2>Report Submitted!</h2>
            <p className="text-muted mt-1">Your report ID is</p>
            <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--green-600)", margin: "8px 0" }}>{submitted.id}</p>
            <p className="text-sm text-muted">We'll notify you as your report progresses through verification, investigation, and resolution.</p>
            <div className="mt-2 flex gap-1" style={{ justifyContent: "center" }}>
              <button className="btn btn-primary" onClick={() => navigate("/my-reports")}>Track My Reports</button>
              <button className="btn btn-outline" onClick={() => { setSubmitted(null); setStep(0); setForm({ category: "", icon: "", photo: null, location: "", lat: 14.676, lng: 121.043, description: "", severity: "Medium" }); }}>Report Another</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-narrow">
      <h1 className="section-title"><span className="icon">🚨</span>Report an Environmental Issue</h1>

      {/* Step indicator */}
      <div className="flex gap-1 mb-3" style={{ flexWrap: "wrap" }}>
        {STEPS.map((s, i) => (
          <span key={s} className={`pill ${i === step ? "active" : ""}`} style={{ fontSize: "0.75rem" }}>
            {i + 1}. {s}
          </span>
        ))}
      </div>

      <div className="card">
        <div className="card-body">
          {step === 0 && (
            <div>
              <h3 className="mb-2">Choose Issue Type</h3>
              <div className="cat-grid">
                {ISSUE_CATEGORIES.map((c) => (
                  <div
                    key={c.key}
                    className={`cat-tile ${form.category === c.key ? "active" : ""}`}
                    style={form.category === c.key ? { border: "2px solid var(--green-600)", background: "var(--green-50)" } : {}}
                    onClick={() => { setForm({ ...form, category: c.key, icon: c.icon }); }}
                  >
                    <div className="cat-icon">{c.icon}</div>
                    <div className="cat-name">{c.key}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="mb-2">Take or Upload Photo</h3>
              <p className="text-sm text-muted mb-2">A photo helps authorities understand the issue better.</p>
              <div style={{ border: "2px dashed var(--slate-300)", borderRadius: "var(--radius)", padding: "40px", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: "8px" }}>📷</div>
                <p className="text-sm text-muted">Click to upload or take a photo</p>
                <input type="file" accept="image/*" capture="environment" style={{ marginTop: "12px" }} onChange={(e) => setForm({ ...form, photo: e.target.files[0]?.name || "photo.jpg" })} />
              </div>
              {form.photo && <p className="success-msg mt-2">Photo attached: {form.photo}</p>}
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="mb-2">Pin Exact Location</h3>
              <p className="text-sm text-muted mb-2">Enter the location or address of the issue.</p>
              <div className="form-group">
                <label>Location / Address</label>
                <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Rizal St, Barangay San Isidro, Quezon City" />
              </div>
              <div className="map-placeholder" style={{ height: "200px" }}>
                <div className="map-marker medium" style={{ left: "45%", top: "40%" }}><span>📍</span></div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="mb-2">Describe the Issue</h3>
              <div className="form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Provide details about what you observed..." />
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="mb-2">Severity Level</h3>
              <p className="text-sm text-muted mb-2">How serious is this issue?</p>
              <div className="flex gap-1" style={{ flexDirection: "column" }}>
                {["Low", "Medium", "High", "Critical"].map((s) => (
                  <div
                    key={s}
                    className={`quiz-option ${form.severity === s ? "selected" : ""}`}
                    onClick={() => setForm({ ...form, severity: s })}
                  >
                    <strong>{s}</strong> — {s === "Low" ? "Minor issue, minimal impact" : s === "Medium" ? "Moderate impact on community" : s === "High" ? "Significant impact, needs attention" : "Urgent, immediate danger"}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h3 className="mb-2">Review & Submit</h3>
              <div className="list-item"><span className="item-icon">{form.icon}</span><div className="item-body"><div className="item-title">{form.category}</div><div className="item-sub">{form.location || "No location set"}</div></div></div>
              <div className="list-item"><span className="item-icon">📷</span><div className="item-body"><div className="item-title">Photo</div><div className="item-sub">{form.photo || "No photo attached"}</div></div></div>
              <div className="list-item"><span className="item-icon">📝</span><div className="item-body"><div className="item-title">Description</div><div className="item-sub">{form.description || "No description"}</div></div></div>
              <div className="list-item"><span className="item-icon">⚠</span><div className="item-body"><div className="item-title">Severity</div><div className="item-sub">{form.severity}</div></div></div>
            </div>
          )}

          <div className="flex justify-between mt-3">
            <button className="btn btn-outline" onClick={prev} disabled={step === 0} style={{ opacity: step === 0 ? 0.5 : 1 }}>← Back</button>
            {step < STEPS.length - 1 ? (
              <button className="btn btn-primary" onClick={next} disabled={step === 0 && !form.category}>Next →</button>
            ) : (
              <button className="btn btn-primary" onClick={submit}>Submit Report</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
