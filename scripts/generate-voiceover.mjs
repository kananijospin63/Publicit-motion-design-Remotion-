// Génère la voix off française avec Google Cloud Text-to-Speech (REST).
// Usage (PowerShell) :  $env:GOOGLE_TTS_API_KEY="votre_clé" ; npm run voice
// La clé n'est JAMAIS écrite dans le code ni dans les logs.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const key = process.env.GOOGLE_TTS_API_KEY;
if (!key) {
  console.error("✖ GOOGLE_TTS_API_KEY absente. Voir README.md (section Voix off).");
  process.exit(1);
}

// Même texte que src/config/content.ts (VOICEOVER). Adaptez ici ou importez-le.
const LINES = [
  "JOVIM CODE. Le code, avec passion.",
  "Des projets réels, du web au mobile, pour donner vie à vos idées.",
  "Derrière chaque projet, une équipe engagée qui construit avec vous.",
  "Rejoignez notre communauté sur Instagram, TikTok, YouTube et Facebook.",
  "Abonnez-vous dès maintenant, et construisons le futur ensemble !",
];
const VOICE = process.env.TTS_VOICE || "fr-FR-Neural2-D"; // alternatives : fr-FR-Neural2-A (femme), fr-FR-Studio-A
const RATE = Number(process.env.TTS_RATE || 1.0);

mkdirSync(resolve(root, "public/audio"), { recursive: true });

for (let i = 0; i < LINES.length; i++) {
  const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      input: { ssml: `<speak>${LINES[i]}</speak>` },
      voice: { languageCode: "fr-FR", name: VOICE },
      audioConfig: { audioEncoding: "MP3", speakingRate: RATE, pitch: 0 },
    }),
  });
  if (!res.ok) {
    console.error(`✖ Scène ${i + 1} : HTTP ${res.status}`, (await res.text()).slice(0, 300));
    process.exit(1);
  }
  const { audioContent } = await res.json();
  writeFileSync(resolve(root, `public/audio/voice-scene${i + 1}.mp3`), Buffer.from(audioContent, "base64"));
  console.log(`✔ voice-scene${i + 1}.mp3`);
}

writeFileSync(resolve(root, "src/config/audio.generated.json"), JSON.stringify({ voiceEnabled: true }, null, 2));
console.log("✔ Voix off activée. Vous pouvez lancer : npm run render");
console.log("ℹ Vérifiez que chaque MP3 dure moins de ~6 s (scène 1 : 4,2 s max). Sinon baissez TTS_RATE ou raccourcissez le texte.");
