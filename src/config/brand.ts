import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

export const COLORS = {
  white: "#FFFFFF",
  navy: "#0F172A",
  navySoft: "#1E293B",
  gold: "#F59E0B",
  goldSoft: "#FDE68A",
  slate: "#64748B",
  mist: "#F1F5F9",
  brandGreen: "#22C55E",
  brandPurple: "#A855F7",
} as const;

const montserrat = loadMontserrat("normal", { weights: ["600", "800", "900"], subsets: ["latin"] });
const inter = loadInter("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });

export const FONTS = {
  title: montserrat.fontFamily,
  text: inter.fontFamily,
} as const;

export const VIDEO = { width: 1080, height: 1920, fps: 30 } as const;
