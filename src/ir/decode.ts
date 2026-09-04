// Structural decoder for generated board.json.
//
// Every consumer previously reached the IR through `data as unknown as
// BoardIr`, which turns a malformed or version-skewed artifact into an
// undefined-property crash somewhere deep in execution. decodeBoardIr() is the
// one boundary where untrusted JSON becomes BoardIr, and it reports the JSON
// field path plus the MAME source span the compiler recorded for that node.

import type { BoardIr, BoardSourceRef } from './board.ts';
import { BOARD_IR_SCHEMA_VERSION } from './version.ts';

export interface BoardIrDiagnostic {
  /** JSON pointer-ish path, e.g. "execution.cpus[1].ranges[3].start". */
  path: string;
  message: string;
  /** MAME source location the compiler attached to the nearest owning node. */
  source?: BoardSourceRef;
}

export class BoardIrError extends Error {
  readonly diagnostics: BoardIrDiagnostic[];

  constructor(subject: string, diagnostics: BoardIrDiagnostic[]) {
    super(
      `${subject}: board IR is invalid\n` +
      diagnostics
        .map(diagnostic =>
          `  ${diagnostic.path}: ${diagnostic.message}` +
          (diagnostic.source ? ` (${diagnostic.source.file}:${diagnostic.source.line})` : ''))
        .join('\n'),
    );
    this.name = 'BoardIrError';
    this.diagnostics = diagnostics;
  }
}

class Reader {
  readonly diagnostics: BoardIrDiagnostic[] = [];

  fail(path: string, message: string, source?: BoardSourceRef): void {
    this.diagnostics.push(source ? { path, message, source } : { path, message });
  }

  object(value: unknown, path: string, source?: BoardSourceRef): Record<string, unknown> {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      this.fail(path, `expected an object, got ${describe(value)}`, source);
      return {};
    }
    return value as Record<string, unknown>;
  }

  array(value: unknown, path: string, source?: BoardSourceRef): unknown[] {
    if (!Array.isArray(value)) {
      this.fail(path, `expected an array, got ${describe(value)}`, source);
      return [];
    }
    return value;
  }

  number(value: unknown, path: string, source?: BoardSourceRef): number {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      this.fail(path, `expected a finite number, got ${describe(value)}`, source);
      return 0;
    }
    return value;
  }

  string(value: unknown, path: string, source?: BoardSourceRef): string {
    if (typeof value !== 'string' || !value.length) {
      this.fail(path, `expected a non-empty string, got ${describe(value)}`, source);
      return '';
    }
    return value;
  }

  optionalString(value: unknown, path: string, source?: BoardSourceRef): void {
    if (value === undefined) return;
    this.string(value, path, source);
  }

  optionalNumber(value: unknown, path: string, source?: BoardSourceRef): void {
    if (value === undefined) return;
    this.number(value, path, source);
  }
}

function describe(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'an array';
  return typeof value;
}

function sourceOf(value: Record<string, unknown>): BoardSourceRef | undefined {
  const source = value.source;
  if (typeof source !== 'object' || source === null) return undefined;
  const { file, line } = source as Record<string, unknown>;
  if (typeof file !== 'string' || typeof line !== 'number') return undefined;
  return { file, line };
}

/**
 * Decode a generated board artifact. Throws BoardIrError listing every problem
 * found rather than the first, so one regeneration fixes the whole artifact.
 */
export function decodeBoardIr(value: unknown, subject = 'board'): BoardIr {
  const reader = new Reader();
  const root = reader.object(value, '');

  const schemaVersion = root.schemaVersion;
  if (schemaVersion !== BOARD_IR_SCHEMA_VERSION) {
    reader.fail(
      'schemaVersion',
      `artifact declares ${describe(schemaVersion) === 'number' ? schemaVersion : describe(schemaVersion)}, ` +
      `this compiler reads ${BOARD_IR_SCHEMA_VERSION} — regenerate the target`,
    );
    // A version mismatch makes every field below unreliable; stop here so the
    // report names the real cause instead of fifty downstream symptoms.
    throw new BoardIrError(subject, reader.diagnostics);
  }

  const game = reader.string(root.game, 'game');
  reader.string(root.family, 'family');
  reader.string(root.driverFile, 'driverFile');

  decodeCallbacks(reader, root.callbacks);
  decodeConnections(reader, root.connections);
  decodeExecution(reader, root.execution);
  decodeDevices(reader, root.devices);
  decodeHandlers(reader, root.handlers);
  decodeMaps(reader, root.maps);
  decodeStateMembers(reader, root.stateMembers);
  decodeVideo(reader, root.video);
  decodeSound(reader, root.sound);
  decodeComposition(reader, root.composition);

  if (reader.diagnostics.length) {
    throw new BoardIrError(game || subject, reader.diagnostics);
  }
  return value as BoardIr;
}

