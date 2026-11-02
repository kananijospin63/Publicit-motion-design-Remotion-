import React from "react";
import { COLORS } from "../config/brand";

/**
 * Carte pseudo-3D : face avant + épaisseur (empilement de couches en translateZ)
 * + ombre portée projetée. Rotations pilotées par frame (rotX / rotY / rotZ en degrés).
 */
export const IsoCard: React.FC<{
  width: number;
  height: number;
  rotX?: number;
  rotY?: number;
  rotZ?: number;
  depth?: number;
  accent?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ width, height, rotX = 0, rotY = 0, rotZ = 0, depth = 28, accent = COLORS.gold, children, style }) => {
  const layers = 7;
  return (
    <div style={{ width, height, perspective: 1600, ...style }}>
      <div style={{ position: "relative", width, height, transformStyle: "preserve-3d", transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)` }}>
        {/* ombre au sol */}
        <div style={{ position: "absolute", inset: 0, transform: `translateZ(${-depth - 20}px) translateY(50px) scale(0.92)`, borderRadius: 44, background: "rgba(15,23,42,0.28)", filter: "blur(36px)" }} />
        {/* épaisseur */}
        {Array.from({ length: layers }).map((_, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, borderRadius: 44, background: i % 2 ? COLORS.navy : accent, transform: `translateZ(${-(i + 1) * (depth / layers)}px)` }} />
        ))}
        {/* face avant */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 44, background: "linear-gradient(145deg, #FFFFFF 0%, #F1F5F9 100%)", border: `3px solid ${COLORS.navy}14`, boxShadow: `inset 0 2px 0 #fff, inset 0 -8px 24px ${COLORS.navy}0F`, overflow: "hidden", ...{} }}>
          {children}
        </div>
      </div>
    </div>
  );
};
