import React from "react";
import { COLORS, FONTS } from "../config/brand";

/**
 * Affiche "JOVIM CODE" lettre par lettre en alternant :
 *   lettre 1      → vert  (#22C55E)
 *   lettres 2-3   → mauve (#A855F7)
 *   lettre 4      → vert
 *   lettres 5-6   → mauve
 *   … et ainsi de suite (espace inclus comme lettre neutre)
 */
function letterColor(index: number): string {
  // On ignore l'espace dans le comptage
  const cycle = index % 3; // 0=vert, 1=mauve, 2=mauve
  if (cycle === 0) return COLORS.brandGreen;
  return COLORS.brandPurple;
}

export const BrandName: React.FC<{
  size?: number;
  style?: React.CSSProperties;
  letterSpacing?: number;
}> = ({ size = 88, style, letterSpacing = 6 }) => {
  const text = "JOVIM CODE";
  let colorIndex = 0;

  return (
    <span
      style={{
        fontFamily: FONTS.title,
        fontWeight: 900,
        fontSize: size,
        letterSpacing,
        lineHeight: 1,
        display: "inline-flex",
        ...style,
      }}
    >
      {text.split("").map((char, i) => {
        if (char === " ") {
          return <span key={i} style={{ width: size * 0.35 }} />;
        }
        const color = letterColor(colorIndex);
        colorIndex++;
        return (
          <span key={i} style={{ color }}>
            {char}
          </span>
        );
      })}
    </span>
  );
};