function decodeStateMembers(reader: Reader, value: unknown): void {
  if (value === undefined) return;
  for (const [index, entry] of reader.array(value, 'stateMembers').entries()) {
    const path = `stateMembers[${index}]`;
    const member = reader.object(entry, path);
    reader.string(member.name, `${path}.name`);
    const bits = reader.number(member.bits, `${path}.bits`);
    if (![1, 8, 16, 32].includes(bits)) {
      reader.fail(`${path}.bits`, `declares ${bits}, which is not a C integer width`);
    }
    reader.optionalNumber(member.arrayLength, `${path}.arrayLength`);
  }
}

function decodeCallbacks(reader: Reader, value: unknown): void {
  for (const [index, entry] of reader.array(value, 'callbacks').entries()) {
    const path = `callbacks[${index}]`;
    const callback = reader.object(entry, path);
    const source = sourceOf(callback);
    reader.string(callback.id, `${path}.id`, source);
    reader.string(callback.ownerTag, `${path}.ownerTag`, source);
    reader.string(callback.signal, `${path}.signal`, source);
    reader.string(callback.operation, `${path}.operation`, source);
    reader.optionalNumber(callback.slot, `${path}.slot`, source);
    for (const field of ['periodHz', 'scanlineStart', 'scanlineIncrement', 'quantumSeconds']) {
      reader.optionalNumber(callback[field], `${path}.${field}`, source);
    }
    for (const field of ['targetTag', 'targetClass', 'targetMethod', 'targetPort', 'inputLine']) {
      reader.optionalString(callback[field], `${path}.${field}`, source);
    }
    if (callback.delivery !== undefined && !DELIVERIES.has(callback.delivery as string)) {
      reader.fail(
        `${path}.delivery`,
        `unknown delivery mode ${describe(callback.delivery)}`,
        source,
      );
    }
    if (callback.transforms !== undefined) {
      for (const [position, transform] of reader.array(
        callback.transforms, `${path}.transforms`, source).entries()) {
        reader.string(transform, `${path}.transforms[${position}]`, source);
      }
    }
    if (callback.scanlines !== undefined) {
      for (const [position, scanline] of reader.array(
        callback.scanlines, `${path}.scanlines`, source).entries()) {
        reader.number(scanline, `${path}.scanlines[${position}]`, source);
      }
    }
  }
}

const EFFECT_KINDS = new Set([
  'cpu-line', 'device-method', 'handler', 'port-read',
  'video-control', 'audio-control', 'audio-write', 'perfect-quantum', 'unconnected',
]);
const CPU_LINES = new Set([
  'irq', 'irq1', 'irq2', 'irq3', 'irq4', 'irq5', 'irq6', 'irq7',
  'firq', 'nmi', 'reset', 'halt',
]);
const DELIVERIES = new Set(['hold', 'assert', 'pulse', 'level']);
const TRANSFORM_KINDS = new Set(['invert', 'mask', 'bit', 'rshift', 'lshift']);

/**
 * Connections are the executable wiring, so a malformed one is exactly what
 * this boundary exists to stop reaching the runtime.
 */
