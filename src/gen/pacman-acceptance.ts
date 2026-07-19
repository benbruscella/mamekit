import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { KeyboardInput } from '../runtime/input.ts';
import {
  assembleRegions,
  checkRomSet,
  type ShellConfig,
} from '../runtime/shell.ts';
import type { Board, BoardSnapshot, Regions } from '../runtime/types.ts';
import { crc32, readZip } from '../runtime/zip.ts';

interface SoundWrite {
  offset: number;
  data: number;
  frac?: number;
}

interface WsgCore {
  readonly sampleRate: number;
  soundEnable(state: number): void;
  write(offset: number, data: number): void;
  render(out: Float32Array): void;
}

interface FrameCheckpoint {
  video: string;
  pc: number;
  sp: number;
  cycles: number;
}

export interface PacmanAcceptanceResult {
  roms: Record<string, string>;
  inputs: {
    restingIn0: number;
    coinIn0: number;
    startIn1: number;
    leftIn0: number;
  };
  frames: Record<string, FrameCheckpoint>;
  audio: {
    writes: number;
    nonzeroRegisterWrites: number;
    writeHash: string;
    pcmHash: string;
    rms: number;
  };
}

const PACMAN_GOLDEN: PacmanAcceptanceResult = {
  roms: {
    maincpu: '332838db',
    gfx1: '0be015aa',
    proms: 'c1e7e6a7',
    namco: '3f2ff826',
  },
  inputs: {
    restingIn0: 255,
    coinIn0: 223,
    startIn1: 223,
    leftIn0: 253,
  },
  frames: {
    '1': { video: '1556d338', pc: 9035, sp: 0, cycles: 50688 },
    '60': { video: '1556d338', pc: 12411, sp: 12636, cycles: 3041281 },
    '180': { video: '7e928035', pc: 12414, sp: 12648, cycles: 9123847 },
    '300': { video: 'f88d0bf7', pc: 12366, sp: 12632, cycles: 15206402 },
    '600': { video: '189e0035', pc: 432, sp: 20402, cycles: 30412803 },
    '900': { video: '431e00a1', pc: 8219, sp: 20394, cycles: 45619206 },
  },
  audio: {
    writes: 6818,
    nonzeroRegisterWrites: 2671,
    writeHash: '55fc97d7',
    pcmHash: 'f3fb1ef1',
    rms: 0.134234,
  },
};

