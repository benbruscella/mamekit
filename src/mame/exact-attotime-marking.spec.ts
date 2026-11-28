import assert from 'node:assert/strict';
import type { GeneratedExpression, GeneratedHandlerOperation } from '../ir/board.ts';
import { markAttotimeFactoryProducts, markExactAttotime } from './exact-attotime-marking.ts';
import { attotimeBinary, ExactAttotime, exactAttotimeFromHz } from '../ir/exact-attotime.ts';
import { markWidePrecision } from './wide-precision.ts';

const id = (name: string): GeneratedExpression => ({ kind: 'identifier', name });
const field = (object: string, property: string): GeneratedExpression => ({ kind: 'member', object: id(object), property });
const time: GeneratedExpression = {
  kind: 'call',
  callee: { kind: 'member', object: { kind: 'call', callee: id('machine'), args: [] }, property: 'time' },
  args: [],
};

// The 8253's counter update, as the compiler lowers it (pit8253.cpp).
const update = (): GeneratedHandlerOperation[] => [
  { op: 'declare', name: 'now', valueType: 'attotime', value: time },
  { op: 'declare', name: 'elapsed_cycles', valueType: 'int64_t', value: { kind: 'number', value: 0 } },
  { op: 'declare', name: 'elapsed_time', valueType: 'attotime', value: { kind: 'binary', operator: '-', left: id('now'), right: id('m_last_updated') } },
  {
    op: 'assign', target: id('elapsed_cycles'), operator: '=',
    value: { kind: 'binary', operator: '/', left: field('elapsed_time', 'm_attoseconds'), right: field('m_clock_period', 'm_attoseconds') },
  },
  { op: 'assign', target: field('elapsed_time', 'm_attoseconds'), operator: '-=', value: id('elapsed_cycles') },
  { op: 'assign', target: id('m_last_updated'), operator: '+=', value: { kind: 'binary', operator: '*', left: id('elapsed_cycles'), right: id('m_clock_period') } },
] as GeneratedHandlerOperation[];

const members = [
  { name: 'm_last_updated', valueType: 'attotime' },
  { name: 'm_clock_period', valueType: 'attotime' },
  { name: 'm_count', valueType: 'uint16_t' },
];

const device = { members, methods: [{ parameters: '', program: { operations: update() } }] } as Parameters<typeof markExactAttotime>[0];
assert.equal(markExactAttotime(device), true);
assert.equal(device.exactAttotime, true);
const operations = device.methods[0]!.program.operations as Extract<GeneratedHandlerOperation, { op: 'declare' | 'assign' }>[];

// `now - m_last_updated` is attotime's operator-.
const difference = (operations[2] as { value: GeneratedExpression }).value as Extract<GeneratedExpression, { kind: 'binary' }>;
assert.equal(difference.attotime, true);
// Both fields are marked; the division of two of them is not attotime's.
const quotient = (operations[3] as { value: GeneratedExpression }).value as Extract<GeneratedExpression, { kind: 'binary' }>;
assert.equal(quotient.attotime, undefined);
assert.equal((quotient.left as { attotime?: true }).attotime, true);
assert.equal((quotient.right as { attotime?: true }).attotime, true);
// A compound store into an attotime is attotime's operator, the period times
// a count; a compound store into a field stays one.
const accumulate = operations[5] as Extract<GeneratedHandlerOperation, { op: 'assign' }>;
assert.equal(accumulate.operator, '=');
const sum = accumulate.value as Extract<GeneratedExpression, { kind: 'binary' }>;
assert.equal(sum.operator, '+');
assert.equal(sum.attotime, true);
assert.equal((sum.right as { attotime?: true }).attotime, true);
assert.equal((operations[4] as Extract<GeneratedHandlerOperation, { op: 'assign' }>).operator, '-=');

// attoseconds_t is 64-bit, so the 64-bit pass hands the field division to
// the exact evaluator.
markWidePrecision(device.methods as Parameters<typeof markWidePrecision>[0], { members: new Set(), calls: new Set() });
assert.equal(quotient.precision, 64);

// A device that never reads the fields keeps attotime as seconds.
const plain = {
  members,
  methods: [{ parameters: '', program: { operations: [
    { op: 'assign', target: id('m_last_updated'), operator: '=', value: { kind: 'binary', operator: '+', left: time, right: id('m_clock_period') } },
  ] as GeneratedHandlerOperation[] } }],
} as Parameters<typeof markExactAttotime>[0];
assert.equal(markExactAttotime(plain), false);
assert.equal(plain.exactAttotime, undefined);
const untouched = (plain.methods[0]!.program.operations[0] as { value: { attotime?: true } }).value;
assert.equal(untouched.attotime, undefined);

// A device that never reads attotime's fields still multiplies a factory's
// exact attotime: avgdvg.cpp's `m_vg_run_timer->adjust(attotime::from_hz(m_clock) * cycles)`.
{
  const fromHz: GeneratedExpression = { kind: 'call', callee: id('attotime::from_hz'), args: [{ kind: 'number', value: 1512000 }] };
  const product = { kind: 'binary', operator: '*', left: fromHz, right: id('cycles') } as GeneratedExpression;
  const quotient = { kind: 'binary', operator: '/', left: id('cycles'), right: fromHz } as GeneratedExpression;
  const plainProduct = { kind: 'binary', operator: '*', left: id('cycles'), right: id('m_scale') } as GeneratedExpression;
  const avg = {
    members: [{ name: 'm_scale', valueType: 'int' }],
    methods: [{ parameters: 'int cycles', program: { operations: [
      { op: 'call', expression: product },
      { op: 'call', expression: quotient },
      { op: 'call', expression: plainProduct },
    ] as GeneratedHandlerOperation[] } }],
  } as Parameters<typeof markAttotimeFactoryProducts>[0];
  assert.equal(markAttotimeFactoryProducts(avg), 1);
  assert.equal((product as { attotime?: true }).attotime, true);
  assert.equal((quotient as { attotime?: true }).attotime, undefined, 'a factor is never divided by an attotime');
  assert.equal((plainProduct as { attotime?: true }).attotime, undefined);
  assert.equal(avg.exactAttotime, undefined, 'the device itself stays on seconds');
  // And the product is MAME's: a whole clock, 661375661375 attoseconds a cycle.
  const exact = attotimeBinary('*', exactAttotimeFromHz(1512000), 3) as ExactAttotime;
  assert.ok(exact instanceof ExactAttotime);
  assert.equal(BigInt(exact.as_attoseconds()), 661375661375n * 3n);
}
