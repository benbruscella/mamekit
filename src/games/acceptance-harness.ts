import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { gameOutputDir } from '../gen/output-layout.ts';
import { romsDir } from '../paths.ts';
import { AUDIO_PROBES } from '../hardware/acceptance-registry.ts';
import { KeyboardInput } from '../runtime/input.ts';
import {
  assembleRegions,
  applyRomTransforms,
  checkRomSet,
  type ShellConfig,
} from '../runtime/shell.ts';
import type { Board, BoardSnapshot, Regions } from '../runtime/types.ts';
import { crc32, readZip } from '../runtime/zip.ts';
import type {
  GameAcceptanceGolden,
  GameTestContract,
} from './types.ts';

export interface SoundWrite {
  offset: number;
  data: number;
  frac?: number;
  method?: string;
}

interface AudioProbe {
  render(writes: readonly SoundWrite[], capture: boolean): void;
  finish(
    writes: SoundWrite[],
    wavPath?: string,
  ): GameAcceptanceGolden['audio'];
}

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

/** Probe render rate; independent of any browser AudioContext. */
const PROBE_OUTPUT_RATE = 48_000;

export interface GameAcceptanceOptions {
  /**
   * Diagnostic mode for an audio capture. It records from frame zero, writes
   * PCM to this path, and skips the normal gameplay golden assertions.
   */
  captureAudio?: string;
  /** Replay the contract's input actions during a diagnostic audio capture. */
  captureActions?: boolean;
  /** Optional register-write trace paired with a diagnostic audio capture. */
  captureAudioWrites?: string;
  /** Duration override used by diagnostic captures. */
  frames?: number;
  /** Direct source-CPU writes used only for isolated hardware diagnostics. */
  programWrites?: {
    atFrame: number;
    cpu: string;
    address: number;
    data: number;
  }[];
  /** Return current fingerprints without comparing them to recorded goldens. */
  recording?: boolean;
  /** Read-only per-frame diagnostic hook for long-state-transition captures. */
  inspectFrame?: (frame: {
    number: number;
    framebuffer: Uint32Array;
    state: Readonly<Record<string, unknown>>;
    /** Read-only shared-memory view for locating stalled generated machines. */
    shares: Readonly<Record<string, Uint8Array>>;
    /** Read-only register access for diagnosing interrupt/state transitions. */
    cpus: ReadonlyMap<string, { get(name: string): number }>;
    /** Read-only access to generated CPU buses for address-level diagnostics. */
    buses: ReadonlyMap<string, { read(address: number): number }>;
    /** Sound writes emitted during this frame, before the probe consumes them. */
    writes: readonly SoundWrite[];
  }) => void;
}

