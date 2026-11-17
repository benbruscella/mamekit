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
      "actions": []
    }
  ]
} satisfies MachineTargetContract;
