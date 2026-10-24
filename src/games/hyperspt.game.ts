// Issue #149. Hyper Sports runs on Track & Field's board plus a VLM5030
// speech chip, which is compiled from MAME's vlm5030.cpp and runs beside the
// sound CPU because that CPU polls its BSY pin.
//
// Verified against MAME 0.289 in attract with no input: frames 60, 300, 600,
// 900 and 1200 are 0 differing pixels out of 57344. With a coin at frame 1300
// the speech bursts land in the same quarter seconds as MAME's at the same
// level (VLM5030 isolated through MAME's mixer).

import { sourceTarget } from "./source-contract.ts";

// Name entry times out by itself; then freestyle, swum by alternating the two
// run buttons, with the breath button (2) every sixteenth stroke.
const strokes = Array.from({ length: 150 }, (_unused, index) => ({
  atFrame: 2450 + index * 6,
  code: index % 16 === 15 ? 'KeyZ' : index % 2 ? 'KeyC' : 'Space',
  heldFrames: 3,
  releasedFrames: 2,
}));

export const hyperspt = sourceTarget({
  game: 'hyperspt',
  driver: 'src/mame/konami/hyperspt.cpp',
  machine: { className: 'hyperspt_state', name: 'hyperspt' },
  screen: { width: 256, height: 224 },
  soundKind: 'sn76489',
  frames: 3600,
  minimumFps: 30,
  checkpoints: [1, 300, 1200, 1500, 2400, 3000, 3600],
  actions: [
    { atFrame: 1300, code: 'Digit5', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 1340, code: 'Digit1', heldFrames: 5, releasedFrames: 20 },
    ...strokes,
  ],
  golden: {
    regions: {
      audiocpu: 'cfa7c5a9',
      maincpu: '3f56cd2d',
      proms: '6eea4f6a',
      sprites: 'fd7ce505',
      tiles: '680b30d1',
      vlm: 'b148632e',
    },
    checkpoints: {
      1: { video: 'ac5543a7', state: 'aa09eb8d' },
      300: { video: 'd91caab4', state: '09af1989' },
      1200: { video: '914b782b', state: 'f825cdaa' },
      1500: { video: '8e30f54c', state: 'fc8dea3b' },
      2400: { video: 'af91241d', state: '30af968e' },
      3000: { video: '172d2147', state: '05d3eed0' },
      3600: { video: '694b7431', state: 'c70796db' },
    },
    audio: {
      writes: 505794,
      nonzeroWrites: 47055,
      writeHash: '6ae69eb1',
      pcmHash: '3be4ea68',
      rms: 0.375165,
    },
  },
});
