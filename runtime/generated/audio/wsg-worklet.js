// GENERATED from src/devices/sound/namco.cpp:286 and src/devices/sound/namco.h; do not edit.
// Register behavior is executable MAME handler IR. Mixer constants and waveform
// addressing are lowered from namco_audio_device<3, false>.
import { executeGeneratedProgram } from '../../core/generated-handler.js';
const plan = {
    "schemaVersion": 1,
    "type": "NAMCO_WSG",
    "className": "namco_wsg_device",
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
    values = new Float64Array(3);
    levels;
    filters;
    outputGain;
    constructor(plan, sampleRate) {
        this.levels = plan.levels;
        this.outputGain = plan.outputGain;
        this.filters = plan.channels.map(channel => {
            const omega = 2 * Math.PI * channel.frequency / sampleRate;
            const alpha = Math.sin(omega) / (2 * channel.q);
            const a0 = 1 + alpha;
            return {
                input: channel.input,
                gain: channel.gain,
                b0: alpha / a0,
                b2: -alpha / a0,
                a1: -2 * Math.cos(omega) / a0,
                a2: (1 - alpha) / a0,
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 0,
            };
        });
    }
    write(input, data) {
        if (input >= 0 && input < this.values.length) {
            this.values[input] = this.levels[data & 0x0f] ?? 0;
        }
    }
    renderInto(output) {
        for (let index = 0; index < output.length; index++) {
            let mixed = 0;
            for (const filter of this.filters) {
                const x = this.values[filter.input] ?? 0;
                const y = filter.b0 * x + filter.b2 * filter.x2 -
                    filter.a1 * filter.y1 - filter.a2 * filter.y2;
                filter.x2 = filter.x1;
                filter.x1 = x;
                filter.y2 = filter.y1;
                filter.y1 = y;
                mixed += y * filter.gain;
            }
            output[index] = Math.max(-1, Math.min(1, output[index] + mixed * this.outputGain));
        }
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
    constructor(waveRom, clock, auxiliary) {
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
    render(out) {
        out.fill(0);
        if (this.enabled)
            for (const voice of this.voices) {
                const volume = voice.volume[0] ?? 0;
                if (!volume)
                    continue;
                const waveBase = voice.waveform_select << 5;
                let counter = voice.counter >>> 0;
                for (let index = 0; index < out.length; index++) {
                    const position = waveBase | ((counter >>> this.fracBits) & 0x1f);
                    const byte = this.waveRom[(position >>> 0) & 0xff] ?? 0;
                    const sample = (byte & 0x0f) - 8;
                    out[index] += sample * volume / plan.mixResolution;
                    counter = (counter + voice.frequency) >>> 0;
                }
                voice.counter = counter;
            }
        this.discrete?.renderInto(out);
    }
    renderFrame(out, writes) {
        const discreteWrites = [];
        for (const write of writes) {
            if (write.method === 'discrete')
                discreteWrites.push(write);
            else if (write.offset < 0)
                this.soundEnable(write.data);
            else
                this.write(write.offset, write.data);
        }
        let rendered = 0;
        let index = 0;
        while (index < discreteWrites.length) {
            const frac = Math.max(0, Math.min(1, discreteWrites[index].frac ?? 0));
            const position = Math.max(rendered, Math.min(out.length, Math.ceil(frac * out.length)));
            if (position > rendered)
                this.render(out.subarray(rendered, position));
            while (index < discreteWrites.length) {
                const write = discreteWrites[index];
                const writeFrac = Math.max(0, Math.min(1, write.frac ?? 0));
                const writePosition = Math.max(rendered, Math.min(out.length, Math.ceil(writeFrac * out.length)));
                if (writePosition !== position)
                    break;
                this.writeDiscrete(write.offset, write.data);
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
                this.core = new GeneratedNamcoWsgCore(message.waveRom ?? new Uint8Array(0x100), clock, message.auxiliary);
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
                while (this.frames.length > 8)
                    this.frames.shift();
            }
        };
    }
    apply(offset, data, method) {
        if (method === 'discrete')
            this.core?.writeDiscrete(offset, data);
        else if (offset < 0)
            this.core?.soundEnable(data);
        else
            this.core?.write(offset, data);
    }
    nextNative() {
        while (!this.current || this.nativePosition >= this.current.length) {
            this.current = this.frames.shift() ?? null;
            this.nativePosition = 0;
            if (!this.current)
                return 0;
        }
        return this.current[this.nativePosition++];
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
