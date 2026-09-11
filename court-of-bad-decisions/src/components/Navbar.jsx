import { Gavel, History, Volume2, VolumeX } from "lucide-react";

export default function Navbar({ soundOn, setSoundOn, onHistory }) {
  return (
    <nav className="navbar">
      <div className="brand"><Gavel size={21} /> COURT OF BAD DECISIONS</div>
      <div className="nav-actions">
        <button onClick={onHistory} title="Case history"><History size={18} /> <span>Cases</span></button>
        <button onClick={() => setSoundOn(v => !v)} title="Toggle sound">
          {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>
    </nav>
  );
}
