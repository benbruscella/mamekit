// GENERATED from src/devices/sound/namco.cpp:379 and src/devices/sound/namco.h; do not edit.
// Register behavior is executable MAME handler IR. Mixer constants and waveform
// addressing are lowered from namco_audio_device<8, false>.
import { executeGeneratedProgram } from '../../core/generated-handler.js';
import type { GeneratedHandlerProgram } from '../../ir/board.js';

const plan = {
  "schemaVersion": 1,
  "type": "NAMCO_WSG",
  "className": "polepos_wsg_device",
  "deviceType": "POLEPOS_WSG",
  "voices": 8,
  "packed": false,
  "registerCount": 64,
  "internalRate": 192000,
  "mixResolution": 1024,
  "writeMethod": "polepos_sound_w",
  "readMethod": "polepos_sound_r",
  "writeProgram": {
    "operations": [
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
        "op": "declare",
        "name": "ch",
        "valueType": "int",
        "value": {
          "kind": "binary",
          "operator": ">>",
          "left": {
            "kind": "binary",
            "operator": "&",
            "left": {
              "kind": "identifier",
              "name": "offset"
            },
            "right": {
              "kind": "number",
              "value": 31
            }
          },
          "right": {
            "kind": "number",
            "value": 2
          }
        }
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
          "operator": "&",
          "left": {
            "kind": "identifier",
            "name": "offset"
          },
          "right": {
            "kind": "number",
            "value": 35
          }
        },
        "cases": [
          {
            "values": [
              {
                "kind": "number",
                "value": 0
              },
              {
                "kind": "number",
                "value": 1
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
                        "value": 4
                      }
                    },
                    "right": {
                      "kind": "number",
                      "value": 0
                    }
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
                          "value": 4
                        }
                      },
                      "right": {
                        "kind": "number",
                        "value": 1
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
                "op": "break"
              }
            ]
          },
          {
            "values": [
              {
                "kind": "number",
                "value": 35
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
              }
            ]
          },
          {
            "values": [
              {
                "kind": "number",
                "value": 2
              },
              {
                "kind": "number",
                "value": 3
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
                  "kind": "binary",
                  "operator": ">>",
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
                          "value": 4
                        }
                      },
                      "right": {
                        "kind": "number",
                        "value": 3
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
                    "value": 1
                  }
                },
                "operator": "=",
                "value": {
                  "kind": "binary",
                  "operator": "&",
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
                          "value": 4
                        }
                      },
                      "right": {
                        "kind": "number",
                        "value": 3
                      }
                    }
                  },
                  "right": {
                    "kind": "number",
                    "value": 15
                  }
                }
              },
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
                    "value": 2
                  }
                },
                "operator": "=",
                "value": {
                  "kind": "binary",
                  "operator": ">>",
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
                          "value": 4
                        }
                      },
                      "right": {
                        "kind": "number",
                        "value": 35
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
                    "value": 3
                  }
                },
                "operator": "=",
                "value": {
                  "kind": "binary",
                  "operator": ">>",
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
                          "value": 4
                        }
                      },
                      "right": {
                        "kind": "number",
                        "value": 2
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
                "op": "if",
                "condition": {
                  "kind": "binary",
                  "operator": "&",
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
                          "value": 4
                        }
                      },
                      "right": {
                        "kind": "number",
                        "value": 35
                      }
                    }
                  },
                  "right": {
                    "kind": "number",
                    "value": 8
                  }
                },
                "then": [
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
                      "kind": "assignment",
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
                          "value": 1
                        }
                      },
                      "operator": "=",
                      "value": {
                        "kind": "assignment",
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
                            "value": 2
                          }
                        },
                        "operator": "=",
                        "value": {
                          "kind": "assignment",
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
                              "value": 3
                            }
                          },
                          "operator": "=",
                          "value": {
                            "kind": "number",
                            "value": 0
                          }
                        }
                      }
                    }
                  }
                ]
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
  "engine": {
    "region": "engine",
    "clock": 3072000,
    "outputRate": 24000,
    "routeGain": 0.6930000000000001,
    "volumeTable": [
      0.28,
      0.36,
      0.48,
      0.56,
      0.73,
      0.81,
      0.93,
      1.01
    ],
    "filters": [
      {
        "type": "bandpass",
        "frequency": 150.4456996554281,
        "damping": 0.5425074942071335,
        "gain": -0.8863636363636364,
        "outputResistance": 4700
      },
      {
        "type": "bandpass",
        "frequency": 425.57152076303015,
        "damping": 0.48224282217041214,
        "gain": -1.0999999999999999,
        "outputResistance": 7500
      },
      {
        "type": "highpass",
        "frequency": 950,
        "damping": 1.4144271570014144,
        "gain": 1,
        "outputResistance": 10000
      }
    ],
    "outputResistance": 2241.6534181240063
  },
  "sourceFiles": [
    "src/devices/sound/namco.cpp",
    "src/devices/sound/namco.h",
    "src/mame/namco/polepos_a.cpp",
    "src/mame/namco/polepos.cpp"
  ],
  "source": {
    "file": "src/devices/sound/namco.cpp",
    "line": 379
  }
} as unknown as {
  voices: number;
  packed: boolean;
  registerCount: number;
  internalRate: number;
  mixResolution: number;
  writeProgram: GeneratedHandlerProgram;
  engine?: {
    clock: number;
    outputRate: number;
    routeGain: number;
    volumeTable: number[];
    filters: {
      type: 'bandpass' | 'highpass';
      frequency: number;
      damping: number;
      gain: number;
      outputResistance: number;
    }[];
    outputResistance: number;
  };
};

