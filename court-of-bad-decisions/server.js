require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.ANTHROPIC_API_KEY) {
  console.warn('\n⚠️  ANTHROPIC_API_KEY is not set. Copy .env.example to .env and add your key.\n');
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const SYSTEM_PROMPT = `You are generating content for a comedic web app called "Court of Bad Decisions" where mundane personal decisions are put on trial by three characters: a theatrical Judge, an overzealous Prosecutor, and a dramatic Defence Lawyer.

Given the person's decision or dilemma, write:
- prosecutionArgument: 2-3 sentences, in-character as a smug, overconfident prosecutor arguing AGAINST the decision, treating it as a serious crime. Funny, exaggerated, courtroom language.
- defenceArgument: 2-3 sentences, in-character as a passionate defence lawyer arguing FOR the decision, equally exaggerated and funny.
- judgeCommentary: 1-2 sentences of the judge's own witty, sarcastic remarks before ruling.
- verdict: a short, punchy ruling title (max 10 words), e.g. "Guilty of Chronic Overthinking" or "Not Guilty, But Under Suspicion".
- sentence: 1-2 sentences describing a ridiculous, harmless, funny "punishment" or "sentence" for the person.

Respond with ONLY raw JSON, no markdown fences, no preamble, matching exactly this shape:
{"prosecutionArgument":"...","defenceArgument":"...","judgeCommentary":"...","verdict":"...","sentence":"..."}`;

app.post('/api/verdict', async (req, res) => {
  try {
    const { decision } = req.body;
    if (!decision || typeof decision !== 'string' || !decision.trim()) {
      return res.status(400).json({ error: 'A decision is required.' });
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: `The decision on trial: "${decision.trim()}"` }]
    });

    const textBlock = message.content.find((b) => b.type === 'text');
    if (!textBlock) throw new Error('No response from the court.');

    const cleaned = textBlock.text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    res.json(parsed);
  } catch (err) {
    console.error('Verdict error:', err.message);
    res.status(500).json({ error: 'The court could not reach a verdict. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`⚖️  Court of Bad Decisions running at http://localhost:${PORT}`);
});
