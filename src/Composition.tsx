import React from "react";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { MUSIC, SFX, SFX_ENABLED, SFX_TRIGGERS } from "./config/audio";
import { SCENES } from "./config/timing";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";

const LIST = [
  { key: "s1", C: Scene1 },
  { key: "s2", C: Scene2 },
  { key: "s3", C: Scene3 },
  { key: "s4", C: Scene4 },
  { key: "s5", C: Scene5 },
] as const;

const SFX_DUR = 60;

export const JovimAd: React.FC = () => (
  <AbsoluteFill style={{ background: "#fff" }}>
    {LIST.map(({ key, C }) => (
      <Sequence key={key} from={SCENES[key].from} durationInFrames={SCENES[key].duration} name={key}>
        <C />
      </Sequence>
    ))}

    {MUSIC.enabled && <Audio src={MUSIC.file} volume={MUSIC.volume} />}

    {SFX_ENABLED && (
      <>
        <Sequence from={SFX_TRIGGERS.logoFlash}  durationInFrames={SFX_DUR}><Audio src={SFX.logoFlash}  volume={0.7} /></Sequence>
        <Sequence from={SFX_TRIGGERS.logoImpact} durationInFrames={SFX_DUR}><Audio src={SFX.logoImpact} volume={0.9} /></Sequence>
        <Sequence from={SFX_TRIGGERS.badgePop}   durationInFrames={SFX_DUR}><Audio src={SFX.badgePop}   volume={0.6} /></Sequence>
        <Sequence from={SFX_TRIGGERS.card0}      durationInFrames={SFX_DUR}><Audio src={SFX.cardSlide}  volume={0.5} /></Sequence>
        <Sequence from={SFX_TRIGGERS.card1}      durationInFrames={SFX_DUR}><Audio src={SFX.cardSlide}  volume={0.5} /></Sequence>
        <Sequence from={SFX_TRIGGERS.card2}      durationInFrames={SFX_DUR}><Audio src={SFX.cardSlide}  volume={0.5} /></Sequence>
        <Sequence from={SFX_TRIGGERS.cardRise}   durationInFrames={SFX_DUR}><Audio src={SFX.cardRise}   volume={0.6} /></Sequence>
        <Sequence from={SFX_TRIGGERS.barSweep}   durationInFrames={SFX_DUR}><Audio src={SFX.barSweep}   volume={0.5} /></Sequence>
        <Sequence from={SFX_TRIGGERS.social0}    durationInFrames={SFX_DUR}><Audio src={SFX.socialIn}   volume={0.5} /></Sequence>
        <Sequence from={SFX_TRIGGERS.social1}    durationInFrames={SFX_DUR}><Audio src={SFX.socialIn}   volume={0.5} /></Sequence>
        <Sequence from={SFX_TRIGGERS.social2}    durationInFrames={SFX_DUR}><Audio src={SFX.socialIn}   volume={0.5} /></Sequence>
        <Sequence from={SFX_TRIGGERS.social3}    durationInFrames={SFX_DUR}><Audio src={SFX.socialIn}   volume={0.5} /></Sequence>
        <Sequence from={SFX_TRIGGERS.ctaWhoosh}  durationInFrames={SFX_DUR}><Audio src={SFX.ctaWhoosh}  volume={0.7} /></Sequence>
        <Sequence from={SFX_TRIGGERS.btnBounce}  durationInFrames={SFX_DUR}><Audio src={SFX.btnBounce}  volume={0.8} /></Sequence>
        <Sequence from={SFX_TRIGGERS.bellRing}   durationInFrames={SFX_DUR}><Audio src={SFX.bellRing}   volume={0.9} /></Sequence>
        <Sequence from={SFX_TRIGGERS.logoFinal}  durationInFrames={SFX_DUR}><Audio src={SFX.logoFinal}  volume={0.7} /></Sequence>
      </>
    )}
  </AbsoluteFill>
);
