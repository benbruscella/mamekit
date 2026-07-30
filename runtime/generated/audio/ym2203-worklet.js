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
    "sourceFiles": [
        "src/devices/sound/ymopn.cpp",
        "src/devices/sound/ymfm_mame.h",
        "3rdparty/ymfm/src/ymfm.h",
        "3rdparty/ymfm/src/ymfm_fm.h",
        "3rdparty/ymfm/src/ymfm_fm.ipp",
        "3rdparty/ymfm/src/ymfm_opn.h",
        "3rdparty/ymfm/src/ymfm_opn.cpp",
        "3rdparty/ymfm/src/ymfm_ssg.h",
        "3rdparty/ymfm/src/ymfm_ssg.cpp"
    ],
    "source": {
        "file": "3rdparty/ymfm/src/ymfm_opn.cpp",
        "line": 855
    }
};
const FM_FIELDS = plan.fm.fields;
const SSG_FIELDS = plan.ssg.fields;
function bitfield(value, start, length = 1) {
    return (value >>> start) & ((1 << length) - 1);
}
function clamp(value, minimum, maximum) {
    return value < minimum ? minimum : value > maximum ? maximum : value;
}
function countLeadingZeros(value) {
    return Math.clz32(value >>> 0);
}
/** ymfm stores intermediate operator outputs in an int16_t array. */
function int16(value) {
    return (value << 16) >> 16;
}
/** ymfm::roundtrip_fp - the 10.3 floating point DAC round trip. */
function roundtripFp(value) {
    if (value < -32768)
        return -32768;
    if (value > 32767)
        return 32767;
    const scan = value ^ (value >> 31);
    let exponent = 7 - countLeadingZeros((scan << 17) >>> 0);
    if (exponent < 1)
        exponent = 1;
    exponent -= 1;
    return value & ~((1 << exponent) - 1);
}
const FM = plan.fm;
const SSG = plan.ssg;
const EG_STATES = 4;
/** ymfm's OPN chip: an FM engine and an SSG engine behind one register port. */
export class GeneratedYm2203Chip {
    regs = new Uint8Array(FM.registers);
    ssgRegs = new Uint8Array(SSG.registers);
    waveform = new Uint16Array(FM.waveformLength);
    address = 0;
    // FM operator state
    phase = new Uint32Array(FM.operators);
    envAttenuation = new Uint16Array(FM.operators);
    envState = new Uint8Array(FM.operators);
    ssgInverted = new Uint8Array(FM.operators);
    keyState = new Uint8Array(FM.operators);
    keyonLive = new Uint8Array(FM.operators);
    // per-operator cache filled by prepare()
    cacheBlockFreq = new Uint32Array(FM.operators);
    cacheDetune = new Int32Array(FM.operators);
    cacheMultiple = new Uint32Array(FM.operators);
    cachePhaseStep = new Uint32Array(FM.operators);
    cacheTotalLevel = new Uint32Array(FM.operators);
    cacheEgSustain = new Uint32Array(FM.operators);
    cacheEgRate = new Uint8Array(FM.operators * EG_STATES);
    // FM channel state
    feedback0 = new Int32Array(FM.channels);
    feedback1 = new Int32Array(FM.channels);
    feedbackIn = new Int32Array(FM.channels);
    envCounter = 0;
    prepareCount = 0;
    modifiedChannels = (1 << FM.channels) - 1;
    activeChannels = 0;
    lastFm = 0;
    // SSG engine state
    toneCount = new Uint32Array(SSG.channels);
    toneState = new Uint8Array(SSG.channels);
    envelopeCount = 0;
    envelopeState = 0;
    noiseCount = 0;
    noiseState = 1;
    ssgLast = new Int32Array(SSG.channels);
    sampleIndex = 0;
    prescale = FM.defaultPrescale;
    fmSamplesPerOutput = plan.fmSamplesPerOutput;
    ssgResample = plan.ssgResample;
    /** Reverse of operator_map: ymfm interleaves operators across channels. */
    operatorChannel = new Uint8Array(FM.operators);
    constructor() {
        for (let chnum = 0; chnum < FM.channels; chnum++) {
            for (const opnum of FM.operatorMap[chnum])
                this.operatorChannel[opnum] = chnum;
        }
        // opn_registers_base builds the waveform from the die-extracted sine table.
        for (let index = 0; index < FM.waveformLength; index++) {
            this.waveform[index] = this.absSinAttenuation(index) | (bitfield(index, 9) << 15);
        }
        this.reset();
    }
    reset() {
        this.regs.fill(0);
        this.ssgRegs.fill(0);
        this.address = 0;
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
    }
    /** ym2203::write - offset 0 selects a register, offset 1 writes it. */
    write(offset, data) {
        if ((offset & 1) === 0) {
            this.address = data & 0xff;
            const selector = plan.prescale.selectors.find(candidate => candidate.address === this.address &&
                (candidate.requiresPrescale === undefined ||
                    candidate.requiresPrescale === this.prescale));
            if (selector)
                this.updatePrescale(selector.prescale);
        }
        else {
            this.writeData(data & 0xff);
        }
    }
    /** ym2203::update_prescale: switch both FM and SSG engine clock ratios. */
    updatePrescale(prescale) {
        const ratios = plan.prescale.ratios[String(prescale)];
        if (!ratios)
            return;
        this.prescale = prescale;
        this.fmSamplesPerOutput = ratios.fmSamplesPerOutput;
        this.ssgResample = ratios.ssgResample;
    }
    writeData(data) {
        if (this.address < 0x10) {
            // 00-0F: SSG
            const regnum = this.address & 0x0f;
            this.ssgRegs[regnum] = data;
            if (regnum === SSG.envelopeShapeRegister)
                this.envelopeState = 0;
            return;
        }
        // 10-FF: FM
        this.writeFm(this.address, data);
    }
    /** opn_registers_base::write plus fm_engine_base::write key-on handling. */
    writeFm(index, data) {
        // fm_engine_base::write marks every channel modified before the register
        // store; the mode register takes the same path through engine_mode_write.
        this.modifiedChannels = (1 << FM.channels) - 1;
        if ((index & 0xf0) === 0xa0) {
            if (bitfield(index, 0, 2) === 3)
                return;
            const latchIndex = 0xb8 | bitfield(index, 3);
            if (bitfield(index, 2)) {
                this.regs[latchIndex] = data & 0x3f;
            }
            else {
                this.regs[index] = data;
                this.regs[index | 4] = this.regs[latchIndex];
            }
            return;
        }
        if ((index & 0xf8) === 0xb8)
            return;
        this.regs[index] = data;
        if (index === 0x28) {
            const channel = bitfield(data, 0, 2);
            if (channel === 3)
                return;
            const opmask = bitfield(data, 4, 4);
            for (let opnum = 0; opnum < 4; opnum++) {
                const op = FM.operatorMap[channel][opnum];
                this.keyonLive[op] = bitfield(opmask, opnum);
            }
        }
    }
    /** Read a lowered register field for the given channel/operator offset. */
    field(field, index, registers) {
        let value = 0;
        for (const part of field.parts) {
            const register = registers[part.offset + part.offsetStride * index] ?? 0;
            value = (value << part.width) |
                bitfield(register, part.shift + part.shiftStride * index, part.width);
        }
        return value >>> 0;
    }
    fm(name, index) {
        return this.field(FM_FIELDS[name], index, this.regs);
    }
    ssg(name, index = 0) {
        return this.field(SSG_FIELDS[name], index, this.ssgRegs);
    }
    absSinAttenuation(input) {
        const index = bitfield(input, 8) ? ~input : input;
        return FM.sinTable[index & 0xff];
    }
    attenuationToVolume(input) {
        return FM.powerTable[input & 0xff] >>> (input >>> 8);
    }
    attenuationIncrement(rate, index) {
        return bitfield(FM.incrementTable[rate], 4 * index, 4);
    }
    detuneAdjustment(detune, keycode) {
        const result = FM.detuneTable[keycode][detune & 3];
        return bitfield(detune, 2) ? -result : result;
    }
    /** fm_registers_base::effective_rate */
    effectiveRate(rawRate, ksr) {
        return rawRate === 0 ? 0 : Math.min(rawRate + ksr, 63);
    }
    /** opn_registers_base::cache_operator_data */
    cacheOperatorData(chnum, opnum) {
        const choffs = FM.channelOffsets[chnum];
        const opoffs = FM.operatorOffsets[opnum];
        let blockFreq = this.fm('ch_block_freq', choffs);
        // Channel 2 uses the per-operator frequencies in multi-frequency mode.
        if (this.fm('multi_freq', 0) !== 0 && choffs === 2) {
            if (opoffs === 2)
                blockFreq = this.fm('multi_block_freq', 1);
            else if (opoffs === 10)
                blockFreq = this.fm('multi_block_freq', 2);
            else if (opoffs === 6)
                blockFreq = this.fm('multi_block_freq', 0);
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
    egRate(opnum, state) {
        return this.cacheEgRate[opnum * EG_STATES + state - 1] ?? 0;
    }
    /** opn_registers_base::compute_phase_step (OPN has no LFO). */
    computePhaseStep(opnum) {
        const blockFreq = this.cacheBlockFreq[opnum];
        const fnum = bitfield(blockFreq, 0, 11) << 1;
        const block = bitfield(blockFreq, 11, 3);
        let phaseStep = (fnum << block) >>> 2;
        phaseStep += this.cacheDetune[opnum];
        phaseStep &= 0x1ffff;
        return (phaseStep * this.cacheMultiple[opnum]) >>> 1;
    }
    /** fm_operator::prepare */
    prepareOperator(opnum) {
        this.cacheOperatorData(this.operatorChannel[opnum], opnum);
        this.clockKeystate(opnum, this.keyonLive[opnum] !== 0 ? 1 : 0);
        return this.envState[opnum] !== FM.egRelease ||
            this.envAttenuation[opnum] < FM.egQuiet;
    }
    clockKeystate(opnum, keystate) {
        if ((keystate ^ this.keyState[opnum]) === 0)
            return;
        this.keyState[opnum] = keystate;
        if (keystate !== 0)
            this.startAttack(opnum, false);
        else
            this.startRelease(opnum);
    }
    startAttack(opnum, isRestart) {
        if (this.envState[opnum] === FM.egAttack)
            return;
        this.envState[opnum] = FM.egAttack;
        if (!isRestart) {
            const opoffs = FM.operatorOffsets[opnum];
            this.ssgInverted[opnum] =
                this.fm('op_ssg_eg_enable', opoffs) & bitfield(this.fm('op_ssg_eg_mode', opoffs), 2);
            this.phase[opnum] = 0;
        }
        if (this.egRate(opnum, FM.egAttack) >= 62)
            this.envAttenuation[opnum] = 0;
    }
    startRelease(opnum) {
        if (this.envState[opnum] >= FM.egRelease)
            return;
        this.envState[opnum] = FM.egRelease;
        if (this.ssgInverted[opnum]) {
            this.envAttenuation[opnum] = (0x200 - this.envAttenuation[opnum]) & 0x3ff;
            this.ssgInverted[opnum] = 0;
        }
    }
    /** fm_operator::clock_ssg_eg_state */
    clockSsgEgState(opnum) {
        if (!bitfield(this.envAttenuation[opnum], 9))
            return;
        const mode = this.fm('op_ssg_eg_mode', FM.operatorOffsets[opnum]);
        if (bitfield(mode, 0)) {
            this.ssgInverted[opnum] = bitfield(mode, 2) ^ bitfield(mode, 1);
            if (this.envState[opnum] !== FM.egAttack) {
                this.envAttenuation[opnum] = this.ssgInverted[opnum] ? 0x200 : 0x3ff;
            }
        }
        else {
            this.ssgInverted[opnum] ^= bitfield(mode, 1);
            if (this.envState[opnum] === FM.egDecay || this.envState[opnum] === FM.egSustain) {
                this.startAttack(opnum, true);
            }
            if (bitfield(mode, 1) === 0)
                this.phase[opnum] = 0;
        }
        if (this.envState[opnum] === FM.egRelease)
            this.envAttenuation[opnum] = 0x3ff;
    }
    /** fm_operator::clock_envelope */
    clockEnvelope(opnum, counter) {
        if (this.envState[opnum] === FM.egAttack && this.envAttenuation[opnum] === 0) {
            this.envState[opnum] = FM.egDecay;
        }
        if (this.envState[opnum] === FM.egDecay &&
            this.envAttenuation[opnum] >= this.cacheEgSustain[opnum]) {
            this.envState[opnum] = FM.egSustain;
        }
        const rate = this.egRate(opnum, this.envState[opnum]);
        const rateShift = rate >>> 2;
        const envCounter = counter << rateShift;
        if (bitfield(envCounter, 0, 11) !== 0)
            return;
        const relevantBits = bitfield(envCounter, rateShift <= 11 ? 11 : rateShift, 3);
        const increment = this.attenuationIncrement(rate, relevantBits);
        if (this.envState[opnum] === FM.egAttack) {
            if (rate < 62) {
                this.envAttenuation[opnum] =
                    this.envAttenuation[opnum] + ((~this.envAttenuation[opnum] * increment) >> 4);
            }
            return;
        }
        if (!this.fm('op_ssg_eg_enable', FM.operatorOffsets[opnum])) {
            this.envAttenuation[opnum] = this.envAttenuation[opnum] + increment;
        }
        else if (this.envAttenuation[opnum] < 0x200) {
            this.envAttenuation[opnum] = this.envAttenuation[opnum] + 4 * increment;
        }
        if (this.envAttenuation[opnum] >= 0x400)
            this.envAttenuation[opnum] = 0x3ff;
    }
    /** fm_operator::clock */
    clockOperator(opnum) {
        if (this.fm('op_ssg_eg_enable', FM.operatorOffsets[opnum]))
            this.clockSsgEgState(opnum);
        else
            this.ssgInverted[opnum] = 0;
        if (bitfield(this.envCounter, 0, 2) === 0)
            this.clockEnvelope(opnum, this.envCounter >>> 2);
        this.phase[opnum] = (this.phase[opnum] + this.cachePhaseStep[opnum]) >>> 0;
    }
    /** fm_operator::envelope_attenuation (OPN leaves eg_shift at zero). */
    envelopeAttenuation(opnum) {
        let result = this.envAttenuation[opnum];
        if (this.ssgInverted[opnum])
            result = (0x200 - result) & 0x3ff;
        result += this.cacheTotalLevel[opnum];
        return Math.min(result, 0x3ff);
    }
    /** fm_operator::compute_volume */
    computeVolume(opnum, phase) {
        if (this.envAttenuation[opnum] > FM.egQuiet)
            return 0;
        const sinAttenuation = this.waveform[phase & (FM.waveformLength - 1)];
        const envAttenuation = this.envelopeAttenuation(opnum) << 2;
        const result = this.attenuationToVolume((sinAttenuation & 0x7fff) + envAttenuation);
        return bitfield(sinAttenuation, 15) ? -result : result;
    }
    /**
     * fm_channel::output_4op - every OPN channel is four-operator, so all eight
     * algorithms route through the lowered s_algorithm_ops table.
     */
    outputChannel(chnum, rshift, clipmax) {
        const choffs = FM.channelOffsets[chnum];
        const ops = FM.operatorMap[chnum];
        let opmod = 0;
        const feedback = this.fm('ch_feedback', choffs);
        if (feedback !== 0) {
            opmod = (this.feedback0[chnum] + this.feedback1[chnum]) >> (10 - feedback);
        }
        const op1value = this.computeVolume(ops[0], (this.phase[ops[0]] >>> 10) + opmod);
        this.feedbackIn[chnum] = op1value;
        const algorithmOps = FM.algorithmOps[this.fm('ch_algorithm', choffs)];
        const opout = [0, op1value, 0, 0, 0, 0, 0, 0];
        opmod = opout[bitfield(algorithmOps, 0, 1)] >> 1;
        opout[2] = this.computeVolume(ops[1], (this.phase[ops[1]] >>> 10) + opmod);
        opout[5] = int16(opout[1] + opout[2]);
        opmod = opout[bitfield(algorithmOps, 1, 3)] >> 1;
        opout[3] = this.computeVolume(ops[2], (this.phase[ops[2]] >>> 10) + opmod);
        opout[6] = int16(opout[1] + opout[3]);
        opout[7] = int16(opout[2] + opout[3]);
        opmod = opout[bitfield(algorithmOps, 4, 3)] >> 1;
        let result = this.computeVolume(ops[3], (this.phase[ops[3]] >>> 10) + opmod);
        result >>= rshift;
        const clipmin = -clipmax - 1;
        for (let index = 1; index <= 3; index++) {
            if (bitfield(algorithmOps, 6 + index, 1)) {
                result = clamp(result + (opout[index] >> rshift), clipmin, clipmax);
            }
        }
        return clamp(result, clipmin, clipmax);
    }
    /** ym2203::clock_fm */
    clockFm() {
        if (this.modifiedChannels !== 0 || this.prepareCount++ >= 4096) {
            this.activeChannels = 0;
            for (let chnum = 0; chnum < FM.channels; chnum++) {
                let active = 0;
                for (const opnum of FM.operatorMap[chnum]) {
                    if (this.prepareOperator(opnum))
                        active = 1;
                }
                if (active)
                    this.activeChannels |= 1 << chnum;
            }
            this.modifiedChannels = 0;
            this.prepareCount = 0;
        }
        // OPN's envelope clock divider wraps the low two bits of the counter.
        if (FM.egClockDivider === 1)
            this.envCounter += 4;
        else if (bitfield(++this.envCounter, 0, 2) === FM.egClockDivider) {
            this.envCounter += 4 - FM.egClockDivider;
        }
        for (let chnum = 0; chnum < FM.channels; chnum++) {
            this.feedback0[chnum] = this.feedback1[chnum];
            this.feedback1[chnum] = this.feedbackIn[chnum];
            for (const opnum of FM.operatorMap[chnum])
                this.clockOperator(opnum);
        }
        let sum = 0;
        for (let chnum = 0; chnum < FM.channels; chnum++) {
            if (bitfield(this.activeChannels, chnum))
                sum += this.outputChannel(chnum, 0, 32767);
        }
        // OPN is full 14-bit with no intermediate clipping, then a DAC round trip.
        this.lastFm = roundtripFp(clamp(sum, -32768, 32767));
    }
    /** ssg_engine::clock */
    clockSsg() {
        for (let chan = 0; chan < SSG.channels; chan++) {
            this.toneCount[chan] = this.toneCount[chan] + 1;
            if (this.toneCount[chan] >= this.ssg('ch_tone_period', chan)) {
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
    outputSsg() {
        let envelopeVolume;
        const hold = this.ssg('envelope_hold');
        const alternate = this.ssg('envelope_alternate');
        const attackBit = this.ssg('envelope_attack');
        const cont = this.ssg('envelope_continue');
        if ((hold | (cont ^ 1)) && this.envelopeState >= 32) {
            this.envelopeState = 32;
            envelopeVolume = ((attackBit ^ alternate) & cont) ? 31 : 0;
        }
        else {
            let attack = attackBit;
            if (alternate)
                attack ^= bitfield(this.envelopeState, 5);
            envelopeVolume = (this.envelopeState & 31) ^ (attack ? 0 : 31);
        }
        for (let chan = 0; chan < SSG.channels; chan++) {
            const noiseOn = this.ssg('ch_noise_enable_n', chan) | (this.noiseState & 1);
            const toneOn = this.ssg('ch_tone_enable_n', chan) | this.toneState[chan];
            let volume;
            if ((noiseOn & toneOn) === 0)
                volume = 0;
            else if (this.ssg('ch_envelope_enable', chan))
                volume = envelopeVolume;
            else {
                volume = this.ssg('ch_amplitude', chan) * 2;
                if (volume !== 0)
                    volume |= 1;
            }
            this.ssgLast[chan] = SSG.amplitudes[volume];
        }
    }
    /**
     * ym2203::generate for one chip sample. Returns the four MAME stream
     * outputs, which ymfm_ssg_device_base rotates to [SSG0, SSG1, SSG2, FM].
     */
    generate(output) {
        if (this.sampleIndex % this.fmSamplesPerOutput === 0)
            this.clockFm();
        const fm = this.lastFm;
        const [outSamples, srcSamples] = this.ssgResample;
        const sums = [0, 0, 0];
        if (outSamples === 4 && srcSamples === 3) {
            const step = bitfield(this.sampleIndex, 0, 2);
            for (let chan = 0; chan < SSG.channels; chan++)
                sums[chan] += this.ssgLast[chan] * step;
            if (step !== 3) {
                this.clockSsg();
                this.outputSsg();
                for (let chan = 0; chan < SSG.channels; chan++) {
                    sums[chan] += this.ssgLast[chan] * (3 - step);
                }
            }
            for (let chan = 0; chan < SSG.channels; chan++)
                sums[chan] = (sums[chan] / 3) | 0;
        }
        else if (srcSamples === 1) {
            if (this.sampleIndex % outSamples === 0) {
                this.clockSsg();
                this.outputSsg();
            }
            for (let chan = 0; chan < SSG.channels; chan++)
                sums[chan] = this.ssgLast[chan];
        }
        else {
            for (let rep = 0; rep < srcSamples; rep++) {
                this.clockSsg();
                this.outputSsg();
                for (let chan = 0; chan < SSG.channels; chan++)
                    sums[chan] += this.ssgLast[chan];
            }
            for (let chan = 0; chan < SSG.channels; chan++) {
                sums[chan] = (sums[chan] / srcSamples) | 0;
            }
        }
        this.sampleIndex++;
        output[0] = sums[0];
        output[1] = sums[1];
        output[2] = sums[2];
        output[3] = fm;
    }
}
/**
 * Hosts the machine's YM2203 bank, resampling each chip's native ymfm rate to
 * the host output rate and mixing the driver's add_route gains.
 */
export class GeneratedYm2203Mixer {
    chips;
    routes;
    chipRate;
    outputRate;
    scratch = new Int32Array(4);
    held;
    phase = 0;
    lastSample = 0;
    constructor(clock, chips, outputRate, routes) {
        this.chips = Array.from({ length: Math.max(1, chips) }, () => new GeneratedYm2203Chip());
        this.chipRate = clock / plan.sampleRateDivider;
        this.outputRate = outputRate;
        this.held = this.chips.map(() => new Int32Array(4));
        this.routes = routes?.length
            ? routes
            : this.chips.flatMap((_chip, chip) => [0, 1, 2, 3].map(channel => ({ chip, channel, gain: 1, target: 'mono' })));
    }
    /** Register writes arrive as chip * 2 + port, matching the generated board. */
    write(offset, data, method) {
        const chip = Math.floor(offset / 2);
        if (method === 'reset') {
            this.chips[chip]?.reset();
            return;
        }
        this.chips[chip]?.write(offset & 1, data);
    }
    /**
     * One host sample. The chip runs far above the browser output rate, so every
     * chip sample generated for this output sample is averaged rather than point
     * sampled; decimating by picking one sample would alias the SSG, which clocks
     * at nearly twice the output rate.
     */
    sample() {
        this.phase += this.chipRate / this.outputRate;
        let steps = Math.floor(this.phase);
        this.phase -= steps;
        // Never let a long pause collapse into an unbounded catch-up burst.
        if (steps > 64)
            steps = 64;
        let accumulated = 0;
        for (let step = 0; step < steps; step++) {
            for (let chip = 0; chip < this.chips.length; chip++) {
                this.chips[chip].generate(this.scratch);
                this.held[chip].set(this.scratch);
            }
            accumulated += this.routedTotal();
        }
        this.lastSample = steps > 0 ? accumulated / steps : this.lastSample;
        return Math.max(-1, Math.min(1, this.lastSample / 32768));
    }
    routedTotal() {
        let total = 0;
        for (const route of this.routes) {
            const chip = this.held[route.chip];
            if (!chip)
                continue;
            total += (chip[route.channel] ?? 0) * route.gain;
        }
        return total;
    }
}
export class GeneratedYm2203FrameRenderer {
    sampleCarry = 0;
    mixer;
    outputRate;
    refresh;
    constructor(mixer, outputRate, refresh) {
        this.mixer = mixer;
        this.outputRate = outputRate;
        this.refresh = refresh;
    }
    render(writes) {
        this.sampleCarry += this.outputRate / this.refresh;
        const count = Math.floor(this.sampleCarry);
        this.sampleCarry -= count;
        const output = new Float32Array(count);
        let sampleIndex = 0;
        for (const write of writes) {
            const writeSample = Math.ceil(Math.max(0, Math.min(1, write.frac ?? 0)) * count);
            while (sampleIndex < writeSample)
                output[sampleIndex++] = this.mixer.sample();
            this.mixer.write(write.offset, write.data, write.method);
        }
        while (sampleIndex < count)
            output[sampleIndex++] = this.mixer.sample();
        return output;
    }
}
class GeneratedYm2203Processor extends AudioWorkletProcessor {
    mixer;
    renderer;
    frames = [];
    current;
    currentIndex = 0;
    constructor() {
        super();
        this.port.onmessage = (event) => {
            const message = event.data;
            if (message.type === 'init') {
                this.mixer = new GeneratedYm2203Mixer(message.clock ?? 1_500_000, message.chips ?? 1, sampleRate, message.routes);
                this.renderer = new GeneratedYm2203FrameRenderer(this.mixer, sampleRate, message.refresh ?? 60);
            }
            else if (message.type === 'write') {
                this.mixer?.write(message.offset ?? 0, message.data ?? 0, message.method);
            }
            else if (message.type === 'batch') {
                if (this.renderer) {
                    this.frames.push(this.renderer.render(message.writes ?? []));
                    while (this.frames.length > 8)
                        this.frames.shift();
                }
            }
        };
    }
    nextSample() {
        while (!this.current || this.currentIndex >= this.current.length) {
            this.current = this.frames.shift();
            this.currentIndex = 0;
            if (!this.current)
                return 0;
        }
        return this.current[this.currentIndex++];
    }
    process(_inputs, outputs) {
        const channels = outputs[0];
        const output = channels?.[0];
        if (!output)
            return true;
        for (let index = 0; index < output.length; index++) {
            output[index] = this.nextSample();
        }
        for (let channel = 1; channel < (channels?.length ?? 0); channel++) {
            channels[channel].set(output);
        }
        return true;
    }
}
registerProcessor('ym2203', GeneratedYm2203Processor);
