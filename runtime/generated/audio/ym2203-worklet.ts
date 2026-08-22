// GENERATED from 3rdparty/ymfm/src/ymfm_opn.cpp:855; do not edit.
// The OPN FM engine, SSG engine, register bitfield map, die-extracted sine,
// power, envelope-increment and detune tables, and the fidelity/prescale
// resampling ratios are all lowered from MAME's bundled ymfm implementation.
const plan = {
  "schemaVersion": 1,
  "type": "YM2203",
  "className": "ym2203_device",
  "sampleRateDivider": 12,
  "fmSamplesPerOutput": 6,
  "ssgResample": [
    4,
    3
  ],
  "prescale": {
    "selectors": [
      {
        "address": 45,
        "prescale": 6
      },
      {
        "address": 46,
        "prescale": 3,
        "requiresPrescale": 6
      },
      {
        "address": 47,
        "prescale": 2
      }
    ],
    "ratios": {
      "2": {
        "fmSamplesPerOutput": 2,
        "ssgResample": [
          1,
          3
        ]
      },
      "3": {
        "fmSamplesPerOutput": 3,
        "ssgResample": [
          2,
          3
        ]
      },
      "6": {
        "fmSamplesPerOutput": 6,
        "ssgResample": [
          4,
          3
        ]
      }
    }
  },
  "fm": {
    "channels": 3,
    "operators": 12,
    "registers": 256,
    "modeRegister": 39,
    "defaultPrescale": 6,
    "waveformLength": 1024,
    "egClockDivider": 3,
    "egQuiet": 896,
    "egAttack": 1,
    "egDecay": 2,
    "egSustain": 3,
    "egRelease": 4,
    "keycodeMagic": 65152,
    "operatorMap": [
      [
        0,
        6,
        3,
        9
      ],
      [
        1,
        7,
        4,
        10
      ],
      [
        2,
        8,
        5,
        11
      ]
    ],
    "channelOffsets": [
      0,
      1,
      2
    ],
    "operatorOffsets": [
      0,
      1,
      2,
      4,
      5,
      6,
      8,
      9,
      10,
      12,
      13,
      14
    ],
    "algorithmOps": [
      53,
      58,
      100,
      113,
      305,
      787,
      769,
      896,
      53,
      180,
      305,
      644
    ],
    "sinTable": [
      2137,
      1731,
      1543,
      1419,
      1326,
      1252,
      1190,
      1137,
      1091,
      1050,
      1013,
      979,
      949,
      920,
      894,
      869,
      846,
      825,
      804,
      785,
      767,
      749,
      732,
      717,
      701,
      687,
      672,
      659,
      646,
      633,
      621,
      609,
      598,
      587,
      576,
      566,
      556,
      546,
      536,
      527,
      518,
      509,
      501,
      492,
      484,
      476,
      468,
      461,
      453,
      446,
      439,
      432,
      425,
      418,
      411,
      405,
      399,
      392,
      386,
      380,
      375,
      369,
      363,
      358,
      352,
      347,
      341,
      336,
      331,
      326,
      321,
      316,
      311,
      307,
      302,
      297,
      293,
      289,
      284,
      280,
      276,
      271,
      267,
      263,
      259,
      255,
      251,
      248,
      244,
      240,
      236,
      233,
      229,
      226,
      222,
      219,
      215,
      212,
      209,
      205,
      202,
      199,
      196,
      193,
      190,
      187,
      184,
      181,
      178,
      175,
      172,
      169,
      167,
      164,
      161,
      159,
      156,
      153,
      151,
      148,
      146,
      143,
      141,
      138,
      136,
      134,
      131,
      129,
      127,
      125,
      122,
      120,
      118,
      116,
      114,
      112,
      110,
      108,
      106,
      104,
      102,
      100,
      98,
      96,
      94,
      92,
      91,
      89,
      87,
      85,
      83,
      82,
      80,
      78,
      77,
      75,
      74,
      72,
      70,
      69,
      67,
      66,
      64,
      63,
      62,
      60,
      59,
      57,
      56,
      55,
      53,
      52,
      51,
      49,
      48,
      47,
      46,
      45,
      43,
      42,
      41,
      40,
      39,
      38,
      37,
      36,
      35,
      34,
      33,
      32,
      31,
      30,
      29,
      28,
      27,
      26,
      25,
      24,
      23,
      23,
      22,
      21,
      20,
      20,
      19,
      18,
      17,
      17,
      16,
      15,
      15,
      14,
      13,
      13,
      12,
      12,
      11,
      10,
      10,
      9,
      9,
      8,
      8,
      7,
      7,
      7,
      6,
      6,
      5,
      5,
      5,
      4,
      4,
      4,
      3,
      3,
      3,
      2,
      2,
      2,
      2,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    "powerTable": [
      8168,
      8148,
      8124,
      8104,
      8080,
      8060,
      8040,
      8016,
      7996,
      7972,
      7952,
      7932,
      7908,
      7888,
      7864,
      7844,
      7824,
      7804,
      7780,
      7760,
      7740,
      7720,
      7696,
      7676,
      7656,
      7636,
      7616,
      7592,
      7572,
      7552,
      7532,
      7512,
      7492,
      7472,
      7452,
      7432,
      7412,
      7392,
      7372,
      7352,
      7332,
      7312,
      7292,
      7272,
      7252,
      7232,
      7212,
      7192,
      7176,
      7156,
      7136,
      7116,
      7096,
      7076,
      7060,
      7040,
      7020,
      7000,
      6984,
      6964,
      6944,
      6928,
      6908,
      6888,
      6868,
      6852,
      6832,
      6816,
      6796,
      6776,
      6760,
      6740,
      6724,
      6704,
      6688,
      6668,
      6652,
      6632,
      6616,
      6596,
      6580,
      6560,
      6544,
      6524,
      6508,
      6492,
      6472,
      6456,
      6436,
      6420,
      6404,
      6384,
      6368,
      6352,
      6336,
      6316,
      6300,
      6284,
      6264,
      6248,
      6232,
      6216,
      6200,
      6180,
      6164,
      6148,
      6132,
      6116,
      6100,
      6080,
      6064,
      6048,
      6032,
      6016,
      6000,
      5984,
      5968,
      5952,
      5936,
      5920,
      5904,
      5888,
      5872,
      5856,
      5840,
      5824,
      5808,
      5792,
      5776,
      5760,
      5744,
      5732,
      5716,
      5700,
      5684,
      5668,
      5652,
      5636,
      5624,
      5608,
      5592,
      5576,
      5564,
      5548,
      5532,
      5516,
      5504,
      5488,
      5472,
      5456,
      5444,
      5428,
      5412,
      5400,
      5384,
      5368,
      5356,
      5340,
      5328,
      5312,
      5296,
      5284,
      5268,
      5256,
      5240,
      5228,
      5212,
      5200,
      5184,
      5168,
      5156,
      5144,
      5128,
      5116,
      5100,
      5088,
      5072,
      5060,
      5044,
      5032,
      5020,
      5004,
      4992,
      4976,
      4964,
      4952,
      4936,
      4924,
      4912,
      4896,
      4884,
      4872,
      4856,
      4844,
      4832,
      4820,
      4804,
      4792,
      4780,
      4768,
      4752,
      4740,
      4728,
      4716,
      4704,
      4688,
      4676,
      4664,
      4652,
      4640,
      4628,
      4616,
      4600,
      4588,
      4576,
      4564,
      4552,
      4540,
      4528,
      4516,
      4504,
      4492,
      4480,
      4468,
      4456,
      4444,
      4432,
      4420,
      4408,
      4396,
      4384,
      4372,
      4360,
      4348,
      4336,
      4324,
      4312,
      4300,
      4288,
      4276,
      4264,
      4256,
      4244,
      4232,
      4220,
      4208,
      4196,
      4184,
      4176,
      4164,
      4152,
      4140,
      4128,
      4120,
      4108,
      4096
    ],
    "incrementTable": [
      0,
      0,
      269488144,
      269488144,
      269488144,
      269488144,
      286265616,
      286265616,
      269488144,
      269553680,
      286265616,
      286331152,
      269488144,
      269553680,
      286265616,
      286331152,
      269488144,
      269553680,
      286265616,
      286331152,
      269488144,
      269553680,
      286265616,
      286331152,
      269488144,
      269553680,
      286265616,
      286331152,
      269488144,
      269553680,
      286265616,
      286331152,
      269488144,
      269553680,
      286265616,
      286331152,
      269488144,
      269553680,
      286265616,
      286331152,
      269488144,
      269553680,
      286265616,
      286331152,
      269488144,
      269553680,
      286265616,
      286331152,
      286331153,
      554770705,
      555819297,
      572596769,
      572662306,
      1109541410,
      1111638594,
      1145193538,
      1145324612,
      2219082820,
      2223277188,
      2290387076,
      2290649224,
      2290649224,
      2290649224,
      2290649224
    ],
    "detuneTable": [
      [
        0,
        0,
        1,
        2
      ],
      [
        0,
        0,
        1,
        2
      ],
      [
        0,
        0,
        1,
        2
      ],
      [
        0,
        0,
        1,
        2
      ],
      [
        0,
        1,
        2,
        2
      ],
      [
        0,
        1,
        2,
        3
      ],
      [
        0,
        1,
        2,
        3
      ],
      [
        0,
        1,
        2,
        3
      ],
      [
        0,
        1,
        2,
        4
      ],
      [
        0,
        1,
        3,
        4
      ],
      [
        0,
        1,
        3,
        4
      ],
      [
        0,
        1,
        3,
        5
      ],
      [
        0,
        2,
        4,
        5
      ],
      [
        0,
        2,
        4,
        6
      ],
      [
        0,
        2,
        4,
        6
      ],
      [
        0,
        2,
        5,
        7
      ],
      [
        0,
        2,
        5,
        8
      ],
      [
        0,
        3,
        6,
        8
      ],
      [
        0,
        3,
        6,
        9
      ],
      [
        0,
        3,
        7,
        10
      ],
      [
        0,
        4,
        8,
        11
      ],
      [
        0,
        4,
        8,
        12
      ],
      [
        0,
        4,
        9,
        13
      ],
      [
        0,
        5,
        10,
        14
      ],
      [
        0,
        5,
        11,
        16
      ],
      [
        0,
        6,
        12,
        17
      ],
      [
        0,
        6,
        13,
        19
      ],
      [
        0,
        7,
        14,
        20
      ],
      [
        0,
        8,
        16,
        22
      ],
      [
        0,
        8,
        16,
        22
      ],
      [
        0,
        8,
        16,
        22
      ],
      [
        0,
        8,
        16,
        22
      ]
    ],
    "fields": {
      "multi_freq": {
        "parts": [
          {
            "offset": 39,
            "offsetStride": 0,
            "shift": 6,
            "shiftStride": 0,
            "width": 2
          }
        ]
      },
      "multi_block_freq": {
        "parts": [
          {
            "offset": 172,
            "offsetStride": 1,
            "shift": 0,
            "shiftStride": 0,
            "width": 6
          },
          {
            "offset": 168,
            "offsetStride": 1,
            "shift": 0,
            "shiftStride": 0,
            "width": 8
          }
        ]
      },
      "ch_block_freq": {
        "parts": [
          {
            "offset": 164,
            "offsetStride": 1,
            "shift": 0,
            "shiftStride": 0,
            "width": 6
          },
          {
            "offset": 160,
            "offsetStride": 1,
            "shift": 0,
            "shiftStride": 0,
            "width": 8
          }
        ]
      },
      "ch_feedback": {
        "parts": [
          {
            "offset": 176,
            "offsetStride": 1,
            "shift": 3,
            "shiftStride": 0,
            "width": 3
          }
        ]
      },
      "ch_algorithm": {
        "parts": [
          {
            "offset": 176,
            "offsetStride": 1,
            "shift": 0,
            "shiftStride": 0,
            "width": 3
          }
        ]
      },
      "op_detune": {
        "parts": [
          {
            "offset": 48,
            "offsetStride": 1,
            "shift": 4,
            "shiftStride": 0,
            "width": 3
          }
        ]
      },
      "op_multiple": {
        "parts": [
          {
            "offset": 48,
            "offsetStride": 1,
            "shift": 0,
            "shiftStride": 0,
            "width": 4
          }
        ]
      },
      "op_total_level": {
        "parts": [
          {
            "offset": 64,
            "offsetStride": 1,
            "shift": 0,
            "shiftStride": 0,
            "width": 7
          }
        ]
      },
      "op_ksr": {
        "parts": [
          {
            "offset": 80,
            "offsetStride": 1,
            "shift": 6,
            "shiftStride": 0,
            "width": 2
          }
        ]
      },
      "op_attack_rate": {
        "parts": [
          {
            "offset": 80,
            "offsetStride": 1,
            "shift": 0,
            "shiftStride": 0,
            "width": 5
          }
        ]
      },
      "op_decay_rate": {
        "parts": [
          {
            "offset": 96,
            "offsetStride": 1,
            "shift": 0,
            "shiftStride": 0,
            "width": 5
          }
        ]
      },
      "op_sustain_rate": {
        "parts": [
          {
            "offset": 112,
            "offsetStride": 1,
            "shift": 0,
            "shiftStride": 0,
            "width": 5
          }
        ]
      },
      "op_sustain_level": {
        "parts": [
          {
            "offset": 128,
            "offsetStride": 1,
            "shift": 4,
            "shiftStride": 0,
            "width": 4
          }
        ]
      },
      "op_release_rate": {
        "parts": [
          {
            "offset": 128,
            "offsetStride": 1,
            "shift": 0,
            "shiftStride": 0,
            "width": 4
          }
        ]
      },
      "op_ssg_eg_enable": {
        "parts": [
          {
            "offset": 144,
            "offsetStride": 1,
            "shift": 3,
            "shiftStride": 0,
            "width": 1
          }
        ]
      },
      "op_ssg_eg_mode": {
        "parts": [
          {
            "offset": 144,
            "offsetStride": 1,
            "shift": 0,
            "shiftStride": 0,
            "width": 3
          }
        ]
      }
    }
  },
  "ssg": {
    "channels": 3,
    "registers": 16,
    "amplitudes": [
      0,
      32,
      78,
      141,
      178,
      222,
      262,
      306,
      369,
      441,
      509,
      585,
      701,
      836,
      965,
      1112,
      1334,
      1595,
      1853,
      2146,
      2576,
      3081,
      3576,
      4135,
      5000,
      6006,
      7023,
      8155,
      9963,
      11976,
      14132,
      16382
    ],
    "noiseTaps": [
      0,
      3
    ],
    "noiseFeedbackShift": 17,
    "envelopeShapeRegister": 13,
    "fields": {
      "noise_period": {
        "parts": [
          {
            "offset": 6,
            "offsetStride": 0,
            "shift": 0,
            "shiftStride": 0,
            "width": 5
          }
        ]
      },
      "envelope_period": {
        "parts": [
          {
            "offset": 12,
            "offsetStride": 0,
            "shift": 0,
            "shiftStride": 0,
            "width": 8
          },
          {
            "offset": 11,
            "offsetStride": 0,
            "shift": 0,
            "shiftStride": 0,
            "width": 8
          }
        ]
      },
      "envelope_continue": {
        "parts": [
          {
            "offset": 13,
            "offsetStride": 0,
            "shift": 3,
            "shiftStride": 0,
            "width": 1
          }
        ]
      },
      "envelope_attack": {
        "parts": [
          {
            "offset": 13,
            "offsetStride": 0,
            "shift": 2,
            "shiftStride": 0,
            "width": 1
          }
        ]
      },
      "envelope_alternate": {
        "parts": [
          {
            "offset": 13,
            "offsetStride": 0,
            "shift": 1,
            "shiftStride": 0,
            "width": 1
          }
        ]
      },
      "envelope_hold": {
        "parts": [
          {
            "offset": 13,
            "offsetStride": 0,
            "shift": 0,
            "shiftStride": 0,
            "width": 1
          }
        ]
      },
      "ch_noise_enable_n": {
        "parts": [
          {
            "offset": 7,
            "offsetStride": 0,
            "shift": 3,
            "shiftStride": 1,
            "width": 1
          }
        ]
      },
      "ch_tone_enable_n": {
        "parts": [
          {
            "offset": 7,
            "offsetStride": 0,
            "shift": 0,
            "shiftStride": 1,
            "width": 1
          }
        ]
      },
      "ch_tone_period": {
        "parts": [
          {
            "offset": 1,
            "offsetStride": 2,
            "shift": 0,
            "shiftStride": 0,
            "width": 4
          },
          {
            "offset": 0,
            "offsetStride": 2,
            "shift": 0,
            "shiftStride": 0,
            "width": 8
          }
        ]
      },
      "ch_envelope_enable": {
        "parts": [
          {
            "offset": 8,
            "offsetStride": 1,
            "shift": 4,
            "shiftStride": 0,
            "width": 1
          }
        ]
      },
      "ch_amplitude": {
        "parts": [
          {
            "offset": 8,
            "offsetStride": 1,
            "shift": 0,
            "shiftStride": 0,
            "width": 4
          }
        ]
      }
    }
  },
  "adpcmA": {
    "channels": 6,
    "registers": 48,
    "addressShift": 8,
    "clockDivider": 36,
    "steps": [
      16,
      17,
      19,
      21,
      23,
      25,
      28,
      31,
      34,
      37,
      41,
      45,
      50,
      55,
      60,
      66,
      73,
      80,
      88,
      97,
      107,
      118,
      130,
      143,
      157,
      173,
      190,
      209,
      230,
      253,
      279,
      307,
      337,
      371,
      408,
      449,
      494,
      544,
      598,
      658,
      724,
      796,
      876,
      963,
      1060,
      1166,
      1282,
      1411,
      1552
    ],
    "stepIncrement": [
      -1,
      -1,
      -1,
      -1,
      2,
      5,
      7,
      9
    ]
  },
  "sourceFiles": [
    "src/devices/sound/ymopn.cpp",
    "src/devices/sound/ymfm_mame.h",
    "3rdparty/ymfm/src/ymfm.h",
    "3rdparty/ymfm/src/ymfm_fm.h",
    "3rdparty/ymfm/src/ymfm_fm.ipp",
    "3rdparty/ymfm/src/ymfm_opn.h",
    "3rdparty/ymfm/src/ymfm_opn.cpp",
    "3rdparty/ymfm/src/ymfm_ssg.h",
    "3rdparty/ymfm/src/ymfm_ssg.cpp",
    "3rdparty/ymfm/src/ymfm_adpcm.h",
    "3rdparty/ymfm/src/ymfm_adpcm.cpp"
  ],
  "source": {
    "file": "3rdparty/ymfm/src/ymfm_opn.cpp",
    "line": 855
  }
};

interface GeneratedYm3526Plan {
  channels: number;
  operators: number;
  registers: number;
  waveformLength: number;
  sampleRateDivider: number;
  operatorMap: [number, number][];
  operatorOffsets: number[];
  multiples: number[];
}

// Keep the nullable plan's declared union even in a targeted build where the
// literal is null. Without the assertion TypeScript narrows a const null all
// the way to never inside the dormant OPL class, breaking unrelated YM2203-only
// targets such as Commando.
const ym3526Plan = ({
  "schemaVersion": 1,
  "type": "YM3526",
  "className": "ym3526_device",
  "channels": 9,
  "operators": 18,
  "registers": 256,
  "waveformLength": 1024,
  "sampleRateDivider": 72,
  "operatorMap": [
    [
      0,
      3
    ],
    [
      1,
      4
    ],
    [
      2,
      5
    ],
    [
      6,
      9
    ],
    [
      7,
      10
    ],
    [
      8,
      11
    ],
    [
      12,
      15
    ],
    [
      13,
      16
    ],
    [
      14,
      17
    ]
  ],
  "operatorOffsets": [
    0,
    1,
    2,
    3,
    4,
    5,
    8,
    9,
    10,
    11,
    12,
    13,
    16,
    17,
    18,
    19,
    20,
    21
  ],
  "multiples": [
    0.5,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    10,
    12,
    12,
    15,
    15
  ],
  "sourceFiles": [
    "src/devices/sound/ymopl.cpp",
    "3rdparty/ymfm/src/ymfm_opl.h",
    "3rdparty/ymfm/src/ymfm_opl.cpp",
    "3rdparty/ymfm/src/ymfm_fm.h"
  ],
  "source": {
    "file": "3rdparty/ymfm/src/ymfm_opl.cpp",
    "line": 143
  }
}) as GeneratedYm3526Plan | null;
const msmPlan = ({
  "schemaVersion": 1,
  "type": "MSM5205",
  "className": "msm5205_device",
  "indexShift": [
    -1,
    -1,
    -1,
    -1,
    2,
    4,
    6,
    8
  ],
  "diffLookup": [
    2,
    6,
    10,
    14,
    18,
    22,
    26,
    30,
    -2,
    -6,
    -10,
    -14,
    -18,
    -22,
    -26,
    -30,
    2,
    6,
    10,
    14,
    19,
    23,
    27,
    31,
    -2,
    -6,
    -10,
    -14,
    -19,
    -23,
    -27,
    -31,
    2,
    7,
    11,
    16,
    21,
    26,
    30,
    35,
    -2,
    -7,
    -11,
    -16,
    -21,
    -26,
    -30,
    -35,
    2,
    7,
    13,
    18,
    23,
    28,
    34,
    39,
    -2,
    -7,
    -13,
    -18,
    -23,
    -28,
    -34,
    -39,
    2,
    8,
    14,
    20,
    25,
    31,
    37,
    43,
    -2,
    -8,
    -14,
    -20,
    -25,
    -31,
    -37,
    -43,
    3,
    9,
    15,
    21,
    28,
    34,
    40,
    46,
    -3,
    -9,
    -15,
    -21,
    -28,
    -34,
    -40,
    -46,
    3,
    10,
    17,
    24,
    31,
    38,
    45,
    52,
    -3,
    -10,
    -17,
    -24,
    -31,
    -38,
    -45,
    -52,
    3,
    11,
    19,
    27,
    34,
    42,
    50,
    58,
    -3,
    -11,
    -19,
    -27,
    -34,
    -42,
    -50,
    -58,
    4,
    12,
    21,
    29,
    38,
    46,
    55,
    63,
    -4,
    -12,
    -21,
    -29,
    -38,
    -46,
    -55,
    -63,
    4,
    13,
    23,
    32,
    41,
    50,
    60,
    69,
    -4,
    -13,
    -23,
    -32,
    -41,
    -50,
    -60,
    -69,
    5,
    15,
    25,
    35,
    46,
    56,
    66,
    76,
    -5,
    -15,
    -25,
    -35,
    -46,
    -56,
    -66,
    -76,
    5,
    16,
    28,
    39,
    50,
    61,
    73,
    84,
    -5,
    -16,
    -28,
    -39,
    -50,
    -61,
    -73,
    -84,
    6,
    18,
    31,
    43,
    56,
    68,
    81,
    93,
    -6,
    -18,
    -31,
    -43,
    -56,
    -68,
    -81,
    -93,
    6,
    20,
    34,
    48,
    61,
    75,
    89,
    103,
    -6,
    -20,
    -34,
    -48,
    -61,
    -75,
    -89,
    -103,
    7,
    22,
    37,
    52,
    67,
    82,
    97,
    112,
    -7,
    -22,
    -37,
    -52,
    -67,
    -82,
    -97,
    -112,
    8,
    24,
    41,
    57,
    74,
    90,
    107,
    123,
    -8,
    -24,
    -41,
    -57,
    -74,
    -90,
    -107,
    -123,
    9,
    27,
    45,
    63,
    82,
    100,
    118,
    136,
    -9,
    -27,
    -45,
    -63,
    -82,
    -100,
    -118,
    -136,
    10,
    30,
    50,
    70,
    90,
    110,
    130,
    150,
    -10,
    -30,
    -50,
    -70,
    -90,
    -110,
    -130,
    -150,
    11,
    33,
    55,
    77,
    99,
    121,
    143,
    165,
    -11,
    -33,
    -55,
    -77,
    -99,
    -121,
    -143,
    -165,
    12,
    36,
    60,
    84,
    109,
    133,
    157,
    181,
    -12,
    -36,
    -60,
    -84,
    -109,
    -133,
    -157,
    -181,
    13,
    40,
    66,
    93,
    120,
    147,
    173,
    200,
    -13,
    -40,
    -66,
    -93,
    -120,
    -147,
    -173,
    -200,
    14,
    44,
    73,
    103,
    132,
    162,
    191,
    221,
    -14,
    -44,
    -73,
    -103,
    -132,
    -162,
    -191,
    -221,
    16,
    48,
    81,
    113,
    146,
    178,
    211,
    243,
    -16,
    -48,
    -81,
    -113,
    -146,
    -178,
    -211,
    -243,
    17,
    53,
    89,
    125,
    160,
    196,
    232,
    268,
    -17,
    -53,
    -89,
    -125,
    -160,
    -196,
    -232,
    -268,
    19,
    58,
    98,
    137,
    176,
    215,
    255,
    294,
    -19,
    -58,
    -98,
    -137,
    -176,
    -215,
    -255,
    -294,
    21,
    64,
    108,
    151,
    194,
    237,
    281,
    324,
    -21,
    -64,
    -108,
    -151,
    -194,
    -237,
    -281,
    -324,
    23,
    71,
    118,
    166,
    213,
    261,
    308,
    356,
    -23,
    -71,
    -118,
    -166,
    -213,
    -261,
    -308,
    -356,
    26,
    78,
    130,
    182,
    235,
    287,
    339,
    391,
    -26,
    -78,
    -130,
    -182,
    -235,
    -287,
    -339,
    -391,
    28,
    86,
    143,
    201,
    258,
    316,
    373,
    431,
    -28,
    -86,
    -143,
    -201,
    -258,
    -316,
    -373,
    -431,
    31,
    94,
    158,
    221,
    284,
    347,
    411,
    474,
    -31,
    -94,
    -158,
    -221,
    -284,
    -347,
    -411,
    -474,
    34,
    104,
    174,
    244,
    313,
    383,
    453,
    523,
    -34,
    -104,
    -174,
    -244,
    -313,
    -383,
    -453,
    -523,
    38,
    115,
    191,
    268,
    345,
    422,
    498,
    575,
    -38,
    -115,
    -191,
    -268,
    -345,
    -422,
    -498,
    -575,
    42,
    126,
    210,
    294,
    379,
    463,
    547,
    631,
    -42,
    -126,
    -210,
    -294,
    -379,
    -463,
    -547,
    -631,
    46,
    139,
    231,
    324,
    417,
    510,
    602,
    695,
    -46,
    -139,
    -231,
    -324,
    -417,
    -510,
    -602,
    -695,
    51,
    153,
    255,
    357,
    459,
    561,
    663,
    765,
    -51,
    -153,
    -255,
    -357,
    -459,
    -561,
    -663,
    -765,
    56,
    168,
    280,
    392,
    505,
    617,
    729,
    841,
    -56,
    -168,
    -280,
    -392,
    -505,
    -617,
    -729,
    -841,
    61,
    185,
    308,
    432,
    555,
    679,
    802,
    926,
    -61,
    -185,
    -308,
    -432,
    -555,
    -679,
    -802,
    -926,
    68,
    204,
    340,
    476,
    612,
    748,
    884,
    1020,
    -68,
    -204,
    -340,
    -476,
    -612,
    -748,
    -884,
    -1020,
    74,
    224,
    373,
    523,
    672,
    822,
    971,
    1121,
    -74,
    -224,
    -373,
    -523,
    -672,
    -822,
    -971,
    -1121,
    82,
    246,
    411,
    575,
    740,
    904,
    1069,
    1233,
    -82,
    -246,
    -411,
    -575,
    -740,
    -904,
    -1069,
    -1233,
    90,
    271,
    452,
    633,
    814,
    995,
    1176,
    1357,
    -90,
    -271,
    -452,
    -633,
    -814,
    -995,
    -1176,
    -1357,
    99,
    298,
    497,
    696,
    895,
    1094,
    1293,
    1492,
    -99,
    -298,
    -497,
    -696,
    -895,
    -1094,
    -1293,
    -1492,
    109,
    328,
    547,
    766,
    985,
    1204,
    1423,
    1642,
    -109,
    -328,
    -547,
    -766,
    -985,
    -1204,
    -1423,
    -1642,
    120,
    361,
    601,
    842,
    1083,
    1324,
    1564,
    1805,
    -120,
    -361,
    -601,
    -842,
    -1083,
    -1324,
    -1564,
    -1805,
    132,
    397,
    662,
    927,
    1192,
    1457,
    1722,
    1987,
    -132,
    -397,
    -662,
    -927,
    -1192,
    -1457,
    -1722,
    -1987,
    145,
    437,
    728,
    1020,
    1311,
    1603,
    1894,
    2186,
    -145,
    -437,
    -728,
    -1020,
    -1311,
    -1603,
    -1894,
    -2186,
    160,
    480,
    801,
    1121,
    1442,
    1762,
    2083,
    2403,
    -160,
    -480,
    -801,
    -1121,
    -1442,
    -1762,
    -2083,
    -2403,
    176,
    529,
    881,
    1234,
    1587,
    1940,
    2292,
    2645,
    -176,
    -529,
    -881,
    -1234,
    -1587,
    -1940,
    -2292,
    -2645,
    194,
    582,
    970,
    1358,
    1746,
    2134,
    2522,
    2910,
    -194,
    -582,
    -970,
    -1358,
    -1746,
    -2134,
    -2522,
    -2910
  ],
  "modes": {
    "S96_3B": 0,
    "S48_3B": 1,
    "S64_3B": 2,
    "SEX_3B": 3,
    "S96_4B": 4,
    "S48_4B": 5,
    "S64_4B": 6,
    "SEX_4B": 7,
    "S160": 12,
    "S80": 13,
    "S40": 14,
    "S20": 15
  },
  "maximumStep": 48,
  "minimumSignal": -2048,
  "maximumSignal": 2047,
  "sampleScale": 0.000244140625,
  "dacBits": 10,
  "sourceFiles": [
    "src/devices/sound/msm5205.cpp",
    "src/devices/sound/msm5205.h"
  ],
  "source": {
    "file": "src/devices/sound/msm5205.cpp",
    "line": 370
  }
}) as GeneratedMsm5205PlanData | null;

interface GeneratedMsm5205PlanData {
  indexShift: number[];
  diffLookup: number[];
  modes: Record<string, number>;
  maximumStep: number;
  minimumSignal: number;
  maximumSignal: number;
  sampleScale: number;
  dacBits: number;
}

export interface GeneratedYmRoute {
  chip: number;
  channel: number;
  gain: number;
  target: string;
}

export interface GeneratedYmWrite {
  offset: number;
  data: number;
  frac?: number;
  method?: string;
}

export interface GeneratedAuxiliaryAudioDevice {
  type: string;
  deviceTag: string;
  clock: number;
  initialMode?: string;
  gain: number;
  target: string;
  writeMethods?: string[];
}

interface Field {
  parts: {
    offset: number;
    offsetStride: number;
    shift: number;
    shiftStride: number;
    width: number;
  }[];
}

const FM_FIELDS = plan.fm.fields as unknown as Record<string, Field>;
const SSG_FIELDS = plan.ssg.fields as unknown as Record<string, Field>;

function bitfield(value: number, start: number, length = 1): number {
  return (value >>> start) & ((1 << length) - 1);
}

function clamp(value: number, minimum: number, maximum: number): number {
  return value < minimum ? minimum : value > maximum ? maximum : value;
}

function countLeadingZeros(value: number): number {
  return Math.clz32(value >>> 0);
}

/** ymfm stores intermediate operator outputs in an int16_t array. */
function int16(value: number): number {
  return (value << 16) >> 16;
}

/** ymfm::roundtrip_fp - the 10.3 floating point DAC round trip. */
function roundtripFp(value: number): number {
  if (value < -32768) return -32768;
  if (value > 32767) return 32767;
  const scan = value ^ (value >> 31);
  let exponent = 7 - countLeadingZeros((scan << 17) >>> 0);
  if (exponent < 1) exponent = 1;
  exponent -= 1;
  return value & ~((1 << exponent) - 1);
}

const FM = plan.fm;
const SSG = plan.ssg;
const ADPCM_A = plan.adpcmA;
const EG_STATES = 4;

/** ymfm's YM2610 ADPCM-A engine, reading the board's real sample ROM. */
class GeneratedYm2610AdpcmA {
  private readonly rom: Uint8Array;
  private readonly regs = new Uint8Array(ADPCM_A.registers);
  private readonly playing = new Uint8Array(ADPCM_A.channels);
  private readonly nibble = new Uint8Array(ADPCM_A.channels);
  private readonly currentByte = new Uint8Array(ADPCM_A.channels);
  private readonly address = new Uint32Array(ADPCM_A.channels);
  private readonly accumulator = new Uint16Array(ADPCM_A.channels);
  private readonly stepIndex = new Uint8Array(ADPCM_A.channels);

  constructor(rom: Uint8Array) {
    this.rom = rom;
    this.reset();
  }

  reset(): void {
    this.regs.fill(0);
    // ymfm enables both pans and selects maximum instrument volume on reset.
    for (let channel = 0; channel < ADPCM_A.channels; channel++) {
      this.regs[0x08 + channel] = 0xdf;
    }
    this.playing.fill(0);
    this.nibble.fill(0);
    this.currentByte.fill(0);
    this.address.fill(0);
    this.accumulator.fill(0);
    this.stepIndex.fill(0);
  }

  write(regnum: number, data: number): void {
    if (regnum >= this.regs.length) return;
    this.regs[regnum] = data & 0xff;
    if (regnum !== 0) return;
    const on = (data & 0x80) === 0;
    for (let channel = 0; channel < ADPCM_A.channels; channel++) {
      if ((data & (1 << channel)) === 0) continue;
      this.playing[channel] = on ? 1 : 0;
      if (!on) continue;
      this.address[channel] = this.start(channel);
      this.nibble[channel] = 0;
      this.currentByte[channel] = 0;
      this.accumulator[channel] = 0;
      this.stepIndex[channel] = 0;
    }
  }

  /** Clock one ADPCM nibble per active voice and return its mono board mix. */
  clock(): number {
    let mixed = 0;
    for (let channel = 0; channel < ADPCM_A.channels; channel++) {
      if (!this.playing[channel]) continue;
      let data: number;
      if (this.nibble[channel] === 0) {
        const end = this.end(channel);
        if (((this.address[channel]! ^ end) & 0xfffff) === 0) {
          this.playing[channel] = 0;
          this.accumulator[channel] = 0;
          continue;
        }
        this.currentByte[channel] = this.rom[this.address[channel]!] ?? 0xff;
        this.address[channel]++;
        data = this.currentByte[channel]! >>> 4;
        this.nibble[channel] = 1;
      } else {
        data = this.currentByte[channel]! & 0x0f;
        this.nibble[channel] = 0;
      }
      let delta = ((2 * (data & 7) + 1) * ADPCM_A.steps[this.stepIndex[channel]!]!) >> 3;
      if (data & 8) delta = -delta;
      this.accumulator[channel] = (this.accumulator[channel]! + delta) & 0xfff;
      this.stepIndex[channel] = clamp(
        this.stepIndex[channel]! + ADPCM_A.stepIncrement[data & 7]!,
        0,
        ADPCM_A.steps.length - 1,
      );
      mixed += this.output(channel);
    }
    return mixed;
  }

  private start(channel: number): number {
    return (this.regs[0x10 + channel]! | (this.regs[0x18 + channel]! << 8)) <<
      ADPCM_A.addressShift;
  }

  /** ymfm treats the programmed end as inclusive. */
  private end(channel: number): number {
    return ((this.regs[0x20 + channel]! | (this.regs[0x28 + channel]! << 8)) + 1) <<
      ADPCM_A.addressShift;
  }

  private output(channel: number): number {
    const panLevel = this.regs[0x08 + channel]!;
    if ((panLevel & 0xc0) === 0) return 0;
    const volume = ((panLevel & 0x1f) ^ 0x1f) + ((this.regs[0x01]! & 0x3f) ^ 0x3f);
    if (volume >= 63) return 0;
    const multiply = 15 - (volume & 7);
    const shift = 5 + (volume >>> 3);
    return int16((int16(this.accumulator[channel]! << 4) * multiply) >> shift) & ~3;
  }
}

/** ymfm's OPN chip: an FM engine and an SSG engine behind one register port. */
export class GeneratedYm2203Chip {
  private readonly regs = new Uint8Array(FM.registers);
  private readonly ssgRegs = new Uint8Array(SSG.registers);
  private readonly waveform = new Uint16Array(FM.waveformLength);

  private readonly addresses = new Uint8Array(2);
  private readonly adpcmA?: GeneratedYm2610AdpcmA;
  private adpcmClock = 0;
  private adpcmLast = 0;

  // FM operator state
  private readonly phase = new Uint32Array(FM.operators);
  private readonly envAttenuation = new Uint16Array(FM.operators);
  private readonly envState = new Uint8Array(FM.operators);
  private readonly ssgInverted = new Uint8Array(FM.operators);
  private readonly keyState = new Uint8Array(FM.operators);
  private readonly keyonLive = new Uint8Array(FM.operators);

  // per-operator cache filled by prepare()
  private readonly cacheBlockFreq = new Uint32Array(FM.operators);
  private readonly cacheDetune = new Int32Array(FM.operators);
  private readonly cacheMultiple = new Uint32Array(FM.operators);
  private readonly cachePhaseStep = new Uint32Array(FM.operators);
  private readonly cacheTotalLevel = new Uint32Array(FM.operators);
  private readonly cacheEgSustain = new Uint32Array(FM.operators);
  private readonly cacheEgRate = new Uint8Array(FM.operators * EG_STATES);

  // FM channel state
  private readonly feedback0 = new Int32Array(FM.channels);
  private readonly feedback1 = new Int32Array(FM.channels);
  private readonly feedbackIn = new Int32Array(FM.channels);

  private envCounter = 0;
  private prepareCount = 0;
  private modifiedChannels = (1 << FM.channels) - 1;
  private activeChannels = 0;
  private lastFm = 0;

  // SSG engine state
  private readonly toneCount = new Uint32Array(SSG.channels);
  private readonly toneState = new Uint8Array(SSG.channels);
  private envelopeCount = 0;
  private envelopeState = 0;
  private noiseCount = 0;
  private noiseState = 1;
  private readonly ssgLast = new Int32Array(SSG.channels);

  private sampleIndex = 0;
  private prescale = FM.defaultPrescale;
  private fmSamplesPerOutput = plan.fmSamplesPerOutput;
  private ssgResample = plan.ssgResample;

  /** Reverse of operator_map: ymfm interleaves operators across channels. */
  private readonly operatorChannel = new Uint8Array(FM.operators);

  constructor(deviceType = 'YM2203', sampleRom?: Uint8Array) {
    if (deviceType === 'YM2610') {
      this.adpcmA = new GeneratedYm2610AdpcmA(sampleRom ?? new Uint8Array(0));
    }
    for (let chnum = 0; chnum < FM.channels; chnum++) {
      for (const opnum of FM.operatorMap[chnum]!) this.operatorChannel[opnum] = chnum;
    }
    // opn_registers_base builds the waveform from the die-extracted sine table.
    for (let index = 0; index < FM.waveformLength; index++) {
      this.waveform[index] = this.absSinAttenuation(index) | (bitfield(index, 9) << 15);
    }
    this.reset();
  }

  reset(): void {
    this.regs.fill(0);
    this.ssgRegs.fill(0);
    this.addresses.fill(0);
    this.phase.fill(0);
    this.envAttenuation.fill(0x3ff);
    this.envState.fill(FM.egRelease);
    this.ssgInverted.fill(0);
    this.keyState.fill(0);
    this.keyonLive.fill(0);
    this.feedback0.fill(0);
    this.feedback1.fill(0);
    this.feedbackIn.fill(0);
    this.envCounter = 0;
    this.prepareCount = 0;
    this.modifiedChannels = (1 << FM.channels) - 1;
    this.activeChannels = 0;
    this.lastFm = 0;
    this.toneCount.fill(0);
    this.toneState.fill(0);
    this.envelopeCount = 0;
    this.envelopeState = 0;
    this.noiseCount = 0;
    this.noiseState = 1;
    this.ssgLast.fill(0);
    this.adpcmA?.reset();
    this.adpcmClock = 0;
    this.adpcmLast = 0;
  }

  /**
   * OPN register ports. YM2203 uses bank 0; YM2610 exposes a second
   * address/data pair at offsets 2/3.
   */
  write(offset: number, data: number): void {
    const bank = (offset >>> 1) & 1;
    if ((offset & 1) === 0) {
      this.addresses[bank] = data & 0xff;
      const selector = plan.prescale.selectors.find(
        candidate => bank === 0 && candidate.address === this.addresses[bank] &&
          (candidate.requiresPrescale === undefined ||
            candidate.requiresPrescale === this.prescale),
      );
      if (selector) this.updatePrescale(selector.prescale);
    } else {
      this.writeData(data & 0xff, bank);
    }
  }

  /** ym2203::update_prescale: switch both FM and SSG engine clock ratios. */
  private updatePrescale(prescale: number): void {
    const ratios = (plan.prescale.ratios as unknown as Record<string, {
      fmSamplesPerOutput: number;
      ssgResample: [number, number];
    }>)[String(prescale)];
    if (!ratios) return;
    this.prescale = prescale;
    this.fmSamplesPerOutput = ratios.fmSamplesPerOutput;
    this.ssgResample = ratios.ssgResample;
  }

  private writeData(data: number, bank: number): void {
    const address = this.addresses[bank]!;
    if (bank === 0 && address < 0x10) {
      // 00-0F: SSG
      const regnum = address & 0x0f;
      this.ssgRegs[regnum] = data;
      if (regnum === SSG.envelopeShapeRegister) this.envelopeState = 0;
      return;
    }
    // YM2610 bank B registers below 0x30 belong to ADPCM-A. The FM/SSG
    // core deliberately leaves those for the sample-ROM layer.
    if (bank === 1 && address < 0x30) {
      this.adpcmA?.write(address, data);
      return;
    }
    // 10-FF: FM
    // The current OPN renderer hosts three four-operator channels. Bank-B FM
    // channels share that engine as a best-effort voice bank until the full
    // six-channel YM2610 plan is lowered; unlike dropping ports 2/3 entirely,
    // this preserves their real register/key-on stream and produces the BIOS
    // and gameplay FM layer.
    this.writeFm(address, data);
  }

  /** opn_registers_base::write plus fm_engine_base::write key-on handling. */
  private writeFm(index: number, data: number): void {
    // fm_engine_base::write marks every channel modified before the register
    // store; the mode register takes the same path through engine_mode_write.
    this.modifiedChannels = (1 << FM.channels) - 1;
    if ((index & 0xf0) === 0xa0) {
      if (bitfield(index, 0, 2) === 3) return;
      const latchIndex = 0xb8 | bitfield(index, 3);
      if (bitfield(index, 2)) {
        this.regs[latchIndex] = data & 0x3f;
      } else {
        this.regs[index] = data;
        this.regs[index | 4] = this.regs[latchIndex]!;
      }
      return;
    }
    if ((index & 0xf8) === 0xb8) return;
    this.regs[index] = data;
    if (index === 0x28) {
      const channel = bitfield(data, 0, 2);
      if (channel === 3) return;
      const opmask = bitfield(data, 4, 4);
      for (let opnum = 0; opnum < 4; opnum++) {
        const op = FM.operatorMap[channel]![opnum]!;
        this.keyonLive[op] = bitfield(opmask, opnum);
      }
    }
  }

  /** Read a lowered register field for the given channel/operator offset. */
  private field(field: Field, index: number, registers: Uint8Array): number {
    let value = 0;
    for (const part of field.parts) {
      const register = registers[part.offset + part.offsetStride * index] ?? 0;
      value = (value << part.width) |
        bitfield(register, part.shift + part.shiftStride * index, part.width);
    }
    return value >>> 0;
  }

  private fm(name: string, index: number): number {
    return this.field(FM_FIELDS[name]!, index, this.regs);
  }

  private ssg(name: string, index = 0): number {
    return this.field(SSG_FIELDS[name]!, index, this.ssgRegs);
  }

  private absSinAttenuation(input: number): number {
    const index = bitfield(input, 8) ? ~input : input;
    return FM.sinTable[index & 0xff]!;
  }

  private attenuationToVolume(input: number): number {
    return FM.powerTable[input & 0xff]! >>> (input >>> 8);
  }

  private attenuationIncrement(rate: number, index: number): number {
    return bitfield(FM.incrementTable[rate]!, 4 * index, 4);
  }

  private detuneAdjustment(detune: number, keycode: number): number {
    const result = FM.detuneTable[keycode]![detune & 3]!;
    return bitfield(detune, 2) ? -result : result;
  }

  /** fm_registers_base::effective_rate */
  private effectiveRate(rawRate: number, ksr: number): number {
    return rawRate === 0 ? 0 : Math.min(rawRate + ksr, 63);
  }

  /** opn_registers_base::cache_operator_data */
  private cacheOperatorData(chnum: number, opnum: number): void {
    const choffs = FM.channelOffsets[chnum]!;
    const opoffs = FM.operatorOffsets[opnum]!;
    let blockFreq = this.fm('ch_block_freq', choffs);
    // Channel 2 uses the per-operator frequencies in multi-frequency mode.
    if (this.fm('multi_freq', 0) !== 0 && choffs === 2) {
      if (opoffs === 2) blockFreq = this.fm('multi_block_freq', 1);
      else if (opoffs === 10) blockFreq = this.fm('multi_block_freq', 2);
      else if (opoffs === 6) blockFreq = this.fm('multi_block_freq', 0);
    }
    this.cacheBlockFreq[opnum] = blockFreq;

    let keycode = bitfield(blockFreq, 10, 4) << 1;
    keycode |= bitfield(FM.keycodeMagic, bitfield(blockFreq, 7, 4));

    this.cacheDetune[opnum] = this.detuneAdjustment(this.fm('op_detune', opoffs), keycode);
    const multiple = this.fm('op_multiple', opoffs) * 2;
    this.cacheMultiple[opnum] = multiple === 0 ? 1 : multiple;
    this.cachePhaseStep[opnum] = this.computePhaseStep(opnum);
    this.cacheTotalLevel[opnum] = this.fm('op_total_level', opoffs) << 3;

    let sustain = this.fm('op_sustain_level', opoffs);
    sustain |= (sustain + 1) & 0x10;
    this.cacheEgSustain[opnum] = sustain << 5;

    const ksrval = keycode >>> (this.fm('op_ksr', opoffs) ^ 3);
    const base = opnum * EG_STATES;
    this.cacheEgRate[base + FM.egAttack - 1] =
      this.effectiveRate(this.fm('op_attack_rate', opoffs) * 2, ksrval);
    this.cacheEgRate[base + FM.egDecay - 1] =
      this.effectiveRate(this.fm('op_decay_rate', opoffs) * 2, ksrval);
    this.cacheEgRate[base + FM.egSustain - 1] =
      this.effectiveRate(this.fm('op_sustain_rate', opoffs) * 2, ksrval);
    this.cacheEgRate[base + FM.egRelease - 1] =
      this.effectiveRate(this.fm('op_release_rate', opoffs) * 4 + 2, ksrval);
  }

  private egRate(opnum: number, state: number): number {
    return this.cacheEgRate[opnum * EG_STATES + state - 1] ?? 0;
  }

  /** opn_registers_base::compute_phase_step (OPN has no LFO). */
  private computePhaseStep(opnum: number): number {
    const blockFreq = this.cacheBlockFreq[opnum]!;
    const fnum = bitfield(blockFreq, 0, 11) << 1;
    const block = bitfield(blockFreq, 11, 3);
    let phaseStep = (fnum << block) >>> 2;
    phaseStep += this.cacheDetune[opnum]!;
    phaseStep &= 0x1ffff;
    return (phaseStep * this.cacheMultiple[opnum]!) >>> 1;
  }

  /** fm_operator::prepare */
  private prepareOperator(opnum: number): boolean {
    this.cacheOperatorData(this.operatorChannel[opnum]!, opnum);
    this.clockKeystate(opnum, this.keyonLive[opnum] !== 0 ? 1 : 0);
    return this.envState[opnum] !== FM.egRelease ||
      this.envAttenuation[opnum]! < FM.egQuiet;
  }

  private clockKeystate(opnum: number, keystate: number): void {
    if ((keystate ^ this.keyState[opnum]!) === 0) return;
    this.keyState[opnum] = keystate;
    if (keystate !== 0) this.startAttack(opnum, false);
    else this.startRelease(opnum);
  }

  private startAttack(opnum: number, isRestart: boolean): void {
    if (this.envState[opnum] === FM.egAttack) return;
    this.envState[opnum] = FM.egAttack;
    if (!isRestart) {
      const opoffs = FM.operatorOffsets[opnum]!;
      this.ssgInverted[opnum] =
        this.fm('op_ssg_eg_enable', opoffs) & bitfield(this.fm('op_ssg_eg_mode', opoffs), 2);
      this.phase[opnum] = 0;
    }
    if (this.egRate(opnum, FM.egAttack) >= 62) this.envAttenuation[opnum] = 0;
  }

  private startRelease(opnum: number): void {
    if (this.envState[opnum]! >= FM.egRelease) return;
    this.envState[opnum] = FM.egRelease;
    if (this.ssgInverted[opnum]) {
      this.envAttenuation[opnum] = (0x200 - this.envAttenuation[opnum]!) & 0x3ff;
      this.ssgInverted[opnum] = 0;
    }
  }

  /** fm_operator::clock_ssg_eg_state */
  private clockSsgEgState(opnum: number): void {
    if (!bitfield(this.envAttenuation[opnum]!, 9)) return;
    const mode = this.fm('op_ssg_eg_mode', FM.operatorOffsets[opnum]!);
    if (bitfield(mode, 0)) {
      this.ssgInverted[opnum] = bitfield(mode, 2) ^ bitfield(mode, 1);
      if (this.envState[opnum] !== FM.egAttack) {
        this.envAttenuation[opnum] = this.ssgInverted[opnum] ? 0x200 : 0x3ff;
      }
    } else {
      this.ssgInverted[opnum] ^= bitfield(mode, 1);
      if (this.envState[opnum] === FM.egDecay || this.envState[opnum] === FM.egSustain) {
        this.startAttack(opnum, true);
      }
      if (bitfield(mode, 1) === 0) this.phase[opnum] = 0;
    }
    if (this.envState[opnum] === FM.egRelease) this.envAttenuation[opnum] = 0x3ff;
  }

  /** fm_operator::clock_envelope */
  private clockEnvelope(opnum: number, counter: number): void {
    if (this.envState[opnum] === FM.egAttack && this.envAttenuation[opnum] === 0) {
      this.envState[opnum] = FM.egDecay;
    }
    if (
      this.envState[opnum] === FM.egDecay &&
      this.envAttenuation[opnum]! >= this.cacheEgSustain[opnum]!
    ) {
      this.envState[opnum] = FM.egSustain;
    }
    const rate = this.egRate(opnum, this.envState[opnum]!);
    const rateShift = rate >>> 2;
    const envCounter = counter << rateShift;
    if (bitfield(envCounter, 0, 11) !== 0) return;
    const relevantBits = bitfield(envCounter, rateShift <= 11 ? 11 : rateShift, 3);
    const increment = this.attenuationIncrement(rate, relevantBits);
    if (this.envState[opnum] === FM.egAttack) {
      if (rate < 62) {
        this.envAttenuation[opnum] =
          this.envAttenuation[opnum]! + ((~this.envAttenuation[opnum]! * increment) >> 4);
      }
      return;
    }
    if (!this.fm('op_ssg_eg_enable', FM.operatorOffsets[opnum]!)) {
      this.envAttenuation[opnum] = this.envAttenuation[opnum]! + increment;
    } else if (this.envAttenuation[opnum]! < 0x200) {
      this.envAttenuation[opnum] = this.envAttenuation[opnum]! + 4 * increment;
    }
    if (this.envAttenuation[opnum]! >= 0x400) this.envAttenuation[opnum] = 0x3ff;
  }

  /** fm_operator::clock */
  private clockOperator(opnum: number): void {
    if (this.fm('op_ssg_eg_enable', FM.operatorOffsets[opnum]!)) this.clockSsgEgState(opnum);
    else this.ssgInverted[opnum] = 0;
    if (bitfield(this.envCounter, 0, 2) === 0) this.clockEnvelope(opnum, this.envCounter >>> 2);
    this.phase[opnum] = (this.phase[opnum]! + this.cachePhaseStep[opnum]!) >>> 0;
  }

  /** fm_operator::envelope_attenuation (OPN leaves eg_shift at zero). */
  private envelopeAttenuation(opnum: number): number {
    let result = this.envAttenuation[opnum]!;
    if (this.ssgInverted[opnum]) result = (0x200 - result) & 0x3ff;
    result += this.cacheTotalLevel[opnum]!;
    return Math.min(result, 0x3ff);
  }

  /** fm_operator::compute_volume */
  private computeVolume(opnum: number, phase: number): number {
    if (this.envAttenuation[opnum]! > FM.egQuiet) return 0;
    const sinAttenuation = this.waveform[phase & (FM.waveformLength - 1)]!;
    const envAttenuation = this.envelopeAttenuation(opnum) << 2;
    const result = this.attenuationToVolume((sinAttenuation & 0x7fff) + envAttenuation);
    return bitfield(sinAttenuation, 15) ? -result : result;
  }

  /**
   * fm_channel::output_4op - every OPN channel is four-operator, so all eight
   * algorithms route through the lowered s_algorithm_ops table.
   */
  private outputChannel(chnum: number, rshift: number, clipmax: number): number {
    const choffs = FM.channelOffsets[chnum]!;
    const ops = FM.operatorMap[chnum]!;
    let opmod = 0;
    const feedback = this.fm('ch_feedback', choffs);
    if (feedback !== 0) {
      opmod = (this.feedback0[chnum]! + this.feedback1[chnum]!) >> (10 - feedback);
    }
    const op1value = this.computeVolume(ops[0]!, (this.phase[ops[0]!]! >>> 10) + opmod);
    this.feedbackIn[chnum] = op1value;

    const algorithmOps = FM.algorithmOps[this.fm('ch_algorithm', choffs)]!;
    const opout = [0, op1value, 0, 0, 0, 0, 0, 0];

    opmod = opout[bitfield(algorithmOps, 0, 1)]! >> 1;
    opout[2] = this.computeVolume(ops[1]!, (this.phase[ops[1]!]! >>> 10) + opmod);
    opout[5] = int16(opout[1]! + opout[2]!);

    opmod = opout[bitfield(algorithmOps, 1, 3)]! >> 1;
    opout[3] = this.computeVolume(ops[2]!, (this.phase[ops[2]!]! >>> 10) + opmod);
    opout[6] = int16(opout[1]! + opout[3]!);
    opout[7] = int16(opout[2]! + opout[3]!);

    opmod = opout[bitfield(algorithmOps, 4, 3)]! >> 1;
    let result = this.computeVolume(ops[3]!, (this.phase[ops[3]!]! >>> 10) + opmod);
    result >>= rshift;

    const clipmin = -clipmax - 1;
    for (let index = 1; index <= 3; index++) {
      if (bitfield(algorithmOps, 6 + index, 1)) {
        result = clamp(result + (opout[index]! >> rshift), clipmin, clipmax);
      }
    }
    return clamp(result, clipmin, clipmax);
  }

  /** ym2203::clock_fm */
  private clockFm(): void {
    if (this.modifiedChannels !== 0 || this.prepareCount++ >= 4096) {
      this.activeChannels = 0;
      for (let chnum = 0; chnum < FM.channels; chnum++) {
        let active = 0;
        for (const opnum of FM.operatorMap[chnum]!) {
          if (this.prepareOperator(opnum)) active = 1;
        }
        if (active) this.activeChannels |= 1 << chnum;
      }
      this.modifiedChannels = 0;
      this.prepareCount = 0;
    }
    // OPN's envelope clock divider wraps the low two bits of the counter.
    if (FM.egClockDivider === 1) this.envCounter += 4;
    else if (bitfield(++this.envCounter, 0, 2) === FM.egClockDivider) {
      this.envCounter += 4 - FM.egClockDivider;
    }
    for (let chnum = 0; chnum < FM.channels; chnum++) {
      this.feedback0[chnum] = this.feedback1[chnum]!;
      this.feedback1[chnum] = this.feedbackIn[chnum]!;
      for (const opnum of FM.operatorMap[chnum]!) this.clockOperator(opnum);
    }
    let sum = 0;
    for (let chnum = 0; chnum < FM.channels; chnum++) {
      if (bitfield(this.activeChannels, chnum)) sum += this.outputChannel(chnum, 0, 32767);
    }
    // OPN is full 14-bit with no intermediate clipping, then a DAC round trip.
    this.lastFm = roundtripFp(clamp(sum, -32768, 32767));
  }

  /** ssg_engine::clock */
  private clockSsg(): void {
    for (let chan = 0; chan < SSG.channels; chan++) {
      this.toneCount[chan] = this.toneCount[chan]! + 1;
      if (this.toneCount[chan]! >= this.ssg('ch_tone_period', chan)) {
        this.toneState[chan] ^= 1;
        this.toneCount[chan] = 0;
      }
    }
    this.noiseCount++;
    if ((this.noiseCount >>> 1) >= this.ssg('noise_period') && this.noiseCount !== 1) {
      const feedback = bitfield(this.noiseState, SSG.noiseTaps[0]) ^
        bitfield(this.noiseState, SSG.noiseTaps[1]);
      this.noiseState = (this.noiseState ^ (feedback << SSG.noiseFeedbackShift)) >>> 1;
      this.noiseCount = 0;
    }
    this.envelopeCount++;
    if (this.envelopeCount >= this.ssg('envelope_period')) {
      this.envelopeState++;
      this.envelopeCount = 0;
    }
  }

  /** ssg_engine::output */
  private outputSsg(): void {
    let envelopeVolume: number;
    const hold = this.ssg('envelope_hold');
    const alternate = this.ssg('envelope_alternate');
    const attackBit = this.ssg('envelope_attack');
    const cont = this.ssg('envelope_continue');
    if ((hold | (cont ^ 1)) && this.envelopeState >= 32) {
      this.envelopeState = 32;
      envelopeVolume = ((attackBit ^ alternate) & cont) ? 31 : 0;
    } else {
      let attack = attackBit;
      if (alternate) attack ^= bitfield(this.envelopeState, 5);
      envelopeVolume = (this.envelopeState & 31) ^ (attack ? 0 : 31);
    }
    for (let chan = 0; chan < SSG.channels; chan++) {
      const noiseOn = this.ssg('ch_noise_enable_n', chan) | (this.noiseState & 1);
      const toneOn = this.ssg('ch_tone_enable_n', chan) | this.toneState[chan]!;
      let volume: number;
      if ((noiseOn & toneOn) === 0) volume = 0;
      else if (this.ssg('ch_envelope_enable', chan)) volume = envelopeVolume;
      else {
        volume = this.ssg('ch_amplitude', chan) * 2;
        if (volume !== 0) volume |= 1;
      }
      this.ssgLast[chan] = SSG.amplitudes[volume]!;
    }
  }

  /**
   * ym2203::generate for one chip sample. Returns the four MAME stream
   * outputs, which ymfm_ssg_device_base rotates to [SSG0, SSG1, SSG2, FM].
   */
  generate(output: Int32Array): void {
    if (this.sampleIndex % this.fmSamplesPerOutput === 0) this.clockFm();
    const fm = this.lastFm;

    const [outSamples, srcSamples] = this.ssgResample;
    const sums = [0, 0, 0];
    if (outSamples === 4 && srcSamples === 3) {
      const step = bitfield(this.sampleIndex, 0, 2);
      for (let chan = 0; chan < SSG.channels; chan++) sums[chan] += this.ssgLast[chan]! * step;
      if (step !== 3) {
        this.clockSsg();
        this.outputSsg();
        for (let chan = 0; chan < SSG.channels; chan++) {
          sums[chan] += this.ssgLast[chan]! * (3 - step);
        }
      }
      for (let chan = 0; chan < SSG.channels; chan++) sums[chan] = (sums[chan]! / 3) | 0;
    } else if (srcSamples === 1) {
      if (this.sampleIndex % outSamples === 0) {
        this.clockSsg();
        this.outputSsg();
      }
      for (let chan = 0; chan < SSG.channels; chan++) sums[chan] = this.ssgLast[chan]!;
    } else {
      for (let rep = 0; rep < srcSamples; rep++) {
        this.clockSsg();
        this.outputSsg();
        for (let chan = 0; chan < SSG.channels; chan++) sums[chan] += this.ssgLast[chan]!;
      }
      for (let chan = 0; chan < SSG.channels; chan++) {
        sums[chan] = (sums[chan]! / srcSamples) | 0;
      }
    }
    this.sampleIndex++;

    if (this.adpcmA && this.adpcmClock++ % ADPCM_A.clockDivider === 0) {
      this.adpcmLast = this.adpcmA.clock();
    }

    output[0] = sums[0]!;
    output[1] = sums[1]!;
    output[2] = sums[2]!;
    output[3] = fm + this.adpcmLast;
  }
}

/**
 * YM3526 execution core hosted beside the OPN chips. Its topology, register
 * size, operator offsets, multiplier table and native rate are emitted from
 * ymfm. The envelope and phase accumulators run at the browser output rate,
 * while preserving the chip's register-visible two-operator algorithms.
 */
export class GeneratedYm3526Chip {
  private readonly regs: Uint8Array;
  private readonly waveform = new Uint16Array(FM.waveformLength);
  private readonly operatorChannel: Uint8Array;
  private readonly phase: Uint32Array;
  private readonly envAttenuation: Uint16Array;
  private readonly envelopeState: Uint8Array;
  private readonly keyState: Uint8Array;
  private readonly feedback1: Int32Array;
  private readonly feedback2: Int32Array;
  private readonly feedbackIn: Int32Array;
  private readonly clock: number;
  private readonly outputRate: number;
  private address = 0;
  private envCounter = 0;
  private samplePhase = 0;
  private lastSample = 0;

  constructor(clock: number, outputRate: number) {
    const opl = ym3526Plan;
    if (!opl) throw new Error('YM3526 plan was not emitted');
    this.regs = new Uint8Array(opl.registers);
    this.operatorChannel = new Uint8Array(opl.operators);
    this.phase = new Uint32Array(opl.operators);
    this.envAttenuation = new Uint16Array(opl.operators);
    this.envelopeState = new Uint8Array(opl.operators);
    this.keyState = new Uint8Array(opl.operators);
    this.feedback1 = new Int32Array(opl.channels);
    this.feedback2 = new Int32Array(opl.channels);
    this.feedbackIn = new Int32Array(opl.channels);
    this.clock = clock;
    this.outputRate = outputRate;
    // Revision 1 has one waveform. Build it from the same die-extracted table
    // and logarithmic DAC representation used by ymfm's OPN implementation.
    for (let index = 0; index < FM.waveformLength; index++) {
      this.waveform[index] =
        FM.sinTable[(bitfield(index, 8) ? ~index : index) & 0xff]! |
        (bitfield(index, 9) << 15);
    }
    for (let channel = 0; channel < opl.channels; channel++) {
      for (const operator of opl.operatorMap[channel]!) {
        this.operatorChannel[operator] = channel;
      }
    }
    this.reset();
  }

  reset(): void {
    this.regs.fill(0);
    this.phase.fill(0);
    this.envAttenuation.fill(0x3ff);
    this.envelopeState.fill(FM.egRelease);
    this.keyState.fill(0);
    this.feedback1.fill(0);
    this.feedback2.fill(0);
    this.feedbackIn.fill(0);
    this.address = 0;
    this.envCounter = 0;
    this.samplePhase = 0;
    this.lastSample = 0;
  }

  write(port: number, data: number): void {
    if ((port & 1) === 0) this.address = data & 0xff;
    else this.regs[this.address] = data & 0xff;
  }

  sample(): number {
    const opl = ym3526Plan!;
    // YM3526 emits one native sample per prescale*operators input clocks.
    // Clock at that rate and hold between native samples; driving its envelope
    // directly at AudioContext rate changes every decay/release time.
    this.samplePhase += this.clock / opl.sampleRateDivider / this.outputRate;
    while (this.samplePhase >= 1) {
      this.lastSample = this.clockChip();
      this.samplePhase--;
    }
    return this.lastSample;
  }

  private clockChip(): number {
    const opl = ym3526Plan!;
    let total = 0;
    this.envCounter = (this.envCounter + 4) >>> 0;
    for (let channel = 0; channel < opl.channels; channel++) {
      const [modulator, carrier] = opl.operatorMap[channel]!;
      const keyRegister = this.regs[0xb0 + channel]!;
      const keyOn = (keyRegister & 0x20) !== 0;
      const blockFreq = ((keyRegister & 0x1f) << 8) | this.regs[0xa0 + channel]!;
      this.updateKey(modulator, keyOn, blockFreq);
      this.updateKey(carrier, keyOn, blockFreq);
      this.clockEnvelope(modulator, blockFreq);
      this.clockEnvelope(carrier, blockFreq);
      this.clockPhase(modulator, blockFreq);
      this.clockPhase(carrier, blockFreq);

      // ymfm clocks the two feedback samples before producing this sample.
      this.feedback2[channel] = this.feedback1[channel]!;
      this.feedback1[channel] = this.feedbackIn[channel]!;
      const algorithm = this.regs[0xc0 + channel]!;
      const feedback = (algorithm >>> 1) & 7;
      const feedbackInput = feedback === 0
        ? 0
        : (this.feedback1[channel]! + this.feedback2[channel]!) >> (10 - feedback);
      const mod = this.operatorSample(modulator, feedbackInput);
      this.feedbackIn[channel] = mod;

      // Revision 1 uses the previous modulator sample for carrier modulation
      // and shifts each channel by one before summing to its external DAC.
      const carrierInput = (algorithm & 1) !== 0 ? 0 : this.feedback1[channel]! >> 1;
      let voice = this.operatorSample(carrier, carrierInput) >> 1;
      if ((algorithm & 1) !== 0) {
        voice = clamp(voice + (this.feedback1[channel]! >> 1), -32768, 32767);
      }
      total += voice;
    }
    // YM3014 mantissa/exponent truncation, matching ym3526::generate.
    return roundtripFp(total) / 32768;
  }

  private updateKey(operator: number, on: boolean, blockFreq: number): void {
    if (on && this.keyState[operator] === 0) {
      this.keyState[operator] = 1;
      this.envelopeState[operator] = FM.egAttack;
      this.phase[operator] = 0;
      if (this.envelopeRate(operator, FM.egAttack, blockFreq) >= 62) {
        this.envAttenuation[operator] = 0;
      }
    } else if (!on && this.keyState[operator] !== 0) {
      this.keyState[operator] = 0;
      this.envelopeState[operator] = FM.egRelease;
    }
  }

  private envelopeRate(operator: number, state: number, blockFreq = 0): number {
    const opl = ym3526Plan!;
    const offset = opl.operatorOffsets[operator]!;
    const characteristics = this.regs[0x20 + offset]!;
    const rates = this.regs[0x60 + offset]!;
    const sustainRelease = this.regs[0x80 + offset]!;
    const block = bitfield(blockFreq, 10, 3);
    const keycode = (block << 1) |
      bitfield(blockFreq, 9 - bitfield(this.regs[0x08]!, 6), 1);
    const ksr = keycode >>> (2 * (bitfield(characteristics, 4) ^ 1));
    const raw = state === FM.egAttack
      ? bitfield(rates, 4, 4) * 4
      : state === FM.egDecay
        ? bitfield(rates, 0, 4) * 4
        : state === FM.egSustain && bitfield(characteristics, 5)
          ? 0
          : bitfield(sustainRelease, 0, 4) * 4;
    return raw === 0 ? 0 : Math.min(raw + ksr, 63);
  }

  private clockEnvelope(operator: number, blockFreq: number): void {
    const opl = ym3526Plan!;
    const offset = opl.operatorOffsets[operator]!;
    const state = this.envelopeState[operator]!;
    if (state === FM.egAttack && this.envAttenuation[operator] === 0) {
      this.envelopeState[operator] = FM.egDecay;
    }
    const sustainRelease = this.regs[0x80 + offset]!;
    let sustain = bitfield(sustainRelease, 4, 4);
    sustain |= (sustain + 1) & 0x10;
    if (
      this.envelopeState[operator] === FM.egDecay &&
      this.envAttenuation[operator]! >= sustain << 5
    ) {
      this.envelopeState[operator] = FM.egSustain;
    }

    const current = this.envelopeState[operator]!;
    const rate = this.envelopeRate(operator, current, blockFreq);
    const rateShift = rate >>> 2;
    const shiftedCounter = ((this.envCounter >>> 2) << rateShift) >>> 0;
    if ((shiftedCounter & 0x7ff) !== 0) return;
    const relevantShift = rateShift <= 11 ? 11 : rateShift;
    const relevantBits = (shiftedCounter >>> relevantShift) & 7;
    const packed = FM.incrementTable[rate]!;
    const increment = (packed >>> (4 * relevantBits)) & 0x0f;
    if (current === FM.egAttack) {
      if (rate < 62) {
        this.envAttenuation[operator] +=
          (~this.envAttenuation[operator]! * increment) >> 4;
      }
    } else {
      this.envAttenuation[operator] += increment;
      if (this.envAttenuation[operator]! >= 0x400) {
        this.envAttenuation[operator] = 0x3ff;
      }
    }
  }

  private clockPhase(operator: number, blockFreq: number): void {
    const opl = ym3526Plan!;
    const offset = opl.operatorOffsets[operator]!;
    const multiple = opl.multiples[this.regs[0x20 + offset]! & 0x0f]! * 2;
    const fnum = (blockFreq & 0x3ff) << 2;
    const block = bitfield(blockFreq, 10, 3);
    const step = (((fnum << block) >>> 2) * multiple) >>> 1;
    this.phase[operator] = (this.phase[operator]! + step) >>> 0;
  }

  private operatorSample(operator: number, modulation: number): number {
    const opl = ym3526Plan!;
    const offset = opl.operatorOffsets[operator]!;
    if (this.envAttenuation[operator]! > FM.egQuiet) return 0;
    const waveformIndex = ((this.phase[operator]! >>> 10) + Math.trunc(modulation)) &
      (opl.waveformLength - 1);
    const sinAttenuation = this.waveform[waveformIndex]!;
    const level = this.regs[0x40 + offset]!;
    let totalLevel = (level & 0x3f) << 3;
    const kslBits = level >>> 6;
    const ksl = ((kslBits >>> 1) | ((kslBits & 1) << 1));
    if (ksl !== 0) {
      const channel = this.operatorChannel[operator]!;
      const keyRegister = this.regs[0xb0 + channel]!;
      const blockFreq = ((keyRegister & 0x1f) << 8) | this.regs[0xa0 + channel]!;
      const table = [0, 24, 32, 37, 40, 43, 45, 47, 48, 50, 51, 52, 53, 54, 55, 56];
      const attenuation = Math.max(
        0,
        table[bitfield(blockFreq, 6, 4)]! - 8 * (bitfield(blockFreq, 10, 3) ^ 7),
      );
      totalLevel += attenuation << ksl;
    }
    const env = Math.min(this.envAttenuation[operator]! + totalLevel, 0x3ff) << 2;
    const attenuation = (sinAttenuation & 0x7fff) + env;
    const linear = FM.powerTable[attenuation & 0xff]! >>> (attenuation >>> 8);
    return bitfield(sinAttenuation, 15) ? -linear : linear;
  }
}

export class GeneratedMsm5205Core {
  private data = 0;
  private resetLine = false;
  private bitwidth = 4;
  private modeValue = 4;
  private signal = 0;
  private step = 0;

  constructor(initialMode?: string) {
    if (!msmPlan) throw new Error('MSM5205 plan was not emitted');
    const mode = initialMode ? msmPlan.modes[initialMode] : undefined;
    if (mode !== undefined) this.playmode(mode);
  }

  write(method: string, data: number): void {
    if (method === 'data_w') {
      this.data = this.bitwidth === 4 ? data & 0x0f : (data & 0x07) << 1;
    } else if (method === 'reset_w') {
      this.resetLine = data !== 0;
    } else if (method === 'playmode_w') {
      this.playmode(data);
    } else if (method === 's1_w') {
      this.playmode((this.modeValue & ~1) | (data ? 1 : 0));
    } else if (method === 's2_w') {
      this.playmode((this.modeValue & ~2) | (data ? 2 : 0));
    } else if ((method === 'vck' || method === 'vclk_w') && data) {
      this.clock();
    }
  }

  sample(): number {
    if (!msmPlan) return 0;
    const mask = msmPlan.dacBits >= 12 ? 0 : (1 << (12 - msmPlan.dacBits)) - 1;
    return (this.signal & ~mask) * msmPlan.sampleScale;
  }

  private playmode(data: number): void {
    this.modeValue = data & 7;
    this.bitwidth = data & 4 ? 4 : 3;
  }

  private clock(): void {
    if (!msmPlan) return;
    if (this.resetLine) {
      this.signal = 0;
      this.step = 0;
      return;
    }
    const value = this.data & 15;
    this.signal = Math.max(
      msmPlan.minimumSignal,
      Math.min(
        msmPlan.maximumSignal,
        this.signal + msmPlan.diffLookup[this.step * 16 + value]!,
      ),
    );
    this.step = Math.max(
      0,
      Math.min(msmPlan.maximumStep, this.step + msmPlan.indexShift[value & 7]!),
    );
  }
}

/**
 * Hosts the machine's YM2203 bank, resampling each chip's native ymfm rate to
 * the host output rate and mixing the driver's add_route gains.
 */
export class GeneratedYm2203Mixer {
  private readonly chips: GeneratedYm2203Chip[];
  private readonly oplChips: GeneratedYm3526Chip[];
  private readonly oplGains: number[];
  private readonly msmChips: {
    deviceTag: string;
    gain: number;
    core: GeneratedMsm5205Core;
  }[];
  private readonly msmWrites = new Map<string, {
    core: GeneratedMsm5205Core;
    method: string;
  }>();
  private readonly routes: GeneratedYmRoute[];
  private readonly chipRate: number;
  private readonly outputRate: number;
  private readonly scratch = new Int32Array(4);
  private readonly held: Int32Array[];
  private phase = 0;
  private lastSample = 0;
  private readonly portsPerChip: number;

  constructor(
    clock: number,
    chips: number,
    outputRate: number,
    routes?: GeneratedYmRoute[],
    auxiliaryDevices?: GeneratedAuxiliaryAudioDevice[],
    deviceType = 'YM2203',
    sampleRom?: Uint8Array,
  ) {
    this.chips = Array.from(
      { length: Math.max(0, chips) },
      () => new GeneratedYm2203Chip(deviceType, sampleRom),
    );
    const oplDevices = (auxiliaryDevices ?? []).filter(device => device.type === 'YM3526');
    this.oplChips = oplDevices.map(device =>
      new GeneratedYm3526Chip(device.clock, outputRate));
    this.oplGains = oplDevices.map(device => device.gain);
    const msmDevices = (auxiliaryDevices ?? []).filter(device => device.type === 'MSM5205');
    this.msmChips = msmPlan ? msmDevices.map(device => ({
      deviceTag: device.deviceTag,
      gain: device.gain,
      core: new GeneratedMsm5205Core(device.initialMode),
    })) : [];
    for (const device of this.msmChips) {
      const definition = msmDevices.find(candidate => candidate.deviceTag === device.deviceTag);
      for (const method of new Set([...(definition?.writeMethods ?? []), 'vck', 'vclk_w'])) {
        this.msmWrites.set(device.deviceTag + '.' + method, { core: device.core, method });
      }
    }
    this.chipRate = clock / plan.sampleRateDivider;
    this.portsPerChip = deviceType === 'YM2610' ? 4 : 2;
    this.outputRate = outputRate;
    this.held = this.chips.map(() => new Int32Array(4));
    this.routes = routes?.length
      ? routes
      : this.chips.flatMap((_chip, chip) =>
          [0, 1, 2, 3].map(channel => ({ chip, channel, gain: 1, target: 'mono' })));
  }

  /** Register writes arrive as chip * port-count + port. */
  write(offset: number, data: number, method?: string): void {
    const msm = this.msmWrites.get(method ?? '');
    if (msm) {
      msm.core.write(msm.method, data);
      return;
    }
    const primaryPorts = this.chips.length * this.portsPerChip;
    if (offset >= primaryPorts) {
      const opl = Math.floor((offset - primaryPorts) / 2);
      if (method === 'reset') this.oplChips[opl]?.reset();
      else this.oplChips[opl]?.write((offset - primaryPorts) & 1, data);
      return;
    }
    const chip = Math.floor(offset / this.portsPerChip);
    if (method === 'reset') {
      this.chips[chip]?.reset();
      return;
    }
    this.chips[chip]?.write(offset % this.portsPerChip, data);
  }

  /**
   * One host sample. The chip runs far above the browser output rate, so every
   * chip sample generated for this output sample is averaged rather than point
   * sampled; decimating by picking one sample would alias the SSG, which clocks
   * at nearly twice the output rate.
   */
  sample(): number {
    this.phase += this.chipRate / this.outputRate;
    let steps = Math.floor(this.phase);
    this.phase -= steps;
    // Never let a long pause collapse into an unbounded catch-up burst.
    if (steps > 64) steps = 64;
    let accumulated = 0;
    for (let step = 0; step < steps; step++) {
      for (let chip = 0; chip < this.chips.length; chip++) {
        this.chips[chip]!.generate(this.scratch);
        this.held[chip]!.set(this.scratch);
      }
      accumulated += this.routedTotal();
    }
    this.lastSample = steps > 0 ? accumulated / steps : this.lastSample;
    let output = this.lastSample / 32768;
    for (let chip = 0; chip < this.oplChips.length; chip++) {
      output += this.oplChips[chip]!.sample() * this.oplGains[chip]!;
    }
    for (const device of this.msmChips) output += device.core.sample() * device.gain;
    return Math.max(-1, Math.min(1, output));
  }

  private routedTotal(): number {
    let total = 0;
    for (const route of this.routes) {
      const chip = this.held[route.chip];
      if (!chip) continue;
      total += (chip[route.channel] ?? 0) * route.gain;
    }
    return total;
  }
}

export class GeneratedYm2203FrameRenderer {
  private sampleCarry = 0;
  private readonly mixer: GeneratedYm2203Mixer;
  private readonly outputRate: number;
  private readonly refresh: number;
  private writes: readonly GeneratedYmWrite[] = [];
  private writeIndex = 0;
  private count = 0;
  private cursor = 0;
  private active = false;

  constructor(mixer: GeneratedYm2203Mixer, outputRate: number, refresh: number) {
    this.mixer = mixer;
    this.outputRate = outputRate;
    this.refresh = refresh;
  }

  begin(writes: readonly GeneratedYmWrite[]): number {
    // Complete end-of-frame writes before accepting another frame. This is
    // normally done by nextSample(); keeping it here also makes the renderer
    // safe for direct probe use.
    this.finish();
    this.sampleCarry += this.outputRate / this.refresh;
    this.count = Math.floor(this.sampleCarry);
    this.sampleCarry -= this.count;
    this.writes = writes;
    this.writeIndex = 0;
    this.cursor = 0;
    this.active = true;
    return this.count;
  }

  nextSample(): number | undefined {
    if (!this.active) return undefined;
    if (this.cursor >= this.count) {
      this.finish();
      return undefined;
    }
    while (this.writeIndex < this.writes.length) {
      const write = this.writes[this.writeIndex]!;
      const at = Math.ceil(
        Math.max(0, Math.min(1, write.frac ?? 0)) * this.count,
      );
      if (at > this.cursor) break;
      this.mixer.write(write.offset, write.data, write.method);
      this.writeIndex++;
    }
    this.cursor++;
    return this.mixer.sample();
  }

  render(writes: readonly GeneratedYmWrite[]): Float32Array {
    const output = new Float32Array(this.begin(writes));
    for (let index = 0; index < output.length; index++) {
      output[index] = this.nextSample() ?? 0;
    }
    // Writes exactly at the end of the frame still affect the next frame.
    this.nextSample();
    return output;
  }

  private finish(): void {
    if (!this.active) return;
    while (this.writeIndex < this.writes.length) {
      const write = this.writes[this.writeIndex++]!;
      this.mixer.write(write.offset, write.data, write.method);
    }
    this.active = false;
  }
}

declare const sampleRate: number;
declare class AudioWorkletProcessor {
  readonly port: MessagePort;
  constructor();
}
declare function registerProcessor(
  name: string,
  processorCtor: new () => AudioWorkletProcessor,
): void;

class GeneratedYm2203Processor extends AudioWorkletProcessor {
  private mixer?: GeneratedYm2203Mixer;
  private renderer?: GeneratedYm2203FrameRenderer;
  private readonly frames: GeneratedYmWrite[][] = [];

  constructor() {
    super();
    this.port.onmessage = (event: MessageEvent) => {
      const message = event.data as {
        type: string;
        deviceType?: string;
        clock?: number;
        chips?: number;
        routes?: GeneratedYmRoute[];
        auxiliaryDevices?: GeneratedAuxiliaryAudioDevice[];
        sampleRom?: Uint8Array;
        refresh?: number;
        offset?: number;
        data?: number;
        method?: string;
        writes?: GeneratedYmWrite[];
      };
      if (message.type === 'init') {
        this.mixer = new GeneratedYm2203Mixer(
          message.clock ?? 1_500_000,
          message.chips ?? 1,
          sampleRate,
          message.routes,
          message.auxiliaryDevices,
          message.deviceType,
          message.sampleRom,
        );
        this.renderer = new GeneratedYm2203FrameRenderer(
          this.mixer,
          sampleRate,
          message.refresh ?? 60,
        );
      } else if (message.type === 'write') {
        this.mixer?.write(message.offset ?? 0, message.data ?? 0, message.method);
      } else if (message.type === 'batch') {
        this.frames.push(message.writes ?? []);
      }
    };
  }

  private nextSample(): number {
    while (this.renderer) {
      const sample = this.renderer.nextSample();
      if (sample !== undefined) return sample;
      const writes = this.frames.shift();
      if (!writes) return 0;
      this.renderer.begin(writes);
    }
    return 0;
  }

  process(_inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
    const channels = outputs[0];
    const output = channels?.[0];
    if (!output) return true;
    for (let index = 0; index < output.length; index++) {
      output[index] = this.nextSample();
    }
    for (let channel = 1; channel < (channels?.length ?? 0); channel++) {
      channels![channel]!.set(output);
    }
    return true;
  }
}

registerProcessor('ym2203', GeneratedYm2203Processor);