export async function runGameAcceptance(
  contract: GameTestContract,
  root = projectRoot,
  options: GameAcceptanceOptions = {},
): Promise<GameAcceptanceGolden> {
  const diagnosticCapture = options.captureAudio !== undefined;
  const framesToRun = options.frames ?? contract.frames;
  const outRoot = join(root, 'dist');
  const gameDir = gameOutputDir(outRoot, contract.category, contract.game);
  const romPath = resolve(
    process.env[contract.romEnvironment]
      ?? join(romsDir(root), contract.category, `${contract.game}.zip`),
  );
  assert.ok(existsSync(gameDir), `${contract.game}: generated output is missing: ${gameDir}`);
  assert.ok(existsSync(romPath), `${contract.game}: acceptance ROM is missing: ${romPath}`);

  const config = JSON.parse(
    readFileSync(join(gameDir, 'config.json'), 'utf8'),
  ) as ShellConfig;
  assert.equal(config.game, contract.game);
  assert.equal(config.sound.kind, contract.soundKind);

  const files = await readZip(new Uint8Array(readFileSync(romPath)));
  // MAME commonised device ROMs into their own sets, so a board's parts come
  // from several zips: galaga.zip plus namco51.zip and namco54.zip. The set
  // names are the MAME device short names carried in the generated manifest.
  for (const romSet of new Set(config.roms.flatMap(spec => spec.romSet ? [spec.romSet] : []))) {
    const devicePath = resolve(join(romsDir(root), contract.category, `${romSet}.zip`));
    assert.ok(
      existsSync(devicePath),
      `${contract.game}: MAME device ROM set "${romSet}" is missing: ${devicePath}`,
    );
    for (const [name, bytes] of await readZip(new Uint8Array(readFileSync(devicePath)))) {
      files.set(name, bytes);
    }
  }

  const critical = new Set(config.board.cpus.map(cpu => cpu.region));
  const romCheck = checkRomSet(config.roms, files, critical);
  // Every chip MAME says is dumped must be present. Zero-filling a missing
  // ROM and carrying on produces goldens for hardware that does not exist;
  // undumped chips (NO_DUMP in MAME) are excluded by checkRomSet itself.
  assert.deepEqual(
    [...romCheck.missingCritical, ...romCheck.missingOther],
    [],
    `${contract.game}: ROM set is incomplete`,
  );
  assert.deepEqual(romCheck.crcMismatch, []);
  const regions = assembleRegions(config.roms, files, () => {}, critical);
  for (const patch of config.romPatches ?? []) {
    const region = regions[patch.region];
    if (region && patch.offset < region.length) region[patch.offset] = patch.value;
  }
  applyRomTransforms(regions, config.romTransforms ?? []);

  const registry = await import(moduleUrl(join(outRoot, 'app/registry.js'))) as {
    registerGeneratedMachines(): void;
  };
  registry.registerGeneratedMachines();
  const generatedRuntime = await import(
    moduleUrl(join(outRoot, 'runtime/core/generated-board.js'))
  ) as {
    createBoard(
      boardConfig: ShellConfig['board'],
      regions: Regions,
      inputs: KeyboardInput,
      sinks: { soundWrite(offset: number, data: number, frac?: number, method?: string): void },
    ): Board;
  };

  const eventTarget = new EventTarget();
  const input = new KeyboardInput(config.bindings, config.dipDefaults, config.ports);
  input.debug = process.env.MAMEKIT_DEBUG_INPUT === '1';
  input.attach(eventTarget);
  verifyInputBindings(contract, config, input, eventTarget);

  const pendingWrites: SoundWrite[] = [];
  const allWrites: SoundWrite[] = [];
  const requiredAudioCounts = new Map<number, number>();
  const board = generatedRuntime.createBoard(
    { ...config.board, game: config.game },
    regions,
    input,
    {
      soundWrite: (offset, data, frac, method) => {
        const write = { offset, data, frac, method };
        pendingWrites.push(write);
        allWrites.push(write);
      },
    },
  );
  assert.equal(board.fbWidth, contract.screen.width);
  assert.equal(board.fbHeight, contract.screen.height);

  const audio = await createAudioProbe(config, regions, outRoot);
  const framebuffer = new Uint32Array(board.fbWidth * board.fbHeight);
  const checkpoints: GameAcceptanceGolden['checkpoints'] = {};
  const checkpointFrames = new Set(diagnosticCapture ? [] : contract.checkpoints);
  const startedAt = performance.now();
  const runFrame = (): void => {
    const nextFrame = board.snapshot().frame + 1;
    for (const write of options.programWrites ?? []) {
      if (write.atFrame !== nextFrame) continue;
      const bus = (board as unknown as {
        cpuBuses?: Map<string, { write(address: number, data: number): void }>;
      }).cpuBuses?.get(write.cpu);
      assert.ok(bus, `${contract.game}: diagnostic CPU bus ${write.cpu} is missing`);
      bus.write(write.address, write.data);
    }
    board.frame(framebuffer);
    if (input.debug && !input.dump().split(' ').every(value => value.endsWith('=ff'))) {
      const devices = (board as unknown as {
        devices?: Map<string, { invoke(name: string): unknown }>;
      }).devices;
      console.log(
        `[input-readback] ${input.dump()} ` +
        `pia0.a=${Number(devices?.get('pia0')?.invoke('get_in_a_value')).toString(16)} ` +
        `pia0.b=${Number(devices?.get('pia0')?.invoke('get_in_b_value')).toString(16)}`,
      );
    }
    const snapshot = board.snapshot();
    options.inspectFrame?.({
      number: snapshot.frame,
      framebuffer,
      state: (board as unknown as {
        state?: Record<string, unknown>;
      }).state ?? {},
      shares: (board as unknown as {
        shares?: Record<string, Uint8Array>;
      }).shares ?? {},
      cpus: (board as unknown as {
        cpus?: Map<string, { get(name: string): number }>;
      }).cpus ?? new Map(),
      buses: (board as unknown as {
        cpuBuses?: Map<string, { read(address: number): number }>;
      }).cpuBuses ?? new Map(),
      writes: pendingWrites,
    });
    for (const [index, requirement] of (contract.audioRequirements ?? []).entries()) {
      if (snapshot.frame < requirement.fromFrame) continue;
      if (requirement.toFrame !== undefined && snapshot.frame > requirement.toFrame) continue;
      const count = pendingWrites.filter(write =>
        write.method === requirement.method &&
        (requirement.offset === undefined || write.offset === requirement.offset) &&
        write.data !== 0).length;
      requiredAudioCounts.set(
        index,
        (requiredAudioCounts.get(index) ?? 0) + count,
      );
    }
    audio.render(pendingWrites, diagnosticCapture || snapshot.frame >= 120);
    pendingWrites.length = 0;
    if (checkpointFrames.has(snapshot.frame)) {
      checkpoints[String(snapshot.frame)] = {
        video: hash(new Uint8Array(framebuffer.buffer)),
        state: stateHash(snapshot),
      };
    }
  };

  const captureActions = !diagnosticCapture || options.captureActions;
  for (const action of captureActions ? contract.actions : []) {
    while (board.snapshot().frame < action.atFrame) runFrame();
    if ('reset' in action) {
      board.reset();
      continue;
    }
    pulse(
      eventTarget,
      action.code,
      runFrame,
      action.heldFrames,
      action.releasedFrames,
    );
  }
  while (board.snapshot().frame < framesToRun) runFrame();
  const finalSnapshot = board.snapshot();
  if (process.env.MAMEKIT_CAPTURE_FRAME) {
    writeFramePpm(
      process.env.MAMEKIT_CAPTURE_FRAME,
      framebuffer,
      board.fbWidth,
      board.fbHeight,
    );
  }
  const elapsedSeconds = (performance.now() - startedAt) / 1000;
  const emulatedFps = framesToRun / elapsedSeconds;

  const result: GameAcceptanceGolden = {
    regions: Object.fromEntries(
      Object.entries(regions)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([name, bytes]) => [name, hash(bytes)]),
    ),
    checkpoints,
    audio: audio.finish(allWrites, options.captureAudio),
  };
  if (diagnosticCapture) {
    if (options.captureAudioWrites) {
      writeFileSync(options.captureAudioWrites, `${JSON.stringify(allWrites, null, 2)}\n`);
    }
    console.log(
      `${contract.game}: wrote ${options.captureAudio} ` +
      `(${framesToRun} frames, ${emulatedFps.toFixed(1)} emulated fps)`,
    );
    return result;
  }
  assert.equal(Object.keys(checkpoints).length, contract.checkpoints.length);
  const debugBoard = board as unknown as {
    shares?: Record<string, Uint8Array>;
    state?: Record<string, unknown>;
    cpus?: Map<string, { get(name: string): number }>;
    devices?: Map<string, { get(name: string): number }>;
  };
  const debugTilemap = debugBoard.state?.m_tilemap as {
    tiles?: unknown[];
  } | undefined;
  const debugPalette = debugBoard.state?.m_palette as {
    colors?: Uint32Array;
  } | undefined;
  const debugVideoRam = debugBoard.state?.m_videoram as
    | Uint8Array
    | { pixels?: Uint32Array }
    | undefined;
  const debugVideoBytes = ArrayBuffer.isView(debugVideoRam)
    ? debugVideoRam as Uint8Array
    : debugVideoRam?.pixels;
  const sharedActivity = Object.fromEntries(
    Object.entries(debugBoard.shares ?? {}).map(([name, bytes]) => [
      name,
      {
        nonzero: bytes.reduce((count, value) => count + Number(value !== 0), 0),
        hash: hash(bytes),
        first: [...bytes.slice(0, 16)],
        last: [...bytes.slice(-16)],
      },
    ]),
  );
  const finalCpuRegisters = Object.fromEntries(
    [...(debugBoard.cpus ?? [])].map(([tag, cpu]) => [
      tag,
      Object.fromEntries(
        ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'HL', 'IX', 'IY', 'PC', 'SP',
          'm_pc', 'm_x', 'm_y', 'm_u', 'm_s', 'm_d', 'm_dp', 'm_cc',
          'm_firq_line', 'm_irq_line', 'm_nmi_state', 'm_service_attention']
          .concat(['m_irq_state.0', 'm_wai_state'])
          .map(name => [name, cpu.get(name)]),
      ),
    ]),
  );
  const numericDriverState = Object.fromEntries(
    Object.entries(debugBoard.state ?? {})
      .filter((entry): entry is [string, number] => typeof entry[1] === 'number')
      .sort(([left], [right]) => left.localeCompare(right)),
  );
  const generatedDeviceState = Object.fromEntries(
    [...(debugBoard.devices ?? [])].map(([tag, device]) => [
      tag,
      Object.fromEntries(
        ['m_a_input_overrides_output_mask', 'm_ddr_a', 'm_ctl_a', 'm_out_a',
          'm_ddr_b', 'm_ctl_b', 'm_out_b', 'm_in_ca1', 'm_out_ca2',
          'm_irq_a1', 'm_irq_a_state', 'm_state']
          .map(name => [name, device.get(name)]),
      ),
    ]),
  );
  assert.ok(
    new Set(Object.values(checkpoints).map(value => value.video)).size >= 3,
    `${contract.game}: video did not progress ` +
      `(${JSON.stringify({
        checkpoints,
        snapshot: finalSnapshot,
        cpuRegisters: finalCpuRegisters,
        generatedDeviceState,
        driverState: numericDriverState,
        sharedActivity,
        tilemap: {
          tiles: debugTilemap?.tiles?.length ?? 0,
          first: debugTilemap?.tiles?.find(Boolean),
        },
        palette: debugPalette?.colors
          ? {
              colors: debugPalette.colors.length,
              unique: new Set(debugPalette.colors).size,
              nonblack: debugPalette.colors.reduce(
                (count, color) => count + Number(color !== 0xff000000),
                0,
              ),
            }
          : undefined,
        videoRam: debugVideoBytes
          ? {
              bytes: debugVideoBytes.length,
              nonzero: [...debugVideoBytes].reduce(
                (count, value) => count + Number(value !== 0),
                0,
              ),
              hash: hash(new Uint8Array(
                debugVideoBytes.buffer,
                debugVideoBytes.byteOffset,
                debugVideoBytes.byteLength,
              )),
            }
          : undefined,
      })})`,
  );
  assert.ok(
    result.audio.writes > 0,
    `${contract.game}: generated sound has no writes ` +
      `(${JSON.stringify({
        audio: result.audio,
        sharedActivity,
        cpuRegisters: finalCpuRegisters,
        generatedDeviceState,
        snapshot: finalSnapshot,
      })})`,
  );
  assert.ok(
    result.audio.rms > 0.001,
    `${contract.game}: generated sound is silent ` +
      `(${JSON.stringify({
        audio: result.audio,
        methods: Object.fromEntries(
          [...new Set(allWrites.map(write => write.method ?? 'register'))].map(method => [
            method,
            allWrites.filter(write => (write.method ?? 'register') === method).length,
          ]),
        ),
        writes: allWrites.slice(0, 32),
        sharedActivity,
        cpuRegisters: finalCpuRegisters,
        cpuInterrupts: Object.fromEntries(
          [...(debugBoard.cpus ?? [])].map(([tag, cpu]) => [
            tag,
            {
              iff1: cpu.get('m_iff1'),
              irq: cpu.get('m_irq_state'),
              hold: cpu.get('m_irq_hold'),
              nmi: cpu.get('m_nmi_pending'),
            },
          ]),
        ),
        snapshot: finalSnapshot,
      })})`,
  );
  if (contract.minimumAudioRms !== undefined) {
    assert.ok(
      result.audio.rms >= contract.minimumAudioRms,
      `${contract.game}: audio RMS ${result.audio.rms} is below the ` +
        `${contract.minimumAudioRms} contract floor`,
    );
  }
  for (const requirement of contract.shareRequirements ?? []) {
    const activity = sharedActivity[requirement.share];
    assert.ok(activity, `${contract.game}: required share "${requirement.share}" is missing`);
    assert.ok(
      activity.nonzero >= requirement.minimumNonzeroBytes,
      `${contract.game}: share "${requirement.share}" has ${activity.nonzero} nonzero bytes ` +
        `(minimum ${requirement.minimumNonzeroBytes})`,
    );
    if (requirement.maximumNonzeroBytes !== undefined) {
      assert.ok(
        activity.nonzero <= requirement.maximumNonzeroBytes,
        `${contract.game}: share "${requirement.share}" has ${activity.nonzero} nonzero bytes ` +
          `(maximum ${requirement.maximumNonzeroBytes})`,
      );
    }
  }
  for (const [index, requirement] of (contract.audioRequirements ?? []).entries()) {
    const actual = requiredAudioCounts.get(index) ?? 0;
    const window = requirement.toFrame === undefined
      ? `after frame ${requirement.fromFrame}`
      : `from frame ${requirement.fromFrame} through ${requirement.toFrame}`;
    const source = requirement.offset === undefined
      ? requirement.method
      : `${requirement.method} offset ${requirement.offset}`;
    assert.ok(
      actual >= requirement.minimumNonzeroWrites,
      `${contract.game}: ${source} audio emitted ${actual} nonzero writes ` +
        `${window} (minimum ${requirement.minimumNonzeroWrites})`,
    );
    if (requirement.maximumNonzeroWrites !== undefined) {
      assert.ok(
        actual <= requirement.maximumNonzeroWrites,
        `${contract.game}: ${source} audio emitted ${actual} nonzero writes ` +
          `${window} (maximum ${requirement.maximumNonzeroWrites})`,
      );
    }
  }
  console.log(
    `${contract.game}: ${emulatedFps.toFixed(1)} emulated fps ` +
      `(minimum ${contract.minimumFps})`,
  );

  // Behaviour is asserted before throughput. The fps floor depends on how busy
  // the host is, so checking it first let a loaded machine abort the run before
  // it ever compared hashes — hiding a real behavioural regression behind a
  // performance failure.
  if (options.recording || process.env.MAMEKIT_UPDATE_GOLDENS === '1') {
    if (!options.recording) {
      console.log(`${contract.game}:\n${JSON.stringify(result, null, 2)}`);
    }
  } else {
    assert.ok(contract.golden, `${contract.game}: no acceptance golden is recorded`);
    assert.deepEqual(result, contract.golden, `${contract.game}: generated behavior changed`);
  }
  assert.ok(
    emulatedFps >= contract.minimumFps,
    `${contract.game}: ${emulatedFps.toFixed(1)} fps is below the ` +
      `${contract.minimumFps} fps acceptance floor`,
  );
  return result;
}

