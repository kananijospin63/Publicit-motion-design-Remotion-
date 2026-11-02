import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../config/brand";
import { Logo, lockupHeight } from "../components/Logo";
import { BrandName } from "../components/BrandName";
import { SceneShell } from "../components/SceneShell";
import { clamp, ease, sp } from "../components/anim";

const W = 780;
const H = lockupHeight(W);

/**
 * SCÈNE 1 — 5 s. Le logo réel (symbole + texte) est découpé en 4 quadrants
 * qui arrivent depuis 4 directions avec rotation 3D, convergent, fusionnent
 * dans un flash lumineux, puis le lockup complet reste lisible.
 */
export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const quads = [
    { x: 0, y: 0, from: [-1000, -900], rot: [35, -40, -25] },
    { x: W / 2, y: 0, from: [1000, -900], rot: [35, 40, 25] },
    { x: 0, y: H / 2, from: [-1000, 900], rot: [-35, -40, 25] },
    { x: W / 2, y: H / 2, from: [1000, 900], rot: [-35, 40, -25] },
  ];

  const fused = frame >= 78;
  const flash = interpolate(frame, [68, 78, 100], [0, 1, 0], clamp);
  const ring = ease(frame, 76, 120);
  const settle = sp(frame, fps, 78, 9, 140);
  const zoom = interpolate(frame, [0, 150], [0.94, 1.04], clamp);

  return (
    <SceneShell>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", transform: `scale(${zoom})` }}>
        {/* halo / onde de choc */}
        <div style={{ position: "absolute", width: 900 * (0.4 + ring), height: 900 * (0.4 + ring), borderRadius: "50%", border: `6px solid ${COLORS.gold}`, opacity: (1 - ring) * 0.8 * (frame > 70 ? 1 : 0) }} />
        <div style={{ position: "absolute", width: 1100, height: 1100, borderRadius: "50%", background: `radial-gradient(${COLORS.gold}${Math.round(flash * 90).toString(16).padStart(2, "0")}, transparent 65%)` }} />

        <div style={{ position: "relative", width: W, height: H, perspective: 1800 }}>
          {!fused &&
            quads.map((q, i) => {
              const p = ease(frame, 6 + i * 4, 66 + i * 2);
              const tx = q.from[0] * (1 - p);
              const ty = q.from[1] * (1 - p);
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: q.x,
                    top: q.y,
                    width: W / 2,
                    height: H / 2,
                    overflow: "hidden",
                    transformStyle: "preserve-3d",
                    transform: `translate(${tx}px, ${ty}px) rotateX(${q.rot[0] * (1 - p)}deg) rotateY(${q.rot[1] * (1 - p)}deg) rotateZ(${q.rot[2] * (1 - p)}deg)`,
                    opacity: Math.min(1, p * 4),
                    filter: `blur(${(1 - p) * 10}px) drop-shadow(0 ${30 * (1 - p)}px ${30 * (1 - p)}px rgba(15,23,42,0.35))`,
                  }}
                >
                  <div style={{ position: "absolute", left: -q.x, top: -q.y }}>
                    <Logo width={W} />
                  </div>
                </div>
              );
            })}
          {fused && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40, transform: `scale(${0.9 + 0.1 * settle})`, filter: "drop-shadow(0 30px 40px rgba(15,23,42,0.18))" }}>
              <Logo width={W} showWordmark={false} />
              <BrandName size={110} letterSpacing={8} style={{ opacity: Math.min(1, (frame - 90) / 20) }} />
            </div>
          )}
        </div>
        {/* flash blanc de fusion */}
        <AbsoluteFill style={{ background: "#fff", opacity: flash * 0.55 }} />
      </AbsoluteFill>
    </SceneShell>
  );
};
