# JOVIM CODE — Publicité motion design (Remotion)

Vertical 1080×1920 · 30 fps · 32 s (960 frames) · 5 scènes · TypeScript + React + Remotion.

## Commandes (terminal VS Code, Windows / PowerShell)

```powershell
npm install
npm run studio        # prévisualisation interactive (http://localhost:3000)
npm run typecheck     # vérification TypeScript
npm run still         # image de test -> out/preview.png (frame 60)
npm run render        # MP4 final -> out\jovim-code-ad.mp4
```

Au premier lancement, Remotion télécharge Chrome Headless Shell (connexion internet requise).

## Voix off (Google Text-to-Speech)

Rien n'est généré tant que vous n'avez pas lancé le script. Il faut une clé API Google Cloud TTS :

```powershell
$env:GOOGLE_TTS_API_KEY="VOTRE_CLE"
npm run voice         # crée public/audio/voice-scene1..5.mp3 et active la voix
npm run render
```

- Voix par défaut : `fr-FR-Neural2-D` (changeable : `$env:TTS_VOICE="fr-FR-Neural2-A"`), débit : `$env:TTS_RATE="0.95"`.
- Texte de la narration : `src/config/content.ts` (VOICEOVER) **et** la constante LINES de `scripts/generate-voiceover.mjs` (gardez-les identiques).
- Chaque MP3 est calé sur le début de sa scène (+8 frames). Durées max conseillées : S1 ≈ 4 s, S2 ≈ 5,5 s, S3–S5 ≈ 6 s.
- Ne mettez jamais la clé dans le code (elle est lue uniquement depuis la variable d'environnement).
- Sans voix off, le MP4 se rend simplement sans piste audio.

## Musique

Aucune musique n'est fournie (non générée). Pour en ajouter : déposez `public/audio/music.mp3`, puis dans `src/config/audio.ts` mettez `musicEnabled: true` (volume `musicVolume`, 0.12 par défaut). Laissez `false` pour la désactiver.

## Chronologie

| Scène | Frames | Contenu |
|---|---|---|
| 1 | 0–149 | Logo : 4 quadrants convergent en 3D, flash, fusion |
| 2 | 150–329 | 3 cartes isométriques + badge « Projets réels » |
| 3 | 330–539 | Équipe — description visible dès la frame locale 35 (fin ≈ 75), maintenue |
| 4 | 540–749 | 4 réseaux — CTA « Rejoignez notre communauté » entre aux frames locales 75–110, maintenu |
| 5 | 750–959 | « ABONNEZ-VOUS », icônes, logo final tenu ≈ 3 s |

## Ressources à remplacer (provisoires)

| Fichier | À remplacer par |
|---|---|
| `public/assets/placeholders/logo-1-symbole.svg` | Logo n°1 (symbole), PNG transparent ou SVG |
| `public/assets/placeholders/logo-2-texte.svg` | Logo n°2 (texte), PNG transparent ou SVG |
| `public/assets/placeholders/equipe.svg` | Visuel d'équipe |
| `src/components/SocialIcon.tsx` | Icônes sociales simplifiées → vos icônes officielles |
| `src/config/content.ts` | **Activités, description d'équipe, handles sociaux** (textes par défaut à valider) |

Méthode : copiez vos fichiers dans `public/assets/` puis changez les chemins dans `src/config/assets.ts` (ou gardez les mêmes noms). Si votre logo texte n'a pas un ratio ≈ 4,2:1, ajustez `LOGO_RATIOS` dans ce même fichier pour éviter toute déformation.

## Architecture

`src/config/` (marque, timing, ressources, textes, audio) · `src/components/` (Background, IsoCard, Logo, AnimatedTitle, SceneShell, SocialIcon) · `src/scenes/Scene1–5.tsx` · `src/Composition.tsx` · `src/Root.tsx`. Toutes les animations dépendent uniquement du numéro de frame (rendu déterministe).

## Limitations connues

- Vidéo YouTube de référence **non analysée** (accès impossible) ; techniques choisies de façon générique.
- Aucun projet existant ni logo réel n'a été fourni : logos, équipe, activités et réseaux sont des **provisoires**.
- Effet 3D = CSS 3D (empilement de couches + perspective), pas de moteur Three.js.
- Le rendu MP4 n'a pas pu être exécuté lors de la génération (pas de Chrome) : seul `tsc` a été validé. Vérifiez visuellement dans `npm run studio`.
