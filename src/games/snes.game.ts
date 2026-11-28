import type { MachineTargetContract } from "./types.ts";

export const snes = {
  "target": {
    "game": "snes",
    "category": "consoles",
    "driver": "src/mame/nintendo/snes.cpp",
    "machine": {
      "className": "snes_console_state",
      "name": "snes"
    },
    "screen": {
      "width": 512,
      "height": 225
    },
    "soundKind": "stream",
    "media": [
      {
        "kind": "bios",
        "status": "accepted"
      },
      {
        "kind": "cartridge",
        "status": "accepted",
        "softwareLists": ["snes"]
      }
    ]
  },
  "scenarios": [
    {
      "id": "smw",
      "kind": "gameplay",
      "cartridge": "smw",
      "romEnvironment": "MAMEKIT_SNES_ROM",
      "frames": 600,
      "minimumFps": 20,
      "checkpoints": [
        1,
        60,
        180,
        300,
        600
      ],
      "actions": [],
      golden: {
        regions: {
          maincpu: 'a47ca14a',
          'snsslot:cart:rom': 'b47f5f20',
          'snsslot:nvram': 'f1e8ba9e',
          'snsslot:rom': 'b47f5f20',
          'soundcpu:sound_ipl': '44bb3a40',
        },
        checkpoints: {
          1: { video: '9b4e52d8', state: 'd5e58c9d' },
          60: { video: '9b4e52d8', state: '4faaa7f1' },
          180: { video: '1bb8616f', state: 'c00ce692' },
          300: { video: '39314342', state: 'ea8e9cf3' },
          600: { video: '2bca5235', state: '0516a169' },
        },
        audio: {
          writes: 479213,
          nonzeroWrites: 243195,
          writeHash: 'd1fe0424',
          pcmHash: 'f33bfda3',
          rms: 0.029104,
        },
      }
    },
    // A DSP-1 cartridge: the uPD7725 on the card runs its own firmware and
    // works out the Mode 7 view. Start through the menus to a race under way,
    // pixel-exact against MAME at frames 600, 1800, 3000 and 3600 (#174).
    {
      id: 'smkart',
      kind: 'gameplay',
      cartridge: 'smkart',
      romEnvironment: 'MAMEKIT_SNES_ROM',
      frames: 3000,
      // About 26 fps locally and 14 on a CI runner: the floor catches a
      // collapse, not the runner's speed.
      minimumFps: 10,
      checkpoints: [1, 600, 1800, 2400, 3000],
      actions: [
        { atFrame: 299, code: 'Enter', heldFrames: 6, releasedFrames: 0 },
        { atFrame: 599, code: 'Enter', heldFrames: 6, releasedFrames: 0 },
        { atFrame: 899, code: 'Enter', heldFrames: 6, releasedFrames: 0 },
        { atFrame: 1199, code: 'Enter', heldFrames: 6, releasedFrames: 0 },
        { atFrame: 1499, code: 'Enter', heldFrames: 6, releasedFrames: 0 },
        { atFrame: 1799, code: 'Enter', heldFrames: 6, releasedFrames: 0 },
        { atFrame: 2099, code: 'Enter', heldFrames: 6, releasedFrames: 0 },
        { atFrame: 2399, code: 'Enter', heldFrames: 6, releasedFrames: 0 },
        { atFrame: 2699, code: 'Enter', heldFrames: 6, releasedFrames: 0 },
      ],
      golden: {
        regions: {
          maincpu: 'a47ca14a',
          'snsslot:addon': '453557e0',
          'snsslot:cart:rom': '56410e5e',
          'snsslot:nvram': 'f1e8ba9e',
          'snsslot:rom': '56410e5e',
          'soundcpu:sound_ipl': '44bb3a40',
        },
        checkpoints: {
          1: { video: '917fc64f', state: '5173b622' },
          600: { video: '9cffe842', state: 'b9c2d248' },
          1800: { video: '8695f543', state: 'c30b18ac' },
          2400: { video: 'bb21ebc1', state: 'da28a2ec' },
          3000: { video: '29c5eead', state: 'fe17ddc0' },
        },
        audio: {
          writes: 2396067,
          nonzeroWrites: 2245969,
          writeHash: '59a9eeef',
          pcmHash: 'd5d3505e',
          rms: 0.043054,
        },
      },
    }
  ]
} satisfies MachineTargetContract;
