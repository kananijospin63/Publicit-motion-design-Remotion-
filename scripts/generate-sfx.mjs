/**
 * Génère les SFX en WAV pur (pas besoin de Python ni ffmpeg).
 * Remotion accepte les WAV nativement.
 * Usage : node scripts/generate-sfx.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(root, "public/audio/sfx");
mkdirSync(OUT, { recursive: true });

const RATE = 44100;

// ── helpers ──────────────────────────────────────────────────────

function sine(freq, duration, volume = 0.5, fadeOut = true) {
  const n = Math.floor(RATE * duration);
  const buf = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / RATE;
    let v = Math.sin(2 * Math.PI * freq * t) * volume;
    if (fadeOut) v *= Math.max(0, 1 - i / n) ** 0.7;
    buf[i] = v;
  }
  return buf;
}

function sweep(fStart, fEnd, duration, volume = 0.5) {
  const n = Math.floor(RATE * duration);
  const buf = new Float32Array(n);
  let phase = 0;
  for (let i = 0; i < n; i++) {
    const progress = i / n;
    const freq = fStart + (fEnd - fStart) * progress;
    phase += (2 * Math.PI * freq) / RATE;
    const env = Math.max(0, 1 - Math.sqrt(progress));
    buf[i] = Math.sin(phase) * env * volume;
  }
  return buf;
}

function noise(duration, volume = 0.3) {
  const n = Math.floor(RATE * duration);
  const buf = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    buf[i] = (Math.random() * 2 - 1) * volume * Math.max(0, 1 - i / n) ** 2;
  }
  return buf;
}

function mix(...tracks) {
  const len = Math.max(...tracks.map((t) => t.length));
  const out = new Float32Array(len);
  for (const t of tracks) for (let i = 0; i < t.length; i++) out[i] += t[i];
  for (let i = 0; i < out.length; i++) out[i] = Math.max(-1, Math.min(1, out[i]));
  return out;
}

function concat(...tracks) {
  const len = tracks.reduce((s, t) => s + t.length, 0);
  const out = new Float32Array(len);
  let off = 0;
  for (const t of tracks) { out.set(t, off); off += t.length; }
  return out;
}

function toWav(samples) {
  const dataLen = samples.length * 2;
  const buf = Buffer.alloc(44 + dataLen);
  buf.write("RIFF", 0);              buf.writeUInt32LE(36 + dataLen, 4);
  buf.write("WAVE", 8);              buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);         buf.writeUInt16LE(1, 20);   // PCM
  buf.writeUInt16LE(1, 22);          buf.writeUInt32LE(RATE, 24);
  buf.writeUInt32LE(RATE * 2, 28);   buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);         buf.write("data", 36);
  buf.writeUInt32LE(dataLen, 40);
  for (let i = 0; i < samples.length; i++) {
    buf.writeInt16LE(Math.round(samples[i] * 32767), 44 + i * 2);
  }
  return buf;
}

function save(name, samples) {
  writeFileSync(resolve(OUT, name), toWav(samples));
  console.log(`✔ ${name}`);
}

// ── Scène 1 : Logo ───────────────────────────────────────────────
save("logo-impact.wav", mix(sine(55, 0.35, 0.7), sine(880, 0.6, 0.3)));
save("logo-flash.wav",  sweep(200, 1800, 0.25, 0.6));

// ── Scène 2 : Cartes ─────────────────────────────────────────────
save("badge-pop.wav",   mix(sine(660, 0.12, 0.5), sine(990, 0.08, 0.3)));
save("card-slide.wav",  concat(sweep(800, 200, 0.18, 0.4), sine(120, 0.15, 0.35)));

// ── Scène 3 : Équipe ─────────────────────────────────────────────
save("card-rise.wav",   sweep(150, 600, 0.3, 0.4));

// Barre dorée : shimmer AM
{
  const n = Math.floor(RATE * 0.4);
  const buf = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / RATE;
    buf[i] = Math.sin(2 * Math.PI * 1200 * t) * Math.sin(2 * Math.PI * 8 * t) * Math.max(0, 1 - i / n) * 0.4;
  }
  save("bar-sweep.wav", buf);
}

// ── Scène 4 : Réseaux sociaux ────────────────────────────────────
save("social-in.wav",   sine(1320, 0.08, 0.45));
save("cta-whoosh.wav",  mix(sweep(1400, 80, 0.35, 0.55), noise(0.35, 0.15)));

// ── Scène 5 : Abonnement ─────────────────────────────────────────
// Boing
{
  const n = Math.floor(RATE * 0.5);
  const buf = new Float32Array(n);
  let phase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / RATE;
    const freq = 300 + 600 * Math.exp(-8 * t);
    phase += (2 * Math.PI * freq) / RATE;
    buf[i] = Math.sin(phase) * Math.max(0, 1 - i / n) ** 0.6 * 0.6;
  }
  save("btn-bounce.wav", buf);
}

save("bell-ring.wav",  mix(sine(1047, 1.2, 0.5), sine(1319, 1.0, 0.25), sine(1568, 0.8, 0.15)));
save("logo-final.wav", mix(sine(523, 0.8, 0.3), sine(659, 0.8, 0.25), sine(784, 0.8, 0.2)));

console.log("\n✔ Tous les SFX générés dans public/audio/sfx/");
