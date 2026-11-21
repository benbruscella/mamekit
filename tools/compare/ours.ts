/**
 * Our side of an oracle run: the generated machine booted by the acceptance
 * harness, exactly as a contract or the app boots it, with the frames, RAM
 * and bus traffic the plan asks for written beside MAME's.
 *
 * A title that has no contract of its own borrows its machine's: the target
 * definition is the same, and the cartridge or software title, the actions
 * and the length are the plan's. The harness runs in its diagnostic mode,
 * which compares against no golden.
 */

import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { runGameAcceptance } from '../../src/games/acceptance-harness.ts';
import { loadGenerationGameContracts } from '../../src/games/contracts.ts';
import type { GameInputAction, GameTestContract } from '../../src/games/types.ts';
import { gameOutputDir } from '../../src/gen/output-layout.ts';
import type { ShellConfig } from '../../src/runtime/shell.ts';
import type { Board } from '../../src/runtime/types.ts';
import { bootFrame, InputRecorder, inputTimeline, MEDIA_SWITCH, moveBootEvent, ramFrames, startSchedule, type IoPlan, type OraclePlan, type OursBoot } from './plan.ts';

type IoTap = IoPlan['taps'][number];
import { projectRoot } from './mame-side.ts';

/** The machine's contract to borrow: the scenario named, else one of the title's kind, else its first. */
export async function baseContract(target: string, scenario?: string, kind?: 'cartridge' | 'software'): Promise<GameTestContract> {
  const contracts = (await loadGenerationGameContracts()).filter(contract => contract.game === target);
  if (!contracts.length) throw new Error(`${target} has no acceptance contract, so the oracle cannot boot it`);
  if (scenario) {
    const named = contracts.find(contract => contract.scenarioId === scenario);
    if (!named) throw new Error(`${target} has no scenario ${scenario} (${contracts.map(contract => contract.scenarioId).join(', ')})`);
    return named;
  }
  return contracts.find(contract => kind && contract[kind]) ?? contracts[0]!;
}

