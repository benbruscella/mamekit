import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = import.meta.dirname;
const sharedRuntime = readdirSync(root).filter(file =>
  file.endsWith('.ts') && !file.endsWith('.spec.ts'));
const forbiddenTargets = [
  'gauntlet', 'mario', 'defender', 'elevator',
  'segas16a', 'segas16b', 'neogeo',
];

for (const file of sharedRuntime) {
  const source = readFileSync(join(root, file), 'utf8');
  assert.doesNotMatch(
    source,
    /\b(?:handler|candidate|screen)\??\.body\b|\b(?:handler|candidate|screen)\.sourceBody\b/,
    `${file}: resolve MAME source-body shapes during compilation, then execute the emitted plan`,
  );
  assert.doesNotMatch(
    source,
    /(?:if|switch|\?|&&|\|\|)[^\n]*(?:machine|this\.machine)\.(?:game|family)\s*(?:===|!==|==|!=)/,
    `${file}: shared runtime behavior must not branch on a game or family`,
  );
  for (const target of forbiddenTargets) {
    assert.doesNotMatch(
      source,
      new RegExp(`(?:if|switch|else\\s+if)[^\\n]*['\"]${target}['\"]`, 'i'),
      `${file}: ${target} must be selected by source shape or a hardware capability`,
    );
  }
}

// The hand-written hardware #178 retires, as exact lists. Each list may only
// shrink: a new entry is new hand-written hardware, and an entry that no
// longer matches must be deleted here so it cannot come back unnoticed. The
// epic is done when all five are empty and only HOST_BOUNDARIES is left.
//
// A host boundary is MAMEKIT's own hosting, which a generated machine needs
// whatever its hardware: the guards below expect it beside the inventory, so
// it is declared here with the reason it is not hardware.
const HOST_BOUNDARIES = {
  deviceTypes: {
    'generated-board.ts': {
      SCREEN: 'the screen host answers beam position and timing for whichever device ' +
        'is the screen; it draws nothing the machine does not',
      VECTOR: "MAME's vector_device is the display: what a generator hands it is kept " +
        'as the list the renderer presents',
    },
  } as Record<string, Record<string, string>>,
  classes: {
    'hardware/audio-probe.ts': {
      StreamingFrameResampler: "resamples any renderer's frames to the probe rate, so " +
        'offline audio checks compare like with like',
    },
    'mame/netlist-compiler.ts': {
      Setup: "reads MAME's netlist setup language into a device list, as nlparse_t does; " +
        'it runs nothing',
    },
    'mame/netlist-solver.ts': {
      GeneratedNetlistDiode: "MAME's generic_diode, which the solver's diode and BJT " +
        'elements share; every parameter comes from the netlist\'s own model',
      GeneratedNetlistGroup: 'one sparse LU over whatever nodes a netlist gives it',
      GeneratedNetlistSolver: 'steps any compiled netlist with the stamps of its MAME ' +
        'devices; the circuit is all generated, and no machine or chip is named here',
    },
    'mame/stream-worklet.ts': {
      GeneratedStreamFrameRenderer: 'queues and resamples samples a generated device ' +
        'already rendered; it models no chip',
      GeneratedStreamProcessor: 'the shared AudioWorkletProcessor around that queue, ' +
        'the same for every stream device',
    },
  } as Record<string, Record<string, string>>,
};

