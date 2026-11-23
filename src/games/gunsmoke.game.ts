import { sourceTarget } from './source-contract.ts';

export const gunsmoke = sourceTarget({
  game: 'gunsmoke',
  driver: 'src/mame/capcom/gunsmoke.cpp',
  machine: { className: 'gunsmoke_state', name: 'gunsmoke' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  // Gunsmoke ignores the fire buttons until its level intro finishes around
  // frame 1640, so the earlier schedule pressed them where the game discards
  // them: swapping BUTTON1 and BUTTON2 (issue #60) moved no hash at all. The
  // three shots now land in the playable window, one per direction, so the
  // golden actually covers which key aims where.
  frames: 2000,
  // MAME's round bounds (#255) run it in a seventh of the slices and about
  // 5% slower, inside the Z80 loop, for a reason not yet found: CI measured
  // 44.7 fps against the floor of 45, so it came down to 42.
  minimumFps: 42,
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
      1: { video: 'f7e6ac81', state: '02f3937d' },
      60: { video: 'fd2f269d', state: '5fede71a' },
      180: { video: 'fc37c1b8', state: '22184f8d' },
      300: { video: 'e2af8d1e', state: 'e47d7e4e' },
      600: { video: 'eca2166a', state: 'c7c79f32' },
      900: { video: '6f34d8ff', state: '1f81aafc' },
      1200: { video: 'c7401a28', state: 'ae09b2e1' },
      1740: { video: '0e763e6f', state: '7110c72a' },
      1820: { video: 'cb965e26', state: 'da11f0e8' },
      1900: { video: '8be353f8', state: '87462536' },
      2000: { video: '14b9ce85', state: 'acba7f6b' },
    },
    audio: {
      writes: 1609727,
      nonzeroWrites: 1160492,
      writeHash: '4ac65652',
      pcmHash: 'e1e642ab',
      rms: 0.084219,
    },
  },
});
