import { staticFile } from "remotion";

export const ASSETS = {
  logo: staticFile("image/LOGO JOVIM-CODE.png"),
  // Gardés pour compatibilité mais non utilisés
  logoMark: staticFile("image/LOGO JOVIM-CODE.png"),
  logoWordmark: staticFile("image/LOGO JOVIM-CODE.png"),
  team: staticFile("image/JOS PHOTO_117.JPG"),
} as const;

/** Ratio largeur/hauteur du logo réel. À ajuster si besoin. */
export const LOGO_RATIOS = {
  mark: 1,
  wordmark: 4.2,
} as const;
