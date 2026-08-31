// The Atari TIA's sound half, compiled from MAME's own source.
//
// `src/devices/sound/tiasound.cpp` is the one MAME sound module the device
// compiler cannot reach: its state and behaviour live in a `class tia` inside an
// anonymous namespace, with every method defined inline, and `parseMameAst`
// reads neither shape. What it is NOT is exotic -- the register writes, the
// polynomial counters and the sample loop all lower through the ordinary
// handler compiler with no diagnostics. Only the extraction is bespoke.
//
// The result is an ordinary GeneratedDeviceDefinition, so the chip executes,
// audits and emits exactly like every other generated device. Nothing here
// restates the DSP: the polynomial taps, the divider tables, the volume shift
// and the sample counter all come out of the file.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { evalExpr, parseDefines, parseEnumConstants, stripComments } from '../kg/parse.ts';
import { compileMameHandler } from './handler-ir.ts';
import { normalizeMameExecutionSource } from './cpu-compiler.ts';
import type { GeneratedDeviceDefinition, GeneratedDeviceMember } from './device-compiler.ts';

const SOURCE_FILE = 'src/devices/sound/tiasound.cpp';
const INTERFACE_FILE = 'src/devices/sound/tiaintf.cpp';

/** MAME's device type name for the sound half of the TIA. */
export const TIA_AUDIO_TYPE = 'TIA';

/** The body of the brace-delimited block that starts at or after `from`. */
function blockAt(source: string, from: number): string {
  const open = source.indexOf('{', from);
  if (open < 0) return '';
  let depth = 0;
  for (let index = open; index < source.length; index++) {
    if (source[index] === '{') depth++;
    else if (source[index] === '}' && --depth === 0) return source.slice(open + 1, index);
  }
  return '';
}

function required(source: string, needle: string, what: string): number {
  const at = source.indexOf(needle);
  if (at < 0) throw new Error(`MAME no longer declares ${what} in ${SOURCE_FILE}`);
  return at;
}

/**
 * State the chip declares, with its array bound and power-on value.
 *
 * MAME writes these as ordinary members with initialisers -- `uint8_t AUDC[2] =
 * { 0, 0 }`, `uint8_t Div_3_cnt[2] = { 3, 3 }` -- so the declaration is the
 * whole specification of the reset state.
 */
function classMembers(
  classBody: string,
  constants: Record<string, number>,
): GeneratedDeviceMember[] {
  const members: GeneratedDeviceMember[] = [];
  for (const match of classBody.matchAll(
    /^\t(?:const\s+)?([A-Za-z_][\w:]*)\s+(\w+)\s*(?:\[\s*([^\]]+)\s*\])?\s*(?:=\s*([^;]+))?;/gm,
  )) {
    const [, valueType, name, bound, initialiser] = match;
    if (!valueType || !name || valueType === 'return') continue;
    const length = bound === undefined
      ? undefined
      : evalExpr(bound, constants) ?? undefined;
    const bits = /64/.test(valueType) ? 32
      : /(?:^|[^\d])32/.test(valueType) || valueType === 'int' ? 32
        : /16/.test(valueType) ? 16
          : /8|bool|char/.test(valueType) ? 8
            : 32;
    const signed = /^(?:int|s)/.test(valueType) && !/^uint/.test(valueType);
    if (length !== undefined && length > 0) {
      // A braced initialiser gives each element; an uninitialised array is
      // filled by the constructor (the polynomials) and starts at zero.
      const listed = initialiser
        ? [...initialiser.matchAll(/-?\w+/g)].map(value => evalExpr(value[0], constants) ?? 0)
        : [];
      members.push({
        name,
        valueType,
        bits: bits as 8 | 16 | 32,
        ...(signed ? { signed } : {}),
        values: Array.from({ length }, (_unused, index) => listed[index] ?? 0),
      });
      continue;
    }
    const initial = initialiser ? evalExpr(initialiser.trim(), constants) : undefined;
    members.push({
      name,
      valueType,
      bits: bits as 8 | 16 | 32,
      ...(signed ? { signed } : {}),
      ...(initial !== null && initial !== undefined ? { initial } : {}),
    });
  }
  if (!members.length) throw new Error('MAME no longer declares TIA sound state');
  return members;
}

