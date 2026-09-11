let ctx;

function audioContext() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

function tone(frequency, duration, type = "sine", volume = 0.05) {
  try {
    const c = audioContext();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.value = frequency;
    g.gain.setValueAtTime(volume, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    o.connect(g).connect(c.destination);
    o.start();
    o.stop(c.currentTime + duration);
  } catch {}
}

export const sounds = {
  gavel: () => { tone(90, 0.18, "square", 0.09); setTimeout(() => tone(55, 0.12, "square", 0.05), 70); },
  objection: () => { tone(500, 0.12, "sawtooth", 0.07); setTimeout(() => tone(260, 0.18, "sawtooth", 0.05), 100); },
  verdict: () => { tone(392, 0.16, "sine", 0.05); setTimeout(() => tone(523, 0.2, "sine", 0.05), 130); setTimeout(() => tone(659, 0.35, "sine", 0.05), 280); }
};
