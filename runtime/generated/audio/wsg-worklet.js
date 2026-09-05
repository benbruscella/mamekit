// GENERATED from src/devices/sound/namco.cpp:286 and src/devices/sound/namco.h; do not edit.
// Register behavior is executable MAME handler IR. Mixer constants and waveform
// addressing are lowered from namco_audio_device<3, false>.
import { executeGeneratedProgram } from '../../core/generated-handler.js';
const plan = {
    "schemaVersion": 1,
    "type": "NAMCO_WSG",
    "className": "namco_wsg_device",
    "deviceType": "NAMCO_WSG",
    "voices": 3,
    "packed": false,
    "registerCount": 32,
    "internalRate": 192000,
    "mixResolution": 384,
    "writeMethod": "pacman_sound_w",
    "writeProgram": {
        "operations": [
            {
                "op": "declare",
                "name": "ch",
                "valueType": "int"
            },
            {
                "op": "assign",
                "target": {
                    "kind": "identifier",
                    "name": "data"
                },
                "operator": "&=",
                "value": {
                    "kind": "number",
                    "value": 15
                }
            },
            {
                "op": "if",
                "condition": {
                    "kind": "binary",
                    "operator": "==",
                    "left": {
                        "kind": "index",
                        "object": {
                            "kind": "identifier",
                            "name": "m_soundregs"
                        },
                        "index": {
                            "kind": "identifier",
                            "name": "offset"
                        }
                    },
                    "right": {
                        "kind": "identifier",
                        "name": "data"
                    }
                },
                "then": [
                    {
                        "op": "return"
                    }
                ]
            },
            {
                "op": "call",
                "expression": {
                    "kind": "call",
                    "callee": {
                        "kind": "member",
                        "object": {
                            "kind": "identifier",
                            "name": "m_stream"
                        },
                        "property": "update"
                    },
                    "args": []
                }
            },
            {
                "op": "assign",
                "target": {
                    "kind": "index",
                    "object": {
                        "kind": "identifier",
                        "name": "m_soundregs"
                    },
                    "index": {
                        "kind": "identifier",
                        "name": "offset"
                    }
                },
                "operator": "=",
                "value": {
                    "kind": "identifier",
                    "name": "data"
                }
            },
            {
                "op": "if",
                "condition": {
                    "kind": "binary",
                    "operator": "<",
                    "left": {
                        "kind": "identifier",
                        "name": "offset"
                    },
                    "right": {
                        "kind": "number",
                        "value": 16
                    }
                },
                "then": [
                    {
                        "op": "assign",
                        "target": {
                            "kind": "identifier",
                            "name": "ch"
                        },
                        "operator": "=",
                        "value": {
                            "kind": "binary",
                            "operator": "/",
                            "left": {
                                "kind": "binary",
                                "operator": "-",
                                "left": {
                                    "kind": "identifier",
                                    "name": "offset"
                                },
                                "right": {
                                    "kind": "number",
                                    "value": 5
                                }
                            },
                            "right": {
                                "kind": "number",
                                "value": 5
                            }
                        }
                    }
                ],
                "else": [
                    {
                        "op": "if",
                        "condition": {
                            "kind": "binary",
                            "operator": "==",
                            "left": {
                                "kind": "identifier",
                                "name": "offset"
                            },
                            "right": {
                                "kind": "number",
                                "value": 16
                            }
                        },
                        "then": [
                            {
                                "op": "assign",
                                "target": {
                                    "kind": "identifier",
                                    "name": "ch"
                                },
                                "operator": "=",
                                "value": {
                                    "kind": "number",
                                    "value": 0
                                }
                            }
                        ],
                        "else": [
                            {
                                "op": "assign",
                                "target": {
                                    "kind": "identifier",
                                    "name": "ch"
                                },
                                "operator": "=",
                                "value": {
                                    "kind": "binary",
                                    "operator": "/",
                                    "left": {
                                        "kind": "binary",
                                        "operator": "-",
                                        "left": {
                                            "kind": "identifier",
                                            "name": "offset"
                                        },
                                        "right": {
                                            "kind": "number",
                                            "value": 17
                                        }
                                    },
                                    "right": {
                                        "kind": "number",
                                        "value": 5
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "op": "if",
                "condition": {
                    "kind": "binary",
                    "operator": ">=",
                    "left": {
                        "kind": "identifier",
                        "name": "ch"
                    },
                    "right": {
                        "kind": "identifier",
                        "name": "MAX_VOICES"
                    }
                },
                "then": [
                    {
                        "op": "return"
                    }
                ]
            },
            {
                "op": "declare",
                "name": "voice",
                "valueType": "sound_channel&",
                "value": {
                    "kind": "index",
                    "object": {
                        "kind": "identifier",
                        "name": "m_channel_list"
                    },
                    "index": {
                        "kind": "identifier",
                        "name": "ch"
                    }
                }
            },
            {
                "op": "switch",
                "expression": {
                    "kind": "binary",
                    "operator": "-",
                    "left": {
                        "kind": "identifier",
                        "name": "offset"
                    },
                    "right": {
                        "kind": "binary",
                        "operator": "*",
                        "left": {
                            "kind": "identifier",
                            "name": "ch"
                        },
                        "right": {
                            "kind": "number",
                            "value": 5
                        }
                    }
                },
                "cases": [
                    {
                        "values": [
                            {
                                "kind": "number",
                                "value": 5
                            }
                        ],
                        "body": [
                            {
                                "op": "assign",
                                "target": {
                                    "kind": "member",
                                    "object": {
                                        "kind": "identifier",
                                        "name": "voice"
                                    },
                                    "property": "waveform_select"
                                },
                                "operator": "=",
                                "value": {
                                    "kind": "binary",
                                    "operator": "&",
                                    "left": {
                                        "kind": "identifier",
                                        "name": "data"
                                    },
                                    "right": {
                                        "kind": "number",
                                        "value": 7
                                    }
                                }
                            },
                            {
                                "op": "break"
                            }
                        ]
                    },
                    {
                        "values": [
                            {
                                "kind": "number",
                                "value": 16
                            },
                            {
                                "kind": "number",
                                "value": 17
                            },
                            {
                                "kind": "number",
                                "value": 18
                            },
                            {
                                "kind": "number",
                                "value": 19
                            },
                            {
                                "kind": "number",
                                "value": 20
                            }
                        ],
                        "body": [
                            {
                                "op": "assign",
                                "target": {
                                    "kind": "member",
                                    "object": {
                                        "kind": "identifier",
                                        "name": "voice"
                                    },
                                    "property": "frequency"
                                },
                                "operator": "=",
                                "value": {
                                    "kind": "conditional",
                                    "condition": {
                                        "kind": "binary",
                                        "operator": "==",
                                        "left": {
                                            "kind": "identifier",
                                            "name": "ch"
                                        },
                                        "right": {
                                            "kind": "number",
                                            "value": 0
                                        }
                                    },
                                    "whenTrue": {
                                        "kind": "index",
                                        "object": {
                                            "kind": "identifier",
                                            "name": "m_soundregs"
                                        },
                                        "index": {
                                            "kind": "number",
                                            "value": 16
                                        }
                                    },
                                    "whenFalse": {
                                        "kind": "number",
                                        "value": 0
                                    }
                                }
                            },
                            {
                                "op": "assign",
                                "target": {
                                    "kind": "member",
                                    "object": {
                                        "kind": "identifier",
                                        "name": "voice"
                                    },
                                    "property": "frequency"
                                },
                                "operator": "+=",
                                "value": {
                                    "kind": "binary",
                                    "operator": "<<",
                                    "left": {
                                        "kind": "index",
                                        "object": {
                                            "kind": "identifier",
                                            "name": "m_soundregs"
                                        },
                                        "index": {
                                            "kind": "binary",
                                            "operator": "+",
                                            "left": {
                                                "kind": "binary",
                                                "operator": "*",
                                                "left": {
                                                    "kind": "identifier",
                                                    "name": "ch"
                                                },
                                                "right": {
                                                    "kind": "number",
                                                    "value": 5
                                                }
                                            },
                                            "right": {
                                                "kind": "number",
                                                "value": 17
                                            }
                                        }
                                    },
                                    "right": {
                                        "kind": "number",
                                        "value": 4
                                    }
                                }
                            },
                            {
                                "op": "assign",
                                "target": {
                                    "kind": "member",
                                    "object": {
                                        "kind": "identifier",
                                        "name": "voice"
                                    },
                                    "property": "frequency"
                                },
                                "operator": "+=",
                                "value": {
                                    "kind": "binary",
                                    "operator": "<<",
                                    "left": {
                                        "kind": "index",
                                        "object": {
                                            "kind": "identifier",
                                            "name": "m_soundregs"
                                        },
                                        "index": {
                                            "kind": "binary",
                                            "operator": "+",
                                            "left": {
                                                "kind": "binary",
                                                "operator": "*",
                                                "left": {
                                                    "kind": "identifier",
                                                    "name": "ch"
                                                },
                                                "right": {
                                                    "kind": "number",
                                                    "value": 5
                                                }
                                            },
                                            "right": {
                                                "kind": "number",
                                                "value": 18
                                            }
                                        }
                                    },
                                    "right": {
                                        "kind": "number",
                                        "value": 8
                                    }
                                }
                            },
                            {
                                "op": "assign",
                                "target": {
                                    "kind": "member",
                                    "object": {
                                        "kind": "identifier",
                                        "name": "voice"
                                    },
                                    "property": "frequency"
                                },
                                "operator": "+=",
                                "value": {
                                    "kind": "binary",
                                    "operator": "<<",
                                    "left": {
                                        "kind": "index",
                                        "object": {
                                            "kind": "identifier",
                                            "name": "m_soundregs"
                                        },
                                        "index": {
                                            "kind": "binary",
                                            "operator": "+",
                                            "left": {
                                                "kind": "binary",
                                                "operator": "*",
                                                "left": {
                                                    "kind": "identifier",
                                                    "name": "ch"
                                                },
                                                "right": {
                                                    "kind": "number",
                                                    "value": 5
                                                }
                                            },
                                            "right": {
                                                "kind": "number",
                                                "value": 19
                                            }
                                        }
                                    },
                                    "right": {
                                        "kind": "number",
                                        "value": 12
                                    }
                                }
                            },
                            {
                                "op": "assign",
                                "target": {
                                    "kind": "member",
                                    "object": {
                                        "kind": "identifier",
                                        "name": "voice"
                                    },
                                    "property": "frequency"
                                },
                                "operator": "+=",
                                "value": {
                                    "kind": "binary",
                                    "operator": "<<",
                                    "left": {
                                        "kind": "index",
                                        "object": {
                                            "kind": "identifier",
                                            "name": "m_soundregs"
                                        },
                                        "index": {
                                            "kind": "binary",
                                            "operator": "+",
                                            "left": {
                                                "kind": "binary",
                                                "operator": "*",
                                                "left": {
                                                    "kind": "identifier",
                                                    "name": "ch"
                                                },
                                                "right": {
                                                    "kind": "number",
                                                    "value": 5
                                                }
                                            },
                                            "right": {
                                                "kind": "number",
                                                "value": 20
                                            }
                                        }
                                    },
                                    "right": {
                                        "kind": "number",
                                        "value": 16
                                    }
                                }
                            },
                            {
                                "op": "break"
                            }
                        ]
                    },
                    {
                        "values": [
                            {
                                "kind": "number",
                                "value": 21
                            }
                        ],
                        "body": [
                            {
                                "op": "assign",
                                "target": {
                                    "kind": "index",
                                    "object": {
                                        "kind": "member",
                                        "object": {
                                            "kind": "identifier",
                                            "name": "voice"
                                        },
                                        "property": "volume"
                                    },
                                    "index": {
                                        "kind": "number",
                                        "value": 0
                                    }
                                },
                                "operator": "=",
                                "value": {
                                    "kind": "identifier",
                                    "name": "data"
                                }
                            },
                            {
                                "op": "break"
                            }
                        ]
                    }
                ]
            }
        ],
        "diagnostics": []
    },
    "sourceFiles": [
        "src/devices/sound/namco.cpp",
        "src/devices/sound/namco.h"
    ],
    "source": {
        "file": "src/devices/sound/namco.cpp",
        "line": 286
    }
};
class GeneratedDacFilterCore {
    values;
    channels;
    outputGain;
    constructor(plan, sampleRate) {
        this.values = new Float64Array(Math.max(0, ...plan.channels.map(channel => channel.input)) + 1);
        this.outputGain = plan.outputGain;
        const filter = (stage) => {
            const omega = 2 * Math.PI * stage.frequency / sampleRate;
            const cosine = Math.cos(omega);
            const alpha = Math.sin(omega) / (2 * stage.q);
            const a0 = 1 + alpha;
            const b0 = stage.type === 'lowpass'
                ? (1 - cosine) / 2 / a0
                : stage.type === 'highpass'
                    ? (1 + cosine) / 2 / a0
                    : alpha / a0;
            return {
                b0: b0 * stage.gain,
                b1: (stage.type === 'lowpass'
                    ? (1 - cosine) / a0
                    : stage.type === 'highpass'
                        ? -(1 + cosine) / a0
                        : 0) * stage.gain,
                b2: (stage.type === 'lowpass'
                    ? b0
                    : stage.type === 'highpass'
                        ? b0
                        : -b0) * stage.gain,
                a1: -2 * cosine / a0,
                a2: (1 - alpha) / a0,
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 0,
            };
        };
        this.channels = plan.channels.map(channel => {
            const explicitStages = Boolean(channel.stages?.length);
            return {
                input: channel.input,
                // A primary op-amp's gain is part of the filter and therefore precedes
                // its rail clamp. Explicit cascades keep their optional post gain.
                gain: explicitStages ? channel.gain : 1,
                levels: channel.levels ?? plan.levels,
                filters: (explicitStages
                    ? channel.stages
                    : [{
                            type: 'bandpass',
                            frequency: channel.frequency,
                            q: channel.q,
                            gain: channel.gain,
                        }]).map(filter),
                clamp: channel.clamp,
            };
        });
    }
    write(input, data) {
        if (input >= 0 && input < this.values.length) {
            this.values[input] = data & 0x0f;
        }
    }
    renderInto(output) {
        for (let index = 0; index < output.length; index++) {
            let mixed = 0;
            for (const channel of this.channels) {
                let value = channel.levels[(this.values[channel.input] ?? 0) & 0x0f] ?? 0;
                for (const filter of channel.filters) {
                    const next = filter.b0 * value + filter.b1 * filter.x1 + filter.b2 * filter.x2 -
                        filter.a1 * filter.y1 - filter.a2 * filter.y2;
                    filter.x2 = filter.x1;
                    filter.x1 = value;
                    filter.y2 = filter.y1;
                    filter.y1 = next;
                    value = next;
                }
                if (channel.clamp) {
                    value = Math.max(channel.clamp.minimum, Math.min(channel.clamp.maximum, value));
                }
                mixed += value * channel.gain;
            }
            output[index] = Math.max(-1, Math.min(1, output[index] + mixed * this.outputGain));
        }
    }
}
class GeneratedPoleposEngineCore {
    rom;
    sampleRate;
    filters;
    position = 0;
    msb = 0;
    lsb = 0;
    enabled = false;
    constructor(rom, sampleRate) {
        this.rom = rom;
        this.sampleRate = sampleRate;
        this.filters = (plan.engine?.filters ?? []).map(filter => {
            const twoOverT = 2 * sampleRate;
            const warped = sampleRate * 2 * Math.tan(Math.PI * filter.frequency / sampleRate);
            const denominator = twoOverT ** 2 + filter.damping * warped * twoOverT + warped ** 2;
            const highpass = filter.type === 'highpass';
            const b0 = (highpass ? twoOverT ** 2 : filter.damping * warped * twoOverT) /
                denominator * filter.gain;
            return {
                b0,
                b1: highpass ? -2 * b0 : 0,
                b2: highpass ? b0 : -b0,
                a1: 2 * (-(twoOverT ** 2) + warped ** 2) / denominator,
                a2: (twoOverT ** 2 - filter.damping * warped * twoOverT + warped ** 2) /
                    denominator,
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 0,
                resistance: filter.outputResistance,
            };
        });
    }
    write(method, data) {
        if (method === 'polepos_engine_sound_lsb_w') {
            this.lsb = data & 62;
            this.enabled = Boolean(data & 1);
        }
        else if (method === 'polepos_engine_sound_msb_w') {
            this.msb = data & 63;
        }
        else if (method === 'clson_w' && !data) {
            this.lsb = 0;
            this.msb = 0;
            this.enabled = false;
        }
    }
    sample() {
        const engine = plan.engine;
        if (!engine || !this.enabled || !this.rom.length)
            return 0;
        const slot = (this.msb >>> 3) & 7;
        const volume = engine.volumeTable[slot] ?? 0;
        const byte = this.rom[slot * 0x800 + (Math.floor(this.position) & 0x7ff)] ?? 0;
        const input = (3.4 / 255 * byte - 2) * volume;
        const clock = engine.clock / 16 * ((this.msb + 1) * 64 + this.lsb + 1) / (64 * 64);
        this.position += clock / this.sampleRate;
        let current = 0;
        for (const filter of this.filters) {
            let output = filter.b0 * input + filter.b1 * filter.x1 + filter.b2 * filter.x2 -
                filter.a1 * filter.y1 - filter.a2 * filter.y2;
            filter.x2 = filter.x1;
            filter.x1 = input;
            filter.y2 = filter.y1;
            filter.y1 = output;
            output = Math.max(-2, Math.min(1.5, output));
            current += output / filter.resistance;
        }
        return current * engine.outputResistance / 2 * engine.routeGain;
    }
}
export class GeneratedNamcoWsgCore {
    sampleRate;
    waveRom;
    voices;
    soundregs = new Uint8Array(plan.registerCount);
    enabled = true;
    fracBits;
    discrete;
    engine;
    constructor(waveRom, clock, auxiliary, engineRom) {
        this.waveRom = waveRom;
        let nativeClock = clock;
        let clockMultiple = 0;
        while (nativeClock < plan.internalRate) {
            nativeClock *= 2;
            clockMultiple++;
        }
        this.sampleRate = nativeClock;
        this.fracBits = clockMultiple + 15;
        this.voices = Array.from({ length: plan.voices }, () => ({
            frequency: 0,
            counter: 0,
            volume: [0, 0, 0, 0],
            waveform_select: 0,
        }));
        if (auxiliary)
            this.discrete = new GeneratedDacFilterCore(auxiliary, this.sampleRate);
        if (plan.engine && engineRom) {
            this.engine = new GeneratedPoleposEngineCore(engineRom, this.sampleRate);
        }
    }
    soundEnable(state) {
        this.enabled = state !== 0;
    }
    write(offset, data) {
        executeGeneratedProgram(plan.writeProgram, {
            members: {
                m_soundregs: this.soundregs,
                m_channel_list: this.voices,
                m_stream: { update: () => 0 },
            },
            constants: { MAX_VOICES: plan.voices },
        }, { offset, data });
    }
    writeDiscrete(channel, data) {
        this.discrete?.write(channel, data);
    }
    writeEngine(method, data) {
        this.engine?.write(method, data);
    }
    render(out) {
        out.fill(0);
        if (this.enabled)
            for (let voiceIndex = 0; voiceIndex < this.voices.length; voiceIndex++) {
                const voice = this.voices[voiceIndex];
                let volume = plan.engine
                    ? voice.volume.reduce((sum, value) => sum + value, 0) / 4
                    : voice.volume[0] ?? 0;
                if (!volume)
                    continue;
                const frequency = voice.frequency;
                const waveBase = voice.waveform_select << 5;
                let counter = voice.counter >>> 0;
                for (let index = 0; index < out.length; index++) {
                    const position = waveBase | ((counter >>> this.fracBits) & 0x1f);
                    const byte = this.waveRom[(position >>> 0) & 0xff] ?? 0;
                    const sample = (byte & 0x0f) - 8;
                    out[index] += sample * volume / plan.mixResolution;
                    counter = (counter + frequency) >>> 0;
                }
                voice.counter = counter;
            }
        if (this.engine) {
            for (let index = 0; index < out.length; index++)
                out[index] += this.engine.sample();
        }
        this.discrete?.renderInto(out);
    }
    renderFrame(out, writes) {
        let rendered = 0;
        let index = 0;
        while (index < writes.length) {
            const frac = Math.max(0, Math.min(1, writes[index].frac ?? 0));
            const position = Math.max(rendered, Math.min(out.length, Math.ceil(frac * out.length)));
            if (position > rendered)
                this.render(out.subarray(rendered, position));
            while (index < writes.length) {
                const write = writes[index];
                const writeFrac = Math.max(0, Math.min(1, write.frac ?? 0));
                const writePosition = Math.max(rendered, Math.min(out.length, Math.ceil(writeFrac * out.length)));
                if (writePosition !== position)
                    break;
                if (write.method === 'discrete')
                    this.writeDiscrete(write.offset, write.data);
                else if (write.method?.startsWith('polepos_engine_') || write.method === 'clson_w') {
                    this.writeEngine(write.method, write.data);
                }
                else if (write.offset < 0)
                    this.soundEnable(write.data);
                else
                    this.write(write.offset, write.data);
                index++;
            }
            rendered = position;
        }
        if (rendered < out.length)
            this.render(out.subarray(rendered));
    }
}
export class GeneratedNamcoWsgFrameRenderer {
    carry = 0;
    core;
    refresh;
    constructor(core, refresh) {
        this.core = core;
        this.refresh = refresh;
    }
    render(writes) {
        this.carry += this.core.sampleRate / this.refresh;
        const count = Math.floor(this.carry);
        this.carry -= count;
        const output = new Float32Array(count);
        this.core.renderFrame(output, writes);
        return output;
    }
}
class GeneratedNamcoWsgProcessor extends AudioWorkletProcessor {
    core = null;
    renderer = null;
    step = 1;
    fraction = 0;
    sample0 = 0;
    sample1 = 0;
    frames = [];
    current = null;
    nativePosition = 0;
    constructor() {
        super();
        this.port.onmessage = (event) => {
            const message = event.data;
            if (message.type === 'init') {
                const clock = message.clock ?? 96_000;
                this.core = new GeneratedNamcoWsgCore(message.waveRom ?? new Uint8Array(0x100), clock, message.auxiliary, message.sampleRom);
                this.renderer = new GeneratedNamcoWsgFrameRenderer(this.core, message.refresh ?? 60);
                this.step = this.core.sampleRate / sampleRate;
                this.current = null;
                this.nativePosition = 0;
            }
            else if (message.type === 'write') {
                this.apply(message.offset ?? 0, message.data ?? 0, message.method);
            }
            else if (message.type === 'batch' && this.renderer) {
                this.frames.push(this.renderer.render(message.writes ?? []));
                while (this.frames.length > 3)
                    this.frames.shift();
            }
        };
    }
    apply(offset, data, method) {
        if (method === 'discrete')
            this.core?.writeDiscrete(offset, data);
        else if (method?.startsWith('polepos_engine_') || method === 'clson_w') {
            this.core?.writeEngine(method, data);
        }
        else if (offset < 0)
            this.core?.soundEnable(data);
        else
            this.core?.write(offset, data);
    }
    lastSample = 0;
    nextNative() {
        while (!this.current || this.nativePosition >= this.current.length) {
            this.current = this.frames.shift() ?? null;
            this.nativePosition = 0;
            // Starved: hold the last sample. A 0-fill is a hard step on any
            // mix with a DC offset (e.g. tied-pin AY outputs) and pops loudly.
            if (!this.current)
                return this.lastSample;
        }
        return (this.lastSample = this.current[this.nativePosition++]);
    }
    process(_inputs, outputs) {
        const channels = outputs[0];
        const output = channels?.[0];
        if (!output)
            return true;
        if (!this.core) {
            output.fill(0);
        }
        else {
            for (let index = 0; index < output.length; index++) {
                this.fraction += this.step;
                while (this.fraction >= 1) {
                    this.fraction -= 1;
                    this.sample0 = this.sample1;
                    this.sample1 = this.nextNative();
                }
                output[index] = this.sample0 + (this.sample1 - this.sample0) * this.fraction;
            }
        }
        for (let channel = 1; channel < (channels?.length ?? 0); channel++) {
            channels[channel].set(output);
        }
        return true;
    }
}
registerProcessor('wsg', GeneratedNamcoWsgProcessor);
