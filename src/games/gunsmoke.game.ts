import { sourceTarget } from './source-contract.ts';

export const gunsmoke = sourceTarget({
  game: 'gunsmoke',
  driver: 'src/mame/capcom/gunsmoke.cpp',
  machine: { className: 'gunsmoke_state', name: 'gunsmoke' },
  screen: { width: 256, height: 224 },
  soundKind: 'ym2203',
  // Gunsmoke ignores the fire buttons until its level intro finishes around
  // frame 1640, so the earlier schedule pressed them where the game discards
  // them: swapping BUTTON1 and BUTTON2 (issue #60) moved no hash at all. The
  // three shots now land in the playable window, one per direction, so the
  // golden actually covers which key aims where.
  frames: 2000,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200, 1740, 1820, 1900, 2000],
  actions: [
    { atFrame: 600, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 630, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 900, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 1700, code: 'KeyZ', heldFrames: 6, releasedFrames: 34 },
    { atFrame: 1780, code: 'KeyX', heldFrames: 6, releasedFrames: 34 },
    { atFrame: 1860, code: 'KeyC', heldFrames: 6, releasedFrames: 34 },
  ],
  golden: {
    regions: {
      audiocpu: '42165920',
      bgtiles: '0af4f7eb',
      chars: 'b61ece9b',
      maincpu: 'e9558550',
      proms: 'c1196f40',
      sprites: '37089da6',
      tiles: 'a2091ec3',
    },
    checkpoints: {
      1: { video: 'f7e6ac81', state: '1abfc93c' },
      60: { video: 'fd2f269d', state: 'fc651da6' },
      180: { video: 'fc37c1b8', state: 'e8fdaef7' },
      300: { video: 'e2af8d1e', state: '1bf5bbf2' },
      600: { video: 'eca2166a', state: 'ce622e37' },
      900: { video: '6f34d8ff', state: '7fc35148' },
      1200: { video: 'c7401a28', state: '5fac6646' },
      1740: { video: '0e763e6f', state: 'bb4dc6cf' },
      1820: { video: 'cb965e26', state: 'ae05455a' },
      1900: { video: '8be353f8', state: 'ff2acc95' },
      2000: { video: '14b9ce85', state: '2af67388' },
    },
    audio: {
      writes: 355048,
      nonzeroWrites: 192211,
      writeHash: '39e8e4a9',
      pcmHash: 'e41b2596',
      rms: 0.083943,
    },
  },
});
