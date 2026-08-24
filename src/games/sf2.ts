import { sourceTarget } from './source-contract.ts';

export const sf2 = sourceTarget({
  game: 'sf2',
  driver: 'src/mame/capcom/cps1.cpp',
  machine: { className: 'cps_state', name: 'cps1_10MHz' },
  screen: { width: 384, height: 224 },
  soundKind: 'ym2151',
  // Same CPS1 board as sf2ce (10 MHz 68000 instead of 12): ~103 fps in Node
  // with wired-hot handler codegen; hold it above real time.
  minimumFps: 50,
  golden: {
    regions: {
      aboardplds: 'ffcf27eb',
      audiocpu: 'cb027a88',
      bboardplds: '8e74b895',
      cboardplds: '2da84956',
      gfx: 'b758db52',
      maincpu: '490a0cca',
      oki: '6cfffb11',
    },
    checkpoints: {
      1: { video: 'ccf6015f', state: '36628212' },
      60: { video: 'c1c746f0', state: '73c46316' },
      180: { video: '44f0371c', state: '0828dca7' },
      300: { video: 'f61d0b33', state: '10feba8a' },
      600: { video: 'c49297ac', state: 'a6b90cb1' },
      900: { video: '60dd7188', state: '4f264fe9' },
      1200: { video: '60dd7188', state: 'd57389b8' },
    },
    audio: {
      writes: 33137,
      nonzeroWrites: 27428,
      writeHash: 'bafb32cb',
      pcmHash: 'b33c3b1c',
      rms: 0.0126,
    },
  },
});
