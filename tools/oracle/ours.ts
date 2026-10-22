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
import { bootFrame, inputTimeline, MEDIA_SWITCH, moveBootEvent, ramFrames, startSchedule, type OraclePlan, type OursBoot } from './plan.ts';
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
  let framesRun = 0;
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

  const tapBuses = (board: Board) => {
    const cpus = (board as unknown as { cpus?: Map<string, { bus?: object }> }).cpus;
    const buses = (board as unknown as { cpuBuses?: Map<string, object> }).cpuBuses;
    plan.io!.taps.forEach((tap, index) => {
      const bus = (cpus?.get(tap.tag)?.bus ?? buses?.get(tap.tag)) as
        { read(address: number, ...rest: unknown[]): number; write(address: number, data: number, ...rest: unknown[]): void } | undefined;
      if (!bus) throw new Error(`the board has no CPU bus ${tap.tag}`);
      const log = (kind: 'R' | 'W', address: number, data: number) => {
        const frame = framesRun + 1;
        if (dumping || address < tap.lo || address > tap.hi || frame < plan.io!.from || frame > plan.io!.to) return;
        appendFileSync(ioFile, `${frame} ${kind} ${index} ${address.toString(16)} ${(Number(data) >>> 0).toString(16)}\n`);
      };
      const read = bus.read.bind(bus);
      const write = bus.write.bind(bus);
      if (tap.read) bus.read = (address, ...rest) => { const value = read(address, ...rest); log('R', address, value); return value; };
      if (tap.write) bus.write = (address, data, ...rest) => { log('W', address, data); write(address, data, ...rest); };
    });
  };

  let booted: OursBoot | undefined;
  let completed = false;
  try {
    await runGameAcceptance(contract, projectRoot, {
      outRoot: plan.dist,
      captureAudio: join(plan.dir, 'ours.pcm'),
      captureActions: true,
      frames: plan.last,
      // What MAME must be given to boot the same machine: the cards in its
      // slots, the media slots left empty, the title and the input timeline.
      onBoard: ({ board, boardConfig, config }) => {
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
        booted = boot;
        writeFileSync(join(plan.dir, 'ours-boot.json'), `${JSON.stringify(boot)}\n`);
        if (plan.io) tapBuses(board);
      },
      // The start types once a quickload has loaded, which can be later than
      // its shelf's delay: MAME is given the frame it actually typed on.
      onTitleStart: (frame, message) => {
        if (!booted || !message.startsWith('typing')) return;
        moveBootEvent(booted.timeline, frame);
        writeFileSync(join(plan.dir, 'ours-boot.json'), `${JSON.stringify(booted)}\n`);
      },
      inspectFrame: frame => {
        framesRun = frame.number;
        if (snapshotFrames.has(frame.number)) {
          writeFileSync(join(plan.dir, `ours-${frame.number}.rgba`), new Uint8Array(frame.framebuffer.buffer.slice(0)));
        }
        if (dumpFrames.has(frame.number)) {
          dumping = true;
          try {
            for (const cpu of plan.ram!.cpus) {
              const bus = frame.buses.get(cpu.tag);
              if (!bus) throw new Error(`the board has no CPU bus ${cpu.tag}`);
              for (const [start, end] of cpu.ranges) {
                const bytes = new Uint8Array(end - start + 1);
                for (let address = start; address <= end; address++) bytes[address - start] = Number(bus.read(address)) & 0xff;
                appendFileSync(ramFile, bytes);
              }
            }
          } finally {
            dumping = false;
          }
        }
        if (plan.grade && frame.number % 30 === 0) {
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
    // How far it got, whether or not it finished: a failure's frame is part of the result.
    writeFileSync(join(plan.dir, 'ours-done.json'),
      `${JSON.stringify({ frames: framesRun, completed, ...(plan.grade ? { grade } : {}) })}\n`);
  }
}
