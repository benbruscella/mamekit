import assert from 'node:assert/strict';
import { replaceGolden } from './record-goldens.ts';
import { renderCandidateModule } from './onboarding.ts';
import { machineTargetContract } from './types.ts';
import { invaders } from './invaders.game.ts';
import ts from 'typescript';

const source = `export const demo = {
  game: 'demo',
  golden: { stale: true },
  tail: 'preserved',
};
`;

const updated = replaceGolden(source, {
  regions: { maincpu: 'deadbeef', 'device:rom': 'feedface' },
  checkpoints: { 60: { video: '11111111', state: '22222222' } },
  audio: {
    writes: 3,
    nonzeroWrites: 2,
    writeHash: '33333333',
    pcmHash: '44444444',
    rms: 0.25,
  },
});

assert.match(updated, /regions: \{/);
assert.match(updated, /'device:rom': 'feedface'/);
assert.match(updated, /60: \{/);
assert.doesNotMatch(updated, /stale/);
assert.match(updated, /tail: 'preserved'/);

const evaluate = async (source: string) => {
  const js = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext },
    reportDiagnostics: true,
  });
  assert.deepEqual(js.diagnostics, []);
  return import(`data:text/javascript;base64,${Buffer.from(js.outputText).toString('base64')}`);
};
const nested = machineTargetContract(invaders);
const golden = invaders.golden!;
const withoutGolden = { ...nested.scenarios[0], id: 'boot', golden: undefined };
const scaffold = renderCandidateModule({ ...nested, scenarios: [withoutGolden] });
const first = await evaluate(replaceGolden(scaffold, golden, 'boot'));
assert.deepEqual(first.invaders.scenarios[0].golden, golden);

const secondGolden = { ...golden, audio: { ...golden.audio, writes: golden.audio.writes + 1 } };
const multi = renderCandidateModule({ ...nested, scenarios: [
  { ...withoutGolden, id: 'boot', golden },
  { ...withoutGolden, id: 'gameplay', golden: secondGolden },
] });
const replaced = await evaluate(replaceGolden(multi, secondGolden, 'boot'));
assert.deepEqual(replaced.invaders.scenarios.map((scenario: { golden: unknown }) => scenario.golden),
  [secondGolden, secondGolden]);
const replacedSecond = await evaluate(replaceGolden(multi, golden, 'gameplay'));
assert.deepEqual(replacedSecond.invaders.scenarios[0].golden, golden);
assert.deepEqual(replacedSecond.invaders.scenarios[1].golden, golden);
assert.throws(() => replaceGolden(multi, golden), /select exactly one scenario/);
assert.throws(() => replaceGolden(multi, golden, 'missing'), /select exactly one scenario/);
const literal = await evaluate(replaceGolden(`export const demo = { game: 'demo', note: 'a } brace' } satisfies Object;`, golden));
assert.equal(literal.demo.note, 'a } brace');
assert.deepEqual(literal.demo.golden, golden);
console.log('record-goldens.spec: legacy, scaffolded and independent scenario goldens passed');