/**
 * The chip's constructor, as a device_start.
 *
 * It fills the three polynomial tables and sizes the sample counter from the
 * clock. `poly_init` is a private template in the same class, so it lowers with
 * the rest; the save_item calls are host persistence and drop out.
 */
function startBody(classBody: string, gain: number): string {
  const at = required(classBody, 'tia(device_t &device', 'the TIA sound constructor');
  // The gain is set in the constructor's member-initialiser list, before the
  // body: `tia(...) : tia_gain(gain) { ... }`. Read as an assignment so the
  // whole constructor is one lowered program.
  const initialiser = /:\s*(\w+)\s*\(\s*gain\s*\)/.exec(classBody.slice(at, classBody.indexOf('{', at)));
  const constructor = (initialiser ? `${initialiser[1]} = ${gain};\n` : '')
    + blockAt(classBody, at);
  return constructor
    .replace(/^\s*device\.save_item\([^;]*;\s*$/gm, '')
    // `clock` and `sample_rate` are the two rates `tia_sound_init` is called
    // with, and tiaintf.cpp passes `clock()` for both -- so the chip renders at
    // its own clock and the host resamples, exactly as MAME's stream does.
    .replace(/\bsample_rate\b/g, 'clock()')
    .replace(/\bclock\b(?!\s*\()/g, 'clock()');
}

/**
 * `tia_process`, rewritten against the chip itself.
 *
 * MAME's sound module is C-style: the function takes the chip as a void pointer
 * and reaches its state through `chip->`. Recovering the object and dropping the
 * arrow makes the body an ordinary method of the device that owns that state.
 */
function processBody(source: string): string {
  const body = blockAt(source, required(
    source, 'void tia_process(void *_chip, sound_stream &stream)', 'tia_process'));
  return body
    .replace(/^\s*tia\s*\*\s*chip\s*=\s*\(tia\s*\*\)_chip;\s*$/m, '')
    .replace(/\bchip->/g, '')
    // The stream is the host's: how many samples it wants, and where they go.
    .replace(/\bstream\.samples\(\)/g, 'samples')
    // `sound_stream::put_int(channel, index, value, max)` on the mono
    // stream MAME allocates for this chip; the channel is the literal 0
    // in the call itself, so only the sample and its scale survive.
    .replace(/\bstream\.put_int\s*\(\s*0\s*,/g, 'stream_put_int(');
}

export interface GeneratedTiaAudio extends GeneratedDeviceDefinition {
  /** Register offsets the chip answers, as MAME's own enum names them. */
  registers: { first: number; last: number };
}

/**
 * Compile the TIA's sound half into a generated device.
 *
 * `device_start` fills the polynomials, `write` takes the six audio registers
 * and `process` renders one buffer -- the three entry points the host needs.
 */
export function compileTiaAudio(mameSource: string): GeneratedTiaAudio {
  const raw = readFileSync(join(mameSource, SOURCE_FILE), 'utf8');
  const source = stripComments(raw);
  const constants = parseEnumConstants(source, parseDefines(source, {}));
  const classBody = blockAt(source, required(source, 'class tia', 'the TIA sound class'));

  // The gain the wrapper device constructs the chip with. Read from MAME's own
  // call rather than restated, so a change upstream arrives with the checkout.
  const interfaceSource = readFileSync(join(mameSource, INTERFACE_FILE), 'utf8');
  const gain = evalExpr(
    /tia_sound_init\s*\([^,]+,[^,]+,[^,]+,\s*([^)]+)\)/.exec(interfaceSource)?.[1] ?? '',
    constants,
  );
  if (gain === null) throw new Error('MAME no longer names the TIA sound gain');

  const lower = (body: string) => compileMameHandler(normalizeMameExecutionSource(body));
  const start = lower(startBody(classBody, gain));
  const write = lower(blockAt(classBody, required(
    classBody, 'void write(offs_t offset, uint8_t data)', 'the TIA sound write')));
  const process = lower(processBody(source));
  // `poly_init` is a private template of the same class. Without it the three
  // calls in the constructor resolve to nothing and every polynomial stays
  // zero -- which silences all of the TIA's noise and tone modes and leaves
  // only its pure square wave.
  const polyInit = lower(blockAt(classBody, required(
    classBody, 'static void poly_init', 'the TIA polynomial initialiser')));
  for (const [name, program] of [['device_start', start], ['write', write],
    ['process', process], ['poly_init', polyInit]] as const) {
    if (program.diagnostics.length) {
      throw new Error(`TIA sound ${name} did not lower: ${program.diagnostics.join('; ')}`);
    }
  }

  // The registers the chip owns, read from the enum rather than restated.
  const first = constants.AUDC0;
  const last = constants.AUDV1;
  if (first === undefined || last === undefined) {
    throw new Error('MAME no longer names the TIA audio registers');
  }

  const members = classMembers(classBody, constants);
  // File-scope lookup tables the chip reads as ordinary state. MAME keeps the
  // divide-by-31 ratio outside the class -- "I've treated the 'Div by 31'
  // counter as another polynomial" -- and without it the DIV31 modes never
  // toggle at all.
  for (const table of source.matchAll(
    /\b(?:constexpr|static const)\s+\w+\s+(\w+)\s*\[\s*([^\]]*)\s*\]\s*=\s*\{([^}]*)\}\s*;/g,
  )) {
    const [, name, bound, listed] = table;
    if (!name || members.some(member => member.name === name)) continue;
    const values = listed!.split(',')
      .map(value => evalExpr(value, constants))
      .filter((value): value is number => value !== null);
    const length = evalExpr(bound ?? '', constants) ?? values.length;
    if (!values.length) continue;
    members.push({
      name,
      valueType: 'uint8_t',
      bits: 8,
      values: Array.from({ length }, (_unused, index) => values[index] ?? 0),
    });
  }
  const at = (file: string, needle: string) => ({
    file,
    line: raw.slice(0, raw.indexOf(needle) + 1).split('\n').length,
    column: 1,
  });

  return {
    schemaVersion: 1,
    type: TIA_AUDIO_TYPE,
    className: 'tia',
    hierarchy: ['tia'],
    sourceFiles: [SOURCE_FILE, INTERFACE_FILE],
    constants,
    members,
    callbacks: [],
    timers: [],
    methods: [
      {
        name: 'device_start',
        parameters: '',
        program: start,
        source: at(SOURCE_FILE, 'tia(device_t &device'),
      },
      {
        // `tia_device::tia_sound_w` is `tia_write(m_chip, ...)` and nothing
        // else, so the wrapper's public name is given straight to the chip's
        // own write -- that name is what tia_video_device calls through its
        // `m_tia` finder for offsets 0x15..0x1a.
        name: 'tia_sound_w',
        parameters: 'offs_t offset, uint8_t data',
        program: write,
        source: at(SOURCE_FILE, 'void write(offs_t offset, uint8_t data)'),
      },
      {
        // `tia_device::sound_stream_update` is `tia_process(m_chip, stream)`.
        name: 'sound_stream_update',
        parameters: 'int samples',
        program: process,
        source: at(SOURCE_FILE, 'void tia_process'),
      },
      {
        name: 'poly_init',
        parameters: 'uint8_t* poly, int size, int f0, int f1',
        program: polyInit,
        source: at(SOURCE_FILE, 'static void poly_init'),
      },
    ],
    // The chip's constructor is its startup: it fills the three polynomial
    // tables and sizes the sample counter. Without this the board never runs
    // it, every polynomial stays zero, and only the TIA's constant-output and
    // pure-tone modes make any sound at all.
    start: 'device_start',
    // The sample loop is the hot path by a wide margin.
    hotMethods: ['sound_stream_update', 'tia_sound_w', 'poly_init'],
    summary: {
      methods: 4,
      compiledMethods: 4,
      diagnostics: 0,
      members: members.length,
      callbacks: 0,
      timers: 0,
      slots: 0,
    },
    registers: { first, last },
  } as GeneratedTiaAudio;
}

