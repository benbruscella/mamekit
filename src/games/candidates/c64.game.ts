import type { MachineTargetContract } from '../types.ts';

export const c64 = {
  "target": {
    "game": "c64",
    "category": "computers",
    "driver": "src/mame/commodore/c64.cpp",
    "machine": {
      "className": "c64_state",
      "name": "ntsc"
    },
    "screen": {
      "width": 418,
      "height": 235
    },
    "soundKind": "none",
    "media": [
      {
        "kind": "bios",
        "status": "candidate"
      },
      {
        "kind": "cartridge",
        "status": "planned",
        "softwareLists": [
          "c64_cart"
        ]
      },
      {
        "kind": "quickload",
        "status": "planned",
        "softwareLists": [
          "c64_quik"
        ]
      },
      {
        "kind": "cassette",
        "status": "candidate",
        "softwareLists": [
          "c64_cass"
        ]
      },
      {
        "kind": "floppy",
        "status": "planned",
        "softwareLists": [
          "c64_flop_orig",
          "c64_flop_misc"
        ]
      }
    ]
  },
  "scenarios": [
    {
      "id": "gameplay",
      "kind": "gameplay",
      "romEnvironment": "MAMEKIT_C64_ROM",
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