function decodeConnections(reader: Reader, value: unknown): void {
  for (const [index, entry] of reader.array(value, 'connections').entries()) {
    const path = `connections[${index}]`;
    const connection = reader.object(entry, path);
    const source = sourceOf(connection);
    reader.string(connection.callbackId, `${path}.callbackId`, source);

    const effect = reader.object(connection.effect, `${path}.effect`, source);
    const kind = effect.kind;
    if (typeof kind !== 'string' || !EFFECT_KINDS.has(kind)) {
      reader.fail(
        `${path}.effect.kind`,
        `expected one of ${[...EFFECT_KINDS].join(', ')}, got ${describe(kind)}`,
        source,
      );
    } else if (kind === 'cpu-line') {
      reader.string(effect.tag, `${path}.effect.tag`, source);
      if (!CPU_LINES.has(effect.line as string)) {
        reader.fail(`${path}.effect.line`, `unknown CPU line ${describe(effect.line)}`, source);
      }
      if (!DELIVERIES.has(effect.delivery as string)) {
        reader.fail(
          `${path}.effect.delivery`,
          `unknown delivery mode ${describe(effect.delivery)}`,
          source,
        );
      }
    } else if (kind === 'device-method' || kind === 'audio-write') {
      reader.string(effect.tag, `${path}.effect.tag`, source);
      reader.string(effect.method, `${path}.effect.method`, source);
    } else if (kind === 'handler') {
      reader.string(effect.handler, `${path}.effect.handler`, source);
    } else if (kind === 'port-read') {
      reader.string(effect.port, `${path}.effect.port`, source);
    } else if (kind === 'video-control') {
      reader.string(effect.control, `${path}.effect.control`, source);
    } else if (kind === 'audio-control') {
      reader.string(effect.tag, `${path}.effect.tag`, source);
      reader.string(effect.control, `${path}.effect.control`, source);
      reader.optionalNumber(effect.offset, `${path}.effect.offset`, source);
    } else if (kind === 'perfect-quantum') {
      reader.number(effect.seconds, `${path}.effect.seconds`, source);
    }

    for (const [position, raw] of reader.array(
      connection.transforms, `${path}.transforms`, source).entries()) {
      const transformPath = `${path}.transforms[${position}]`;
      const transform = reader.object(raw, transformPath, source);
      const transformKind = transform.kind;
      if (typeof transformKind !== 'string' || !TRANSFORM_KINDS.has(transformKind)) {
        reader.fail(
          `${transformPath}.kind`,
          `expected one of ${[...TRANSFORM_KINDS].join(', ')}, got ${describe(transformKind)}`,
          source,
        );
        continue;
      }
      if (transformKind === 'mask') reader.number(transform.value, `${transformPath}.value`, source);
      if (transformKind === 'bit') reader.number(transform.bit, `${transformPath}.bit`, source);
      if (transformKind === 'rshift' || transformKind === 'lshift') {
        reader.number(transform.bits, `${transformPath}.bits`, source);
      }
    }
  }
}

function decodeVideo(reader: Reader, value: unknown): void {
  if (value === undefined) return;
  const video = reader.object(value, 'video');
  const source = sourceOf(video);
  for (const [index, entry] of reader.array(video.gfx, 'video.gfx', source).entries()) {
    const path = `video.gfx[${index}]`;
    const gfx = reader.object(entry, path, source);
    reader.string(gfx.region, `${path}.region`, source);
    for (const field of ['offset', 'colorBase', 'colorCount', 'xscale', 'yscale']) {
      reader.number(gfx[field], `${path}.${field}`, source);
    }
    const layout = reader.object(gfx.layout, `${path}.layout`, source);
    for (const field of ['width', 'height', 'planes', 'charIncrement']) {
      reader.number(layout[field], `${path}.layout.${field}`, source);
    }
  }
  for (const [index, entry] of reader.array(video.tilemaps, 'video.tilemaps', source).entries()) {
    const path = `video.tilemaps[${index}]`;
    const tilemap = reader.object(entry, path, source);
    reader.string(tilemap.member, `${path}.member`, source);
    reader.string(tilemap.mapper, `${path}.mapper`, source);
    reader.string(tilemap.tileInfo, `${path}.tileInfo`, source);
    for (const field of ['tileWidth', 'tileHeight', 'columns', 'rows']) {
      reader.number(tilemap[field], `${path}.${field}`, source);
    }
  }
  if (video.ramPalette !== undefined) {
    const palette = reader.object(video.ramPalette, 'video.ramPalette', source);
    reader.string(palette.tag, 'video.ramPalette.tag', source);
    reader.number(palette.entries, 'video.ramPalette.entries', source);
    reader.number(palette.bytesPerEntry, 'video.ramPalette.bytesPerEntry', source);
    if (palette.endianness !== undefined) {
      const endianness = reader.string(
        palette.endianness,
        'video.ramPalette.endianness',
        source,
      );
      if (endianness !== 'little' && endianness !== 'big') {
        throw new Error(
          `${source}: video.ramPalette.endianness must be "little" or "big"`,
        );
      }
    }
    for (const [index, channel] of reader.array(
      palette.channels, 'video.ramPalette.channels', source).entries()) {
      const path = `video.ramPalette.channels[${index}]`;
      const decoded = reader.object(channel, path, source);
      reader.number(decoded.bits, `${path}.bits`, source);
      reader.number(decoded.shift, `${path}.shift`, source);
    }
  }
}

