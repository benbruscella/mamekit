import assert from 'node:assert/strict';
import { runGameAcceptance, verifyInputBindings } from './acceptance-harness.ts';
import { validateGameContract } from './contract-validation.ts';
import { invaders } from './invaders.game.ts';
import type { GameInputAction } from './types.ts';
import { KeyboardInput } from '../runtime/input.ts';
import type { ShellConfig } from '../runtime/shell.ts';

const unsupported: GameInputAction[] = [
  { atFrame: 100, analog: 'PADDLE', value: 1, heldFrames: 2, releasedFrames: 0 },
  ...(['nmi', 'reset', 'restore', 'break'] as const).map(signal =>
    ({ atFrame: 100, signal, assertedFrames: 2 })),
];
for (const action of unsupported) {
  const contract = { ...invaders, actions: [action] };
  validateGameContract(contract, 'candidate');
  assert.throws(() => validateGameContract(contract, 'accepted'), /no generated acceptance binding/);
  // Fail even in recording mode, before touching ROMs or generated artifacts.
  await assert.rejects(runGameAcceptance(contract, '/missing', { recording: true }),
    /no generated acceptance binding/);
}

const config = {
  bindings: [
    { port: 'IN0', mask: 1, keys: ['KeyA'], label: 'A', activeLow: true },
    { port: 'IN0', mask: 2, keys: ['KeyB'], label: 'B', activeLow: true },
  ],
  dipDefaults: [],
  ports: [{ tag: 'IN0', init: 255 }],
} as unknown as ShellConfig;
const target = new EventTarget();
const input = new KeyboardInput(config.bindings, config.dipDefaults, config.ports);
input.attach(target);
const contract = { ...invaders, actions: [{ atFrame: 1, codes: ['KeyA', 'KeyB'], heldFrames: 1, releasedFrames: 1 }] };
verifyInputBindings(contract, config, input, target);
assert.equal(input.read('IN0'), 255);
assert.throws(() => verifyInputBindings({ ...contract, actions: [
  { ...contract.actions[0], codes: ['KeyA', 'Unknown'] },
] }, config, input, target), /Unknown has no generated input binding/);
console.log('input-actions.spec: unsupported actions fail and every chord key reaches its port');
