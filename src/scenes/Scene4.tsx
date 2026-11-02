import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../config/brand";
import { CTA_COMMUNITY, SOCIALS } from "../config/content";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { IsoCard } from "../components/IsoCard";
import { SceneShell } from "../components/SceneShell";
import { SocialBadge } from "../components/SocialIcon";
import { clamp, sp } from "../components/anim";

/**
 * SCÈNE 4 — 7 s. Quatre cartes réseaux (entrées coordonnées), puis le CTA
 * « Rejoignez notre communauté » entre aux frames 75→110 et reste jusqu'à la fin.
 */
export const CTA_START = 75;

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cta = sp(frame, fps, CTA_START, 12, 110);
  const pulse = 1 + Math.sin(Math.max(0, frame - 115) / 9) * 0.015;
  const glow = interpolate(frame, [CTA_START, CTA_START + 35], [0, 1], clamp);

  return (
    <SceneShell>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 150 }}>
        <AnimatedTitle text="Suivez-nous partout" size={84} start={0} gold={[1]} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50, marginTop: 100 }}>
          {SOCIALS.map((s, i) => {
            const p = sp(frame, fps, 14 + i * 9, 13, 110);
            const dir = [[-1, -1], [1, -1], [-1, 1], [1, 1]][i];
            const float = Math.sin((frame + i * 25) / 20) * 8;
            return (
              <div key={s.id} style={{ opacity: Math.min(1, p * 2), transform: `translate(${(1 - p) * dir[0] * 500}px, ${(1 - p) * dir[1] * 500 + float}px)` }}>
                <IsoCard width={420} height={420} rotX={10 + (1 - p) * 30} rotY={(i % 2 ? 12 : -12) * (0.4 + (1 - p) * 3)} rotZ={(1 - p) * dir[0] * 12} accent={s.color}>
                  <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
                    <SocialBadge id={s.id} size={190} color={s.color} />
                    <div style={{ fontFamily: FONTS.title, fontWeight: 800, fontSize: 44, color: COLORS.navy }}>{s.label}</div>
                    {s.handle && <div style={{ fontFamily: FONTS.text, fontSize: 28, color: COLORS.slate }}>{s.handle}</div>}
                  </div>
                </IsoCard>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* CTA */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 150 }}>
        <div style={{ position: "relative", opacity: Math.min(1, cta * 2), transform: `translateY(${(1 - cta) * 200}px) scale(${(0.7 + 0.3 * cta) * pulse})` }}>
          <div style={{ position: "absolute", inset: -30, borderRadius: 80, background: COLORS.gold, filter: "blur(40px)", opacity: glow * 0.35 }} />
          <div style={{ position: "relative", background: COLORS.navy, borderRadius: 70, padding: "44px 70px", boxShadow: `14px 16px 0 ${COLORS.gold}` }}>
            <AnimatedTitle text={CTA_COMMUNITY} size={62} start={CTA_START + 6} stagger={7} color={COLORS.white} gold={[2]} />
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