function decodeSound(reader: Reader, value: unknown): void {
  if (value === undefined) return;
  const sound = reader.object(value, 'sound');
  reader.string(sound.kind, 'sound.kind');
  reader.string(sound.deviceTag, 'sound.deviceTag');
  reader.string(sound.deviceType, 'sound.deviceType');
  reader.number(sound.controlOffset, 'sound.controlOffset');
  for (const field of ['writeMethods', 'enableMethods']) {
    for (const [index, method] of reader.array(sound[field], `sound.${field}`).entries()) {
      reader.string(method, `sound.${field}[${index}]`);
    }
  }
  if (sound.deviceTags !== undefined) {
    for (const [index, tag] of reader.array(sound.deviceTags, 'sound.deviceTags').entries()) {
      reader.string(tag, `sound.deviceTags[${index}]`);
    }
  }
  for (const [index, entry] of reader.array(sound.routes ?? [], 'sound.routes').entries()) {
    const path = `sound.routes[${index}]`;
    const route = reader.object(entry, path);
    for (const field of ['chip', 'channel', 'gain']) reader.number(route[field], `${path}.${field}`);
    reader.string(route.target, `${path}.target`);
  }
}

function decodeExecution(reader: Reader, value: unknown): void {
  const execution = reader.object(value, 'execution');
  const cpus = reader.array(execution.cpus, 'execution.cpus');
  if (!cpus.length) reader.fail('execution.cpus', 'a board must declare at least one CPU');
  for (const [index, entry] of cpus.entries()) {
    const path = `execution.cpus[${index}]`;
    const cpu = reader.object(entry, path);
    const source = sourceOf(cpu);
    reader.string(cpu.tag, `${path}.tag`, source);
    reader.optionalString(cpu.type, `${path}.type`, source);
    reader.number(cpu.clock, `${path}.clock`, source);
    reader.string(cpu.region, `${path}.region`, source);
    if (cpu.space !== undefined) decodeAddressSpace(reader, cpu.space, `${path}.space`, source);
    if (cpu.ranges !== undefined) decodeRanges(reader, cpu.ranges, `${path}.ranges`, source);
    if (cpu.opcode !== undefined) {
      const opcode = reader.object(cpu.opcode, `${path}.opcode`, source);
      reader.string(opcode.region, `${path}.opcode.region`, source);
      decodeRanges(reader, opcode.ranges, `${path}.opcode.ranges`, source);
      reader.optionalNumber(opcode.globalMask, `${path}.opcode.globalMask`, source);
    }
    if (cpu.io !== undefined) {
      const io = reader.object(cpu.io, `${path}.io`, source);
      decodeRanges(reader, io.ranges, `${path}.io.ranges`, source);
      if (io.space !== undefined) decodeAddressSpace(reader, io.space, `${path}.io.space`, source);
    }
  }

  if (execution.participants !== undefined) {
    for (const [index, entry] of reader.array(execution.participants, 'execution.participants').entries()) {
      const path = `execution.participants[${index}]`;
      const participant = reader.object(entry, path);
      reader.string(participant.tag, `${path}.tag`);
      reader.string(participant.kind, `${path}.kind`);
      reader.number(participant.clock, `${path}.clock`);
      reader.optionalNumber(participant.cycleClock, `${path}.cycleClock`);
      if (participant.space !== undefined) {
        decodeAddressSpace(reader, participant.space, `${path}.space`);
      }
    }
  }

  for (const field of ['startHandlers', 'resetHandlers'] as const) {
    if (execution[field] !== undefined) {
      for (const [index, handler] of reader.array(
        execution[field],
        `execution.${field}`,
      ).entries()) {
        reader.string(handler, `execution.${field}[${index}]`);
      }
    }
  }

  const screen = reader.object(execution.screen, 'execution.screen');
  const screenSource = sourceOf(screen);
  for (const field of ['width', 'height', 'refresh', 'vtotal', 'vbstart', 'rotate']) {
    reader.number(screen[field], `execution.screen.${field}`, screenSource);
  }
  reader.optionalString(screen.ownerTag, 'execution.screen.ownerTag', screenSource);
  reader.optionalString(screen.ownerKind, 'execution.screen.ownerKind', screenSource);
  reader.optionalNumber(screen.pixelClock, 'execution.screen.pixelClock', screenSource);
  reader.optionalString(screen.scanlineCallback, 'execution.screen.scanlineCallback', screenSource);

  for (const [index, entry] of reader.array(
    execution.frameEvents, 'execution.frameEvents').entries()) {
    const path = `execution.frameEvents[${index}]`;
    const event = reader.object(entry, path);
    const source = sourceOf(event);
    reader.string(event.callbackId, `${path}.callbackId`, source);
    reader.string(event.ownerTag, `${path}.ownerTag`, source);
    reader.string(event.signal, `${path}.signal`, source);
    reader.number(event.line, `${path}.line`, source);
    reader.number(event.state, `${path}.state`, source);
    reader.optionalNumber(event.frequency, `${path}.frequency`, source);
  }

  if (execution.accessTaps !== undefined) {
    for (const [index, entry] of reader.array(
      execution.accessTaps, 'execution.accessTaps').entries()) {
      const path = `execution.accessTaps[${index}]`;
      const tap = reader.object(entry, path);
      const source = sourceOf(tap);
      reader.string(tap.cpu, `${path}.cpu`, source);
      reader.string(tap.space, `${path}.space`, source);
      reader.string(tap.device, `${path}.device`, source);
      reader.string(tap.method, `${path}.method`, source);
      reader.number(tap.start, `${path}.start`, source);
      reader.number(tap.end, `${path}.end`, source);
      reader.number(tap.mirror, `${path}.mirror`, source);
      reader.optionalString(tap.bank, `${path}.bank`, source);
    }
  }

  if (execution.banks !== undefined) {
    for (const [index, entry] of reader.array(execution.banks, 'execution.banks').entries()) {
      const path = `execution.banks[${index}]`;
      const bank = reader.object(entry, path);
      const source = sourceOf(bank);
      reader.string(bank.tag, `${path}.tag`, source);
      reader.optionalString(bank.region, `${path}.region`, source);
      if (bank.entryRegions !== undefined) {
        for (const [position, region] of reader.array(
          bank.entryRegions, `${path}.entryRegions`, source).entries()) {
          if (region !== null) reader.string(region, `${path}.entryRegions[${position}]`, source);
        }
      }
      reader.optionalNumber(bank.dynamicShift, `${path}.dynamicShift`, source);
      if (bank.entryMembers !== undefined) {
        for (const [position, member] of reader.array(
          bank.entryMembers, `${path}.entryMembers`, source).entries()) {
          if (member !== null) reader.string(member, `${path}.entryMembers[${position}]`, source);
        }
      }
      const offsets = reader.array(bank.entryOffsets, `${path}.entryOffsets`, source);
      if (!offsets.some(offset => typeof offset === 'number')) {
        reader.fail(`${path}.entryOffsets`, 'no bank entry is configured', source);
      }
      for (const [position, offset] of offsets.entries()) {
        if (offset === null) continue;
        reader.number(offset, `${path}.entryOffsets[${position}]`, source);
      }
    }
  }
}

