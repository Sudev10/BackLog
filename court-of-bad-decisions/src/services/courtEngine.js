import { generateFallbackTrial } from "./fallbackCourtEngine";

export async function generateTrial({ decision, foolishness }) {
  // Zero-setup mode: always available, no API key required.
  // A future server-side Gemini adapter can be selected here without changing the UI.
  return {
    trial: generateFallbackTrial(decision, foolishness),
    mode: "local-demo"
  };
}
