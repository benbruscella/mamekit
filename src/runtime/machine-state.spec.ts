import assert from 'node:assert/strict';
import {
  captureState,
  restoreState,
  stateByteLength,
  type StatefulKeys,
} from './machine-state.ts';

// --- an emitted core's shapes: register pair with a cyclic byte view, a
// register file over one buffer, a struct, values, plain scalars, a bus of
// closures, Infinity ------------------------------------------------------

class PairBytes {
  private readonly pair: Pair;
  constructor(pair: Pair) { this.pair = pair; }
  get h(): number { return (this.pair.value >>> 8) & 0xff; }
  set h(next: number) { this.pair.value = (this.pair.value & 0xff) | ((next & 0xff) << 8); }
  get l(): number { return this.pair.value & 0xff; }
  set l(next: number) { this.pair.value = (this.pair.value & 0xff00) | (next & 0xff); }
}
class Pair {
  value = 0;
  readonly b = new PairBytes(this);
  get w(): number { return this.value; }
  set w(next: number) { this.value = next & 0xffff; }
}
class RegisterFile {
  readonly w: Uint16Array;
  readonly b: Uint8Array;
  constructor() { const buffer = new ArrayBuffer(8); this.w = new Uint16Array(buffer); this.b = new Uint8Array(buffer); }
}
class EmittedCore {
  private readonly bus = { read: () => 0, write: () => {} };
  private irqData: number | (() => number) = 0xff;
  private irqHold = false;
  private readonly internalRam = new Uint8Array(16);
  private m_pc = 0x100;
  private m_af = new Pair();
  private m_regs = new RegisterFile();
  private m_flags = { c: 0, z: 0 };
  private m_table = Uint8Array.from([1, 2, 3]);
  private m_timer = Infinity;
  private m_signed = -1;
  run(): void {
    this.m_pc = 0x1234;
    this.m_af.b.h = 0xab;
    this.m_af.b.l = 0xcd;
    this.m_regs.w[1] = 0xbeef;
    this.m_flags.c = 1;
    this.internalRam[3] = 9;
    this.m_table[0] = 7;
    this.irqHold = true;
    this.m_timer = 12.5;
    this.m_signed = -128;
  }
  view(): unknown {
    return [this.m_pc, this.m_af.value, this.m_regs.b[2], this.m_regs.b[3], this.m_flags.c,
      this.internalRam[3], this.m_table[0], this.irqHold, this.m_timer, this.m_signed];
  }
}

const core = { walkOwnKeys: (value: object) => value instanceof EmittedCore };
{
  const a = new EmittedCore();
  a.run();
  assert.equal(captureState(a), undefined, 'a class with methods is opaque unless the caller says otherwise');
  const saved = captureState(a, core);
  const b = new EmittedCore();
  assert.notDeepEqual(b.view(), a.view());
  const diagnostics = restoreState(b, saved, core);
  assert.deepEqual(diagnostics, []);
  assert.deepEqual(b.view(), a.view(), 'every emitted-core shape round-trips');
  assert.equal((saved as { bus: object }).bus && Object.keys((saved as { bus: object }).bus).length, 0,
    'a bus of closures captures as an empty record');
  // the save is not aliased by the machine: mutate b and re-restore from the same save
  b.run();
  (b as unknown as { m_pc: number }).m_pc = 1;
  assert.deepEqual(restoreState(b, saved, core), []);
  assert.deepEqual(b.view(), a.view(), 'a save can be restored twice');
}

// --- stateKeys: an interpreted container names its roots and rebuilds a
// derived cache afterwards; opaque classes contribute nothing ------------

class Opaque { count = 0; tick(): void { this.count++; } }
class Keyed implements StatefulKeys {
  definition = { huge: new Array(1000).fill('ir') };
  members: Record<string, unknown> = { m_a: 1, m_list: [1, 2, 3], m_map: new Map([[1, 2]]) };
  cache = 'stale';
  rebuilt = 0;
  helper = new Opaque();
  stateKeys(): readonly string[] { return ['members']; }
  stateRestored(): void { this.rebuilt++; this.cache = `from ${this.members.m_a}`; }
}

{
  const a = new Keyed();
  a.members.m_a = 42;
  (a.members.m_list as number[]).push(4);
  (a.members.m_map as Map<number, number>).set(3, 4);
  a.members.m_new = 'added later';
  const opaque: string[] = [];
  const saved = captureState(a, { onOpaque: (path, value) => opaque.push(`${path}:${value.constructor.name}`) }) as Record<string, unknown>;
  assert.deepEqual(Object.keys(saved), ['members'], 'only the declared keys are captured');
  assert.deepEqual(opaque, [], 'undeclared keys are not walked at all');
  const b = new Keyed();
  const list = b.members.m_list as number[];
  const map = b.members.m_map as Map<number, number>;
  assert.deepEqual(restoreState(b, saved), []);
  assert.equal(b.members.m_a, 42);
  assert.equal(b.members.m_list, list, 'arrays are restored in place');
  assert.deepEqual(list, [1, 2, 3, 4]);
  assert.equal(b.members.m_map, map, 'maps are restored in place');
  assert.deepEqual([...map], [[1, 2], [3, 4]]);
  assert.equal(b.members.m_new, 'added later', 'an open record takes a key it did not have yet');
  assert.equal(b.rebuilt, 1, 'stateRestored ran once');
  assert.equal(b.cache, 'from 42');
  assert.equal(b.helper.count, 0);

  const reported: string[] = [];
  captureState({ helper: new Opaque(), n: 1 }, { onOpaque: path => reported.push(path) });
  assert.deepEqual(reported, ['helper'], 'an opaque class inside a plain object is reported');
}