function decodeAddressSpace(
  reader: Reader,
  value: unknown,
  path: string,
  source?: BoardSourceRef,
): void {
  const space = reader.object(value, path, source);
  reader.string(space.ownerTag, `${path}.ownerTag`, source);
  reader.string(space.name, `${path}.name`, source);
  reader.number(space.dataWidth, `${path}.dataWidth`, source);
  reader.number(space.addressShift, `${path}.addressShift`, source);
  reader.string(space.endianness, `${path}.endianness`, source);
}

function decodeRanges(
  reader: Reader,
  value: unknown,
  path: string,
  source?: BoardSourceRef,
): void {
  const kinds = new Set(['rom', 'ram', 'handler', 'nop']);
  for (const [index, entry] of reader.array(value, path, source).entries()) {
    const rangePath = `${path}[${index}]`;
    const range = reader.object(entry, rangePath, source);
    const start = reader.number(range.start, `${rangePath}.start`, source);
    const end = reader.number(range.end, `${rangePath}.end`, source);
    reader.optionalNumber(range.mirror, `${rangePath}.mirror`, source);
    reader.optionalNumber(range.umask, `${rangePath}.umask`, source);
    reader.optionalString(range.region, `${rangePath}.region`, source);
    reader.optionalNumber(range.romOffset, `${rangePath}.romOffset`, source);
    reader.optionalString(range.viewTag, `${rangePath}.viewTag`, source);
    reader.optionalNumber(range.viewEntry, `${rangePath}.viewEntry`, source);
    if (end < start) {
      reader.fail(rangePath, `range ends (${hex(end)}) before it starts (${hex(start)})`, source);
    }
    if (!kinds.has(range.kind as string)) {
      reader.fail(
        `${rangePath}.kind`,
        `expected one of ${[...kinds].join(', ')}, got ${describe(range.kind)}`,
        source,
      );
    }
    reader.optionalString(range.read, `${rangePath}.read`, source);
    reader.optionalString(range.write, `${rangePath}.write`, source);
    reader.optionalString(range.share, `${rangePath}.share`, source);
    reader.optionalString(range.bank, `${rangePath}.bank`, source);
  }
}

