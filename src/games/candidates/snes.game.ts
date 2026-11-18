import type { MachineTargetContract } from '../types.ts';

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
        "status": "planned"
      },
      {
        "kind": "cartridge",
        "status": "candidate",
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
      "minimumFps": 1,
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
          'soundcpu:sound_ipl': '44bb3a40',
        },
        checkpoints: {
          1: { video: '9b4e52d8', state: 'd5e58c9d' },
          60: { video: '9b4e52d8', state: '4faaa7f1' },
          180: { video: '1bb8616f', state: '7e188cbb' },
          300: { video: '39314342', state: 'ea8e9cf3' },
          600: { video: '2bca5235', state: '0516a169' },
        },
        audio: {
          writes: 479213,
          nonzeroWrites: 243195,
          writeHash: 'abac8876',
          pcmHash: 'f33bfda3',
          rms: 0.029104,
        },
      }
    }
  ]
} satisfies MachineTargetContract;
