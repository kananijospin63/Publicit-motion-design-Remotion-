import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../config/brand";
import { rand } from "./anim";

/** Fond blanc + grille légère + halos parallaxe + particules dorées discrètes. */
export const Background: React.FC<{ drift?: number }> = ({ drift = 1 }) => {
  const frame = useCurrentFrame();
  const t = frame * drift;
  return (
    <AbsoluteFill style={{ background: COLORS.white, overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 900, height: 900, borderRadius: "50%", left: -300 + Math.sin(t / 60) * 40, top: -200 + Math.cos(t / 70) * 40, background: `radial-gradient(${COLORS.gold}33, transparent 65%)` }} />
      <div style={{ position: "absolute", width: 1000, height: 1000, borderRadius: "50%", right: -400 + Math.cos(t / 80) * 50, bottom: -300 + Math.sin(t / 65) * 50, background: `radial-gradient(${COLORS.navy}26, transparent 65%)` }} />
      {Array.from({ length: 22 }).map((_, i) => {
        const x = rand(i + 1) * 1080;
        const speed = 0.4 + rand(i + 50) * 0.9;
        const y = (((rand(i + 9) * 1920 - t * speed * 1.4) % 1920) + 1920) % 1920;
        const size = 4 + rand(i + 20) * 8;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: "50%", background: COLORS.gold, opacity: 0.18 + rand(i + 3) * 0.3, filter: "blur(0.5px)" }} />
        );
      })}
    </AbsoluteFill>
  );
};
