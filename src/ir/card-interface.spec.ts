import assert from 'node:assert/strict';
import { inheritCardInterface, shareCardInterface } from './card-interface.ts';

// A card keeps its own compiled order; each method the slot holds an
// identical copy of becomes that copy's index, and putting the interface back
// gives exactly the card that was compiled.
type Method = { name: string; parameters: string; body: string };
const cardInterface = {
  className: 'device_fixture_interface',
  methods: [
    { name: 'read', parameters: 'offs_t offset', body: 'return 0xff;' },
    { name: 'chr8', parameters: 'int bank', body: 'bank8(bank);' },
  ] satisfies Method[],
};
const card: Method[] = [
  { name: 'write', parameters: 'offs_t offset, u8 data', body: 'latch(data);' },
  { name: 'chr8', parameters: 'int bank', body: 'bank8(bank);' },
  // Same name as an interface method, compiled differently: kept whole.
  { name: 'read', parameters: 'offs_t offset', body: 'return m_latch;' },
];
const shared = shareCardInterface(card, cardInterface);
assert.equal(shared.shared, 1);
assert.deepEqual(shared.methods[1], { shared: 1 });
assert.deepEqual(shared.methods[2], card[2], 'a method that differs from the slot copy stays in the card');
assert.deepEqual(inheritCardInterface(shared.methods, cardInterface), card);
assert.throws(
  () => inheritCardInterface<Method>([{ shared: 9 }], cardInterface),
  /does not carry/,
  'a reference past the interface fails loudly instead of answering nothing',
);

console.log('card-interface.spec: cards share their interface and reassemble exactly');
