import { Gavel, RotateCcw } from "lucide-react";

export default function Verdict({ verdict, onNewCase }) {
  return (
    <section className="verdict-screen">
      <div className="verdict-stamp">VERDICT</div>
      <p className="eyebrow">THE HONORABLE COURT HAS DECIDED</p>
      <h2>{verdict.result}</h2>
      <p className="verdict-reason">{verdict.reason}</p>
      <div className="sentence-grid">
        <div><small>SENTENCE</small><strong>{verdict.punishment}</strong></div>
        <div><small>PROBATION</small><strong>{verdict.probation}</strong></div>
      </div>
      <button className="primary-btn" onClick={onNewCase}><RotateCcw size={18} /> TRY ANOTHER CASE</button>
      <div className="gavel-mark"><Gavel size={34} /></div>
    </section>
  );
}