function verifyInputBindings(
  contract: GameTestContract,
  config: ShellConfig,
  input: KeyboardInput,
  target: EventTarget,
): void {
  for (const code of new Set(contract.actions.flatMap(action =>
    'code' in action ? [action.code] : []))) {
    const binding = config.bindings.find(candidate => candidate.keys.includes(code));
    assert.ok(binding, `${contract.game}: ${code} has no generated input binding`);
    const released = input.read(binding.port);
    key(target, 'keydown', code);
    const pressed = input.read(binding.port);
    const expected = binding.activeLow
      ? released & ~binding.mask
      : released | binding.mask;
    assert.equal(pressed, expected, `${contract.game}: ${code} did not reach ${binding.port}`);
    key(target, 'keyup', code);
    assert.equal(input.read(binding.port), released);
  }
}

async function createAudioProbe(
  config: ShellConfig,
  regions: Regions,
  outRoot: string,
): Promise<AudioProbe> {
  installWorkletGlobals();
  const factory = AUDIO_PROBES[config.sound.kind];
  assert.ok(
    factory,
    `${config.game}: sound kind "${config.sound.kind}" has no acceptance probe — ` +
    'a capability package must supply one so its audio contract is actually checked',
  );
  const renderer = await factory({
    sound: config.sound,
    regions,
    refresh: config.board.screen.refresh,
    outRoot,
    outputRate: PROBE_OUTPUT_RATE,
  });
  const chunks: Float32Array[] = [];
  return {
    render(writes, capture) {
      const samples = renderer.render(writes);
      if (capture) chunks.push(samples);
    },
    finish(writes, wavPath) {
      const { result, pcm } = audioResult(writes, chunks);
      if (wavPath) {
        writePcm16Wav(
          wavPath,
          applyBrowserOutputStage(pcm, config.sound, PROBE_OUTPUT_RATE),
          PROBE_OUTPUT_RATE,
        );
      }
      return result;
    },
  };
}

