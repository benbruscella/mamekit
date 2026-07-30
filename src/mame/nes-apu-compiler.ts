import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { GeneratedNesApuPlan } from '../ir/audio-protocol.ts';

const DEFINITIONS_FILE = 'src/devices/sound/nes_defs.h';
const APU_FILE = 'src/devices/sound/nes_apu.cpp';
const APU_HEADER_FILE = 'src/devices/sound/nes_apu.h';
const CPU_FILE = 'src/devices/cpu/m6502/rp2a03.cpp';

/**
 * Lower the RP2A03's internal APU map and DSP constants from MAME.  The
 * executable core is shared typed runtime code; this plan is the auditable
 * source-derived data that selects its register map, timing and lookup tables.
 */
export function compileNesApu(mameSource: string): GeneratedNesApuPlan {
  const definitions = readFileSync(join(mameSource, DEFINITIONS_FILE), 'utf8');
  const apu = readFileSync(join(mameSource, APU_FILE), 'utf8');
  const header = readFileSync(join(mameSource, APU_HEADER_FILE), 'utf8');
  const cpu = readFileSync(join(mameSource, CPU_FILE), 'utf8');

  const lengthTable = oneDimensionalTable(definitions, 'vbl_length', 32);
  const noise = twoDimensionalTable(definitions, 'noise_freq', 2, 16);
  const dmc = twoDimensionalTable(definitions, 'dpcm_clocks', 2, 16);
  const dutyPatterns = oneDimensionalTable(definitions, 'duty_lut', 4);
  const ntscClock = requiredNumber(
    /NTSC_APU_CLOCK\s*=\s*([^;]+);/.exec(header)?.[1],
    'NTSC_APU_CLOCK',
  );
  const palClock = requiredNumber(
    /PAL_APU_CLOCK\s*=\s*([^;]+);/.exec(header)?.[1],
    'PAL_APU_CLOCK',
  );
  const streamDivider = requiredNumber(
    /int\s+rate\s*=\s*clock\(\)\s*\/\s*(\d+)\s*;/.exec(apu)?.[1],
    'APU stream divider',
  );
  const frameMatch =
    /m_frame_clocks\s*=\s*m_is_pal\s*\?\s*(\d+)\s*:\s*(\d+)\s*;/.exec(apu);
  if (!frameMatch) throw new Error('MAME NES APU frame clocks are missing');

  const pulseMixer = requiredMatch(
    /pulse_out\s*=\s*\(i\s*==\s*0\)\s*\?\s*0\.0\s*:\s*([\d.]+)\s*\/\s*\(\([\d.]+\s*\/\s*i\)\s*\+\s*([\d.]+)\)/,
    apu,
    'pulse mixer',
  );
  // The divisor is intentionally captured separately because MAME has used
  // both integer and decimal spelling over its history.
  const pulseDivisor = requiredNumber(
    /pulse_out[\s\S]*?\(\(([\d.]+)\s*\/\s*i\)/.exec(apu)?.[1],
    'pulse mixer divisor',
  );
  const tndMixer = requiredMatch(
    /tnd_out\s*=\s*\(t\s*\/\s*([\d.]+)\)\s*\+\s*\(n\s*\/\s*([\d.]+)\)\s*\+\s*\(d\s*\/\s*([\d.]+)\)[\s\S]*?([\d.]+)\s*\/\s*\(\(1\.0\s*\/\s*tnd_out\)\s*\+\s*([\d.]+)\)/,
    apu,
    'TND mixer',
  );

  const internalMap = parseRp2a03ApuMap(cpu);
  const writeSource = methodSource(apu, APU_FILE, 'void nesapu_device::write');
  const statusSource = methodSource(apu, APU_FILE, 'u8 nesapu_device::status_r');
  return {
    schemaVersion: 1,
    type: 'NES_APU',
    className: 'nesapu_device',
    internalMap: { ranges: internalMap },
    lengthTable,
    noisePeriods: { ntsc: noise[0]!, pal: noise[1]! },
    dmcPeriods: { ntsc: dmc[0]!, pal: dmc[1]! },
    dutyPatterns,
    clocks: { ntsc: ntscClock, pal: palClock, streamDivider },
    frameClocks: { ntsc: Number(frameMatch[2]), pal: Number(frameMatch[1]) },
    mixer: {
      pulse: {
        numerator: Number(pulseMixer[1]),
        divisor: pulseDivisor,
        bias: Number(pulseMixer[2]),
      },
      tnd: {
        numerator: Number(tndMixer[4]),
        triangleDivisor: Number(tndMixer[1]),
        noiseDivisor: Number(tndMixer[2]),
        dmcDivisor: Number(tndMixer[3]),
        bias: Number(tndMixer[5]),
      },
    },
    writeMethod: 'write',
    statusMethod: 'status_r',
    sourceFiles: [CPU_FILE, APU_FILE, APU_HEADER_FILE, DEFINITIONS_FILE],
    source: writeSource,
  };
}

function parseRp2a03ApuMap(
  source: string,
): GeneratedNesApuPlan['internalMap']['ranges'] {
  const bodyMatch =
    /void\s+rp2a03_device::rp2a03_map\s*\([^)]*\)\s*\{([\s\S]*?)\n\}/.exec(source);
  if (!bodyMatch) throw new Error('MAME RP2A03 internal map is missing');
  const body = bodyMatch[1]!;
  const baseLine = lineAt(source, bodyMatch.index + bodyMatch[0].indexOf(body));
  const directWrite =
    /map\((0x[\da-f]+),\s*(0x[\da-f]+)\)\.w\(m_apu,\s*FUNC\(nesapu_device::(\w+)\)\);/i
      .exec(body);
  const status =
    /map\((0x[\da-f]+),\s*(0x[\da-f]+)\)\.r\(m_apu,\s*FUNC\(nesapu_device::(\w+)\)\);/i
      .exec(body);
  const lambdaWrites = [...body.matchAll(
    /map\((0x[\da-f]+),\s*(0x[\da-f]+)\)\.lw8\(NAME\(\[this\]\(u8 data\)\s*\{\s*m_apu->(\w+)\((0x[\da-f]+),\s*data\);\s*\}\)\);/gi,
  )];
  if (!directWrite || !status || lambdaWrites.length !== 2) {
    throw new Error('MAME RP2A03 APU map no longer matches the supported source shape');
  }
  const sourceRef = (index: number) => ({ file: CPU_FILE, line: baseLine + lineAt(body, index) - 1 });
  const combined = new Map<number, GeneratedNesApuPlan['internalMap']['ranges'][number]>();
  const add = (
    start: number,
    end: number,
    kind: 'read' | 'write',
    method: string,
    index: number,
  ): void => {
    const range = combined.get(start) ?? { start, end, source: sourceRef(index) };
    range[kind] = `nesapu.${method}`;
    combined.set(start, range);
  };
  add(Number(directWrite[1]), Number(directWrite[2]), 'write', directWrite[3]!, directWrite.index);
  add(Number(status[1]), Number(status[2]), 'read', status[3]!, status.index);
  for (const match of lambdaWrites) {
    const address = Number(match[1]);
    const register = Number(match[4]);
    if (address - 0x4000 !== register) {
      throw new Error(`MAME RP2A03 APU lambda maps ${address} to unexpected register ${register}`);
    }
    add(address, Number(match[2]), 'write', match[3]!, match.index!);
  }
  return [...combined.values()].sort((left, right) => left.start - right.start);
}

