export default function Character({ type, name, icon, role, active, text }) {
  const moods = {
    judge: "SERIOUSLY JUDGING",
    prosecutor: "BUILDING THE CASE",
    defence: "DESPERATELY DEFENDING"
  };

  return (
    <div className={`character ${type} ${active ? "active" : ""}`}>
      <div className="character-badge">{active ? "● IN SESSION" : "COURT OFFICIAL"}</div>
      <div className="avatar-wrap">
        <div className="avatar">{icon}</div>
        {active && <span className="thinking">✦</span>}
      </div>
      <div className="char-name">{name}</div>
      <div className="char-role">{role}</div>
      <div className="mood">{active ? moods[type] : "AWAITING TURN"}</div>
      {active && text && (
        <div className="speech">
          <div className="speech-tail" />
          <div className="speech-label">{type === "judge" ? "⚖️ JUDGE SAYS" : type === "prosecutor" ? "🔥 PROSECUTION SAYS" : "🛡️ DEFENCE SAYS"}</div>
          <div className="speech-text">{text}</div>
        </div>
      )}
    </div>
  );
}