// --- named buffers: views over a region or share are references ---------

{
  const region = new Uint8Array(64);
  const share = new Uint8Array(32);
  const named = new Map<ArrayBufferLike, string>([[region.buffer, 'region:maincpu'], [share.buffer, 'share:vram']]);
  const live = {
    romWindow: region.subarray(16, 32),
    vramWords: new Uint16Array(share.buffer, 0, 8),
    own: new Uint8Array([1, 2, 3]),
  };
  live.own[1] = 9;
  const saved = captureState(live, { namedBuffers: named }) as Record<string, unknown>;
  assert.deepEqual(saved.romWindow, { $buffer: 'region:maincpu', byteOffset: 16, length: 16 });
  assert.deepEqual(saved.vramWords, { $buffer: 'share:vram', byteOffset: 0, length: 8 });
  assert.equal(stateByteLength(saved), 3);
  const other = {
    romWindow: region.subarray(16, 32),
    vramWords: new Uint16Array(share.buffer, 0, 8),
    own: new Uint8Array(3),
  };
  assert.deepEqual(restoreState(other, saved, { namedBuffers: named }), []);
  assert.deepEqual([...other.own], [1, 9, 3]);
  // a save that carried the bytes of a buffer the live board names is another machine
  const foreign = captureState(live) as Record<string, unknown>;
  const diagnostics = restoreState(other, foreign, { namedBuffers: named });
  assert.deepEqual(diagnostics.map(d => d.path).sort(), ['romWindow', 'vramWords']);
}

// --- diagnostics: a load never half-succeeds silently --------------------

{
  const live = { bytes: new Uint8Array(4), n: 1, nested: { m: 2 }, keyed: new Keyed() };
  const saved = captureState(live) as Record<string, unknown>;
  const wrongLength = structuredClone(saved);
  wrongLength.bytes = new Uint8Array(5);
  assert.deepEqual(restoreState(live, wrongLength).map(d => `${d.path}: ${d.message}`), ['bytes: length 4, saved 5']);
  const wrongType = structuredClone(saved);
  wrongType.bytes = new Uint16Array(4);
  assert.match(restoreState(live, wrongType)[0]!.message, /Uint8Array, saved Uint16Array/);
  // An open record's key set is data: a key the save does not have is one
  // the machine had not made when it was taken, so the slot goes back to
  // not existing. This is the mirror of gaining a key, below.
  const missing = structuredClone(saved);
  delete missing.n;
  assert.deepEqual(restoreState(live, missing), [], 'an open record may lose a key');
  assert.equal('n' in live, false, 'and the slot goes back to not existing');
  assert.deepEqual(restoreState(live, saved), [], 'and takes it again from a save that has it');
  assert.equal(live.n, 1);
  const extraOnKeyed = structuredClone(saved);
  (extraOnKeyed.keyed as Record<string, unknown>).definition = {};
  assert.deepEqual(restoreState(live, extraOnKeyed).map(d => d.path), ['keyed.definition']);
  // A core whose fields are fixed says so instead of quietly dropping one.
  const core = { walkOwnKeys: (value: object) => value === live };
  const goneFromCore = structuredClone(saved);
  delete goneFromCore.n;
  assert.deepEqual(restoreState(live, goneFromCore, core).map(d => d.path), ['n'],
    'a fixed key set reports what the save is missing');
  live.n = 1;

  const shape = structuredClone(saved);
  shape.nested = 5;
  assert.deepEqual(restoreState(live, shape), [], 'a slot may change kind: the save decides');
  assert.equal(live.nested, 5);
  const back = structuredClone(saved);
  assert.deepEqual(restoreState(live, back), []);
  assert.deepEqual(live.nested, { m: 2 }, 'and change back');
}

// --- sparse maps and lazily allocated slots ------------------------------

{
  const a = { ram: new Map<number, number>([[1, 10], [2, 20]]), slot: undefined as unknown, set: new Set([1]) };
  a.slot = new Uint8Array([5, 6]);
  const saved = captureState(a);
  const b = { ram: new Map<number, number>([[2, 99], [7, 70]]), slot: undefined as unknown, set: new Set([4, 5]) };
  assert.deepEqual(restoreState(b, saved), []);
  assert.deepEqual([...b.ram].sort(), [[1, 10], [2, 20]], 'stale sparse entries are deleted');
  assert.deepEqual([...(b.slot as Uint8Array)], [5, 6], 'an unallocated slot takes the saved buffer');
  assert.deepEqual([...b.set], [1]);
  assert.ok(structuredClone(saved), 'a save is structured-clone friendly');
}

console.log('machine-state.spec: capture and in-place restore round-trip every runtime shape');

// --- value objects: a driver slot that starts as 0 and later holds an
// attotime-shaped object comes back as a real value through its factory ---
{
  const { stateValue } = await import('./machine-state.ts');
  const attotime = (seconds: number) => stateValue('attotime', { seconds, as_double: () => seconds });
  const a = { m_time: attotime(1.5) as unknown, m_zero: 0 as unknown };
  const saved = captureState(a) as Record<string, unknown>;
  assert.deepEqual(saved.m_time, { $factory: 'attotime', seconds: 1.5 });
  const b = { m_time: 0 as unknown, m_zero: 0 as unknown };
  const factories = new Map([['attotime', (data: Record<string, unknown>) => attotime(Number(data.seconds))]]);
  assert.deepEqual(restoreState(b, saved, { factories }), []);
  assert.equal((b.m_time as { as_double(): number }).as_double(), 1.5, 'the factory rebuilt the value with its behavior');
  assert.deepEqual(restoreState(b, saved).map(d => d.path), ['m_time'], 'no factory is a diagnostic');
}