function oneDimensionalTable(source: string, name: string, count: number): number[] {
  const match = new RegExp(`\\b${name}\\s*\\[[^\\]]*\\]\\s*=\\s*\\{([\\s\\S]*?)\\};`)
    .exec(source);
  if (!match) throw new Error(`MAME NES APU table ${name} is missing`);
  const values = numericValues(match[1]!);
  if (values.length !== count) {
    throw new Error(`MAME NES APU table ${name} has ${values.length} entries, expected ${count}`);
  }
  return values;
}

function twoDimensionalTable(
  source: string,
  name: string,
  rows: number,
  columns: number,
): number[][] {
  const match = new RegExp(
    `\\b${name}\\s*\\[[^\\]]*\\]\\s*\\[[^\\]]*\\]\\s*=\\s*\\{([\\s\\S]*?)\\n\\};`,
  ).exec(source);
  if (!match) throw new Error(`MAME NES APU table ${name} is missing`);
  const values = numericValues(match[1]!);
  if (values.length !== rows * columns) {
    throw new Error(
      `MAME NES APU table ${name} has ${values.length} entries, expected ${rows * columns}`,
    );
  }
  return Array.from({ length: rows }, (_, row) =>
    values.slice(row * columns, (row + 1) * columns));
}

function numericValues(initializer: string): number[] {
  return initializer
    .replace(/\/\/.*$/gm, '')
    .match(/0b[01]+|0x[\da-f]+|\b\d+(?:\.\d+)?\b/gi)
    ?.map(value => Number(value)) ?? [];
}

