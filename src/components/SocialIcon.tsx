import React from "react";
import type { SocialId } from "../config/content";

/** Icônes simplifiées PROVISOIRES (SVG inline). Remplaçables par vos icônes officielles. */
export const SocialGlyph: React.FC<{ id: SocialId; size: number; color?: string }> = ({ id, size, color = "#fff" }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  switch (id) {
    case "instagram":
      return (<svg {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill={color} /></svg>);
    case "youtube":
      return (<svg {...p}><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5v5l4.5-2.5z" fill={color} /></svg>);
    case "facebook":
      return (<svg {...p}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5A.5.5 0 0 1 14 8z" /></svg>);
    case "tiktok":
      return (<svg {...p}><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 3c.4 2.6 2 4.2 5 4.5" /></svg>);
  }
};

export const SocialBadge: React.FC<{ id: SocialId; size: number; color: string; style?: React.CSSProperties }> = ({ id, size, color, style }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.3, background: color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 ${size * 0.12}px ${size * 0.3}px ${color}55`, ...style }}>
    <SocialGlyph id={id} size={size * 0.56} />
  </div>
);