interface Voice {
  frequency: number;
  counter: number;
  volume: number[];
  waveform_select: number;
}


interface DacFilterPlan {
  levels: number[];
  channels: {
    input: number;
    frequency: number;
    q: number;
    gain: number;
    levels?: number[];
    stages?: {
      type: 'lowpass' | 'highpass' | 'bandpass';
      frequency: number;
      q: number;
      gain: number;
    }[];
    clamp?: { minimum: number; maximum: number };
  }[];
  outputGain: number;
}

interface BiquadState {
  b0: number;
  b1: number;
  b2: number;
  a1: number;
  a2: number;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

interface DacFilterChannelState {
  input: number;
  gain: number;
  levels: number[];
  filters: BiquadState[];
  clamp?: { minimum: number; maximum: number };
}

export interface GeneratedNamcoWsgWrite {
  offset: number;
  data: number;
  frac?: number;
  method?: string;
}

class GeneratedDacFilterCore {
  private readonly values: Float64Array;
  private readonly channels: DacFilterChannelState[];
  private readonly outputGain: number;

  constructor(plan: DacFilterPlan, sampleRate: number) {
    this.values = new Float64Array(
      Math.max(0, ...plan.channels.map(channel => channel.input)) + 1,
    );
    this.outputGain = plan.outputGain;
    const filter = (
      stage: { type: 'lowpass' | 'highpass' | 'bandpass'; frequency: number; q: number; gain: number },
    ): BiquadState => {
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
          ? channel.stages!
          : [{
              type: 'bandpass' as const,
              frequency: channel.frequency,
              q: channel.q,
              gain: channel.gain,
            }]).map(filter),
        clamp: channel.clamp,
      };
    });
  }

  write(input: number, data: number): void {
    if (input >= 0 && input < this.values.length) {
      this.values[input] = data & 0x0f;
    }
  }

  renderInto(output: Float32Array): void {
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
      output[index] = Math.max(-1, Math.min(1, output[index]! + mixed * this.outputGain));
    }
  }
}

interface PoleposBiquadState {
  b0: number;
  b1: number;
  b2: number;
  a1: number;
  a2: number;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  resistance: number;
}

class GeneratedPoleposEngineCore {
  private readonly rom: Uint8Array;
  private readonly sampleRate: number;
  private readonly filters: PoleposBiquadState[];
  private position = 0;
  private msb = 0;
  private lsb = 0;
  private enabled = false;