function requiredNumber(expression: string | undefined, label: string): number {
  if (!expression) throw new Error(`MAME NES APU ${label} is missing`);
  const terms = expression.trim().split('/').map(value => Number(value.trim()));
  if (!terms.length || terms.some(value => !Number.isFinite(value))) {
    throw new Error(`MAME NES APU ${label} is not a supported numeric expression`);
  }
  return Math.floor(terms.slice(1).reduce((value, divisor) => value / divisor, terms[0]!));
}

function requiredMatch(pattern: RegExp, source: string, label: string): RegExpExecArray {
  const match = pattern.exec(source);
  if (!match) throw new Error(`MAME NES APU ${label} is missing`);
  return match;
}

function methodSource(source: string, file: string, signature: string): { file: string; line: number } {
  const index = source.indexOf(signature);
  if (index < 0) throw new Error(`MAME NES APU method ${signature} is missing`);
  return { file, line: lineAt(source, index) };
}

function lineAt(source: string, index: number): number {
  return source.slice(0, index).split('\n').length;
}

export function generatedNesApuWorkletSource(plan: GeneratedNesApuPlan): string {
  return `// GENERATED from ${plan.sourceFiles.join(', ')}; do not edit.
// The register map and DSP tables are audited in nes-apu.audio.ir.json.
import { NesApu } from '../../hardware/nes/apu.js';

declare const sampleRate: number;
declare class AudioWorkletProcessor {
  readonly port: MessagePort;
  constructor();
}
declare function registerProcessor(
  name: string,
  processorCtor: new () => AudioWorkletProcessor,
): void;

type Message =
  | { type: 'init'; clock: number }
  | { type: 'write'; offset: number; data: number }
  | { type: 'batch'; writes: { offset: number; data: number }[] }
  | { type: 'data'; id: number; bytes: Uint8Array }
  | { type: 'reset' };

const CHUNK = 1024;
class Resampler {
  private readonly step: number;
  private fraction = 0;
  private last = 0;
  private readonly source = new Float32Array(CHUNK);
  private position = CHUNK;
  private readonly render: (out: Float32Array) => void;

  constructor(nativeRate: number, render: (out: Float32Array) => void) {
    this.step = nativeRate / sampleRate;
    this.render = render;
  }

  next(): number {
    this.fraction += this.step;
    let sum = 0;
    let count = 0;
    while (this.fraction >= 1) {
      this.fraction--;
      if (this.position >= this.source.length) {
        this.render(this.source);
        this.position = 0;
      }
      sum += this.source[this.position++]!;
      count++;
    }
    if (count) this.last = sum / count;
    return this.last;
  }
}

class NesProcessor extends AudioWorkletProcessor {
  private clock = 0;
  private apu?: NesApu;
  private resampler?: Resampler;

  constructor() {
    super();
    this.port.onmessage = (event: MessageEvent<Message>) => {
      const message = event.data;
      if (message.type === 'init') {
        this.clock = message.clock;
        this.build();
      } else if (message.type === 'write') {
        this.apu?.write(message.offset, message.data);
      } else if (message.type === 'batch') {
        for (const write of message.writes) this.apu?.write(write.offset, write.data);
      } else if (message.type === 'data') {
        this.apu?.data(message.id, message.bytes);
      } else {
        this.build();
      }
    };
  }

  private build(): void {
    this.apu = new NesApu(this.clock);
    this.resampler = new Resampler(this.apu.sampleRate, out => this.apu!.render(out));
  }

  process(_inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
    const channels = outputs[0];
    if (!channels?.[0]) return true;
    const output = channels[0];
    if (!this.resampler) output.fill(0);
    else for (let index = 0; index < output.length; index++) output[index] = this.resampler.next();
    for (let channel = 1; channel < channels.length; channel++) channels[channel]!.set(output);
    return true;
  }
}

registerProcessor('nes', NesProcessor);
`;
}