/**
 * The worklet that plays what the chip renders.
 *
 * The DSP itself is NOT here. `tia_video_device` reaches its sound half
 * through a `required_device<tia_device>` finder and calls `tia_sound_w` on it
 * directly, so the chip has to sit beside the CPU as a generated device --
 * across a worklet boundary that finder has nothing to resolve to. What
 * crosses is PCM: the board pumps `sound_stream_update` at the chip's own
 * clock and this resamples that stream to the output rate, which is the job
 * MAME's `sound_stream` does for the same device.
 */
export function generatedTiaWorkletSource(device: GeneratedTiaAudio): string {
  return `// GENERATED from ${device.sourceFiles.join(', ')}; do not edit.
// Carries no register model and no DSP: the chip runs as a generated device
// (${device.methods.map(method => method.name).join(', ')}) and posts its samples here.

export interface GeneratedTiaWrite {
  offset: number;
  data: number;
  frac?: number;
  method?: string;
}

/**
 * One video frame of output, resampled from the chip's stream.
 *
 * The chip renders at its own clock and the host runs at whatever the audio
 * context chose, so samples are held across the ratio between them -- the
 * zero-order hold MAME's stream applies to the same device.
 */
export class GeneratedTiaFrameRenderer {
  private readonly queue: number[] = [];
  private phase = 0;
  private held = 0;
  private carry = 0;
  private readonly rate: number;
  private readonly outputRate: number;
  private readonly refresh: number;

  constructor(rate: number, outputRate: number, refresh: number) {
    this.rate = rate;
    this.outputRate = outputRate;
    this.refresh = refresh;
  }

  push(sample: number): void {
    // A stall must not turn into an unbounded backlog: a queued sample is
    // permanent latency, not a dropped one.
    if (this.queue.length < 8192) this.queue.push(sample);
  }

  render(): Float32Array {
    this.carry += this.outputRate / this.refresh;
    const count = Math.floor(this.carry);
    this.carry -= count;
    const output = new Float32Array(count);
    const step = this.rate / this.outputRate;
    for (let index = 0; index < count; index++) {
      this.phase += step;
      while (this.phase >= 1) {
        this.phase -= 1;
        if (this.queue.length) this.held = this.queue.shift()!;
      }
      output[index] = this.held;
    }
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

class GeneratedTiaProcessor extends AudioWorkletProcessor {
  private renderer?: GeneratedTiaFrameRenderer;
  private readonly frames: Float32Array[] = [];
  private current?: Float32Array;
  private currentIndex = 0;
  private lastSample = 0;

  constructor() {
    super();
    this.port.onmessage = (event: MessageEvent) => {
      const message = event.data as {
        type: string;
        clock?: number;
        refresh?: number;
        writes?: GeneratedTiaWrite[];
      };
      if (message.type === 'init') {
        this.renderer = new GeneratedTiaFrameRenderer(
          message.clock ?? sampleRate,
          sampleRate,
          message.refresh ?? 60,
        );
      } else if (message.type === 'batch' && this.renderer) {
        for (const write of message.writes ?? []) this.renderer.push(write.data);
        this.frames.push(this.renderer.render());
        while (this.frames.length > 3) this.frames.shift();
      }
    };
  }

  private nextSample(): number {
    while (!this.current || this.currentIndex >= this.current.length) {
      this.current = this.frames.shift();
      this.currentIndex = 0;
      // Starved: hold, rather than step to zero and pop.
      if (!this.current) return this.lastSample;
    }
    return (this.lastSample = this.current[this.currentIndex++]!);
  }

  process(_inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
    const channels = outputs[0];
    const output = channels?.[0];
    if (!output) return true;
    for (let index = 0; index < output.length; index++) output[index] = this.nextSample();
    for (let channel = 1; channel < (channels?.length ?? 0); channel++) {
      channels![channel]!.set(output);
    }
    return true;
  }
}

registerProcessor('tia', GeneratedTiaProcessor);
`;
}