  constructor(rom: Uint8Array, sampleRate: number) {
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

  write(method: string, data: number): void {
    if (method === 'polepos_engine_sound_lsb_w') {
      this.lsb = data & 62;
      this.enabled = Boolean(data & 1);
    } else if (method === 'polepos_engine_sound_msb_w') {
      this.msb = data & 63;
    } else if (method === 'clson_w' && !data) {
      this.lsb = 0;
      this.msb = 0;
      this.enabled = false;
    }
  }

  sample(): number {
    const engine = plan.engine;
    if (!engine || !this.enabled || !this.rom.length) return 0;
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
  readonly sampleRate: number;
  private readonly waveRom: Uint8Array;
  private readonly voices: Voice[];
  private readonly soundregs = new Uint8Array(plan.registerCount);
  private enabled = true;
  private readonly fracBits: number;
  private readonly discrete?: GeneratedDacFilterCore;
  private readonly engine?: GeneratedPoleposEngineCore;

  constructor(
    waveRom: Uint8Array,
    clock: number,
    auxiliary?: DacFilterPlan,
    engineRom?: Uint8Array,
  ) {
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
    if (auxiliary) this.discrete = new GeneratedDacFilterCore(auxiliary, this.sampleRate);
    if (plan.engine && engineRom) {
      this.engine = new GeneratedPoleposEngineCore(engineRom, this.sampleRate);
    }
  }

  soundEnable(state: number): void {
    this.enabled = state !== 0;
  }

  write(offset: number, data: number): void {
    executeGeneratedProgram(
      plan.writeProgram,
      {
        members: {
          m_soundregs: this.soundregs,
          m_channel_list: this.voices,
          m_stream: { update: () => 0 },
        },
        constants: { MAX_VOICES: plan.voices },
      },
      { offset, data },
    );
  }

  writeDiscrete(channel: number, data: number): void {
    this.discrete?.write(channel, data);
  }

  writeEngine(method: string, data: number): void {
    this.engine?.write(method, data);
  }

  render(out: Float32Array): void {
    out.fill(0);
    if (this.enabled) for (let voiceIndex = 0; voiceIndex < this.voices.length; voiceIndex++) {
      const voice = this.voices[voiceIndex]!;
      let volume = plan.engine
        ? voice.volume.reduce((sum, value) => sum + value, 0) / 4
        : voice.volume[0] ?? 0;
      if (!volume) continue;
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
      for (let index = 0; index < out.length; index++) out[index] += this.engine.sample();
    }
    this.discrete?.renderInto(out);
  }

  renderFrame(out: Float32Array, writes: readonly GeneratedNamcoWsgWrite[]): void {
    let rendered = 0;
    let index = 0;
    while (index < writes.length) {
      const frac = Math.max(0, Math.min(1, writes[index]!.frac ?? 0));
      const position = Math.max(rendered, Math.min(out.length, Math.ceil(frac * out.length)));
      if (position > rendered) this.render(out.subarray(rendered, position));
      while (index < writes.length) {
        const write = writes[index]!;
        const writeFrac = Math.max(0, Math.min(1, write.frac ?? 0));
        const writePosition = Math.max(rendered, Math.min(out.length, Math.ceil(writeFrac * out.length)));
        if (writePosition !== position) break;
        if (write.method === 'discrete') this.writeDiscrete(write.offset, write.data);
        else if (write.method?.startsWith('polepos_engine_') || write.method === 'clson_w') {
          this.writeEngine(write.method, write.data);
        }
        else if (write.offset < 0) this.soundEnable(write.data);
        else this.write(write.offset, write.data);
        index++;
      }
      rendered = position;
    }
    if (rendered < out.length) this.render(out.subarray(rendered));
  }
}

export class GeneratedNamcoWsgFrameRenderer {
  private carry = 0;
  private readonly core: GeneratedNamcoWsgCore;
  private readonly refresh: number;

  constructor(core: GeneratedNamcoWsgCore, refresh: number) {
    this.core = core;
    this.refresh = refresh;
  }

  render(writes: readonly GeneratedNamcoWsgWrite[]): Float32Array {
    this.carry += this.core.sampleRate / this.refresh;
    const count = Math.floor(this.carry);
    this.carry -= count;
    const output = new Float32Array(count);
    this.core.renderFrame(output, writes);
    return output;
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

class GeneratedNamcoWsgProcessor extends AudioWorkletProcessor {
  private core: GeneratedNamcoWsgCore | null = null;
  private renderer: GeneratedNamcoWsgFrameRenderer | null = null;
  private step = 1;
  private fraction = 0;
  private sample0 = 0;
  private sample1 = 0;
  private readonly frames: Float32Array[] = [];
  private current: Float32Array | null = null;
  private nativePosition = 0;

  constructor() {
    super();
    this.port.onmessage = (event: MessageEvent) => {
      const message = event.data as {
        type: string;
        waveRom?: Uint8Array;
        sampleRom?: Uint8Array;
        clock?: number;
        refresh?: number;
        offset?: number;
        data?: number;
        method?: string;
        auxiliary?: DacFilterPlan;
        writes?: GeneratedNamcoWsgWrite[];
      };
      if (message.type === 'init') {
        const clock = message.clock ?? 96_000;
        this.core = new GeneratedNamcoWsgCore(
          message.waveRom ?? new Uint8Array(0x100),
          clock,
          message.auxiliary,
          message.sampleRom,
        );
        this.renderer = new GeneratedNamcoWsgFrameRenderer(
          this.core,
          message.refresh ?? 60,
        );
        this.step = this.core.sampleRate / sampleRate;
        this.current = null;
        this.nativePosition = 0;
      } else if (message.type === 'write') {
        this.apply(message.offset ?? 0, message.data ?? 0, message.method);
      } else if (message.type === 'batch' && this.renderer) {
        this.frames.push(this.renderer.render(message.writes ?? []));
        while (this.frames.length > 3) this.frames.shift();
      }
    };
  }

  private apply(offset: number, data: number, method?: string): void {
    if (method === 'discrete') this.core?.writeDiscrete(offset, data);
    else if (method?.startsWith('polepos_engine_') || method === 'clson_w') {
      this.core?.writeEngine(method, data);
    }
    else if (offset < 0) this.core?.soundEnable(data);
    else this.core?.write(offset, data);
  }

  private lastSample = 0;

  private nextNative(): number {
    while (!this.current || this.nativePosition >= this.current.length) {
      this.current = this.frames.shift() ?? null;
      this.nativePosition = 0;
      // Starved: hold the last sample. A 0-fill is a hard step on any
      // mix with a DC offset (e.g. tied-pin AY outputs) and pops loudly.
      if (!this.current) return this.lastSample;
    }
    return (this.lastSample = this.current[this.nativePosition++]!);
  }

  process(_inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
    const channels = outputs[0];
    const output = channels?.[0];
    if (!output) return true;
    if (!this.core) {
      output.fill(0);
    } else {
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
      channels![channel]!.set(output);
    }
    return true;
  }
}

registerProcessor('wsg', GeneratedNamcoWsgProcessor);