/**
 * Diagnostic WAVs represent what reaches the browser destination, including
 * the output gain/filter that lives after the AudioWorklet.
 */
function applyBrowserOutputStage(
  input: Float32Array,
  sound: ShellConfig['sound'],
  sampleRate: number,
): Float32Array {
  const output = Float32Array.from(input);
  const filter = sound.speakerFilter;
  if (filter?.type === 'highpass') {
    // RBJ high-pass coefficients, matching the Web Audio biquad topology.
    const omega = 2 * Math.PI * filter.frequency / sampleRate;
    const cosine = Math.cos(omega);
    const alpha = Math.sin(omega) / (2 * filter.q);
    const a0 = 1 + alpha;
    const b0 = (1 + cosine) / 2 / a0;
    const b1 = -(1 + cosine) / a0;
    const b2 = b0;
    const a1 = -2 * cosine / a0;
    const a2 = (1 - alpha) / a0;
    let x1 = 0;
    let x2 = 0;
    let y1 = 0;
    let y2 = 0;
    for (let index = 0; index < output.length; index++) {
      const x0 = output[index]!;
      const y0 = b0 * x0 + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
      output[index] = y0;
      x2 = x1;
      x1 = x0;
      y2 = y1;
      y1 = y0;
    }
  }
  const gain = sound.masterGain ?? 1;
  if (gain !== 1) {
    for (let index = 0; index < output.length; index++) output[index] = output[index]! * gain;
  }
  return output;
}