// A branch on a MAME device type selects code written for that chip or board.
const DEVICE_TYPE_BRANCHES: Record<string, string[]> = {};
// Each direct-screen shape is a renderer written for one driver.
const DIRECT_SCREEN_SHAPES: string[] = [];
// Each replaceMethod call in src/hardware/device/extract.ts swaps a MAME method
// for a hand-written body, keyed by the compiler that makes it.
const REPLACED_METHODS: string[] = [];
// Each SPECIALIZED type in extract.ts is compiled by its own function, which
// edits MAME's source or its lowered methods before the device is emitted.
const SPECIALIZED_COMPILERS: string[] = [];
// Each class in src/hardware, or in the worklet source a compiler emits,
// restates an engine, mixer or worklet by hand: a core, the frame renderer and
// processor that host it, or a chip model under another name. Paths are
// relative to src.
const HAND_WRITTEN_ENGINES: Record<string, string[]> = {
  'hardware/berzerk-sound/berzerk-sound-worklet.ts': [
    'BerzerkProcessor', 'ExidyPit8253Core', 'ExidySoundCore', 'GeneratedBerzerkSoundCore',
    'GeneratedBerzerkSoundFrameRenderer', 'S14001aCore',
  ],
  'hardware/dac/worklet-source.ts': [
    'GeneratedBiquadFilter', 'GeneratedDacFrameRenderer', 'GeneratedDacMixer',
    'GeneratedDacProcessor',
  ],
  'hardware/nes/apu.ts': ['Dmc', 'Envelope', 'NesApu', 'Noise', 'Pulse', 'Triangle'],
  'mame/audio-compiler.ts': [
    'GeneratedAy8910Core', 'GeneratedAy8910FrameRenderer', 'GeneratedAy8910Mixer',
    'GeneratedAy8910Processor', 'GeneratedDac8Core',
    'GeneratedMsm5205Core', 'GeneratedNamcoWsgCore', 'GeneratedNamcoWsgFrameRenderer',
    'GeneratedNamcoWsgProcessor', 'GeneratedPoleposEngineCore',
  ],
  'mame/nes-apu-compiler.ts': ['NesProcessor', 'Resampler'],
};

const deviceTypeBranch =
  /hasDeviceType\([^)]*?'([A-Z][A-Z0-9_]{2,})'|\btype\s*===?\s*'([A-Z][A-Z0-9_]{2,})'|\bcase\s+'([A-Z][A-Z0-9_]{2,})'\s*:/g;
for (const file of sharedRuntime) {
  const source = readFileSync(join(root, file), 'utf8');
  const types = [...new Set([...source.matchAll(deviceTypeBranch)]
    .map(match => match[1] ?? match[2] ?? match[3]!)
    // MAME input types (IPT_KEYBOARD) are port facts, not hardware.
    .filter(type => !type.startsWith('IPT_')))].sort();
  assert.deepEqual(
    types,
    [
      ...DEVICE_TYPE_BRANCHES[file] ?? [],
      ...Object.keys(HOST_BOUNDARIES.deviceTypes[file] ?? {}),
    ].sort(),
    `${file}: a branch on a MAME device type is hand-written hardware; generate the ` +
    'chip instead (or, if one was removed, delete it from DEVICE_TYPE_BRANCHES or ' +
    'HOST_BOUNDARIES)',
  );
}
const shapeUnion = readFileSync(join(root, '../ir/video-execution.ts'), 'utf8')
  .match(/type GeneratedDirectScreenShape =([^;]*);/)?.[1] ?? '';
assert.deepEqual(
  [...shapeUnion.matchAll(/'([^']+)'/g)].map(match => match[1]).sort(),
  [...DIRECT_SCREEN_SHAPES].sort(),
  'a direct-screen shape is a renderer written for one driver; generate the video ' +
    'instead (or, if one was removed, delete it from DIRECT_SCREEN_SHAPES)',
);

