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
  unresolvedDependencyRomSets,
  type ShellConfig,
} from '../runtime/shell.ts';
import type { Board, BoardSnapshot, MachineState, Regions } from '../runtime/types.ts';
import { captureState, restoreState } from '../runtime/machine-state.ts';
import { crc32, readZip } from '../runtime/zip.ts';
import type {
  GameAcceptanceGolden,
  GameCheckpointGolden,
  GameTestContract,
} from './types.ts';
import { assertExecutableActions } from './input-actions.ts';
import { audioLimitations } from '../runtime/audio-fidelity.ts';

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
  /** Generated tree to exercise, including an isolated candidate build. */
  outRoot?: string;
  /** Explicitly register an unpublished candidate for offline recording. */
  registerCandidate?: boolean;
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
    /** Exact public snapshot used by the checkpoint state fingerprint. */
    snapshot: Readonly<BoardSnapshot>;
    framebuffer: Uint32Array;
    state: Readonly<Record<string, unknown>>;
    /** Read-only shared-memory view for locating stalled generated machines. */
    shares: Readonly<Record<string, Uint8Array>>;
    /** Read-only register access for diagnosing interrupt/state transitions. */
    cpus: ReadonlyMap<string, { get(name: string): number }>;
    /** Read-only access to generated CPU buses for address-level diagnostics. */
    buses: ReadonlyMap<string, { read(address: number): number }>;
    /** Read-only generated-device state for latch/line diagnostics. */
    devices: ReadonlyMap<string, { get(name: string): number }>;
    /** Sound writes emitted during this frame, before the probe consumes them. */
    writes: readonly SoundWrite[];
  }) => void;
}

