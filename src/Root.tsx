import React from "react";
import { Composition } from "remotion";
import { JovimAd } from "./Composition";
import { VIDEO } from "./config/brand";
import { TOTAL_FRAMES } from "./config/timing";

export const RemotionRoot: React.FC = () => (
  <Composition id="JovimAd" component={JovimAd} durationInFrames={TOTAL_FRAMES} fps={VIDEO.fps} width={VIDEO.width} height={VIDEO.height} />
);
