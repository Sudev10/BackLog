import { X } from "lucide-react";

export default function CaseHistory({ cases, onClose }) {
  return (
    <div className="overlay">
      <div className="history-modal">
        <button className="close" onClick={onClose}><X /></button>
        <p className="eyebrow">ARCHIVES</p>
        <h2>Previous Cases</h2>
        {!cases.length ? <p>No cases have been tried yet.</p> : cases.map(c => (
          <div className="history-item" key={c.id}>
            <div><b>{c.decision}</b><small>{c.date}</small></div>
            <strong>{c.verdict}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
