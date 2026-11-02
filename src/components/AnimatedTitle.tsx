import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../config/brand";
import { clamp, sp } from "./anim";

/** Titre animé mot par mot (glissement + flou + échelle). `gold` = indices de mots en or. */
export const AnimatedTitle: React.FC<{
  text: string;
  start?: number;
  size?: number;
  stagger?: number;
  gold?: number[];
  color?: string;
  align?: "center" | "left";
  weight?: number;
}> = ({ text, start = 0, size = 88, stagger = 5, gold = [], color = COLORS.navy, align = "center", weight = 900 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: align === "center" ? "center" : "flex-start", gap: `0 ${size * 0.28}px`, fontFamily: FONTS.title, fontWeight: weight, fontSize: size, lineHeight: 1.08, color, textAlign: align }}>
      {text.split(" ").map((w, i) => {
        const p = sp(frame, fps, start + i * stagger, 16, 130);
        const blur = interpolate(p, [0, 1], [14, 0], clamp);
        return (
          <span key={i} style={{ display: "inline-block", opacity: Math.min(1, p * 1.6), transform: `translateY(${(1 - p) * 60}px) scale(${0.8 + 0.2 * p})`, filter: `blur(${blur}px)`, color: gold.includes(i) ? COLORS.gold : color }}>
            {w}
          </span>
        );
      })}
    </div>
  );
};
