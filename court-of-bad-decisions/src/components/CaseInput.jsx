import { Sparkles } from "lucide-react";
import { PRESETS } from "../data/presets";

export default function CaseInput({ decision, setDecision, foolishness, setFoolishness, onSubmit, loading }) {
  return (
    <main className="filing">
      <div className="seal">⚖</div>
      <p className="eyebrow">THE PEOPLE v. YOUR COMMON SENSE</p>
      <h1>Put your bad decision<br /><em>on trial.</em></h1>
      <p className="subtitle">Because apparently even your smallest life choices deserve a full courtroom proceeding.</p>

      <section className="filing-card">
        <label>WHAT TERRIBLE DECISION ARE YOU CONSIDERING?</label>
        <textarea
          value={decision}
          onChange={e => setDecision(e.target.value)}
          placeholder="e.g. Should I text my crush?"
          maxLength={300}
          rows={3}
        />
        <div className="meter-row">
          <div>
            <label>FOOLISHNESS LEVEL</label>
            <input type="range" min="1" max="10" value={foolishness} onChange={e => setFoolishness(+e.target.value)} />
          </div>
          <strong>{foolishness}/10</strong>
        </div>
        <button className="primary-btn" disabled={loading || !decision.trim()} onClick={onSubmit}>
          <Sparkles size={19} /> {loading ? "SUMMONING THE COURT..." : "PUT IT ON TRIAL"}
        </button>
      </section>

      <div className="presets">
        <span>QUICK CASES</span>
        {PRESETS.map(p => <button key={p} onClick={() => setDecision(p)}>{p}</button>)}
      </div>
    </main>
  );
}