function audioResult(
  writes: SoundWrite[],
  chunks: Float32Array[],
): { result: GameAcceptanceGolden['audio']; pcm: Float32Array } {
  const sampleCount = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const pcm = new Float32Array(sampleCount);
  let offset = 0;
  let squares = 0;
  for (const chunk of chunks) {
    pcm.set(chunk, offset);
    offset += chunk.length;
    for (const sample of chunk) squares += sample * sample;
  }
  return {
    pcm,
    result: {
      writes: writes.length,
      nonzeroWrites: writes.filter(write => write.offset >= 0 && write.data !== 0).length,
      writeHash: hash(new TextEncoder().encode(JSON.stringify(writes))),
      pcmHash: hash(new Uint8Array(pcm.buffer)),
      rms: Math.round(Math.sqrt(squares / Math.max(1, sampleCount)) * 1_000_000) / 1_000_000,
    },
  };
}

function writePcm16Wav(path: string, pcm: Float32Array, sampleRate: number): void {
  const bytes = Buffer.alloc(44 + pcm.length * 2);
  bytes.write('RIFF', 0);
  bytes.writeUInt32LE(36 + pcm.length * 2, 4);
  bytes.write('WAVEfmt ', 8);
  bytes.writeUInt32LE(16, 16);
  bytes.writeUInt16LE(1, 20);
  bytes.writeUInt16LE(1, 22);
  bytes.writeUInt32LE(sampleRate, 24);
  bytes.writeUInt32LE(sampleRate * 2, 28);
  bytes.writeUInt16LE(2, 32);
  bytes.writeUInt16LE(16, 34);
  bytes.write('data', 36);
  bytes.writeUInt32LE(pcm.length * 2, 40);
  for (let index = 0; index < pcm.length; index++) {
    const sample = Math.max(-1, Math.min(1, pcm[index]!));
    bytes.writeInt16LE(Math.round(sample * 32767), 44 + index * 2);
  }
  writeFileSync(path, bytes);
}