export async function verifyPacmanAcceptance(
  projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..'),
): Promise<PacmanAcceptanceResult> {
  const outRoot = join(projectRoot, 'dist');
  const romPath = process.env.MAMEKIT_PACMAN_ROM
    ? resolve(process.env.MAMEKIT_PACMAN_ROM)
    : join(projectRoot, 'roms/arcade/pacman.zip');
  assert.ok(existsSync(romPath), `Pac-Man acceptance ROM is missing: ${romPath}`);

  const config = JSON.parse(
    readFileSync(join(outRoot, 'pacman/config.json'), 'utf8'),
  ) as ShellConfig;
  const files = await readZip(new Uint8Array(readFileSync(romPath)));
  const critical = new Set(config.board.cpus.map(cpu => cpu.region));
  const romCheck = checkRomSet(config.roms, files, critical);
  assert.deepEqual(romCheck.missingCritical, [], 'Pac-Man CPU ROMs must be complete');
  assert.deepEqual(romCheck.missingOther, [], 'Pac-Man graphics/audio ROMs must be complete');
  assert.deepEqual(romCheck.crcMismatch, [], 'Pac-Man acceptance ROMs must match MAME CRCs');

  const regions = assembleRegions(config.roms, files, () => {}, critical);
  for (const patch of config.romPatches ?? []) {
    const region = regions[patch.region];
    if (region && patch.offset < region.length) region[patch.offset] = patch.value;
  }

  const registry = await import(
    moduleUrl(join(outRoot, 'app/modules/generated/registry.js'))
  ) as { registerGeneratedMachines(): void };
  registry.registerGeneratedMachines();
  const generatedRuntime = await import(
    moduleUrl(join(outRoot, 'app/modules/runtime/generated-board.js'))
  ) as {
    createBoard(
      boardConfig: ShellConfig['board'],
      regions: Regions,
      inputs: KeyboardInput,
      sinks: { soundWrite(offset: number, data: number, frac?: number): void },
    ): Board;
  };

  const eventTarget = new EventTarget();
  const input = new KeyboardInput(config.bindings, config.dipDefaults, config.ports);
  input.attach(eventTarget);
  const restingIn0 = input.read('IN0');
  key(eventTarget, 'keydown', 'Digit5');
  const coinIn0 = input.read('IN0');
  key(eventTarget, 'keyup', 'Digit5');
  key(eventTarget, 'keydown', 'Digit1');
  const startIn1 = input.read('IN1');
  key(eventTarget, 'keyup', 'Digit1');
  key(eventTarget, 'keydown', 'ArrowLeft');
  const leftIn0 = input.read('IN0');
  key(eventTarget, 'keyup', 'ArrowLeft');

  const globals = globalThis as Record<string, unknown>;
  globals.AudioWorkletProcessor = class {};
  globals.sampleRate = 48_000;
  globals.registerProcessor = () => {};
  const wsgModule = await import(
    moduleUrl(join(outRoot, 'app/modules/runtime/wsg-worklet.js'))
  ) as {
    GeneratedNamcoWsgCore: new (waveRom: Uint8Array, clock: number) => WsgCore;
  };
  const waveRom = regions[config.sound.waveRegion ?? 'namco'];
  assert.ok(waveRom, 'Pac-Man WSG waveform region must be assembled');
  const audioCore = new wsgModule.GeneratedNamcoWsgCore(
    waveRom,
    config.sound.clock ?? 96_000,
  );
  assert.equal(audioCore.sampleRate, 192_000);

  let pendingWrites: SoundWrite[] = [];
  const allWrites: SoundWrite[] = [];
  const board = generatedRuntime.createBoard(
    { ...config.board, game: config.game },
    regions,
    input,
    {
      soundWrite: (offset, data, frac) => {
        const write = { offset, data, ...(frac === undefined ? {} : { frac }) };
        pendingWrites.push(write);
        allWrites.push(write);
      },
    },
  );
  assert.equal(board.fbWidth, 288);
  assert.equal(board.fbHeight, 224);

  const framebuffer = new Uint32Array(board.fbWidth * board.fbHeight);
  const frames: Record<string, FrameCheckpoint> = {};
  const audioTail: number[] = [];
  let sampleCarry = 0;
  const runFrame = (): void => {
    pendingWrites = [];
    board.frame(framebuffer);
    sampleCarry += audioCore.sampleRate / config.board.screen.refresh;
    const sampleCount = Math.floor(sampleCarry);
    sampleCarry -= sampleCount;
    const samples = renderAudioFrame(audioCore, sampleCount, pendingWrites);
    if (board.snapshot().frame >= 160) {
      for (const sample of samples) audioTail.push(sample);
    }
    const frame = board.snapshot().frame;
    if ([1, 60, 180, 300, 600, 900].includes(frame)) {
      frames[String(frame)] = checkpoint(board.snapshot(), framebuffer);
    }
  };

  while (board.snapshot().frame < 600) runFrame();
  pulse(eventTarget, 'Digit5', runFrame, 2, 4);
  pulse(eventTarget, 'Digit1', runFrame, 2, 4);
  key(eventTarget, 'keydown', 'ArrowLeft');
  for (let frame = 0; frame < 10; frame++) runFrame();
  key(eventTarget, 'keyup', 'ArrowLeft');
  while (board.snapshot().frame < 900) runFrame();

  const pcm = Int16Array.from(audioTail, sample =>
    Math.round(Math.max(-1, Math.min(1, sample)) * 32767));
  const rms = Math.sqrt(
    audioTail.reduce((sum, sample) => sum + sample * sample, 0) /
    Math.max(1, audioTail.length),
  );
  const result: PacmanAcceptanceResult = {
    roms: Object.fromEntries(
      Object.entries(regions).map(([name, bytes]) => [name, hash(bytes)]),
    ),
    inputs: { restingIn0, coinIn0, startIn1, leftIn0 },
    frames,
    audio: {
      writes: allWrites.length,
      nonzeroRegisterWrites: allWrites.filter(write =>
        write.offset >= 0 && write.data !== 0).length,
      writeHash: hash(new TextEncoder().encode(JSON.stringify(allWrites))),
      pcmHash: hash(new Uint8Array(pcm.buffer)),
      rms: Math.round(rms * 1_000_000) / 1_000_000,
    },
  };

  if (process.env.MAMEKIT_UPDATE_GOLDENS === '1') {
    console.log(JSON.stringify(result, null, 2));
  }
  assert.equal(result.inputs.restingIn0, 0xff);
  assert.equal(result.inputs.coinIn0, 0xdf);
  assert.equal(result.inputs.startIn1, 0xdf);
  assert.equal(result.inputs.leftIn0, 0xfd);
  assert.ok(result.audio.writes > 0, 'Pac-Man must execute generated sound writes');
  assert.ok(result.audio.rms > 0.001, 'Pac-Man generated WSG output must be audible');
  assert.equal(Object.keys(result.frames).length, 6);
  assert.ok(result.frames['900']!.cycles > 45_000_000);

  if (process.env.MAMEKIT_UPDATE_GOLDENS !== '1') {
    assert.deepEqual(result, PACMAN_GOLDEN);
  }
  return result;
}

function renderAudioFrame(
  core: WsgCore,
  sampleCount: number,
  writes: SoundWrite[],
): Float32Array {
  const output = new Float32Array(sampleCount);
  let position = 0;
  for (const write of writes.sort((left, right) => (left.frac ?? 0) - (right.frac ?? 0))) {
    const next = Math.max(
      position,
      Math.min(sampleCount, Math.floor((write.frac ?? 0) * sampleCount)),
    );
    if (next > position) core.render(output.subarray(position, next));
    if (write.offset < 0) core.soundEnable(write.data);
    else core.write(write.offset, write.data);
    position = next;
  }
  if (position < sampleCount) core.render(output.subarray(position));
  return output;
}

function checkpoint(board: BoardSnapshot, framebuffer: Uint32Array): FrameCheckpoint {
  const cpu = board.cpus.find(candidate => candidate.tag === 'maincpu');
  assert.ok(cpu, 'Pac-Man main CPU snapshot is missing');
  return {
    video: hash(new Uint8Array(
      framebuffer.buffer,
      framebuffer.byteOffset,
      framebuffer.byteLength,
    )),
    pc: cpu.pc,
    sp: cpu.sp,
    cycles: cpu.cycles ?? 0,
  };
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

function hash(bytes: Uint8Array): string {
  return crc32(bytes).toString(16).padStart(8, '0');
}

function moduleUrl(path: string): string {
  return pathToFileURL(path).href;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await verifyPacmanAcceptance();
  if (process.env.MAMEKIT_UPDATE_GOLDENS !== '1') {
    console.log('pacman-acceptance: ROM/input/video/audio/timing contract passed');
  }
}
