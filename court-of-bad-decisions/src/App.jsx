import React from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import CaseInput from "./components/CaseInput";
import Character from "./components/Character";
import Transcript from "./components/Transcript";
import EvidenceCard from "./components/EvidenceCard";
import Verdict from "./components/Verdict";
import CaseHistory from "./components/CaseHistory";
import { generateTrial } from "./services/courtEngine";
import { getCases, saveCase } from "./services/storageService";
import { sounds } from "./services/audioService";
import { CHARACTERS } from "./data/characters";

const delay = ms => new Promise(r => setTimeout(r, ms));

export default function App() {
  const [decision, setDecision] = useState("");
  const [foolishness, setFoolishness] = useState(5);
  const [trial, setTrial] = useState(null);
  const [phase, setPhase] = useState("filing");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(null);
  const [entries, setEntries] = useState([]);
  const [soundOn, setSoundOn] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [cases, setCases] = useState(getCases());

  const speak = async (speaker, label, text) => {
    setActive(speaker);
    setEntries(e => [...e, { speaker, label, text }]);
    await delay(Math.min(1700 + text.length * 8, 3500));
  };

  async function startTrial() {
    if (!decision.trim()) return;
    setLoading(true);
    try {
      const result = await generateTrial({ decision: decision.trim(), foolishness });
      const t = result.trial;
      setTrial(t);
      setPhase("trial");
      setEntries([]);
      setActive(null);

      await speak("judge", "JUDGE", t.opening.judge);
      await speak("prosecutor", "PROSECUTOR", t.opening.prosecutor);
      await speak("defence", "DEFENCE", t.opening.defence);

      setPhase("evidence");
      if (soundOn) sounds.objection();
      await delay(400);

      await speak("prosecutor", "PROSECUTOR", t.evidence.prosecutor);
      await speak("defence", "DEFENCE", t.evidence.defence);

      setPhase("cross");
      for (const line of t.crossExamination) await speak(line.speaker, line.speaker.toUpperCase(), line.text);

      await speak("prosecutor", "PROSECUTOR", t.closingArguments.prosecutor);
      await speak("defence", "DEFENCE", t.closingArguments.defence);

      setActive("judge");
      await delay(600);
      setPhase("verdict");
      if (soundOn) sounds.verdict();
      saveCase(t, decision);
      setCases(getCases());
    } catch (err) {
      console.error(err);
      alert("The court suffered a procedural error. Please try again.");
      setPhase("filing");
    } finally {
      setLoading(false);
      setActive(null);
    }
  }

  function newCase() {
    setTrial(null);
    setEntries([]);
    setActive(null);
    setPhase("filing");
    setDecision("");
    setFoolishness(5);
  }

  return (
    <div className="app">
      <Navbar soundOn={soundOn} setSoundOn={setSoundOn} onHistory={() => setHistoryOpen(true)} />

      {phase === "filing" && (
        <CaseInput
          decision={decision}
          setDecision={setDecision}
          foolishness={foolishness}
          setFoolishness={setFoolishness}
          onSubmit={startTrial}
          loading={loading}
        />
      )}

      {trial && phase !== "verdict" && (
        <main className="court">
          <header className="court-header">
            <p className="eyebrow">CASE FILED</p>
            <h1>{trial.caseTitle}</h1>
            <div className="charge">CHARGE: {trial.charges}</div>
          </header>

          <div className="court-stage">
            <Character type="prosecutor" {...CHARACTERS.prosecutor} active={active === "prosecutor"} text={entries.filter(e => e.speaker === "prosecutor").at(-1)?.text} />
            <Character type="judge" {...CHARACTERS.judge} active={active === "judge"} text={entries.filter(e => e.speaker === "judge").at(-1)?.text} />
            <Character type="defence" {...CHARACTERS.defence} active={active === "defence"} text={entries.filter(e => e.speaker === "defence").at(-1)?.text} />
          </div>

          <div className="case-ribbon">
            <span>CASE IN PROGRESS</span>
            <b>{phase === "trial" ? "OPENING STATEMENTS" : phase === "evidence" ? "EXHIBIT A" : "CROSS-EXAMINATION"}</b>
          </div>

          {phase === "evidence" && <EvidenceCard evidence={trial.evidence} />}
          <Transcript entries={entries} />

          <div className="phase">{phase === "trial" ? "OPENING STATEMENTS" : phase === "evidence" ? "PRESENTING EXHIBIT A" : "CROSS-EXAMINATION & CLOSING ARGUMENTS"}</div>
        </main>
      )}

      {trial && phase === "verdict" && <Verdict verdict={trial.verdict} onNewCase={newCase} />}

      {historyOpen && <CaseHistory cases={cases} onClose={() => setHistoryOpen(false)} />}
    </div>
  );
}
