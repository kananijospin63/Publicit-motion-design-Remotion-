"""
Génère la voix off française avec edge-tts (gratuit, voix Microsoft Edge).
Usage :
    pip install edge-tts
    python scripts/generate-voiceover.py

Voix disponibles (fr-FR) :
    fr-FR-HenriNeural     (homme, défaut)
    fr-FR-DeniseNeural    (femme)
    fr-FR-EloiseNeural    (femme, douce)
"""

import asyncio
import json
import os
import sys
from pathlib import Path

try:
    import edge_tts
except ImportError:
    print("✖ edge-tts non installé. Lancez : pip install edge-tts")
    sys.exit(1)

ROOT = Path(__file__).parent.parent
AUDIO_DIR = ROOT / "public" / "audio"
AUDIO_CONFIG = ROOT / "src" / "config" / "audio.generated.json"

VOICE = os.environ.get("TTS_VOICE", "fr-FR-HenriNeural")
RATE = os.environ.get("TTS_RATE", "+0%")   # ex: "+10%" pour accélérer

LINES = [
    "JOVIM CODE. Le code, avec passion.",
    "Des projets réels, du web au mobile, pour donner vie à vos idées.",
    "Derrière chaque projet, une équipe engagée qui construit avec vous.",
    "Rejoignez notre communauté sur Instagram, TikTok, YouTube et Facebook.",
    "Abonnez-vous dès maintenant, et construisons le futur ensemble !",
]


async def generate():
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)

    for i, line in enumerate(LINES, start=1):
        output = AUDIO_DIR / f"voice-scene{i}.mp3"
        communicate = edge_tts.Communicate(line, VOICE, rate=RATE)
        await communicate.save(str(output))
        print(f"✔ voice-scene{i}.mp3")

    AUDIO_CONFIG.write_text(json.dumps({"voiceEnabled": True}, indent=2))
    print("✔ Voix off activée.")
    print("ℹ Vous pouvez maintenant lancer : npm run render")


asyncio.run(generate())
