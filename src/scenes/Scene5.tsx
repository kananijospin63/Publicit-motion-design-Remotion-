import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Bell, MousePointerClick } from "lucide-react";
import { COLORS, FONTS } from "../config/brand";
import { CTA_SUBSCRIBE, SOCIALS } from "../config/content";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { BrandName } from "../components/BrandName";
import { Logo } from "../components/Logo";
import { SceneShell } from "../components/SceneShell";
import { SocialBadge } from "../components/SocialIcon";
import { clamp, sp } from "../components/anim";

/** SCÈNE 5 — 7 s. Bouton avec rebond, icônes sociales, logo final tenu ≥ 3 s. */
export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const btn = sp(frame, fps, 30, 6, 170); // rebond marqué
  const click = interpolate(frame, [95, 100, 108], [1, 0.92, 1], clamp);
  const bell = Math.sin(Math.max(0, frame - 110) / 3) * Math.max(0, 1 - (frame - 110) / 40) * 22;
  const logo = sp(frame, fps, 120, 14, 100);

  return (
    <SceneShell fadeOut={8}>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 170 }}>
        <AnimatedTitle text="Prêt à nous rejoindre ?" size={74} start={0} gold={[3]} />

        <div style={{ marginTop: 90, opacity: Math.min(1, btn * 2), transform: `scale(${btn * click}) rotateX(${(1 - btn) * 40}deg)` }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 34, background: "#E11D48", color: "#FFFFFF", fontFamily: FONTS.title, fontWeight: 900, fontSize: 84, padding: "54px 90px", borderRadius: 90, boxShadow: `0 20px 0 #9F1239, 0 50px 70px #E11D4866` }}>
            <Bell size={90} strokeWidth={2.6} style={{ transform: `rotate(${bell}deg)`, transformOrigin: "50% 10%" }} />
            {CTA_SUBSCRIBE}
            <MousePointerClick size={80} strokeWidth={2.4} style={{ position: "absolute", right: -30, bottom: -50, color: COLORS.navy, transform: `translate(${(1 - sp(frame, fps, 75, 14)) * 120}px, ${(1 - sp(frame, fps, 75, 14)) * 120}px)` }} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 36, marginTop: 130 }}>
          {SOCIALS.map((s, i) => {
            const p = sp(frame, fps, 70 + i * 7, 9, 150);
            return <SocialBadge key={s.id} id={s.id} size={150} color={s.color} style={{ opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 120}px) scale(${p}) rotate(${(1 - p) * -25}deg)` }} />;
          })}
        </div>

        <div style={{ marginTop: 130, opacity: logo, transform: `scale(${0.8 + 0.2 * logo}) translateY(${(1 - logo) * 80}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
          <Logo width={620} gap={26} showWordmark={false} />
          <BrandName size={96} letterSpacing={7} />
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
