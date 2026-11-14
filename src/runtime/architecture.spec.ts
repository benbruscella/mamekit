import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import ts from 'typescript';

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
    'hardware/speaker/netlist-solver.ts': {
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
  'pendingBankEntry', 'pendingTimers', 'runningSliceCycles',
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

// Sound kinds that name a chip family or a board rather than the stream mix,
// as an exact list that may only shrink (#242). Each was a hand engine and a
// worklet of its own; every chip is now its MAME class compiled whole and
// played through the stream mix, so the list is empty. A kind is read from
// every place one could come back: the runtime installers, the acceptance
// probes, the contracts' kind union and the app plan's kind literals.
const SOUND_KINDS: string[] = [];
{
  const read = (file: string) => readFileSync(join(root, file), 'utf8');
  const keys = (source: string, table: string) =>
    [...(new RegExp(`const ${table}[^=]*=\\s*\\{([^}]*)\\}`).exec(source)?.[1] ?? '').matchAll(/^\s*(\w+)\s*:/gm)].map(match => match[1]!);
  const kinds = new Set([
    ...keys(read('../hardware/sound-runtime-registry.ts'), 'INSTALLERS'),
    ...keys(read('../hardware/acceptance-registry.ts'), 'AUDIO_PROBES'),
    ...[...(/export type GameSoundKind =([^;]*);/.exec(read('../games/types.ts'))?.[1] ?? '').matchAll(/'(\w+)'/g)].map(match => match[1]!),
    ...[...read('../gen/lower-sound.ts').matchAll(/\bkind:\s*'(\w+)'/g)].map(match => match[1]!),
  ]);
  kinds.delete('stream');
  kinds.delete('none');
  assert.deepEqual([...kinds].sort(), [...SOUND_KINDS].sort(),
    'a sound kind that names a chip family is a hand engine; compile the chip and play it through the stream mix ' +
    '(or, if one was removed, delete it from SOUND_KINDS)');
}

// The CPU cores' hand-written support layer (#249) is gone: every CPU is its
// MAME class compiled whole by device-compiler.ts and hosted by DeviceCpu.
// What is pinned here keeps it gone:
//
// - HAND_WRITTEN_CPU_LAYERS: each C++ body composed in TypeScript, `.replace`
//   edit of MAME's source, or number typed into a constant table, in the
//   shared execution-source idioms; empty, and it may only stay so.
// - HAND_WRITTEN_CPU_FACTS: per-CPU facts typed in outside the compiler (a
//   clock divider, width, endianness, mask or ROM window keyed by CPU type);
//   empty too -- a processor's spaces are its compiled class's own
//   address_space_config (generated-board processorSpaces).
// - RETIRED_CPU_LAYERS: the modules that held the hand cores, which must not
//   come back.
//
// CPU_COMPILER_IDIOMS are the shared lowering functions every device goes
// through: C++ idioms, not hardware, so the scan skips them.
const CPU_LAYER_FILES = [
  'mame/execution-source.ts',
];
const CPU_COMPILER_IDIOMS: Record<string, string> = {
  normalizeMameExecutionSource: 'C++ the handler parser cannot read (attributes, make_unique, vectors, #define in a body)',
  stripInactivePreprocessorBranches: 'the C preprocessor\'s #if, evaluated',
  stripTracingCalls: 'logging and debugger hooks, which change no state',
  lowerLocalStructs: 'a struct declared with its variable, as a value of its fields',
  allocIntrinsic: 'the ALLOC primitive for an element type',
};
const HAND_WRITTEN_CPU_LAYERS: Record<string, string[]> = {};
const HAND_WRITTEN_CPU_FACTS: string[] = [];
const RETIRED_CPU_LAYERS = [
  'mame/cpu-compiler.ts', 'mame/cpu-codegen.ts', 'mame/tms34010-compiler.ts',
  'mame/namco51-compiler.ts', 'mame/namco53-compiler.ts', 'hardware/cpu', 'runtime/generated-cpu-core.ts',
];
for (const retired of RETIRED_CPU_LAYERS) {
  assert.ok(!existsSync(join(src, retired)), `${retired} held a hand CPU layer (#249); compile the core whole instead`);
}

// Board calls MAME does not have, retired with the hand-written hardware they
// delivered for. A name here may not appear anywhere in `src` again: Exidy's
// collisions come from the driver's own check_collision and its timers (#252).
const RETIRED_BOARD_CALLS = [
  'schedule_exidy_collision', 'pendingExidyCollisions',
];
for (const file of readdirSync(src, { recursive: true, encoding: 'utf8' })) {
  if (!file.endsWith('.ts') || file.endsWith('architecture.spec.ts')) continue;
  const source = readFileSync(join(src, file), 'utf8');
  for (const retired of RETIRED_BOARD_CALLS) {
    assert.ok(
      !source.includes(retired),
      `${file}: ${retired} is a board call MAME does not have; run the driver's own code instead`,
    );
  }
}
{
  const isString = (node: ts.Node): node is ts.StringLiteral | ts.NoSubstitutionTemplateLiteral | ts.TemplateExpression =>
    ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateExpression(node);
  const textOf = (node: ts.Node) =>
    ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) ? node.text : node.getText();
  const enclosing = (node: ts.Node): string => {
    let name = '(top level)';
    for (let parent: ts.Node | undefined = node; parent; parent = parent.parent) {
      if (ts.isFunctionDeclaration(parent) && parent.name) name = parent.name.text;
    }
    return name;
  };
  const nameOf = (object: ts.ObjectLiteralExpression) => {
    const named = object.properties.find(property => ts.isPropertyAssignment(property)
      && property.name.getText() === 'name' && isString(property.initializer));
    return named && ts.isPropertyAssignment(named) ? textOf(named.initializer) : undefined;
  };
  // What a hand body goes by: a helper's leading string (`source('m68ki_read_8',
  // ...)`), its object's `name`, or the property or variable it is assigned to.
  const label = (node: ts.Node): string => {
    for (let parent = node.parent; parent && !ts.isFunctionDeclaration(parent); parent = parent.parent) {
      if (ts.isCallExpression(parent) && ts.isIdentifier(parent.expression) && parent.arguments.length > 1
        && isString(parent.arguments[0]!) && parent.arguments[0] !== node
        && !parent.arguments[0]!.getText().includes(';')) return textOf(parent.arguments[0]!);
      if (ts.isObjectLiteralExpression(parent) && nameOf(parent)) return nameOf(parent)!;
      if (ts.isPropertyAssignment(parent)) return nameOf(parent.parent) ?? parent.name.getText();
      if (ts.isVariableDeclaration(parent)) return parent.name.getText();
    }
    return '(anonymous)';
  };
  const isReplace = (node: ts.Node): node is ts.CallExpression => ts.isCallExpression(node)
    && ts.isPropertyAccessExpression(node.expression) && /^replace(?:All)?$/.test(node.expression.name.text);
  const isHandlerBody = (node: ts.Node) => {
    for (let parent = node.parent; parent && !ts.isStatement(parent); parent = parent.parent) {
      if (!ts.isCallExpression(parent) || !ts.isIdentifier(parent.expression)) continue;
      if (parent.expression.text === 'compileMameHandler') return true;
      if (/^(?:source|method)$/.test(parent.expression.text) && parent.arguments.at(-1) === node) return true;
    }
    return false;
  };
  const isNumber = (node: ts.Node): boolean => ts.isNumericLiteral(node)
    || ts.isPrefixUnaryExpression(node) && ts.isNumericLiteral(node.operand);
  const inConstantTable = (node: ts.Node): boolean => {
    for (let parent = node.parent; parent && !ts.isFunctionDeclaration(parent); parent = parent.parent) {
      if ((ts.isVariableDeclaration(parent) || ts.isPropertyAssignment(parent))
        && /constants$/i.test(parent.name.getText())) return true;
      if (ts.isCallExpression(parent) && ts.isIdentifier(parent.expression)
        && /^extract\w*(?:Constants|Array)$/.test(parent.expression.text)) return true;
    }
    return false;
  };
  const found: Record<string, string[]> = {};
  for (const file of CPU_LAYER_FILES) {
    const unit = ts.createSourceFile(file, readFileSync(join(src, file), 'utf8'), ts.ScriptTarget.Latest, true);
    const visit = (node: ts.Node): void => {
      const fn = enclosing(node);
      if (CPU_COMPILER_IDIOMS[fn] === undefined) {
        const entries = found[`${file}: ${fn}`] ??= [];
        if (isReplace(node)) entries.push('edit');
        else if (isString(node) && !(isReplace(node.parent) && node.parent.arguments[0] !== node)
          && (isHandlerBody(node)
            || /;/.test(textOf(node)) && /[A-Za-z_]\w*\s*(?:\(|[-+|&]?=)/.test(textOf(node)))) {
          entries.push(`body ${label(node)}`);
        } else if (ts.isPropertyAssignment(node) && isNumber(node.initializer) && inConstantTable(node)) {
          entries.push(`constant ${node.name.getText()}`);
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(unit);
  }
  const layers = Object.fromEntries(Object.entries(found)
    .filter(([, entries]) => entries.length)
    .map(([key, entries]) => {
      const edits = entries.filter(entry => entry === 'edit').length;
      return [key, [...new Set(entries.filter(entry => entry !== 'edit')),
        ...edits ? [`${edits} source edits`] : []].sort()];
    }));
  assert.deepEqual(layers, Object.fromEntries(Object.entries(HAND_WRITTEN_CPU_LAYERS).map(([key, entries]) =>
    [key, [...entries].sort()])),
    'a CPU compiler composes C++, edits MAME\'s source or types a constant in by hand; compile the core\'s own ' +
    'device_reset/execute_set_input/execute_run and read its headers instead (or, if one was removed, delete ' +
    'it from HAND_WRITTEN_CPU_LAYERS)');
  for (const name of Object.keys(CPU_COMPILER_IDIOMS)) {
    assert.ok(CPU_LAYER_FILES.some(file => new RegExp(`\\bfunction\\s+${name}\\b`)
      .test(readFileSync(join(src, file), 'utf8'))), `CPU_COMPILER_IDIOMS: ${name} no longer exists; delete its entry`);
  }

  const facts: string[] = [];
  const topology = readFileSync(join(src, 'gen/lower-topology.ts'), 'utf8');
  const cpuTypes = /const CPU_TYPES[^=]*=\s*\{([^}]*)\}/.exec(topology)?.[1] ?? '';
  const types = new Set([...cpuTypes.matchAll(/(\w+)\s*:\s*'(\w+)'/g)].flatMap(match => [match[1]!, match[2]!]));
  for (const file of ['gen/emit-machine.ts', 'runtime/generated-board-shape.ts', 'gen/lower-topology.ts', 'runtime/generated-board.ts', 'runtime/device-cpu.ts']) {
    const unit = ts.createSourceFile(file, readFileSync(join(src, file), 'utf8'), ts.ScriptTarget.Latest, true);
    const visit = (node: ts.Node): void => {
      // The table itself names which generated core a device type runs.
      if (ts.isVariableDeclaration(node) && node.name.getText() === 'CPU_TYPES') return;
      const named = ts.isStringLiteral(node) ? node.text
        : ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) ? node.name.text : undefined;
      if (named !== undefined && types.has(named)) facts.push(`${file}: ${enclosing(node)}: ${named}`);
      ts.forEachChild(node, visit);
    };
    visit(unit);
  }
  assert.deepEqual([...new Set(facts)].sort(), [...HAND_WRITTEN_CPU_FACTS].sort(),
    'a per-CPU fact is typed in outside the compiler; read it from the core\'s source instead (or, if one was ' +
    'removed, delete it from HAND_WRITTEN_CPU_FACTS)');
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
