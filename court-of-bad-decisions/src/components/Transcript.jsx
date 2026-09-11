export default function Transcript({ entries }) {
  return (
    <div className="transcript">
      <div className="section-label">COURT TRANSCRIPT</div>
      {entries.map((e, i) => (
        <div className={`transcript-line ${e.speaker}`} key={i}>
          <b>{e.label}</b>
          <span>{e.text}</span>
        </div>
      ))}
    </div>
  );
}
