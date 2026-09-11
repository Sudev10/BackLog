// Optional LLM adapter.
// The app works without an API key using fallbackCourtEngine.
// For a public deployment, call Gemini from a server-side endpoint rather than exposing a secret in the browser.

export async function generateWithGemini() {
  throw new Error("Gemini integration is optional and not configured.");
}