// The video stand-ins #240 retired, as two exact lists that may only shrink
// (in the style of HOST_MODELS). A replaced video handler is a `*Handler` slot
// on GeneratedVideoExecution that the runtime resolves to a stand-in body
// instead of running MAME's method (CPS1 sprites, the Pole Position road, the
// starfield row). A hand-ported library restates MAME library code in the
// runtime: resnet.cpp's weights, atarimo.cpp's motion objects, the DVG.
const REPLACED_VIDEO_HANDLERS: string[] = [];
const HAND_PORTED_LIBRARIES: string[] = [];
{
  const videoExecution = readFileSync(join(root, '../ir/video-execution.ts'), 'utf8');
  const runtimeSources = sharedRuntime.map(file => readFileSync(join(root, file), 'utf8')).join('\n');
  const replaced = new Set([
    ...[...videoExecution.matchAll(/^\s*(\w+Handler)\??\s*:/gm)].map(match => match[1]!),
    ...[...runtimeSources.matchAll(/\breplacedHandler\s*\([^,]*,\s*[^)]*?\.(\w+)\s*\)/g)].map(match => match[1]!),
  ]);
  assert.deepEqual([...replaced].sort(), [...REPLACED_VIDEO_HANDLERS].sort(),
    'a video handler the runtime replaces is a stand-in for MAME\'s method; compile the method instead ' +
    '(or, if one was removed, delete it from REPLACED_VIDEO_HANDLERS)');
  assert.doesNotMatch(videoExecution, /GeneratedDirectScreenShape|directScreen/,
    'a direct-screen shape is a renderer written for one driver; lower the screen update instead');
  const ported: string[] = [];
  if (/\bcalls(?:\.|\[['"])(?:compute_resistor_weights|compute_res_net|combine_weights)\b|\bfunction\s+(?:computeWeights|computeMameTtlSanyoResNet)\b/
    .test(runtimeSources)) ported.push('resnet.cpp');
  if (/\bclass\s+\w*MotionObjects\b/.test(runtimeSources) || existsSync(join(root, '../mame/atarimo-compiler.ts'))) {
    ported.push('atarimo.cpp');
  }
  if (existsSync(join(root, '../hardware/vector/dvg.ts'))) ported.push('avgdvg.cpp');
  assert.deepEqual(ported.sort(), [...HAND_PORTED_LIBRARIES].sort(),
    'a hand port of a MAME library restates MAME by hand; compile the library from source instead ' +
    '(or, if one was removed, delete it from HAND_PORTED_LIBRARIES)');
}

const deviceExtract = readFileSync(join(root, '../hardware/device/extract.ts'), 'utf8');
const compilerDeclaration = /^(?:export\s+)?function\s+(\w+)/gm;
const replacedMethods = [...deviceExtract.matchAll(/\breplaceMethod\(([^)]*)/g)]
  .filter(match => !deviceExtract.slice(0, match.index).endsWith('function '))
  .map(match => {
    const compiler = [...deviceExtract.slice(0, match.index).matchAll(compilerDeclaration)]
      .at(-1)?.[1] ?? '(top level)';
    // The second argument is the method's name; quotes are dropped from literals.
    const name = match[1]!.split(',')[1]?.trim().replace(/^(['"`])(.*)\1$/s, '$2') ?? '';
    return `${compiler}: ${name}`;
  }).sort();
assert.deepEqual(
  replacedMethods,
  [...REPLACED_METHODS].sort(),
  'src/hardware/device/extract.ts: replaceMethod swaps a MAME method for a hand-written ' +
    'body; teach the compiler the idiom instead (or, if one was removed, delete it from ' +
    'REPLACED_METHODS)',
);
const specializedTable = deviceExtract.match(/const SPECIALIZED\b[^{]*?=\s*\{([^}]*)\}/)?.[1] ?? '';
assert.deepEqual(
  [...specializedTable.matchAll(/^\s*([A-Z][A-Z0-9_]*)\s*:/gm)].map(match => match[1]).sort(),
  [...SPECIALIZED_COMPILERS].sort(),
  'src/hardware/device/extract.ts: a SPECIALIZED compiler edits MAME source for one ' +
    'device type; compile it like every other device instead (or, if one was removed, ' +
    'delete it from SPECIALIZED_COMPILERS)',
);

const src = join(root, '..');
// Hardware packages, and the compilers whose emitted worklets carry classes.
const engineSources = [
  ...readdirSync(join(src, 'hardware'), { recursive: true, encoding: 'utf8' })
    .filter(file => file.endsWith('.ts') && !file.endsWith('.spec.ts'))
    .map(file => `hardware/${file}`),
  ...readdirSync(join(src, 'mame'))
    .filter(file => /-(?:compiler|solver|worklet)\.ts$/.test(file))
    .map(file => `mame/${file}`),
];
const classDeclaration = /^\s*(?:export\s+)?(?:default\s+)?(?:abstract\s+)?class\s+(\w+)/gm;
for (const file of engineSources) {
  assert.deepEqual(
    [...readFileSync(join(src, file), 'utf8').matchAll(classDeclaration)]
      .map(match => match[1]).sort(),
    [
      ...HAND_WRITTEN_ENGINES[file] ?? [],
      ...Object.keys(HOST_BOUNDARIES.classes[file] ?? {}),
    ].sort(),
    `${file}: a class here restates an engine or worklet by hand; generate the chip and ` +
    'play it through the stream host instead (or, if one was removed, delete it from ' +
    'HAND_WRITTEN_ENGINES or HOST_BOUNDARIES)',
  );
}
// What the board keeps beside the generated machine: each `hostModel(...)`
// record and each field a save state carries. Hand-written hardware hides its
// registers in exactly these (the Vic Dual coin circuit kept its edge and
// timer as two saved fields), so both are exact lists that may only shrink.
const HOST_MODELS = [
  '${specification.tag}.instructionTicks', '${specification.tag}.timing', '${tag}.hosted',
  'bank-device.${bank.tag}', 'bank.${bank.tag}', 'coinLockout', 'deviceLineStates',
  'hostedCarry', 'roundDevices', 'systemMute',
];
const SAVED_BOARD_FIELDS = [
  'bankDeviceBuses', 'cpuBuses', 'cpuCycles', 'cpuHeld', 'cpuReportedSuspended',
  'cpuSliceCycles', 'cpuStalls', 'cpus', 'currentLine', 'currentLineFraction',
  'declarativeEeprom', 'devices', 'frameRunner', 'generatedBanks', 'generatedResources',
  'heldDeviceSeconds', 'hostState', 'inFrame', 'inputLatchPrevious', 'observedTransportSeconds',
  'pendingBankEntry', 'pendingExidyCollisions', 'pendingTimers', 'runningSliceCycles',
  'softResetPending', 'soundRuntime', 'state', 'timedHardwareDelivered',
  'timerCpuCarriedCycles', 'video', 'videoPrimitives',
];
{
  const board = readFileSync(join(root, 'generated-board.ts'), 'utf8');
  assert.deepEqual(
    [...new Set([...board.matchAll(/\bhostModel\(\s*(['`])([^'`]*)\1/g)].map(match => match[2]!))].sort(),
    [...HOST_MODELS].sort(),
    'generated-board.ts: a new hostModel record is state the generated machine does not own; ' +
    'generate the hardware instead (or, if one was removed, delete it from HOST_MODELS)',
  );
  const keys = /\n  stateKeys\(\): readonly string\[\] \{\s*return \[([\s\S]*?)\];/.exec(board)?.[1] ?? '';
  assert.deepEqual(
    [...keys.replace(/\/\/[^\n]*/g, '').matchAll(/'(\w+)'/g)].map(match => match[1]!).sort(),
    [...SAVED_BOARD_FIELDS].sort(),
    'generated-board.ts: a new saved board field is state the generated machine does not own; ' +
    'generate the hardware instead (or, if one was removed, delete it from SAVED_BOARD_FIELDS)',
  );
}

// A list keyed by a file that is gone would pass silently forever.
for (const [list, files, scanned] of [
  ['DEVICE_TYPE_BRANCHES', DEVICE_TYPE_BRANCHES, sharedRuntime],
  ['HOST_BOUNDARIES.deviceTypes', HOST_BOUNDARIES.deviceTypes, sharedRuntime],
  ['HAND_WRITTEN_ENGINES', HAND_WRITTEN_ENGINES, engineSources],
  ['HOST_BOUNDARIES.classes', HOST_BOUNDARIES.classes, engineSources],
] as const) {
  for (const file of Object.keys(files)) {
    assert.ok(scanned.includes(file), `${list}: ${file} no longer exists; delete its entry`);
  }
}

console.log('architecture.spec: no game/family switches, and no hand-written hardware beyond the pinned lists');
