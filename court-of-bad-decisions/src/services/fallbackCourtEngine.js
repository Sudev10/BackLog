const pick = (items) => items[Math.floor(Math.random() * items.length)];

const verdicts = [
  { result: "NOT GUILTY", reason: "Against all available evidence, this decision is surprisingly defensible.", punishment: "Proceed with caution.", probation: "Do not use this victory as evidence that all your decisions are good." },
  { result: "MILDLY GUILTY", reason: "The decision is questionable, but the court has seen much worse.", punishment: "Think about it for 10 minutes before proceeding.", probation: "One bad decision is permitted under supervised conditions." },
  { result: "GUILTY", reason: "The prosecution successfully demonstrated that common sense was ignored.", punishment: "You must reconsider the decision and drink some water.", probation: "No major decisions for the next 2 hours." },
  { result: "HIGHLY GUILTY", reason: "The defence attempted several excuses. None survived contact with reality.", punishment: "You are sentenced to reconsider your life choices.", probation: "No impulsive purchases for 24 hours." },
  { result: "EXTREMELY GUILTY", reason: "The court is struggling to understand why this case needed to be filed in the first place.", punishment: "Do the sensible thing immediately.", probation: "You must consult one responsible friend before repeating this behavior." },
  { result: "GUILTY WITH MITIGATING CIRCUMSTANCES", reason: "The decision is bad, but the defendant presented enough context to avoid the maximum sentence.", punishment: "Proceed only after a brief reality check.", probation: "You are under common-sense supervision." }
];

export function generateFallbackTrial(decision, foolishness = 5) {
  const v = pick(verdicts);
  const charge = pick([
    "First-degree unnecessary procrastination",
    "Reckless misuse of common sense",
    "Premeditated questionable judgment",
    "Attempted avoidance of responsibility",
    "Criminally casual decision-making",
    "Aggravated overthinking"
  ]);

  return {
    caseTitle: "The People vs. Your Common Sense",
    charges: charge,
    opening: {
      judge: `The court is now in session. The matter before us is: “${decision}”. I would like the record to show that I cannot believe this required a courtroom.`,
      prosecutor: `Your Honor, the defendant knowingly considered this decision despite possessing access to common sense. The foolishness meter reads ${foolishness}/10.`,
      defence: `Your Honor, my client is not guilty of bad judgment. At worst, they are guilty of exploring their options with extraordinary enthusiasm.`
    },
    evidence: {
      title: "Exhibit A — Prior Questionable Behavior",
      description: pick([
        "The defendant apparently believes that 'I'll do it later' is a legally binding schedule.",
        "The evidence suggests the defendant spent more time thinking about the decision than actually making it.",
        "A suspicious lack of planning has been detected.",
        "The defendant's search history would be extremely interesting to this court."
      ]),
      prosecutor: "This evidence demonstrates a pattern, Your Honor.",
      defence: "Objection! That is circumstantial evidence at best. Also, my client has learned absolutely nothing from it."
    },
    crossExamination: [
      { speaker: "prosecutor", text: `If this was such a good idea, why does the defendant need an entire court to approve it?` },
      { speaker: "defence", text: `Because my client values due process, Your Honor. Also, they enjoy dramatic user interfaces.` },
      { speaker: "judge", text: `Both arguments are suspiciously convincing. Continue.` },
      { speaker: "prosecutor", text: `The defendant's own foolishness rating was ${foolishness}/10. I rest my case.` },
      { speaker: "defence", text: `A self-reported foolishness score is not admissible evidence. Unless it is convenient for us, in which case it absolutely is.` }
    ],
    closingArguments: {
      prosecutor: "The facts are clear. This decision has ignored common sense, basic planning, and possibly several warning signs.",
      defence: "My client may be making a questionable choice, but questionable does not automatically mean illegal. I request a reduced sentence and perhaps a snack."
    },
    verdict: v
  };
}
