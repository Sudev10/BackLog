export default function EvidenceCard({ evidence }) {
  return (
    <div className="evidence-card">
      <div className="exhibit">EXHIBIT A</div>
      <h3>{evidence.title}</h3>
      <p>{evidence.description}</p>
      <div className="evidence-arguments">
        <p><b>PROSECUTION:</b> {evidence.prosecutor}</p>
        <p><b>DEFENCE:</b> {evidence.defence}</p>
      </div>
    </div>
  );
}
