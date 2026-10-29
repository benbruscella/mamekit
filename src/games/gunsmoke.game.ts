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
      60: { video: 'fd2f269d', state: 'deaca202' },
      180: { video: 'fc37c1b8', state: 'f1eea3e3' },
      300: { video: 'e2af8d1e', state: '12027b0f' },
      600: { video: 'eca2166a', state: '8ee16845' },
      900: { video: '6f34d8ff', state: 'cd1a4a4a' },
      1200: { video: 'c7401a28', state: 'f9f55c09' },
      1740: { video: '0e763e6f', state: '8274014b' },
      1820: { video: 'cb965e26', state: '80efd1b3' },
      1900: { video: '8be353f8', state: '362968d1' },
      2000: { video: '14b9ce85', state: 'cc3376b3' },
    },
    audio: {
      writes: 355048,
      nonzeroWrites: 192211,
      writeHash: 'ef7d930f',
      pcmHash: 'f5279275',
      rms: 0.084165,
    },
  },
});
