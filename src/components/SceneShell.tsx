import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "./Background";
import { clamp } from "./anim";

/**
 * Enveloppe de scène : entrée en zoom/fondu + sortie en zoom avant/fondu
 * pour des transitions fluides sans coupure brusque.
 */
export const SceneShell: React.FC<{ children: React.ReactNode; fadeIn?: number; fadeOut?: number }> = ({ children, fadeIn = 12, fadeOut = 14 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const inP = interpolate(frame, [0, fadeIn], [0, 1], clamp);
  const outP = interpolate(frame, [durationInFrames - fadeOut, durationInFrames], [0, 1], clamp);
  const scale = interpolate(inP, [0, 1], [1.06, 1]) * interpolate(outP, [0, 1], [1, 1.08]);
  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ opacity: inP * (1 - outP), transform: `scale(${scale})` }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
