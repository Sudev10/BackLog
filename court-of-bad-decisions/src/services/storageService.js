const KEY = "cobd_cases";

export function getCases() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}

export function saveCase(trial, decision) {
  const cases = getCases();
  cases.unshift({
    id: Date.now(),
    decision,
    verdict: trial.verdict.result,
    punishment: trial.verdict.punishment,
    date: new Date().toLocaleString()
  });
  localStorage.setItem(KEY, JSON.stringify(cases.slice(0, 20)));
  return cases;
}