export async function runGameAcceptance(
  contract: GameTestContract,
  root = projectRoot,
  options: GameAcceptanceOptions = {},
): Promise<GameAcceptanceGolden> {
  assertExecutableActions(contract);
  if (process.env.MAMEKIT_PROFILE_HANDLERS === '1') {
    (globalThis as { __mamekitHandlerCounts?: Map<string, number> })
      .__mamekitHandlerCounts = new Map();
  }
  const diagnosticCapture = options.captureAudio !== undefined;
  const framesToRun = options.frames ?? contract.frames;
  const outRoot = resolve(options.outRoot ?? process.env.MAMEKIT_OUT_ROOT ?? join(root, 'dist'));
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
  assert.deepEqual(
    [...(contract.acceptedAudioLimitations ?? [])].sort(),
    audioLimitations(config.sound).sort(),
    `${contract.game}: explicitly review and declare the renderer's audio limitations before recording or accepting PCM`,
  );

  const files = await readZip(new Uint8Array(readFileSync(romPath)));
  // MAME commonised device ROMs into their own sets, so a board's parts come
  // from several zips: galaga.zip plus namco51.zip and namco54.zip. The set
  // names are the MAME device short names carried in the generated manifest.
  for (const romSet of unresolvedDependencyRomSets(config.roms, contract.game, files)) {
    const devicePath = resolve(join(romsDir(root), contract.category, `${romSet}.zip`));
    assert.ok(
      existsSync(devicePath),
      `${contract.game}: MAME dependency ROM set "${romSet}" is missing: ${devicePath}`,
    );
    for (const [name, bytes] of await readZip(new Uint8Array(readFileSync(devicePath)))) {
      files.set(name, bytes);
    }
  }

  const critical = new Set(config.board.cpus.map(cpu => cpu.region));
  const buildRegions = (): Regions => {
    const assembled = assembleRegions(config.roms, files, () => {}, critical);
    for (const patch of config.romPatches ?? []) {
      const region = assembled[patch.region];
      if (region && patch.offset < region.length) region[patch.offset] = patch.value;
    }
    applyRomTransforms(assembled, config.romTransforms ?? []);
    return assembled;
  };
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
  const regions = buildRegions();

  const registry = await import(moduleUrl(join(outRoot, 'app/registry.js'))) as {
    registerGeneratedMachines(): void;
  };
  registry.registerGeneratedMachines();
  const generatedRuntime = await import(
    moduleUrl(join(outRoot, 'runtime/core/generated-board.js'))
  ) as {
    registerGeneratedBoard(game: string, factory: unknown): void;
    createBoard(
      boardConfig: ShellConfig['board'],
      regions: Regions,
      inputs: KeyboardInput,
      sinks: { soundWrite(offset: number, data: number, frac?: number, method?: string): void },
    ): Board;
  };
  // Register the selected compiled machine explicitly for offline acceptance.
  // Public registry membership is a publishing decision, not test readiness.
  if (options.registerCandidate) {
    assert.ok(options.recording, 'candidate registration is only allowed during offline recording');
    const selected = await import(moduleUrl(join(gameDir, 'generated/board.js')));
    assert.equal(selected.default.machine.game, contract.game);
    generatedRuntime.registerGeneratedBoard(contract.game, selected.default.createBoard);
  }

  const eventTarget = new EventTarget();
  const input = new KeyboardInput(config.bindings, config.dipDefaults, config.ports);
  input.debug = process.env.MAMEKIT_DEBUG_INPUT === '1';
  input.attach(eventTarget);
  verifyInputBindings(contract, config, input, eventTarget);

  const pendingWrites: SoundWrite[] = [];
  const allWrites: SoundWrite[] = [];
  /** Set while the save-state round trip replays; its writes go here instead. */
  let replayWrites: SoundWrite[] | undefined;
  const requiredAudioCounts = new Map<number, number>();
  const requiredAudioValues = new Map<number, Set<number>>();
  const board = generatedRuntime.createBoard(
    { ...config.board, game: config.game },
    regions,
    input,
    {
      soundWrite: (offset, data, frac, method) => {
        const write = { offset, data, frac, method };
        if (replayWrites) { replayWrites.push(write); return; }
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
  // --- save-state round trip (machine-state.ts) ------------------------------
  // The state is taken at the second-to-last checkpoint and the run carries
  // on to the end; afterwards the board is put back to that state, the same
  // key edges are replayed from the log, and every frame from there must
  // hash exactly as it did the first time. A field the walker misses shows
  // up here as a diverged trajectory rather than surviving as a desync.
  const roundTripFrame = diagnosticCapture || contract.checkpoints.length < 2 ||
    process.env.MAMEKIT_STATE_ROUNDTRIP === '0'
    ? undefined
    : contract.checkpoints.at(-2)!;
  // A candidate built before the runtime could save is still a candidate.
  const canSave = typeof (board as { save?: unknown }).save === 'function';
  /** Frames run so far; the key log and the per-step hashes are keyed by it. */
  let step = 0;
  const inputLog: { step: number; type: 'keydown' | 'keyup' | 'reset'; code?: string }[] = [];
  const stepHashes = new Map<number, GameCheckpointGolden>();
  const stepSnapshots = new Map<number, string>();
  let debugNext: MachineState | undefined;
  /** Time the harness spends on its own round-trip bookkeeping, excluded from throughput. */
  let bookkeepingMs = 0;
  let debugTrace: string[] = [];
  const traceLog: string[] = [];
  if (process.env.MAMEKIT_STATE_DEBUG === '1' && process.env.MAMEKIT_TRACE_CPU) {
    const cpu = (board as unknown as { cpus: Map<string, Record<string, unknown>> }).cpus.get(process.env.MAMEKIT_TRACE_CPU)!;
    const proto = Object.getPrototypeOf(cpu) as { step(): number };
    (cpu as { step?: () => number }).step = function (this: { get(name: string): number; stallCycles?: number } & Record<string, unknown>) {
      const before = `${this.get('PC').toString(16)} a=${this.get('A').toString(16)} sp=${this.get('SP').toString(16)} st=${this.stallCycles} ` +
        `nmi=${String(this.m_nmi_pending)}/${String(this.m_nmi_state)} irq=${String(this.m_irq_state)} P=${String(this.m_P)} ir=${String(this.m_IR)} ref=${String(this.m_ref)}`;
      const took = proto.step.call(this);
      traceLog.push(`${before} -> ${took}`);
      return took;
    };
    const bus = cpu.bus as { read(address: number): number };
    const read = bus.read;
    bus.read = (address: number) => {
      const value = read(address);
      if (address >= 0x1000) traceLog.push(`R ${address.toString(16)}=${value.toString(16)}`);
      return value;
    };
    const run = (proto as unknown as { run(target: number): number }).run;
    (cpu as { run?: (target: number) => number }).run = function (this: object, target: number) {
      const total = run.call(this, target);
      traceLog.push(`RUN ${target} -> ${total}`);
      return total;
    };
  }
  let roundTrip: { step: number; state: MachineState; input: unknown; writes: number } | undefined;
  const opaque = new Map<string, number>();
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
    input.advance();
    traceLog.length = 0;
    board.frame(framebuffer);
    step++;
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
      snapshot,
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
      devices: (board as unknown as {
        devices?: Map<string, { get(name: string): number }>;
      }).devices ?? new Map(),
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
      const values = requiredAudioValues.get(index) ?? new Set<number>();
      for (const write of pendingWrites) {
        if (
          write.method === requirement.method &&
          (requirement.offset === undefined || write.offset === requirement.offset)
        ) values.add(write.data);
      }
      requiredAudioValues.set(index, values);
    }
    audio.render(pendingWrites, diagnosticCapture || snapshot.frame >= 120);
    pendingWrites.length = 0;
    // First occurrence wins. A contract may soft-reset mid-replay (Qix's
    // operator flow stores a language in NVRAM, then resets), and reset puts
    // the board's frame counter back to zero — so every checkpoint below the
    // reset frame is passed a second time. Recording unconditionally
    // overwrote the boot values with post-reset ones, which the browser
    // replay in e2e/support/game.ts never does: it walks its checkpoint list
    // monotonically and records each frame once. That mismatch, not any
    // execution difference, is what made Qix look like it diverged (#79).
    if (checkpointFrames.has(snapshot.frame) &&
      checkpoints[String(snapshot.frame)] === undefined) {
      checkpoints[String(snapshot.frame)] = {
        video: hash(new Uint8Array(framebuffer.buffer)),
        state: stateHash(snapshot),
      };
    }
    if (roundTrip) {
      const started = performance.now();
      stepHashes.set(step, {
        video: hash(new Uint8Array(framebuffer.buffer)),
        state: stateHash(snapshot),
      });
      if (process.env.MAMEKIT_STATE_DEBUG === '1') {
        stepSnapshots.set(step, stableJson(snapshot));
        if (step === roundTrip.step + 1) { debugNext = board.save(); debugTrace = [...traceLog]; }
      }
      bookkeepingMs += performance.now() - started;
    } else if (snapshot.frame === roundTripFrame && canSave) {
      const started = performance.now();
      roundTrip = {
        step,
        state: (board as Board & { save(options?: { onOpaque?: (path: string, value: object) => void }): MachineState })
          .save({
            onOpaque: (path, value) => {
              const key = `${path.replace(/\.\d+(?=\.|$)/g, '.#')}: ${value.constructor.name}`;
              opaque.set(key, (opaque.get(key) ?? 0) + 1);
            },
          }),
        input: captureState(input),
        writes: allWrites.length,
      };
      bookkeepingMs += performance.now() - started;
    }
  };
  const send = (type: 'keydown' | 'keyup', code: string): void => {
    inputLog.push({ step, type, code });
    key(eventTarget, type, code);
  };

  const captureActions = !diagnosticCapture || options.captureActions;
  for (const action of captureActions ? contract.actions : []) {
    while (board.snapshot().frame < action.atFrame) runFrame();
    if ('reset' in action) {
      inputLog.push({ step, type: 'reset' });
      board.reset();
      continue;
    }
    if ('codes' in action) {
      pulseMany(send, action.codes, runFrame, action.heldFrames, action.releasedFrames);
      continue;
    }
    if ('analog' in action || 'signal' in action) {
      throw new Error(`${contract.game}: unsupported input action`);
    }
    pulse(
      send,
      action.code,
      runFrame,
      action.heldFrames,
      action.releasedFrames,
    );
  }
  while (board.snapshot().frame < framesToRun) runFrame();
  const finalSnapshot = board.snapshot();
  // Throughput is the machine's own run: the save-state round trip below
  // replays part of it again, and the per-step hashing that feeds it is the
  // harness's bookkeeping, so neither counts against the floor.
  const elapsedSeconds = (performance.now() - startedAt - bookkeepingMs) / 1000;
  const emulatedFps = framesToRun / elapsedSeconds;
  if (roundTrip) {
    if (process.env.MAMEKIT_STATE_REPORT === '1') {
      const bytes = roundTrip.state.shares && Object.values(roundTrip.state.shares).reduce((t, b) => t + b.length, 0);
      console.log(`${contract.game}: save state at frame ${roundTripFrame}: ` +
        `${Object.keys(roundTrip.state.regions).length} dirty regions, ${bytes} share bytes`);
      for (const [key, count] of [...opaque].sort()) console.log(`  opaque ${key} x${count}`);
    }
    // The same board, rewound: its every container holds end-of-run values,
    // so anything the load leaves behind is a value that has moved on.
    await replayFromState(board, input, roundTrip.step, roundTrip.state, roundTrip.input, 'rewind');
    if (process.env.MAMEKIT_STATE_DEEP === '1') {
      // A second board that lived a different life for the same number of
      // frames (attract mode, no coins), then takes the saved state.
      const deepInput = new KeyboardInput(config.bindings, config.dipDefaults, config.ports);
      const deepBoard = generatedRuntime.createBoard(
        { ...config.board, game: config.game },
        buildRegions(),
        deepInput,
        { soundWrite: (offset, data, frac, method) => { replayWrites?.push({ offset, data, frac, method }); } },
      );
      const scratch = new Uint32Array(deepBoard.fbWidth * deepBoard.fbHeight);
      for (let index = 0; index < roundTrip.step; index++) { deepInput.advance(); deepBoard.frame(scratch); }
      await replayFromState(deepBoard, deepInput, roundTrip.step, roundTrip.state, roundTrip.input, 'divergent');
    }
  }

  async function replayFromState(
    target: Board,
    targetInput: KeyboardInput,
    fromStep: number,
    state: MachineState,
    inputState: unknown,
    label: string,
  ): Promise<void> {
    if (!roundTrip) return;
    try {
      target.load(state);
    } catch (error) {
      assert.fail(`${contract.game}: save state ${label} load failed: ${(error as Error).message}`);
    }
    const inputDiagnostics = restoreState(targetInput, inputState);
    assert.deepEqual(inputDiagnostics, [], `${contract.game}: input state did not restore (${label})`);
    const replayTarget = new EventTarget();
    targetInput.attach(replayTarget);
    const replayFramebuffer = new Uint32Array(target.fbWidth * target.fbHeight);
    const writes: SoundWrite[] = [];
    replayWrites = writes;
    const mismatches: string[] = [];
    let replayStep = fromStep;
    let logIndex = inputLog.findIndex(entry => entry.step >= fromStep);
    if (logIndex < 0) logIndex = inputLog.length;
    try {
      while (replayStep < step) {
        for (; logIndex < inputLog.length && inputLog[logIndex]!.step === replayStep; logIndex++) {
          const entry = inputLog[logIndex]!;
          if (entry.type === 'reset') target.reset();
          else key(replayTarget, entry.type, entry.code!);
        }
        targetInput.advance();
        traceLog.length = 0;
        target.frame(replayFramebuffer);
        replayStep++;
        const expected = stepHashes.get(replayStep);
        const actual = {
          video: hash(new Uint8Array(replayFramebuffer.buffer)),
          state: stateHash(target.snapshot()),
        };
        if (expected && (expected.video !== actual.video || expected.state !== actual.state)) {
          mismatches.push(`step ${replayStep} (frame ${target.snapshot().frame}): ` +
            `video ${expected.video}/${actual.video} state ${expected.state}/${actual.state}`);
          if (process.env.MAMEKIT_STATE_DEBUG === '1') {
            console.log(`original: ${stepSnapshots.get(replayStep)}`);
            console.log(`replayed: ${stableJson(target.snapshot())}`);
            if (debugNext && replayStep === fromStep + 1) {
              for (const line of [...diffStates(debugNext, target.save())].slice(0, 40)) console.log(`  differs: ${line}`);
              const index = debugTrace.findIndex((line, at) => line !== traceLog[at]);
              console.log(`  trace lengths ${debugTrace.length} vs ${traceLog.length}, first difference at ${index}`);
              for (let at = Math.max(0, index - 4); at < index + 4 && index >= 0; at++) console.log(`    ${at}: ${debugTrace[at]} | ${traceLog[at]}`);
            }
          }
          if (mismatches.length >= 3) break;
        }
      }
    } finally {
      replayWrites = undefined;
    }
    assert.deepEqual(
      mismatches,
      [],
      `${contract.game}: trajectory diverged after a save-state ${label} load at step ${fromStep}`,
    );
    const original = allWrites.slice(roundTrip.writes);
    const trace = (list: SoundWrite[]) => hash(new TextEncoder().encode(
      list.map(write => `${write.offset}:${write.data}:${write.method ?? ''}:${write.frac ?? ''}`).join('\n')));
    assert.equal(
      `${writes.length}/${trace(writes)}`,
      `${original.length}/${trace(original)}`,
      `${contract.game}: sound writes diverged after a save-state ${label} load`,
    );
  }
  if (process.env.MAMEKIT_CAPTURE_FRAME) {
    writeFramePpm(
      process.env.MAMEKIT_CAPTURE_FRAME,
      framebuffer,
      board.fbWidth,
      board.fbHeight,
    );
  }

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
          'm_irq_a1', 'm_irq_a_state', 'm_state', 'm_latched_value',
          'm_latch_written']
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
    if (requirement.minimumDistinctValues !== undefined) {
      const distinct = requiredAudioValues.get(index)?.size ?? 0;
      assert.ok(
        distinct >= requirement.minimumDistinctValues,
        `${contract.game}: ${source} audio emitted ${distinct} distinct values ` +
          `${window} (minimum ${requirement.minimumDistinctValues})`,
      );
    }
  }
  console.log(
    `${contract.game}: ${emulatedFps.toFixed(1)} emulated fps ` +
      `(minimum ${contract.minimumFps})`,
  );
  const handlerCounts = (globalThis as {
    __mamekitHandlerCounts?: Map<string, number>;
  }).__mamekitHandlerCounts;
  if (handlerCounts) {
    console.log([...handlerCounts]
      .sort((left, right) => right[1] - left[1])
      .slice(0, 30)
      .map(([name, count]) => `${count.toLocaleString()} ${name}`)
      .join('\n'));
  }

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

