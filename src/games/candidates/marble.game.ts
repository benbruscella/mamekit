import type { MachineTargetContract } from '../types.ts';

export const marble = {
  "target": {
    "game": "marble",
    "category": "arcade",
    "driver": "src/mame/atari/atarisy1.cpp",
    "machine": {
      "className": "atarisy1_state",
      "name": "marble"
    },
    "screen": {
      "width": 336,
      "height": 240
    },
    "soundKind": "ym2151",
    "media": [
      {
        "kind": "romset",
        "status": "candidate"
      }
    ]
  },
  "scenarios": [
    {
      "id": "gameplay",
      "kind": "gameplay",
      "romEnvironment": "MAMEKIT_MARBLE_ROM",
      "frames": 1200,
      "minimumFps": 10,
      "checkpoints": [
        1,
        60,
        180,
        300,
        600,
        900,
        1200
      ],
      "actions": []
    }
  ]
} satisfies MachineTargetContract;
