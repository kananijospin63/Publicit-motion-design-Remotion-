import React from "react";
import { Img } from "remotion";
import { ASSETS } from "../config/assets";

/**
 * Logo JOVIM CODE — image PNG réelle.
 * width : largeur souhaitée en px. La hauteur est calculée automatiquement (objectFit contain).
 */
export const Logo: React.FC<{
  width: number;
  gap?: number;
  style?: React.CSSProperties;
  /** Props conservés pour compatibilité — ignorés car le logo est une seule image */
  showMark?: boolean;
  showWordmark?: boolean;
}> = ({ width, style }) => {
  return (
    <div style={{ width, ...style }}>
      <Img
        src={ASSETS.logo}
        style={{ width: "100%", height: "auto", objectFit: "contain" }}
      />
    </div>
  );
};

/** Hauteur estimée du lockup pour les calculs de layout (ratio 1:2 par défaut). */
export const lockupHeight = (width: number, _gap = 36) => width * 0.5;