export function verifyInputBindings(
  contract: GameTestContract,
  config: ShellConfig,
  input: KeyboardInput,
  target: EventTarget,
): void {
  for (const code of new Set(contract.actions.flatMap(action =>
    'code' in action ? [action.code] : 'codes' in action ? action.codes : []))) {
    const binding = config.bindings.find(candidate => candidate.keys.includes(code));
    assert.ok(binding, `${contract.game}: ${code} has no generated input binding`);
    input.latch();
    const released = input.read(binding.port);
    key(target, 'keydown', code);
    // A machine only ever sees input at a frame boundary, so settle the
    // queue before reading the port back: this probe runs no frames.
    input.latch();
    const pressed = input.read(binding.port);
    const expected = binding.relativeDelta !== undefined
      ? (released & ~binding.mask) |
        (((released & binding.mask) + binding.relativeDelta) & binding.mask)
      : binding.activeValue !== undefined
        ? (released & ~binding.mask) | (binding.activeValue & binding.mask)
        : binding.activeLow
          ? released & ~binding.mask
          : released | binding.mask;
    assert.equal(pressed, expected, `${contract.game}: ${code} did not reach ${binding.port}`);
    key(target, 'keyup', code);
    input.latch();
    if (binding.toggle) {
      assert.equal(input.read(binding.port), expected);
      key(target, 'keydown', code);
      key(target, 'keyup', code);
      input.latch();
    }
    if (binding.relativeDelta !== undefined) {
      // A dial is a persistent hardware counter, not a switch that springs
      // back on keyup. Restore the preflight probe before the actual replay.
      input.setDip(binding.port, binding.mask, released);
    }
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

/** Every path where two captured machines differ (MAMEKIT_STATE_DEBUG=1). */
function* diffStates(a: unknown, b: unknown, path = ''): Generator<string> {
  if (a === b) return;
  if (typeof a === 'number' && typeof b === 'number' && Number.isNaN(a) && Number.isNaN(b)) return;
  if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
    const x = a as unknown as ArrayLike<number>;
    const y = b as unknown as ArrayLike<number>;
    if (x.length !== y.length) { yield `${path}: length ${x.length} vs ${y.length}`; return; }
    let count = 0;
    let first = -1;
    for (let index = 0; index < x.length; index++) if (x[index] !== y[index]) { count++; if (first < 0) first = index; }
    if (count) yield `${path}: ${count} elements differ (first at ${first}: ${x[first]} vs ${y[first]})`;
    return;
  }
  if (a instanceof Map && b instanceof Map) {
    for (const key of new Set([...a.keys(), ...b.keys()])) yield* diffStates(a.get(key), b.get(key), `${path}[${String(key)}]`);
    return;
  }
  if (a instanceof Set && b instanceof Set) { if ([...a].join() !== [...b].join()) yield `${path}: set differs`; return; }
  if (typeof a === 'object' && a && typeof b === 'object' && b) {
    const left = a as Record<string, unknown>;
    const right = b as Record<string, unknown>;
    for (const key of new Set([...Object.keys(left), ...Object.keys(right)])) {
      yield* diffStates(left[key], right[key], path ? `${path}.${key}` : key);
    }
    return;
  }
  yield `${path}: ${String(a)} vs ${String(b)}`;
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

type KeySender = (type: 'keydown' | 'keyup', code: string) => void;

function pulse(
  send: KeySender,
  code: string,
  frame: () => void,
  heldFrames: number,
  releasedFrames: number,
): void {
  send('keydown', code);
  for (let index = 0; index < heldFrames; index++) frame();
  send('keyup', code);
  for (let index = 0; index < releasedFrames; index++) frame();
}

function pulseMany(
  send: KeySender,
  codes: string[],
  frame: () => void,
  heldFrames: number,
  releasedFrames: number,
): void {
  for (const code of codes) send('keydown', code);
  for (let index = 0; index < heldFrames; index++) frame();
  for (const code of [...codes].reverse()) send('keyup', code);
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
