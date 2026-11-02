import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Code2, GraduationCap, Smartphone } from "lucide-react";
import { COLORS, FONTS } from "../config/brand";
import { ACTIVITIES, ACTIVITIES_BADGE } from "../config/content";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { IsoCard } from "../components/IsoCard";
import { SceneShell } from "../components/SceneShell";
import { sp } from "../components/anim";

const ICONS = { code: Code2, smartphone: Smartphone, graduation: GraduationCap } as const;

/** SCÈNE 2 — 6 s. Trois cartes isométriques entrent l'une après l'autre (≈ 1 s d'écart). */
export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const badge = sp(frame, fps, 14, 10, 170);

  return (
    <SceneShell>
      <AbsoluteFill style={{ padding: "150px 70px 0" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 30, transform: `scale(${badge})`, opacity: badge }}>
          <div style={{ background: COLORS.gold, color: COLORS.navy, fontFamily: FONTS.title, fontWeight: 800, fontSize: 36, padding: "14px 40px", borderRadius: 999, boxShadow: `0 14px 30px ${COLORS.gold}66`, letterSpacing: 1 }}>
            ✦ {ACTIVITIES_BADGE}
          </div>
        </div>
        <AnimatedTitle text="Ce que nous faisons" size={86} start={4} gold={[3]} />
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 130, gap: 62 }}>
        {ACTIVITIES.map((a, i) => {
          const delay = 30 + i * 32;
          const p = sp(frame, fps, delay, 15, 100);
          const float = Math.sin((frame + i * 20) / 22) * 6;
          const Icon = ICONS[a.icon];
          const iconPop = sp(frame, fps, delay + 10, 9, 160);
          return (
            <div key={a.id} style={{ opacity: Math.min(1, p * 2), transform: `translateX(${(1 - p) * (i % 2 ? 700 : -700)}px) translateY(${float}px)` }}>
              <IsoCard width={900} height={330} rotX={10 + (1 - p) * 40} rotY={-12 + (1 - p) * (i % 2 ? 50 : -50)} rotZ={(1 - p) * (i % 2 ? 10 : -10)} accent={i === 1 ? COLORS.navy : COLORS.gold}>
                <div style={{ display: "flex", alignItems: "center", gap: 44, padding: "0 56px", height: "100%" }}>
                  <div style={{ width: 170, height: 170, borderRadius: 40, background: COLORS.navy, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${iconPop}) rotate(${(1 - iconPop) * -40}deg)`, boxShadow: `10px 14px 0 ${COLORS.gold}` }}>
                    <Icon size={92} color={COLORS.gold} strokeWidth={2.2} />
                  </div>
                  <div>
                    <div style={{ fontFamily: FONTS.title, fontWeight: 900, fontSize: 56, lineHeight: 1.1, color: COLORS.navy }}>{a.title}</div>
                    <div style={{ fontFamily: FONTS.text, fontWeight: 500, fontSize: 34, marginTop: 14, color: COLORS.slate, maxWidth: 560 }}>{a.text}</div>
                  </div>
                </div>
              </IsoCard>
            </div>
          );
        })}
      </AbsoluteFill>
    </SceneShell>
  );
};
