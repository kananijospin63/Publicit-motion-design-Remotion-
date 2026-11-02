import { staticFile } from "remotion";

/**
 * CONFIG AUDIO — instrumentale + SFX par événement.
 * SFX_ENABLED = true  → après avoir lancé : node scripts/generate-sfx.mjs
 * MUSIC.enabled = true → après avoir déposé public/audio/music.mp3
 */

export const SFX_ENABLED = false;

export const MUSIC = {
  enabled: true,
  file: staticFile("audio/sound4stock-halloween-spooky-music-620458.mp3"),
  volume: 0.18,
};

export const SFX = {
  logoImpact: staticFile("audio/sfx/logo-impact.wav"),
  logoFlash:  staticFile("audio/sfx/logo-flash.wav"),
  cardSlide:  staticFile("audio/sfx/card-slide.wav"),
  badgePop:   staticFile("audio/sfx/badge-pop.wav"),
  cardRise:   staticFile("audio/sfx/card-rise.wav"),
  barSweep:   staticFile("audio/sfx/bar-sweep.wav"),
  socialIn:   staticFile("audio/sfx/social-in.wav"),
  ctaWhoosh:  staticFile("audio/sfx/cta-whoosh.wav"),
  btnBounce:  staticFile("audio/sfx/btn-bounce.wav"),
  bellRing:   staticFile("audio/sfx/bell-ring.wav"),
  logoFinal:  staticFile("audio/sfx/logo-final.wav"),
};

export const SFX_TRIGGERS = {
  logoImpact: 78,
  logoFlash:  68,
  badgePop:   164,
  card0:      180,
  card1:      212,
  card2:      244,
  cardRise:   336,
  barSweep:   360,
  social0:    554,
  social1:    563,
  social2:    572,
  social3:    581,
  ctaWhoosh:  615,
  btnBounce:  780,
  bellRing:   860,
  logoFinal:  870,
};