function stateHash(snapshot: BoardSnapshot): string {
  return hash(new TextEncoder().encode(stableJson({
    cpus: snapshot.cpus,
    credits: snapshot.credits ?? null,
    generatedDevices: snapshot.generatedDevices ?? null,
  })));
}

function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => `${JSON.stringify(key)}:${stableJson(item)}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

function pulse(
  target: EventTarget,
  code: string,
  frame: () => void,
  heldFrames: number,
  releasedFrames: number,
): void {
  key(target, 'keydown', code);
  for (let index = 0; index < heldFrames; index++) frame();
  key(target, 'keyup', code);
  for (let index = 0; index < releasedFrames; index++) frame();
}

function key(target: EventTarget, type: 'keydown' | 'keyup', code: string): void {
  const event = new Event(type, { cancelable: true });
  Object.defineProperties(event, {
    code: { value: code },
    repeat: { value: false },
  });
  target.dispatchEvent(event);
}

function installWorkletGlobals(): void {
  const globals = globalThis as Record<string, unknown>;
  globals.AudioWorkletProcessor ??= class {};
  globals.sampleRate ??= 48_000;
  globals.registerProcessor ??= () => {};
}

function hash(bytes: Uint8Array): string {
  return crc32(bytes).toString(16).padStart(8, '0');
}

function moduleUrl(path: string): string {
  return pathToFileURL(path).href;
}

function writeFramePpm(
  path: string,
  frame: Uint32Array,
  width: number,
  height: number,
): void {
  const header = Buffer.from(`P6\n${width} ${height}\n255\n`, 'ascii');
  const rgb = Buffer.allocUnsafe(width * height * 3);
  for (let index = 0; index < frame.length; index++) {
    const pixel = frame[index]!;
    rgb[index * 3] = pixel & 0xff;
    rgb[index * 3 + 1] = (pixel >>> 8) & 0xff;
    rgb[index * 3 + 2] = (pixel >>> 16) & 0xff;
  }
  writeFileSync(path, Buffer.concat([header, rgb]));
}