function decodeDevices(reader: Reader, value: unknown): void {
  if (value === undefined) return;
  for (const [index, entry] of reader.array(value, 'devices').entries()) {
    const path = `devices[${index}]`;
    const device = reader.object(entry, path);
    const source = sourceOf(device);
    reader.string(device.id, `${path}.id`, source);
    reader.string(device.tag, `${path}.tag`, source);
    reader.string(device.type, `${path}.type`, source);
    reader.optionalString(device.hostTag, `${path}.hostTag`, source);
    reader.optionalString(device.member, `${path}.member`, source);
    reader.optionalNumber(device.clock, `${path}.clock`, source);
    if (device.addressSpaces !== undefined) {
      for (const [position, raw] of reader.array(
        device.addressSpaces, `${path}.addressSpaces`, source).entries()) {
        const spacePath = `${path}.addressSpaces[${position}]`;
        const space = reader.object(raw, spacePath, source);
        decodeAddressSpace(reader, space.semantics, `${spacePath}.semantics`, source);
        decodeRanges(reader, space.ranges, `${spacePath}.ranges`, source);
      }
    }
  }
}

function decodeComposition(reader: Reader, value: unknown): void {
  if (value === undefined) return;
  const composition = reader.object(value, 'composition');
  for (const [index, raw] of reader.array(composition.machines, 'composition.machines').entries()) {
    const machine = reader.object(raw, `composition.machines[${index}]`);
    reader.string(machine.id, `composition.machines[${index}].id`);
    reader.string(machine.role, `composition.machines[${index}].role`);
  }
  for (const [index, raw] of reader.array(composition.buses, 'composition.buses').entries()) {
    const bus = reader.object(raw, `composition.buses[${index}]`);
    reader.string(bus.id, `composition.buses[${index}].id`);
    reader.string(bus.kind, `composition.buses[${index}].kind`);
    reader.array(bus.participants, `composition.buses[${index}].participants`);
  }
  for (const [index, raw] of reader.array(composition.media, 'composition.media').entries()) {
    const medium = reader.object(raw, `composition.media[${index}]`);
    reader.string(medium.id, `composition.media[${index}].id`);
    reader.string(medium.kind, `composition.media[${index}].kind`);
    reader.string(medium.machine, `composition.media[${index}].machine`);
  }
}

function decodeHandlers(reader: Reader, value: unknown): void {
  if (value === undefined) return;
  for (const [index, entry] of reader.array(value, 'handlers').entries()) {
    const path = `handlers[${index}]`;
    const handler = reader.object(entry, path);
    const source = sourceOf(handler);
    reader.string(handler.id, `${path}.id`, source);
    reader.string(handler.ownerClass, `${path}.ownerClass`, source);
    reader.string(handler.method, `${path}.method`, source);
    if (handler.program === undefined) continue;
    const program = reader.object(handler.program, `${path}.program`, source);
    reader.array(program.operations, `${path}.program.operations`, source);
    reader.array(program.diagnostics, `${path}.program.diagnostics`, source);
  }
}

function decodeMaps(reader: Reader, value: unknown): void {
  if (value === undefined) return;
  for (const [index, entry] of reader.array(value, 'maps').entries()) {
    const path = `maps[${index}]`;
    const map = reader.object(entry, path);
    const source = sourceOf(map);
    reader.string(map.id, `${path}.id`, source);
    reader.string(map.className, `${path}.className`, source);
    reader.string(map.name, `${path}.name`, source);
    for (const [position, rangeEntry] of reader.array(
      map.ranges, `${path}.ranges`, source).entries()) {
      const rangePath = `${path}.ranges[${position}]`;
      const range = reader.object(rangeEntry, rangePath, source);
      const rangeSource = sourceOf(range) ?? source;
      reader.string(range.id, `${rangePath}.id`, rangeSource);
      reader.number(range.start, `${rangePath}.start`, rangeSource);
      reader.number(range.end, `${rangePath}.end`, rangeSource);
      reader.optionalString(range.read, `${rangePath}.read`, rangeSource);
      reader.optionalString(range.write, `${rangePath}.write`, rangeSource);
    }
  }
}

function hex(value: number): string {
  return `0x${(value >>> 0).toString(16)}`;
}
