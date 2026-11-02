"""
Génère les SFX pour chaque animation.
Installation :
    pip install pydub numpy
    # ffmpeg requis : https://www.gyan.dev/ffmpeg/builds/
    # Télécharger ffmpeg-release-essentials.zip, extraire, ajouter le dossier bin au PATH

Usage :
    python scripts/generate-sfx.py
"""

import math
import numpy as np
from pathlib import Path

try:
    from pydub import AudioSegment
except ImportError:
    print("✖ pydub non installé. Lancez : pip install pydub numpy")
    raise SystemExit(1)

OUT = Path(__file__).parent.parent / "public" / "audio" / "sfx"
OUT.mkdir(parents=True, exist_ok=True)

RATE = 44100


def to_segment(samples: np.ndarray, volume_db: float = 0) -> AudioSegment:
    """Convertit un array numpy float32 [-1,1] en AudioSegment mono."""
    pcm = (np.clip(samples, -1, 1) * 32767).astype(np.int16)
    seg = AudioSegment(
        pcm.tobytes(),
        frame_rate=RATE,
        sample_width=2,
        channels=1,
    )
    if volume_db != 0:
        seg = seg + volume_db
    return seg


def save(name: str, seg: AudioSegment):
    path = OUT / name
    seg.export(str(path), format="mp3", bitrate="128k")
    print(f"✔ {name}")


def sine_wave(freq: float, duration: float, fade_out: bool = True) -> np.ndarray:
    t = np.linspace(0, duration, int(RATE * duration), endpoint=False)
    wave = np.sin(2 * math.pi * freq * t)
    if fade_out:
        env = np.linspace(1, 0, len(wave)) ** 0.7
        wave *= env
    return wave


def sweep_wave(f_start: float, f_end: float, duration: float) -> np.ndarray:
    n = int(RATE * duration)
    t = np.linspace(0, duration, n, endpoint=False)
    progress = np.linspace(0, 1, n)
    freq = f_start + (f_end - f_start) * progress
    phase = np.cumsum(2 * math.pi * freq / RATE)
    wave = np.sin(phase)
    env = (1 - progress ** 0.5)
    return wave * np.clip(env, 0, 1)


def noise_wave(duration: float, fade_out: bool = True) -> np.ndarray:
    n = int(RATE * duration)
    wave = np.random.uniform(-1, 1, n)
    if fade_out:
        env = np.linspace(1, 0, n) ** 2
        wave *= env
    return wave


def mix(*arrays) -> np.ndarray:
    length = max(len(a) for a in arrays)
    result = np.zeros(length)
    for a in arrays:
        result[:len(a)] += a
    return np.clip(result, -1, 1)


# ── Scène 1 : Logo ──────────────────────────────────────────────
# Impact fusion : thud grave + ring métallique
thud = sine_wave(55, 0.35) * 0.7
ring = sine_wave(880, 0.6) * 0.3
save("logo-impact.mp3", to_segment(mix(thud, ring)))

# Flash lumineux : swoosh montant
flash = sweep_wave(200, 1800, 0.25) * 0.6
save("logo-flash.mp3", to_segment(flash))

# ── Scène 2 : Cartes ────────────────────────────────────────────
# Badge pop
pop = mix(sine_wave(660, 0.12) * 0.5, sine_wave(990, 0.08) * 0.3)
save("badge-pop.mp3", to_segment(pop))

# Carte qui glisse : swoosh + impact
slide = np.concatenate([sweep_wave(800, 200, 0.18) * 0.4, sine_wave(120, 0.15) * 0.35])
save("card-slide.mp3", to_segment(slide))

# ── Scène 3 : Équipe ────────────────────────────────────────────
# Carte qui monte
rise = sweep_wave(150, 600, 0.3) * 0.4
save("card-rise.mp3", to_segment(rise))

# Barre dorée : shimmer
t = np.linspace(0, 0.4, int(RATE * 0.4))
shimmer = np.sin(2 * math.pi * 1200 * t) * np.sin(2 * math.pi * 8 * t) * np.linspace(1, 0, int(RATE * 0.4)) * 0.4
save("bar-sweep.mp3", to_segment(shimmer))

# ── Scène 4 : Réseaux sociaux ───────────────────────────────────
# Tick électronique
tick = sine_wave(1320, 0.08) * 0.45
save("social-in.mp3", to_segment(tick))

# CTA whoosh
whoosh = mix(sweep_wave(1400, 80, 0.35) * 0.55, noise_wave(0.35) * 0.15)
save("cta-whoosh.mp3", to_segment(whoosh))

# ── Scène 5 : Abonnement ────────────────────────────────────────
# Bouton boing
n_b = int(RATE * 0.5)
t_b = np.arange(n_b) / RATE
boing = np.sin(2 * math.pi * (300 + 600 * np.exp(-8 * t_b)) * t_b) * np.linspace(1, 0, n_b) ** 0.6 * 0.6
save("btn-bounce.mp3", to_segment(boing))

# Cloche
bell = mix(
    sine_wave(1047, 1.2) * 0.5,
    sine_wave(1319, 1.0) * 0.25,
    sine_wave(1568, 0.8) * 0.15,
)
save("bell-ring.mp3", to_segment(bell))

# Chord final
chord = mix(
    sine_wave(523, 0.8) * 0.3,
    sine_wave(659, 0.8) * 0.25,
    sine_wave(784, 0.8) * 0.2,
)
save("logo-final.mp3", to_segment(chord))

print("\n✔ Tous les SFX générés dans public/audio/sfx/")
print("ℹ Déposez public/audio/music.mp3 pour la musique de fond.")