export async function runOurs(plan: OraclePlan): Promise<void> {
  const title = plan.title;
  const base = await baseContract(plan.target, plan.scenario,
    title ? ('cartridge' in title ? 'cartridge' : 'software') : undefined);
  const snapshotFrames = new Set(plan.frames);
  const dumpFrames = new Set(plan.ram ? ramFrames(plan.ram) : []);
  const ramFile = join(plan.dir, 'ours-ram.bin');
  const ioFile = join(plan.dir, 'ours-io.txt');
  if (plan.ram) writeFileSync(ramFile, '');
  if (plan.io) writeFileSync(ioFile, '');
  let liveBoard: { fbWidth: number; fbHeight: number } | undefined;
  let framesRun = 0;
  /** Per chip, per window of `plan.levels` frames: the sum of its stream's squared samples and their count. */
  const levelSums: Record<string, { squares: number; count: number }[]> = {};
  let dumping = false;
  const grade = { samples: 0, drawn: 0, changes: 0, colours: 0 };
  let lastHash = -1;
  const config = JSON.parse(readFileSync(join(gameOutputDir(plan.dist, base.category, base.game), 'config.json'), 'utf8')) as ShellConfig;
  const actions: GameInputAction[] = plan.input === 'start' ? startSchedule(config.bindings, plan.last)
    : plan.input === 'contract' ? base.actions.filter(action => action.atFrame < plan.last)
    : [];
  // MAME names a title `<list>:<name>`; a console's cartridge list is its catalogue's.
  const cartridgeList = (): string => (JSON.parse(readFileSync(join(gameOutputDir(plan.dist, base.category, base.game),
    config.cart?.catalogUrl ?? 'softlist.json'), 'utf8')) as { list: string }).list;
  const contract: GameTestContract = {
    ...base,
    ...(title && 'cartridge' in title ? { cartridge: title.cartridge, software: undefined } : {}),
    ...(title && 'software' in title ? { software: title.software, cartridge: undefined } : {}),
    actions,
    frames: plan.last,
    checkpoints: [],
    golden: undefined,
    audioRequirements: undefined,
    shareRequirements: undefined,
    minimumAudioRms: undefined,
  };
  const software = contract.cartridge ? `${cartridgeList()}:${contract.cartridge}`
    : contract.software ? `${contract.software.list}:${contract.software.name}` : undefined;
  const kind = contract.cartridge ? 'cartridge'
    : config.software?.shelves.find(shelf => shelf.list === contract.software?.list)?.kind;
  const media = kind ? MEDIA_SWITCH[kind] : undefined;

  // Bus traffic in the tapped ranges, buffered and written in blocks: a
  // shared RAM tap logs hundreds of thousands of accesses.
  const ioLines: string[] = [];
  const flushIo = () => {
    if (!ioLines.length) return;
    appendFileSync(ioFile, ioLines.join(''));
    ioLines.length = 0;
  };

  /**
   * Each tapped processor's bus wrapped once, every tap on it checked per
   * access. A word access is logged once, as the word the CPU moved: MAME's
   * tap sees it so (oracle.lua turns one byte lane of a word back into the
   * byte), and it counts when either of its bytes is in a range, since a
   * `move.w` to $f80000 writes the latch at $f80001. A word whose handler is
   * two byte handlers reaches them through bus.read/bus.write, and those
   * inner halves are not logged again. Until #260 only bus.read/bus.write
   * were wrapped, so a 68000's word writes to a word handler never appeared
   * (half of Marble Madness's traffic).
   */
  const tapBuses = (board: Board) => {
    const cpus = (board as unknown as { cpus?: Map<string, { bus?: object }> }).cpus;
    const buses = (board as unknown as { cpuBuses?: Map<string, object> }).cpuBuses;
    const generated = board as unknown as { cpuSeconds?(cpu: unknown): number; machine?: { execution: { cpus: { tag: string }[] } } };
    const byTag = new Map<string, { tap: IoTap; index: number }[]>();
    // A processor's I/O space is its bus's port methods (in/out), keyed apart.
    const key = (tap: IoTap) => tap.space === 'io' ? `${tap.tag}\u0000io` : tap.tag;
    plan.io!.taps.forEach((tap, index) => byTag.set(key(tap), [...byTag.get(key(tap)) ?? [], { tap, index }]));
    for (const [keyed, taps] of byTag) {
      const tag = taps[0]!.tap.tag;
      const ports = keyed !== tag;
      // A core compiled whole decodes its own internal map before the board's
      // bus: the S-SMP's I/O registers at $f0-$ff never reach the bus, so the
      // tap goes on the core's own program space, which every access it makes
      // passes through (and which falls through to the bus for the rest).
      const core = (cpus?.get(tag) as { device?: { hostedCalls?(): { space?: (index: number) => unknown } } } | undefined)?.device;
      const ownSpace = !ports ? core?.hostedCalls?.().space?.(0) as Record<string, unknown> | undefined : undefined;
      const coreSpace = ownSpace && typeof ownSpace.read_byte === 'function' && typeof ownSpace.write_byte === 'function'
        ? { read: ownSpace.read_byte, write: ownSpace.write_byte, target: ownSpace } : undefined;
      const bus = coreSpace
        ? new Proxy(coreSpace.target, {
            get: (target, name) => name === 'read' ? target.read_byte : name === 'write' ? target.write_byte : undefined,
            set: (target, name, value) => {
              if (name === 'read') target.read_byte = value;
              else if (name === 'write') target.write_byte = value;
              return true;
            },
          }) as Record<string, unknown>
        : (cpus?.get(tag)?.bus ?? buses?.get(tag)) as Record<string, unknown> | undefined;
      if (!bus) throw new Error(`the board has no CPU bus ${tag}`);
      // The emulated time an access happened at, on the CPU's own cycle count, as MAME's side stamps it.
      const cpu = generated.machine?.execution.cpus.find(candidate => candidate.tag === tag);
      const seconds = () => cpu && generated.cpuSeconds ? generated.cpuSeconds(cpu) : 0;
      // A port access reaches the bus as the processor issues it (a Z80's
      // OUT (n),A puts A on the high byte); MAME's tap sees it after the I/O
      // map's global_mask, so ours masks the same way, as the bus itself does.
      const portMask = ports ? (cpu as { io?: { globalMask?: number } } | undefined)?.io?.globalMask ?? 0xffff : undefined;
      const log = (kind: 'R' | 'W', raw: number, data: number, bytes: number) => {
        const frame = framesRun + 1;
        if (dumping || frame < plan.io!.from || frame > plan.io!.to) return;
        const address = portMask === undefined ? raw : raw & portMask;
        for (const { tap, index } of taps) {
          if (!(kind === 'R' ? tap.read : tap.write) || address + bytes - 1 < tap.lo || address > tap.hi) continue;
          ioLines.push(`${frame} ${kind} ${index} ${address.toString(16)} ${(data >>> 0).toString(16)} ${seconds().toFixed(10)}\n`);
          if (ioLines.length >= 4096) flushIo();
          return;
        }
      };
      let inWord = 0;
      for (const name of ports ? ['in', 'in16be', 'in16le'] : ['read', 'read16be', 'read16le']) {
        const method = bus[name] as ((address: number, ...rest: unknown[]) => number) | undefined;
        if (typeof method !== 'function') continue;
        const original = method.bind(bus);
        const word = name !== 'read' && name !== 'in';
        bus[name] = (address: number, ...rest: unknown[]) => {
          if (word) inWord++;
          let value: number;
          try {
            value = original(address, ...rest);
          } finally {
            if (word) inWord--;
          }
          if (word || inWord === 0) log('R', address, Number(value) & (word ? 0xffff : 0xff), word ? 2 : 1);
          return value;
        };
      }
      for (const name of ports ? ['out', 'out16be', 'out16le'] : ['write', 'write16be', 'write16le']) {
        const method = bus[name] as ((address: number, data: number, ...rest: unknown[]) => void) | undefined;
        if (typeof method !== 'function') continue;
        const original = method.bind(bus);
        const word = name !== 'write' && name !== 'out';
        bus[name] = (address: number, data: number, ...rest: unknown[]) => {
          if (word || inWord === 0) log('W', address, Number(data) & (word ? 0xffff : 0xff), word ? 2 : 1);
          if (word) inWord++;
          try {
            original(address, data, ...rest);
          } finally {
            if (word) inWord--;
          }
        };
      }
    }
  };

  const readRam = (buses: ReadonlyMap<string, { read(address: number): number }>): Uint8Array => {
    const chunks: Uint8Array[] = [];
    dumping = true;
    try {
      for (const cpu of plan.ram!.cpus) {
        const bus = buses.get(cpu.tag);
        if (!bus) throw new Error(`the board has no CPU bus ${cpu.tag}`);
        for (const [start, end] of cpu.ranges) {
          const bytes = new Uint8Array(end - start + 1);
          for (let address = start; address <= end; address++) bytes[address - start] = Number(bus.read(address)) & 0xff;
          chunks.push(bytes);
        }
      }
    } finally {
      dumping = false;
    }
    return Buffer.concat(chunks);
  };
  // MAME's RAM is read at the start of VBLANK, the instant its frame is
  // presented, and so is ours: the frame runner presents at that instant. A
  // screen updated by scanline is never presented whole, so its RAM is read
  // when the frame has run.
  let presented: Uint8Array | undefined;
  const captureAtPresentation = (board: Board) => {
    const runner = (board as unknown as { frameRunner?: { video?: { render(framebuffer: Uint32Array): void } } }).frameRunner;
    const video = runner?.video;
    const buses = (board as unknown as { cpuBuses?: Map<string, { read(address: number): number }> }).cpuBuses;
    if (!video || !buses) return;
    const render = video.render.bind(video);
    video.render = framebuffer => {
      render(framebuffer);
      if (dumpFrames.has(framesRun + 1)) presented = readRam(buses);
    };
  };

  let booted: OursBoot | undefined;
  let recorder: InputRecorder | undefined;
  let completed = false;
  try {
    await runGameAcceptance(contract, projectRoot, {
      outRoot: plan.dist,
      captureAudio: join(plan.dir, 'ours.pcm'),
      // Each chip's observed stream, summed per window of frames: a sample
      // written during frame N + 1 belongs to the window holding it.
      ...(plan.levels ? {
        onSoundWrite: (write: { method?: string; data: number }) => {
          if (!write.method?.endsWith('.stream')) return;
          const chip = write.method.slice(0, -'.stream'.length);
          const window = Math.floor(framesRun / plan.levels!);
          const sums = (levelSums[chip] ??= []);
          const entry = (sums[window] ??= { squares: 0, count: 0 });
          entry.squares += write.data * write.data;
          entry.count++;
        },
      } : {}),
      captureActions: true,
      frames: plan.last,
      // What MAME must be given to boot the same machine: the cards in its
      // slots, the media slots left empty, the title and the input timeline.
      onBoard: ({ board, boardConfig, config, input }) => {
        liveBoard = board;
        const shelf = title && 'software' in title
          ? config.software?.shelves.find(candidate => candidate.list === title.software.list)
          : undefined;
        const boot: OursBoot = {
          width: board.fbWidth,
          height: board.fbHeight,
          rotate: config.board.screen.rotate ?? 0,
          slotCards: boardConfig.slotCards ?? {},
          emptySlots: boardConfig.emptySlots ?? [],
          ...(software ? { software } : {}),
        ...(media ? { media } : {}),
          timeline: inputTimeline(contract.actions, config.bindings, shelf?.boot ? {
            frame: bootFrame(shelf.boot, config.board.screen.refresh),
            text: shelf.boot.command,
            play: Boolean(shelf.boot.play),
          } : undefined),
        };
        const buses = (board as unknown as { cpuBuses?: Map<string, unknown> }).cpuBuses;
        if (plan.ram?.fromBoard && buses) {
          plan.ram.cpus = plan.ram.cpus.filter(cpu => buses.has(cpu.tag));
          boot.ramCpus = plan.ram.cpus;
        }
        booted = boot;
        writeFileSync(join(plan.dir, 'ours-boot.json'), `${JSON.stringify(boot)}\n`);
        recorder = new InputRecorder(boot.timeline, config.bindings, input);
        // MAME's analog override is read as it stands, never interpolated
        // across the frame, so a dial or trackball reads one value a frame here
        // too: the two sides then read the same port, and only the emulation
        // differs. A contract run hands a frame's travel out against the beam.
        input.frameFraction = null;
        if (plan.io) tapBuses(board);
        if (plan.ram) captureAtPresentation(board);
      },
      // The start types once a quickload has loaded, which can be later than
      // its shelf's delay: MAME is given the frame it actually typed on.
      onTitleStart: (frame, message) => {
        if (!booted || !message.startsWith('typing')) return;
        moveBootEvent(booted.timeline, frame);
        writeFileSync(join(plan.dir, 'ours-boot.json'), `${JSON.stringify(booted)}\n`);
      },
      // Frames as MAME counts them, one after another: a reset sets the
      // board's own frame counter back to zero (and a contract's later
      // actions count from there), but MAME's goes on.
      inspectFrame: frame => {
        const number = ++framesRun;
        recorder?.frame(number);
        if (snapshotFrames.has(number)) {
          writeFileSync(join(plan.dir, `ours-${number}.rgba`), new Uint8Array(frame.framebuffer.buffer.slice(0)));
          // Its own size: a screen a device reconfigures changes shape (the
          // SNES shows 240 lines once a game turns overscan on).
          if (liveBoard) writeFileSync(join(plan.dir, `ours-${number}.size`), `${liveBoard.fbWidth} ${liveBoard.fbHeight}\n`);
        }
        if (dumpFrames.has(number)) {
          appendFileSync(ramFile, presented ?? readRam(frame.buses));
          presented = undefined;
        }
        if (plan.grade && number % 30 === 0) {
          const pixels = frame.framebuffer;
          let hash = 2166136261;
          const colours = new Set<number>();
          for (let index = 0; index < pixels.length; index += 7) hash = Math.imul(hash ^ pixels[index]!, 16777619);
          for (let index = 0; index < pixels.length; index += 13) colours.add(pixels[index]!);
          grade.samples++;
          if (colours.size > 2) grade.drawn++;
          if (hash >>> 0 !== lastHash) grade.changes++;
          lastHash = hash >>> 0;
          grade.colours = colours.size;
        }
      },
    });
    completed = true;
  } finally {
    // The analog values MAME is given are known only once they have been read.
    if (booted && recorder) {
      writeFileSync(join(plan.dir, 'ours-boot.json'), `${JSON.stringify(booted)}\n`);
      writeFileSync(join(plan.dir, 'ours-inputs.txt'), recorder.readings());
    }
    if (plan.io) flushIo();
    if (plan.levels) {
      const windows = Math.ceil(framesRun / plan.levels);
      const chips = Object.fromEntries(Object.entries(levelSums).map(([chip, sums]) => [chip,
        Array.from({ length: windows }, (_, index) => {
          const entry = sums[index];
          return entry && entry.count ? Math.sqrt(entry.squares / entry.count) : 0;
        })]));
      writeFileSync(join(plan.dir, 'ours-levels.json'), `${JSON.stringify({ window: plan.levels, frames: framesRun, chips })}\n`);
    }
    // How far it got, whether or not it finished: a failure's frame is part of the result.
    writeFileSync(join(plan.dir, 'ours-done.json'),
      `${JSON.stringify({ frames: framesRun, completed, ...(plan.grade ? { grade } : {}) })}\n`);
  }
}
