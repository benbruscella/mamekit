import assert from 'node:assert/strict';
import { extractTms5220 } from './extract.ts';
import { tms5220IrArtifact, tms5220ModuleArtifact } from './definition.ts';

const mameSource = process.env.MAME_SRC ?? '../mame';
const extraction = extractTms5220({
  mameSource,
  entries: [{
    type: 'TMS5220C',
    definition: {
      type: 'TMS5220C',
      className: 'tms5220c_device',
      sourceFile: 'src/devices/sound/tms5220.cpp',
    },
  }],
} as never as Parameters<typeof extractTms5220>[0]);
assert.ok(extraction, 'a configured TMS5220C must extract');

// The chip is executable as a device, not as a worklet core: its /READY pin
// feeds a port the sound CPU polls, so the board loads it on the main thread
// the same way it loads any other generated device.
assert.deepEqual(extraction.executableTypes, ['TMS5220C']);
assert.equal(extraction.executable?.TMS5220C?.kind, 'device');
assert.equal(extraction.executable?.TMS5220C?.artifact, tms5220IrArtifact('TMS5220C'));

const ir = extraction.artifacts.find(
  artifact => artifact.path === tms5220IrArtifact('TMS5220C'));
const module = extraction.artifacts.find(
  artifact => artifact.path === tms5220ModuleArtifact('TMS5220C'));
assert.ok(ir && module);

// Every method the board binds has to be declared, or invoke() cannot find it
// and the bus write silently returns zero.
const definition = JSON.parse(ir.contents) as {
  type: string;
  methods: { name: string; parameters: string }[];
  summary: { diagnostics: number };
};
assert.equal(definition.type, 'TMS5220C');
assert.equal(definition.summary.diagnostics, 0, 'a diagnostic would mark it a gap');
const names = definition.methods.map(method => method.name).sort();
assert.deepEqual(names, [
  'data_w', 'intq_r', 'readyq_r', 'rsq_w', 'sample_rate',
  'set_unscaled_clock', 'sound_stream_update', 'status_r', 'wsq_w',
]);
// data_w takes the byte; the pin handlers take a line state.
assert.equal(
  definition.methods.find(method => method.name === 'data_w')?.parameters,
  'uint8_t data',
);

// The module must supply a compiled implementation for each of them, and must
// not reach outside the generated tree.
for (const name of names) {
  assert.match(module.contents, new RegExp(`\\b${name}:`), `${name} is implemented`);
}
assert.match(module.contents, /definition\.compiledMethods = methods/);
assert.ok(
  !/from '\.\.\/\.\.\/\.\.\//.test(module.contents),
  'generated output must not import src',
);

console.log('tms5220.spec: device executable, method surface and compiled bindings passed');
