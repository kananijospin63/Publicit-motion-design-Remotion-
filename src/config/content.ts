/**
 * TEXTES ET DONNÉES ÉDITABLES.
 * ⚠ Les activités, la description d'équipe et les comptes sociaux ci-dessous
 *    sont des TEXTES PAR DÉFAUT à vérifier/adapter : aucun contenu réel de
 *    JOVIM CODE n'était disponible lors de la génération.
 */
export const BRAND_NAME = "JOVIM CODE";

export const ACTIVITIES = [
  { id: "web", title: "Développement web", text: "Sites et applications sur mesure", icon: "code" },
  { id: "mobile", title: "Applications mobiles", text: "Des apps pensées pour vos utilisateurs", icon: "smartphone" },
  { id: "learn", title: "Formation & tutoriels", text: "Apprendre le code par la pratique", icon: "graduation" },
] as const;

export const ACTIVITIES_BADGE = "Projets réels";

export const TEAM = {
  title: "Une équipe passionnée",
  description:
    "Des développeurs et créatifs qui transforment vos idées en projets concrets, avec exigence et passion.",
  // Ajoutez de vrais membres ici : { name: "Prénom Nom", role: "Fonction" }
  members: [] as { name: string; role: string }[],
};

export type SocialId = "instagram" | "tiktok" | "youtube" | "facebook";

/** Laissez `handle` vide tant que vous n'avez pas l'identifiant réel. */
export const SOCIALS: { id: SocialId; label: string; handle: string; color: string }[] = [
  { id: "instagram", label: "Instagram", handle: "", color: "#E1306C" },
  { id: "tiktok", label: "TikTok", handle: "", color: "#0F172A" },
  { id: "youtube", label: "YouTube", handle: "", color: "#FF0000" },
  { id: "facebook", label: "Facebook", handle: "", color: "#1877F2" },
];

export const CTA_COMMUNITY = "Rejoignez notre communauté";
export const CTA_SUBSCRIBE = "ABONNEZ-VOUS";

/** Narration (une ligne par scène, adaptée à la durée de chaque scène). */
export const VOICEOVER = [
  "JOVIM CODE. Le code, avec passion.",
  "Des projets réels, du web au mobile, pour donner vie à vos idées.",
  "Derrière chaque projet, une équipe engagée qui construit avec vous.",
  "Rejoignez notre communauté sur Instagram, TikTok, YouTube et Facebook.",
  "Abonnez-vous dès maintenant, et construisons le futur ensemble !",
];
