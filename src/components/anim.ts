import { Easing, interpolate, spring } from "remotion";

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Progression 0→1 entre deux frames avec easing doux. */
export const ease = (frame: number, start: number, end: number, easing = Easing.bezier(0.22, 1, 0.36, 1)) =>
  interpolate(frame, [start, end], [0, 1], { ...clamp, easing });

/** Spring déterministe démarrant à `delay`. */
export const sp = (frame: number, fps: number, delay = 0, damping = 14, stiffness = 120) =>
  spring({ frame: frame - delay, fps, config: { damping, stiffness, mass: 0.9 } });

/** Pseudo-aléatoire déterministe (même rendu à chaque exécution). */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
