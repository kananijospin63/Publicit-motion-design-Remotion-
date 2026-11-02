import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../config/brand";
import { ASSETS } from "../config/assets";
import { TEAM } from "../config/content";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { IsoCard } from "../components/IsoCard";
import { SceneShell } from "../components/SceneShell";
import { clamp, sp } from "../components/anim";

/**
 * SCÈNE 3 — 7 s. CORRECTION : le texte descriptif démarre à la frame 35 et
 * est entièrement lisible vers la frame ~75, puis reste affiché jusqu'à la fin.
 */
export const DESCRIPTION_START = 35;

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = sp(frame, fps, 6, 16, 90);
  const orbit = interpolate(frame, [0, 210], [-14, 10], clamp);
  const bar = interpolate(frame, [30, 75], [0, 1], clamp);

  return (
    <SceneShell>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 140 }}>
        <AnimatedTitle text={TEAM.title} size={92} start={0} gold={[2]} />

        <div style={{ marginTop: 90, opacity: card, transform: `translateY(${(1 - card) * 300}px) scale(${0.8 + 0.2 * card})` }}>
          <IsoCard width={880} height={640} rotX={8} rotY={orbit} rotZ={-1.5} depth={36}>
            <Img src={ASSETS.team} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </IsoCard>
        </div>

        {/* Description : apparaît entre les frames 35 et 75 */}
        <div style={{ marginTop: 110, width: 880 }}>
          <div style={{ width: 160 * bar, height: 10, borderRadius: 6, background: COLORS.gold, margin: "0 auto 36px" }} />
          <AnimatedTitle text={TEAM.description} size={44} start={DESCRIPTION_START} stagger={2} weight={600} color={COLORS.navySoft} />
        </div>

        {TEAM.members.length > 0 && (
          <div style={{ display: "flex", gap: 30, marginTop: 40, fontFamily: FONTS.text }}>
            {TEAM.members.map((m, i) => (
              <div key={i} style={{ opacity: sp(frame, fps, 80 + i * 8), textAlign: "center" }}>
                <div style={{ fontFamily: FONTS.title, fontWeight: 800, fontSize: 34, color: COLORS.navy }}>{m.name}</div>
                <div style={{ fontSize: 26, color: COLORS.slate }}>{m.role}</div>
              </div>
            ))}
          </div>
        )}
      </AbsoluteFill>
    </SceneShell>
  );
};
