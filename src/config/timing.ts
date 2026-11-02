/** Durées des scènes en frames (30 fps). Total = 960 frames = 32 s. */
export const SCENES = {
  s1: { from: 0, duration: 150 },
  s2: { from: 150, duration: 180 },
  s3: { from: 330, duration: 210 },
  s4: { from: 540, duration: 210 },
  s5: { from: 750, duration: 210 },
} as const;

export const TOTAL_FRAMES = 960;
