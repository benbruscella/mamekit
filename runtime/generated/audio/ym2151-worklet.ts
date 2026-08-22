// GENERATED from 3rdparty/ymfm/src/ymfm_opm.cpp:523; do not edit.
// The OPM FM engine, register bitfield map, die-extracted sine, power,
// envelope-increment, detune and key-code phase-step tables are all lowered
// from MAME's bundled ymfm implementation.
const plan = {
  "schemaVersion": 1,
  "type": "YM2151",
  "className": "ym2151_device",
  "channels": 8,
  "operators": 32,
  "registers": 256,
  "sampleRateDivider": 64,
  "egClockDivider": 3,
  "egQuiet": 896,
  "egAttack": 1,
  "egDecay": 2,
  "egSustain": 3,
  "egRelease": 4,
  "waveformLength": 1024,
  "lfoWaveformLength": 256,
  "operatorMap": [
    [
      0,
      16,
      8,
      24
    ],
    [
      1,
      17,
      9,
      25
    ],
    [
      2,
      18,
      10,
      26
    ],
    [
      3,
      19,
      11,
      27
    ],
    [
      4,
      20,
      12,
      28
    ],
    [
      5,
      21,
      13,
      29
    ],
    [
      6,
      22,
      14,
      30
    ],
    [
      7,
      23,
      15,
      31
    ]
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
  "phaseStepTable": [
    41568,
    41600,
    41632,
    41664,
    41696,
    41728,
    41760,
    41792,
    41856,
    41888,
    41920,
    41952,
    42016,
    42048,
    42080,
    42112,
    42176,
    42208,
    42240,
    42272,
    42304,
    42336,
    42368,
    42400,
    42464,
    42496,
    42528,
    42560,
    42624,
    42656,
    42688,
    42720,
    42784,
    42816,
    42848,
    42880,
    42912,
    42944,
    42976,
    43008,
    43072,
    43104,
    43136,
    43168,
    43232,
    43264,
    43296,
    43328,
    43392,
    43424,
    43456,
    43488,
    43552,
    43584,
    43616,
    43648,
    43712,
    43744,
    43776,
    43808,
    43872,
    43904,
    43936,
    43968,
    44032,
    44064,
    44096,
    44128,
    44192,
    44224,
    44256,
    44288,
    44352,
    44384,
    44416,
    44448,
    44512,
    44544,
    44576,
    44608,
    44672,
    44704,
    44736,
    44768,
    44832,
    44864,
    44896,
    44928,
    44992,
    45024,
    45056,
    45088,
    45152,
    45184,
    45216,
    45248,
    45312,
    45344,
    45376,
    45408,
    45472,
    45504,
    45536,
    45568,
    45632,
    45664,
    45728,
    45760,
    45792,
    45824,
    45888,
    45920,
    45984,
    46016,
    46048,
    46080,
    46144,
    46176,
    46208,
    46240,
    46304,
    46336,
    46368,
    46400,
    46464,
    46496,
    46528,
    46560,
    46656,
    46688,
    46720,
    46752,
    46816,
    46848,
    46880,
    46912,
    46976,
    47008,
    47072,
    47104,
    47136,
    47168,
    47232,
    47264,
    47328,
    47360,
    47392,
    47424,
    47488,
    47520,
    47552,
    47584,
    47648,
    47680,
    47744,
    47776,
    47808,
    47840,
    47904,
    47936,
    48032,
    48064,
    48096,
    48128,
    48192,
    48224,
    48288,
    48320,
    48384,
    48416,
    48448,
    48480,
    48544,
    48576,
    48640,
    48672,
    48736,
    48768,
    48800,
    48832,
    48896,
    48928,
    48992,
    49024,
    49088,
    49120,
    49152,
    49184,
    49248,
    49280,
    49344,
    49376,
    49440,
    49472,
    49504,
    49536,
    49600,
    49632,
    49696,
    49728,
    49792,
    49824,
    49856,
    49888,
    49952,
    49984,
    50048,
    50080,
    50144,
    50176,
    50208,
    50240,
    50304,
    50336,
    50400,
    50432,
    50496,
    50528,
    50560,
    50592,
    50656,
    50688,
    50752,
    50784,
    50880,
    50912,
    50944,
    50976,
    51040,
    51072,
    51136,
    51168,
    51232,
    51264,
    51328,
    51360,
    51424,
    51456,
    51488,
    51520,
    51616,
    51648,
    51680,
    51712,
    51776,
    51808,
    51872,
    51904,
    51968,
    52000,
    52064,
    52096,
    52160,
    52192,
    52224,
    52256,
    52384,
    52416,
    52448,
    52480,
    52544,
    52576,
    52640,
    52672,
    52736,
    52768,
    52832,
    52864,
    52928,
    52960,
    52992,
    53024,
    53120,
    53152,
    53216,
    53248,
    53312,
    53344,
    53408,
    53440,
    53504,
    53536,
    53600,
    53632,
    53696,
    53728,
    53792,
    53824,
    53920,
    53952,
    54016,
    54048,
    54112,
    54144,
    54208,
    54240,
    54304,
    54336,
    54400,
    54432,
    54496,
    54528,
    54592,
    54624,
    54688,
    54720,
    54784,
    54816,
    54880,
    54912,
    54976,
    55008,
    55072,
    55104,
    55168,
    55200,
    55264,
    55296,
    55360,
    55392,
    55488,
    55520,
    55584,
    55616,
    55680,
    55712,
    55776,
    55808,
    55872,
    55936,
    55968,
    56032,
    56064,
    56128,
    56160,
    56224,
    56288,
    56320,
    56384,
    56416,
    56480,
    56512,
    56576,
    56608,
    56672,
    56736,
    56768,
    56832,
    56864,
    56928,
    56960,
    57024,
    57120,
    57152,
    57216,
    57248,
    57312,
    57376,
    57408,
    57472,
    57536,
    57568,
    57632,
    57664,
    57728,
    57792,
    57824,
    57888,
    57952,
    57984,
    58048,
    58080,
    58144,
    58208,
    58240,
    58304,
    58368,
    58400,
    58464,
    58496,
    58560,
    58624,
    58656,
    58720,
    58784,
    58816,
    58880,
    58912,
    58976,
    59040,
    59072,
    59136,
    59200,
    59232,
    59296,
    59328,
    59392,
    59456,
    59488,
    59552,
    59648,
    59680,
    59744,
    59776,
    59840,
    59904,
    59936,
    60000,
    60064,
    60128,
    60160,
    60224,
    60288,
    60320,
    60384,
    60416,
    60512,
    60544,
    60608,
    60640,
    60704,
    60768,
    60800,
    60864,
    60928,
    60992,
    61024,
    61088,
    61152,
    61184,
    61248,
    61280,
    61376,
    61408,
    61472,
    61536,
    61600,
    61632,
    61696,
    61760,
    61824,
    61856,
    61920,
    61984,
    62048,
    62080,
    62144,
    62208,
    62272,
    62304,
    62368,
    62432,
    62496,
    62528,
    62592,
    62656,
    62720,
    62752,
    62816,
    62880,
    62944,
    62976,
    63040,
    63104,
    63200,
    63232,
    63296,
    63360,
    63424,
    63456,
    63520,
    63584,
    63648,
    63680,
    63744,
    63808,
    63872,
    63904,
    63968,
    64032,
    64096,
    64128,
    64192,
    64256,
    64320,
    64352,
    64416,
    64480,
    64544,
    64608,
    64672,
    64704,
    64768,
    64832,
    64896,
    64928,
    65024,
    65056,
    65120,
    65184,
    65248,
    65312,
    65376,
    65408,
    65504,
    65536,
    65600,
    65664,
    65728,
    65792,
    65856,
    65888,
    65984,
    66016,
    66080,
    66144,
    66208,
    66272,
    66336,
    66368,
    66464,
    66496,
    66560,
    66624,
    66688,
    66752,
    66816,
    66848,
    66944,
    66976,
    67040,
    67104,
    67168,
    67232,
    67296,
    67328,
    67424,
    67456,
    67520,
    67584,
    67648,
    67712,
    67776,
    67808,
    67904,
    67936,
    68000,
    68064,
    68128,
    68192,
    68256,
    68288,
    68384,
    68448,
    68512,
    68544,
    68640,
    68672,
    68736,
    68800,
    68896,
    68928,
    68992,
    69056,
    69120,
    69184,
    69248,
    69280,
    69376,
    69440,
    69504,
    69536,
    69632,
    69664,
    69728,
    69792,
    69920,
    69952,
    70016,
    70080,
    70144,
    70208,
    70272,
    70304,
    70400,
    70464,
    70528,
    70560,
    70656,
    70688,
    70752,
    70816,
    70912,
    70976,
    71040,
    71104,
    71136,
    71232,
    71264,
    71360,
    71424,
    71488,
    71552,
    71616,
    71648,
    71744,
    71776,
    71872,
    71968,
    72032,
    72096,
    72160,
    72192,
    72288,
    72320,
    72416,
    72480,
    72544,
    72608,
    72672,
    72704,
    72800,
    72832,
    72928,
    72992,
    73056,
    73120,
    73184,
    73216,
    73312,
    73344,
    73440,
    73504,
    73568,
    73632,
    73696,
    73728,
    73824,
    73856,
    73952,
    74080,
    74144,
    74208,
    74272,
    74304,
    74400,
    74432,
    74528,
    74592,
    74656,
    74720,
    74784,
    74816,
    74912,
    74944,
    75040,
    75136,
    75200,
    75264,
    75328,
    75360,
    75456,
    75488,
    75584,
    75648,
    75712,
    75776,
    75840,
    75872,
    75968,
    76000,
    76096,
    76224,
    76288,
    76352,
    76416,
    76448,
    76544,
    76576,
    76672,
    76736,
    76800,
    76864,
    76928,
    77024,
    77120,
    77152,
    77248,
    77344,
    77408,
    77472,
    77536,
    77568,
    77664,
    77696,
    77792,
    77856,
    77920,
    77984,
    78048,
    78144,
    78240,
    78272,
    78368,
    78464,
    78528,
    78592,
    78656,
    78688,
    78784,
    78816,
    78912,
    78976,
    79040,
    79104,
    79168,
    79264,
    79360,
    79392,
    79488,
    79616,
    79680,
    79744,
    79808,
    79840,
    79936,
    79968,
    80064,
    80128,
    80192,
    80256,
    80320,
    80416,
    80512,
    80544,
    80640,
    80768,
    80832,
    80896,
    80960,
    80992,
    81088,
    81120,
    81216,
    81280,
    81344,
    81408,
    81472,
    81568,
    81664,
    81696,
    81792,
    81952,
    82016,
    82080,
    82144,
    82176,
    82272,
    82304,
    82400,
    82464,
    82528,
    82592,
    82656,
    82752,
    82848,
    82880,
    82976
  ],
  "detune2Delta": [
    0,
    384,
    500,
    608
  ],
  "fields": {
    "lfo_reset": {
      "parts": [
        {
          "offset": 1,
          "offsetStride": 0,
          "shift": 1,
          "shiftStride": 0,
          "width": 1
        }
      ]
    },
    "noise_frequency": {
      "parts": [
        {
          "offset": 15,
          "offsetStride": 0,
          "shift": 0,
          "shiftStride": 0,
          "width": 5
        }
      ],
      "xor": 31
    },
    "noise_enable": {
      "parts": [
        {
          "offset": 15,
          "offsetStride": 0,
          "shift": 7,
          "shiftStride": 0,
          "width": 1
        }
      ]
    },
    "lfo_rate": {
      "parts": [
        {
          "offset": 24,
          "offsetStride": 0,
          "shift": 0,
          "shiftStride": 0,
          "width": 8
        }
      ]
    },
    "lfo_am_depth": {
      "parts": [
        {
          "offset": 25,
          "offsetStride": 0,
          "shift": 0,
          "shiftStride": 0,
          "width": 7
        }
      ]
    },
    "lfo_pm_depth": {
      "parts": [
        {
          "offset": 26,
          "offsetStride": 0,
          "shift": 0,
          "shiftStride": 0,
          "width": 7
        }
      ]
    },
    "lfo_waveform": {
      "parts": [
        {
          "offset": 27,
          "offsetStride": 0,
          "shift": 0,
          "shiftStride": 0,
          "width": 2
        }
      ]
    },
    "ch_output_0": {
      "parts": [
        {
          "offset": 32,
          "offsetStride": 1,
          "shift": 6,
          "shiftStride": 0,
          "width": 1
        }
      ]
    },
    "ch_output_1": {
      "parts": [
        {
          "offset": 32,
          "offsetStride": 1,
          "shift": 7,
          "shiftStride": 0,
          "width": 1
        }
      ]
    },
    "ch_feedback": {
      "parts": [
        {
          "offset": 32,
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
          "offset": 32,
          "offsetStride": 1,
          "shift": 0,
          "shiftStride": 0,
          "width": 3
        }
      ]
    },
    "ch_block_freq": {
      "parts": [
        {
          "offset": 40,
          "offsetStride": 1,
          "shift": 0,
          "shiftStride": 0,
          "width": 7
        },
        {
          "offset": 48,
          "offsetStride": 1,
          "shift": 2,
          "shiftStride": 0,
          "width": 6
        }
      ]
    },
    "ch_lfo_pm_sens": {
      "parts": [
        {
          "offset": 56,
          "offsetStride": 1,
          "shift": 4,
          "shiftStride": 0,
          "width": 3
        }
      ]
    },
    "ch_lfo_am_sens": {
      "parts": [
        {
          "offset": 56,
          "offsetStride": 1,
          "shift": 0,
          "shiftStride": 0,
          "width": 2
        }
      ]
    },
    "op_detune": {
      "parts": [
        {
          "offset": 64,
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
          "offset": 64,
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
          "offset": 96,
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
          "offset": 128,
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
          "offset": 128,
          "offsetStride": 1,
          "shift": 0,
          "shiftStride": 0,
          "width": 5
        }
      ]
    },
    "op_lfo_am_enable": {
      "parts": [
        {
          "offset": 160,
          "offsetStride": 1,
          "shift": 7,
          "shiftStride": 0,
          "width": 1
        }
      ]
    },
    "op_decay_rate": {
      "parts": [
        {
          "offset": 160,
          "offsetStride": 1,
          "shift": 0,
          "shiftStride": 0,
          "width": 5
        }
      ]
    },
    "op_detune2": {
      "parts": [
        {
          "offset": 192,
          "offsetStride": 1,
          "shift": 6,
          "shiftStride": 0,
          "width": 2
        }
      ]
    },
    "op_sustain_rate": {
      "parts": [
        {
          "offset": 192,
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
          "offset": 224,
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
          "offset": 224,
          "offsetStride": 1,
          "shift": 0,
          "shiftStride": 0,
          "width": 4
        }
      ]
    }
  },
  "sourceFiles": [
    "src/devices/sound/ymopm.cpp",
    "3rdparty/ymfm/src/ymfm.h",
    "3rdparty/ymfm/src/ymfm_fm.h",
    "3rdparty/ymfm/src/ymfm_fm.ipp",
    "3rdparty/ymfm/src/ymfm_opm.h",
    "3rdparty/ymfm/src/ymfm_opm.cpp"
  ],
  "source": {
    "file": "3rdparty/ymfm/src/ymfm_opm.cpp",
    "line": 523
  }
};
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

export interface GeneratedYm2151Write {
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
  xor?: number;
}

const FIELDS = plan.fields as unknown as Record<string, Field>;
const EG_STATES = 4;
const PHASE_STEP_DYNAMIC = 1;

function bitfield(value: number, start: number, length = 1): number {
  return (value >>> start) & ((1 << length) - 1);
}

function clamp(value: number, minimum: number, maximum: number): number {
  return value < minimum ? minimum : value > maximum ? maximum : value;
}

/** ymfm stores intermediate operator outputs in an int16_t array. */
function int16(value: number): number {
  return (value << 16) >> 16;
}

/** ymfm::roundtrip_fp - the YM3012 DAC's 10.3 floating point round trip. */
function roundtripFp(value: number): number {
  if (value < -32768) return -32768;
  if (value > 32767) return 32767;
  const scan = value ^ (value >> 31);
  let exponent = 7 - Math.clz32((scan << 17) >>> 0);
  if (exponent < 1) exponent = 1;
  exponent -= 1;
  return value & ~((1 << exponent) - 1);
}

/** ymfm's OPM chip: eight four-operator FM channels plus noise and LFO. */
export class GeneratedYm2151Chip {
  private readonly regs = new Uint8Array(plan.registers);
  private readonly waveform = new Uint16Array(plan.waveformLength);
  private readonly lfoWaveform = [
    new Int16Array(plan.lfoWaveformLength),
    new Int16Array(plan.lfoWaveformLength),
    new Int16Array(plan.lfoWaveformLength),
    new Int16Array(plan.lfoWaveformLength),
  ];
  private address = 0;

  // opm_registers LFO and noise state
  private lfoCounter = 0;
  private lfoAm = 0;
  private lfoRawPm = 0;
  private noiseLfsr = 1;
  private noiseCounter = 0;
  private noiseState = 0;

  // FM operator state
  private readonly phase = new Uint32Array(plan.operators);
  private readonly envAttenuation = new Uint16Array(plan.operators);
  private readonly envState = new Uint8Array(plan.operators);
  private readonly keyState = new Uint8Array(plan.operators);
  private readonly keyonLive = new Uint8Array(plan.operators);

  // per-operator cache filled by prepare()
  private readonly cacheBlockFreq = new Uint32Array(plan.operators);
  private readonly cacheDetune = new Int32Array(plan.operators);
  private readonly cacheMultiple = new Uint32Array(plan.operators);
  private readonly cachePhaseStep = new Uint32Array(plan.operators);
  private readonly cachePhaseDynamic = new Uint8Array(plan.operators);
  private readonly cacheTotalLevel = new Uint32Array(plan.operators);
  private readonly cacheEgSustain = new Uint32Array(plan.operators);
  private readonly cacheEgRate = new Uint8Array(plan.operators * EG_STATES);

  // FM channel state
  private readonly feedback0 = new Int32Array(plan.channels);
  private readonly feedback1 = new Int32Array(plan.channels);
  private readonly feedbackIn = new Int32Array(plan.channels);

  private envCounter = 0;
  private prepareCount = 0;
  private modifiedChannels = (1 << plan.channels) - 1;
  private activeChannels = 0;

  /** Reverse of operator_map: ymfm interleaves operators across channels. */
  private readonly operatorChannel = new Uint8Array(plan.operators);

  constructor() {
    for (let chnum = 0; chnum < plan.channels; chnum++) {
      for (const opnum of plan.operatorMap[chnum]!) this.operatorChannel[opnum] = chnum;
    }
    // opm_registers builds the waveform from the die-extracted sine table.
    for (let index = 0; index < plan.waveformLength; index++) {
      this.waveform[index] = this.absSinAttenuation(index) | (bitfield(index, 9) << 15);
    }
    // opm_registers builds the LFO waveforms to match the application manual:
    // AM in the low 8 bits, PM in the upper 8. Waveform 3 (noise) fills in
    // dynamically as the LFO advances.
    for (let index = 0; index < plan.lfoWaveformLength; index++) {
      let am = index ^ 0xff;                      // 0: sawtooth
      let pm = index;
      this.lfoWaveform[0]![index] = int16(am | (pm << 8));
      am = bitfield(index, 7) ? 0 : 0xff;         // 1: square
      pm = am ^ 0x80;
      this.lfoWaveform[1]![index] = int16(am | (pm << 8));
      am = (bitfield(index, 7) ? (index << 1) : ((index ^ 0xff) << 1)) & 0xff; // 2: triangle
      pm = (bitfield(index, 6) ? am : ~am) & 0xff;
      this.lfoWaveform[2]![index] = int16(am | (pm << 8));
    }
    this.reset();
  }

  reset(): void {
    this.regs.fill(0);
    // opm_registers::reset enables output on both channels by default.
    for (let chnum = 0; chnum < plan.channels; chnum++) this.regs[0x20 + chnum] = 0xc0;
    this.address = 0;
    this.lfoCounter = 0;
    this.lfoAm = 0;
    this.lfoRawPm = 0;
    this.noiseLfsr = 1;
    this.noiseCounter = 0;
    this.noiseState = 0;
    this.phase.fill(0);
    this.envAttenuation.fill(0x3ff);
    this.envState.fill(plan.egRelease);
    this.keyState.fill(0);
    this.keyonLive.fill(0);
    this.feedback0.fill(0);
    this.feedback1.fill(0);
    this.feedbackIn.fill(0);
    this.envCounter = 0;
    this.prepareCount = 0;
    this.modifiedChannels = (1 << plan.channels) - 1;
    this.activeChannels = 0;
  }

  /** ym2151::write - address/data port pair. */
  write(offset: number, data: number): void {
    if ((offset & 1) === 0) {
      this.address = data & 0xff;
      return;
    }
    // fm_engine_base::write marks every channel modified before the store.
    this.modifiedChannels = (1 << plan.channels) - 1;
    const index = this.address;
    // opm_registers::write: LFO AM/PM depth share register 0x19; the PM
    // depth (bit 7 set) redirects to the unused neighbor 0x1a.
    if (index === 0x19) this.regs[0x19 + bitfield(data, 7)] = data & 0xff;
    else if (index !== 0x1a) this.regs[index] = data & 0xff;
    if (index === 0x08) {
      const channel = bitfield(data, 0, 3);
      const opmask = bitfield(data, 3, 4);
      for (let opnum = 0; opnum < 4; opnum++) {
        const op = plan.operatorMap[channel]![opnum]!;
        this.keyonLive[op] = bitfield(opmask, opnum);
      }
    }
  }

  /** Read a lowered register field for the given channel/operator offset. */
  private field(name: string, index = 0): number {
    const field = FIELDS[name]!;
    let value = 0;
    for (const part of field.parts) {
      const register = this.regs[part.offset + part.offsetStride * index] ?? 0;
      value = (value << part.width) |
        bitfield(register, part.shift + part.shiftStride * index, part.width);
    }
    if (field.xor !== undefined) value ^= field.xor;
    return value >>> 0;
  }

  private absSinAttenuation(input: number): number {
    const index = bitfield(input, 8) ? ~input : input;
    return plan.sinTable[index & 0xff]!;
  }

  private attenuationToVolume(input: number): number {
    return plan.powerTable[input & 0xff]! >>> (input >>> 8);
  }

  private attenuationIncrement(rate: number, index: number): number {
    return bitfield(plan.incrementTable[rate]!, 4 * index, 4);
  }

  private detuneAdjustment(detune: number, keycode: number): number {
    const result = plan.detuneTable[keycode]![detune & 3]!;
    return bitfield(detune, 2) ? -result : result;
  }

  /** fm_registers_base::effective_rate */
  private effectiveRate(rawRate: number, ksr: number): number {
    return rawRate === 0 ? 0 : Math.min(rawRate + ksr, 63);
  }

  /** opm_registers::cache_operator_data */
  private cacheOperatorData(chnum: number, opnum: number): void {
    const blockFreq = this.field('ch_block_freq', chnum);
    this.cacheBlockFreq[opnum] = blockFreq;

    // the 5-bit keycode is the block plus the top 2 bits of the key code
    const keycode = bitfield(blockFreq, 8, 5);

    this.cacheDetune[opnum] = this.detuneAdjustment(this.field('op_detune', opnum), keycode);
    const multiple = this.field('op_multiple', opnum) * 2;
    this.cacheMultiple[opnum] = multiple === 0 ? 1 : multiple;

    // phase step is dynamic while PM is active for this channel
    if (this.field('lfo_pm_depth') === 0 || this.field('ch_lfo_pm_sens', chnum) === 0) {
      this.cachePhaseDynamic[opnum] = 0;
      this.cachePhaseStep[opnum] = this.computePhaseStep(chnum, opnum, 0);
    } else {
      this.cachePhaseDynamic[opnum] = PHASE_STEP_DYNAMIC;
    }

    this.cacheTotalLevel[opnum] = this.field('op_total_level', opnum) << 3;

    let sustain = this.field('op_sustain_level', opnum);
    sustain |= (sustain + 1) & 0x10;
    this.cacheEgSustain[opnum] = sustain << 5;

    const ksrval = keycode >>> (this.field('op_ksr', opnum) ^ 3);
    const base = opnum * EG_STATES;
    this.cacheEgRate[base + plan.egAttack - 1] =
      this.effectiveRate(this.field('op_attack_rate', opnum) * 2, ksrval);
    this.cacheEgRate[base + plan.egDecay - 1] =
      this.effectiveRate(this.field('op_decay_rate', opnum) * 2, ksrval);
    this.cacheEgRate[base + plan.egSustain - 1] =
      this.effectiveRate(this.field('op_sustain_rate', opnum) * 2, ksrval);
    this.cacheEgRate[base + plan.egRelease - 1] =
      this.effectiveRate(this.field('op_release_rate', opnum) * 4 + 2, ksrval);
  }

  private egRate(opnum: number, state: number): number {
    return this.cacheEgRate[opnum * EG_STATES + state - 1] ?? 0;
  }

  /** opm_registers::compute_phase_step */
  private computePhaseStep(chnum: number, opnum: number, lfoRawPm: number): number {
    // coarse detune delta plus the PM delta scaled by channel sensitivity
    let delta = plan.detune2Delta[this.field('op_detune2', opnum)]!;
    const pmSensitivity = this.field('ch_lfo_pm_sens', chnum);
    if (pmSensitivity !== 0) {
      if (pmSensitivity < 6) delta += lfoRawPm >> (6 - pmSensitivity);
      else delta += lfoRawPm << (pmSensitivity - 5);
    }
    let phaseStep = this.opmKeyCodeToPhaseStep(this.cacheBlockFreq[opnum]!, delta);
    phaseStep += this.cacheDetune[opnum]!;
    return (phaseStep * this.cacheMultiple[opnum]!) >>> 1;
  }

  /** ymfm::opm_key_code_to_phase_step */
  private opmKeyCodeToPhaseStep(blockFreq: number, delta: number): number {
    let block = bitfield(blockFreq, 10, 3);
    // the keycode maps 12 values over 16 per octave; remove the gaps
    const adjustedCode = bitfield(blockFreq, 6, 4) - bitfield(blockFreq, 8, 2);
    let effFreq = ((adjustedCode << 6) | bitfield(blockFreq, 0, 6)) + delta;
    if (effFreq >= 768 || effFreq < 0) {
      if (effFreq < 0) {
        effFreq += 768;
        if (block-- === 0) return plan.phaseStepTable[0]! >> 7;
      } else {
        effFreq -= 768;
        if (effFreq >= 768) {
          block++;
          effFreq -= 768;
        }
        if (block++ >= 7) return plan.phaseStepTable[767]!;
      }
    }
    return plan.phaseStepTable[effFreq]! >> (block ^ 7);
  }

  /** opm_registers::clock_noise_and_lfo */
  private clockNoiseAndLfo(): number {
    const freq = this.field('noise_frequency');
    for (let rep = 0; rep < 2; rep++) {
      // the LFSR clocks continually and is sampled at the noise frequency
      this.noiseLfsr = ((this.noiseLfsr << 1) |
        (bitfield(this.noiseLfsr, 17) ^ bitfield(this.noiseLfsr, 14) ^ 1)) >>> 0;
      if (this.noiseCounter++ >= freq) {
        this.noiseCounter = 0;
        this.noiseState = bitfield(this.noiseLfsr, 17);
      }
    }
    // the rate is a 4.4 floating-point step value with implied leading 1
    const rate = this.field('lfo_rate');
    this.lfoCounter = (this.lfoCounter +
      ((0x10 | bitfield(rate, 0, 4)) << bitfield(rate, 4, 4))) >>> 0;
    if (this.field('lfo_reset')) this.lfoCounter = 0;
    const lfo = bitfield(this.lfoCounter, 22, 8);

    // fill the noise waveform entry one ahead of the current position
    const lfoNoise = bitfield(this.noiseLfsr, 17, 8);
    this.lfoWaveform[3]![(lfo + 1) & 0xff] = int16(lfoNoise | (lfoNoise << 8));

    const ampm = this.lfoWaveform[this.field('lfo_waveform')]![lfo]!;
    this.lfoAm = ((ampm & 0xff) * this.field('lfo_am_depth')) >> 7;
    return ((ampm >> 8) * this.field('lfo_pm_depth')) >> 7;
  }

  /** opm_registers::lfo_am_offset */
  private lfoAmOffset(chnum: number): number {
    const sensitivity = this.field('ch_lfo_am_sens', chnum);
    if (sensitivity === 0) return 0;
    return this.lfoAm << (sensitivity - 1);
  }

  /** fm_operator::prepare */
  private prepareOperator(opnum: number): boolean {
    this.cacheOperatorData(this.operatorChannel[opnum]!, opnum);
    this.clockKeystate(opnum, this.keyonLive[opnum] !== 0 ? 1 : 0);
    return this.envState[opnum] !== plan.egRelease ||
      this.envAttenuation[opnum]! < plan.egQuiet;
  }

  private clockKeystate(opnum: number, keystate: number): void {
    if ((keystate ^ this.keyState[opnum]!) === 0) return;
    this.keyState[opnum] = keystate;
    if (keystate !== 0) {
      if (this.envState[opnum] !== plan.egAttack) {
        this.envState[opnum] = plan.egAttack;
        this.phase[opnum] = 0;
        if (this.egRate(opnum, plan.egAttack) >= 62) this.envAttenuation[opnum] = 0;
      }
    } else if (this.envState[opnum]! < plan.egRelease) {
      this.envState[opnum] = plan.egRelease;
    }
  }

  /** fm_operator::clock_envelope */
  private clockEnvelope(opnum: number, counter: number): void {
    if (this.envState[opnum] === plan.egAttack && this.envAttenuation[opnum] === 0) {
      this.envState[opnum] = plan.egDecay;
    }
    if (
      this.envState[opnum] === plan.egDecay &&
      this.envAttenuation[opnum]! >= this.cacheEgSustain[opnum]!
    ) {
      this.envState[opnum] = plan.egSustain;
    }
    const rate = this.egRate(opnum, this.envState[opnum]!);
    const rateShift = rate >>> 2;
    const envCounter = (counter << rateShift) >>> 0;
    if (bitfield(envCounter, 0, 11) !== 0) return;
    const relevantBits = bitfield(envCounter, rateShift <= 11 ? 11 : rateShift, 3);
    const increment = this.attenuationIncrement(rate, relevantBits);
    if (this.envState[opnum] === plan.egAttack) {
      if (rate < 62) {
        this.envAttenuation[opnum] =
          this.envAttenuation[opnum]! + ((~this.envAttenuation[opnum]! * increment) >> 4);
      }
      return;
    }
    this.envAttenuation[opnum] = this.envAttenuation[opnum]! + increment;
    if (this.envAttenuation[opnum]! >= 0x400) this.envAttenuation[opnum] = 0x3ff;
  }

  /** fm_operator::clock (OPM has no SSG-EG) */
  private clockOperator(opnum: number, lfoRawPm: number): void {
    if (bitfield(this.envCounter, 0, 2) === 0) {
      this.clockEnvelope(opnum, this.envCounter >>> 2);
    }
    const step = this.cachePhaseDynamic[opnum] === PHASE_STEP_DYNAMIC
      ? this.computePhaseStep(this.operatorChannel[opnum]!, opnum, lfoRawPm)
      : this.cachePhaseStep[opnum]!;
    this.phase[opnum] = (this.phase[opnum]! + step) >>> 0;
  }

  /** fm_operator::envelope_attenuation (OPM has no eg_shift) */
  private envelopeAttenuation(opnum: number, amOffset: number): number {
    let result = this.envAttenuation[opnum]!;
    if (this.field('op_lfo_am_enable', opnum)) result += amOffset;
    result += this.cacheTotalLevel[opnum]!;
    return Math.min(result, 0x3ff);
  }

  /** fm_operator::compute_volume */
  private computeVolume(opnum: number, phase: number, amOffset: number): number {
    if (this.envAttenuation[opnum]! > plan.egQuiet) return 0;
    const sinAttenuation = this.waveform[phase & (plan.waveformLength - 1)]!;
    const envAttenuation = this.envelopeAttenuation(opnum, amOffset) << 2;
    const result = this.attenuationToVolume((sinAttenuation & 0x7fff) + envAttenuation);
    return bitfield(sinAttenuation, 15) ? -result : result;
  }

  /** fm_operator::compute_noise_volume */
  private computeNoiseVolume(opnum: number, amOffset: number): number {
    const result = (this.envelopeAttenuation(opnum, amOffset) ^ 0x3ff) << 1;
    return bitfield(this.noiseState, 0) ? -result : result;
  }

  /** fm_channel::output_4op with OPM noise on channel 7's carrier. */
  private outputChannel(chnum: number, output: Int32Array, rshift: number, clipmax: number): void {
    const ops = plan.operatorMap[chnum]!;
    const amOffset = this.lfoAmOffset(chnum);

    let opmod = 0;
    const feedback = this.field('ch_feedback', chnum);
    if (feedback !== 0) {
      opmod = (this.feedback0[chnum]! + this.feedback1[chnum]!) >> (10 - feedback);
    }
    const op1value = this.computeVolume(ops[0]!, (this.phase[ops[0]!]! >>> 10) + opmod, amOffset);
    this.feedbackIn[chnum] = op1value;

    if (this.field('ch_output_0', chnum) === 0 && this.field('ch_output_1', chnum) === 0) return;

    const algorithmOps = plan.algorithmOps[this.field('ch_algorithm', chnum)]!;
    const opout = [0, op1value, 0, 0, 0, 0, 0, 0];

    opmod = opout[bitfield(algorithmOps, 0, 1)]! >> 1;
    opout[2] = this.computeVolume(ops[1]!, (this.phase[ops[1]!]! >>> 10) + opmod, amOffset);
    opout[5] = int16(opout[1]! + opout[2]!);

    opmod = opout[bitfield(algorithmOps, 1, 3)]! >> 1;
    opout[3] = this.computeVolume(ops[2]!, (this.phase[ops[2]!]! >>> 10) + opmod, amOffset);
    opout[6] = int16(opout[1]! + opout[3]!);
    opout[7] = int16(opout[2]! + opout[3]!);

    let result: number;
    if (this.field('noise_enable') && chnum === 7) {
      result = this.computeNoiseVolume(ops[3]!, amOffset);
    } else {
      opmod = opout[bitfield(algorithmOps, 4, 3)]! >> 1;
      result = this.computeVolume(ops[3]!, (this.phase[ops[3]!]! >>> 10) + opmod, amOffset);
    }
    result >>= rshift;

    const clipmin = -clipmax - 1;
    for (let index = 1; index <= 3; index++) {
      if (bitfield(algorithmOps, 6 + index, 1)) {
        result = clamp(result + (opout[index]! >> rshift), clipmin, clipmax);
      }
    }
    result = clamp(result, clipmin, clipmax);

    // fm_channel::add_to_output through the ch_output panning bits
    if (this.field('ch_output_0', chnum)) output[0] = output[0]! + result;
    if (this.field('ch_output_1', chnum)) output[1] = output[1]! + result;
  }

  /** ym2151::generate for one chip sample: [left, right]. */
  generate(output: Int32Array): void {
    if (this.modifiedChannels !== 0 || this.prepareCount++ >= 4096) {
      this.activeChannels = 0;
      for (let chnum = 0; chnum < plan.channels; chnum++) {
        let active = 0;
        for (const opnum of plan.operatorMap[chnum]!) {
          if (this.prepareOperator(opnum)) active = 1;
        }
        if (active) this.activeChannels |= 1 << chnum;
      }
      this.modifiedChannels = 0;
      this.prepareCount = 0;
    }
    // fm_engine_base::clock: the envelope clock divider wraps the low bits.
    if (plan.egClockDivider === 1) this.envCounter += 4;
    else if (bitfield(++this.envCounter, 0, 2) === plan.egClockDivider) {
      this.envCounter += 4 - plan.egClockDivider;
    }
    const lfoRawPm = this.clockNoiseAndLfo();
    this.lfoRawPm = lfoRawPm;
    for (let chnum = 0; chnum < plan.channels; chnum++) {
      this.feedback0[chnum] = this.feedback1[chnum]!;
      this.feedback1[chnum] = this.feedbackIn[chnum]!;
      for (const opnum of plan.operatorMap[chnum]!) this.clockOperator(opnum, lfoRawPm);
    }
    output[0] = 0;
    output[1] = 0;
    for (let chnum = 0; chnum < plan.channels; chnum++) {
      if (bitfield(this.activeChannels, chnum)) {
        // OPM is full 14-bit with no intermediate clipping
        this.outputChannel(chnum, output, 0, 32767);
      }
    }
    // YM2151 uses an external YM3012 DAC: round trip through 10.3 float
    output[0] = roundtripFp(clamp(output[0]!, -32768, 32767));
    output[1] = roundtripFp(clamp(output[1]!, -32768, 32767));
  }
}

/** MAME's okim6295: 4-voice Dialogic ADPCM fed from the sample ROM. */
const OKI_INDEX_SHIFT = [-1, -1, -1, -1, 2, 4, 6, 8] as const;
const OKI_VOLUME = [0x20, 0x16, 0x10, 0x0b, 8, 6, 4, 3, 2, 0, 0, 0, 0, 0, 0, 0]
  .map(value => value / 0x20);

class OkiVoice {
  playing = false; base = 0; nibble = 0; count = 0; signal = 0; step = 0; volume = 0;
  start(base: number, count: number, volume: number): void {
    this.playing = true; this.base = base; this.nibble = 0; this.count = count;
    this.signal = 0; this.step = 0; this.volume = volume;
  }
  clock(rom: Uint8Array): number {
    if (!this.playing) return 0;
    const raw = rom[(this.base + (this.nibble >>> 1)) & 0x3ffff] ?? 0;
    const code = (raw >>> ((this.nibble & 1) ? 0 : 4)) & 15;
    const stepValue = Math.floor(16 * Math.pow(1.1, this.step));
    const magnitude = stepValue / 8 + ((code & 1) ? stepValue / 4 : 0) +
      ((code & 2) ? stepValue / 2 : 0) + ((code & 4) ? stepValue : 0);
    this.signal = Math.max(-2048, Math.min(2047,
      this.signal + ((code & 8) ? -Math.floor(magnitude) : Math.floor(magnitude))));
    this.step = Math.max(0, Math.min(48, this.step + OKI_INDEX_SHIFT[code & 7]!));
    if (++this.nibble >= this.count) this.playing = false;
    return this.signal / 2048 * this.volume;
  }
}

class OkiCore {
  private readonly voices = Array.from({ length: 4 }, () => new OkiVoice());
  private command = -1;
  private phase = 0;
  private held = 0;
  private readonly rom: Uint8Array;
  private readonly clockHz: number;
  private readonly outputRate: number;
  private pin7: boolean;
  constructor(rom: Uint8Array, clockHz: number, outputRate: number, pin7: boolean) {
    this.rom = rom; this.clockHz = clockHz; this.outputRate = outputRate; this.pin7 = pin7;
  }
  write(data: number): void {
    data &= 0xff;
    if (this.command >= 0) {
      let mask = data >>> 4;
      for (let voice = 0; voice < 4; voice++, mask >>>= 1) {
        if (!(mask & 1) || this.voices[voice]!.playing) continue;
        const table = this.command * 8;
        const start = (((this.rom[table] ?? 0) << 16) |
          ((this.rom[table + 1] ?? 0) << 8) | (this.rom[table + 2] ?? 0)) & 0x3ffff;
        const stop = (((this.rom[table + 3] ?? 0) << 16) |
          ((this.rom[table + 4] ?? 0) << 8) | (this.rom[table + 5] ?? 0)) & 0x3ffff;
        if (start < stop) this.voices[voice]!.start(
          start, 2 * (stop - start + 1), OKI_VOLUME[data & 15] ?? 0,
        );
      }
      this.command = -1;
    } else if (data & 0x80) this.command = data & 0x7f;
    else {
      let mask = data >>> 3;
      for (let voice = 0; voice < 4; voice++, mask >>>= 1) {
        if (mask & 1) this.voices[voice]!.playing = false;
      }
    }
  }
  setPin7(value: number): void { this.pin7 = Boolean(value); }
  sample(): number {
    this.phase += this.clockHz / (this.pin7 ? 132 : 165) / this.outputRate;
    while (this.phase >= 1) {
      this.phase--;
      this.held = this.voices.reduce((sum, voice) => sum + voice.clock(this.rom), 0) / 4;
    }
    return this.held;
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
 * Hosts the machine's YM2151 bank, resampling each chip's native ymfm rate to
 * the host output rate and mixing the driver's add_route gains.
 */
export class GeneratedYm2151Mixer {
  private readonly chips: GeneratedYm2151Chip[];
  private readonly oki?: { tag: string; gain: number; core: OkiCore };
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
  private readonly scratch = new Int32Array(2);
  private readonly held: Int32Array[];
  private phase = 0;
  private lastSample = 0;

  constructor(
    clock: number,
    chips: number,
    outputRate: number,
    sampleRom?: Uint8Array,
    auxiliaryDevices: readonly GeneratedAuxiliaryAudioDevice[] = [],
    routes?: GeneratedYmRoute[],
  ) {
    this.chips = Array.from(
      { length: Math.max(1, chips) },
      () => new GeneratedYm2151Chip(),
    );
    const oki = auxiliaryDevices.find(device => device.type === 'OKIM6295');
    if (oki) this.oki = {
      tag: oki.deviceTag,
      gain: oki.gain,
      core: new OkiCore(
        sampleRom ?? new Uint8Array(), oki.clock, outputRate, oki.initialMode !== 'PIN7_LOW',
      ),
    };
    const msmDevices = auxiliaryDevices.filter(device => device.type === 'MSM5205');
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
    this.outputRate = outputRate;
    this.held = this.chips.map(() => new Int32Array(2));
    this.routes = routes?.length
      ? routes
      : this.chips.flatMap((_chip, chip) =>
          [0, 1].map(channel => ({ chip, channel, gain: 1, target: 'mono' })));
  }

  /** Register writes arrive as chip * 2 + port; auxiliaries route by method. */
  write(offset: number, data: number, method?: string): void {
    const msm = this.msmWrites.get(method ?? '');
    if (msm) {
      msm.core.write(msm.method, data);
      return;
    }
    if (this.oki && method?.startsWith(this.oki.tag + '.')) {
      if (method.endsWith('.set_pin7')) this.oki.core.setPin7(data);
      else this.oki.core.write(data);
      return;
    }
    const chip = Math.floor(offset / 2);
    if (method === 'reset') {
      this.chips[chip]?.reset();
      return;
    }
    this.chips[chip]?.write(offset & 1, data);
  }

  /**
   * One host sample. The chip runs above the browser output rate (55.9 kHz at
   * the stock 3.579545 MHz clock); every chip sample generated for this output
   * sample is averaged rather than point sampled to avoid aliasing.
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
    output += (this.oki?.core.sample() ?? 0) * (this.oki?.gain ?? 0);
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

export class GeneratedYm2151FrameRenderer {
  private sampleCarry = 0;
  private readonly mixer: GeneratedYm2151Mixer;
  private readonly outputRate: number;
  private readonly refresh: number;
  private writes: readonly GeneratedYm2151Write[] = [];
  private writeIndex = 0;
  private count = 0;
  private cursor = 0;
  private active = false;

  constructor(mixer: GeneratedYm2151Mixer, outputRate: number, refresh: number) {
    this.mixer = mixer;
    this.outputRate = outputRate;
    this.refresh = refresh;
  }

  begin(writes: readonly GeneratedYm2151Write[]): number {
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
      const at = Math.ceil(Math.max(0, Math.min(1, write.frac ?? 0)) * this.count);
      if (at > this.cursor) break;
      this.mixer.write(write.offset, write.data, write.method);
      this.writeIndex++;
    }
    this.cursor++;
    return this.mixer.sample();
  }

  render(writes: readonly GeneratedYm2151Write[]): Float32Array {
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

class GeneratedYm2151Processor extends AudioWorkletProcessor {
  private mixer?: GeneratedYm2151Mixer;
  private renderer?: GeneratedYm2151FrameRenderer;
  private readonly frames: GeneratedYm2151Write[][] = [];
  private lastSample = 0;

  constructor() {
    super();
    this.port.onmessage = (event: MessageEvent) => {
      const message = event.data as {
        type: string;
        clock?: number;
        chips?: number;
        routes?: GeneratedYmRoute[];
        auxiliaryDevices?: GeneratedAuxiliaryAudioDevice[];
        sampleRom?: Uint8Array;
        refresh?: number;
        offset?: number;
        data?: number;
        method?: string;
        writes?: GeneratedYm2151Write[];
      };
      if (message.type === 'init') {
        this.mixer = new GeneratedYm2151Mixer(
          message.clock ?? 3_579_545,
          message.chips ?? 1,
          sampleRate,
          message.sampleRom,
          message.auxiliaryDevices,
          message.routes,
        );
        this.renderer = new GeneratedYm2151FrameRenderer(
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
      if (sample !== undefined) return (this.lastSample = sample);
      const writes = this.frames.shift();
      // Starved: hold the last sample. A 0-fill is a hard step on any mix
      // with a DC offset and pops loudly.
      if (!writes) return this.lastSample;
      this.renderer.begin(writes);
    }
    return this.lastSample;
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

registerProcessor('ym2151', GeneratedYm2151Processor);
