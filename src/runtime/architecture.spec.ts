import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import ts from 'typescript';

// Every piece of MAME hardware MAMEKIT runs is compiled from MAME's source
// (#178). This spec keeps it that way: each guard below scans for one kind of
// hand-written hardware the epic deleted and must find none. A guard that
// finds something is never answered by an exception list; generate the
// hardware instead. MAMEKIT's own hosting is declared apart, in
// HOST_BOUNDARIES, each entry with the reason it is not hardware.

const root = import.meta.dirname;
const src = join(root, '..');
const sourcesIn = (dir: string) =>
  readdirSync(join(src, dir), { recursive: true, encoding: 'utf8' })
    .filter(file => file.endsWith('.ts') && !file.endsWith('.spec.ts') && !file.includes('fixtures/'))
    .map(file => `${dir}/${file}`);
const sharedRuntime = readdirSync(root).filter(file =>
  file.endsWith('.ts') && !file.endsWith('.spec.ts'));

// No behaviour selected by a machine's name. Every target with a contract is
// a name nothing may branch on, with the families the old special cases used.
const forbiddenTargets = [
  ...new Set([
    ...readdirSync(join(src, 'games'), { recursive: true, encoding: 'utf8' })
      .filter(file => file.endsWith('.game.ts'))
      .map(file => file.replace(/^.*\//, '').slice(0, -'.game.ts'.length)),
    'segas16a', 'segas16b', 'neogeo',
  ]),
];
assert.ok(forbiddenTargets.includes('gauntlet'), 'architecture.spec: the contract targets were not found');
const nameBranch = new RegExp(
  `(?:\\bif\\b|\\bswitch\\b|\\bcase\\b)[^\\n]*['"\`](?:${forbiddenTargets.join('|')})['"\`]`);
const gameBranch =
  /(?:if|switch|\?|&&|\|\|)[^\n]*(?:machine|this\.machine)\.(?:game|family)\s*(?:===|!==|==|!=)[^\n]*/;
for (const file of [...sourcesIn('runtime'), ...sourcesIn('hardware'), ...sourcesIn('ir')]) {
  const source = readFileSync(join(src, file), 'utf8');
  for (const found of [gameBranch.exec(source)?.[0], nameBranch.exec(source)?.[0]]) {
    assert.equal(found, undefined,
      `${file}: \`${found}\` selects behaviour by machine name; select it by source shape or a hardware capability`);
  }
}
// The shared runtime executes emitted plans; it never reads MAME source bodies.
for (const file of sharedRuntime) {
  const body = /\b(?:handler|candidate|screen)\??\.body\b|\b(?:handler|candidate|screen)\.sourceBody\b/
    .exec(readFileSync(join(root, file), 'utf8'))?.[0];
  assert.equal(body, undefined,
    `${file}: \`${body}\` reads a MAME source body; resolve its shape during compilation, then execute the emitted plan`);
}

// A host boundary is MAMEKIT's own hosting, which a generated machine needs
// whatever its hardware. The scans below would otherwise read it as hardware.
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
// A boundary keyed by a file nothing scans would excuse nothing, silently.
for (const file of Object.keys(HOST_BOUNDARIES.deviceTypes)) {
  assert.ok(sharedRuntime.includes(file), `HOST_BOUNDARIES.deviceTypes: ${file} no longer exists; delete its entry`);
}

// DEVICE_TYPE_BRANCHES: a shared-runtime branch on a MAME device type selects
// code written for that chip or board. Only the host boundaries may.
const deviceTypeBranch =
  /hasDeviceType\([^)]*?'([A-Z][A-Z0-9_]{2,})'|\btype\s*===?\s*'([A-Z][A-Z0-9_]{2,})'|\bcase\s+'([A-Z][A-Z0-9_]{2,})'\s*:/g;
// A pattern over a device type picks a chip or CPU family by name: the board
// once matched `/^(?:YM|AY|POKEY|...)/` for sound chips and `/^m680(?:00|10|20)/i`
// for a big-endian palette. A pattern counts when it names a family (two
// capitals, or matches case-blind); MAME input types (IPT_BUTTON1) are port
// facts, not hardware.
const typePattern = /\/(?!\^?\(?(?:\?:)?IPT_)(\^?\(?(?:\?:)?[A-Za-z][^/\n]*)\/([a-z]*)\s*\.test\([^)\n]*\btype\b[^)\n]*\)/g;
for (const file of [...sourcesIn('runtime'), ...sourcesIn('hardware'), ...sourcesIn('ir')]) {
  const families = [...readFileSync(join(src, file), 'utf8').matchAll(typePattern)]
    .filter(match => match[2]!.includes('i') || /[A-Z]{2}/.test(match[1]!))
    .map(match => match[0]);
  assert.deepEqual(families, [],
    `DEVICE_TYPE_BRANCHES: ${file} selects devices by a pattern over their type, which is hand-written ` +
    'hardware; let the device\'s compiled class answer instead');
}
for (const file of sharedRuntime) {
  const source = readFileSync(join(root, file), 'utf8');
  const types = [...new Set([...source.matchAll(deviceTypeBranch)]
    .map(match => match[1] ?? match[2] ?? match[3]!)
    // MAME input types (IPT_KEYBOARD) are port facts, not hardware.
    .filter(type => !type.startsWith('IPT_')))].sort();
  assert.deepEqual(types, Object.keys(HOST_BOUNDARIES.deviceTypes[file] ?? {}).sort(),
    `DEVICE_TYPE_BRANCHES: ${file} branches on a MAME device type, which is hand-written hardware; ` +
    'generate the chip instead');
}

// DIRECT_SCREEN_SHAPES, REPLACED_VIDEO_HANDLERS, HAND_PORTED_LIBRARIES: the
// video stand-ins #240 deleted. A direct-screen shape was a renderer written
// for one driver; a replaced handler, a `*Handler` slot the runtime resolved to
// a stand-in instead of MAME's method (CPS1 sprites, the Pole Position road,
// the starfield row); a hand-ported library, MAME library code restated in the
// runtime (resnet.cpp's weights, atarimo.cpp's motion objects, the DVG).
{
  const videoExecution = readFileSync(join(src, 'ir/video-execution.ts'), 'utf8');
  const runtimeSources = sharedRuntime.map(file => readFileSync(join(root, file), 'utf8')).join('\n');
  assert.doesNotMatch(videoExecution, /GeneratedDirectScreenShape|directScreen/,
    'DIRECT_SCREEN_SHAPES: a direct-screen shape is a renderer written for one driver; lower the screen update instead');
  const replaced = [...new Set([
    ...[...videoExecution.matchAll(/^\s*(\w+Handler)\??\s*:/gm)].map(match => match[1]!),
    ...[...runtimeSources.matchAll(/\breplacedHandler\s*\([^,]*,\s*[^)]*?\.(\w+)\s*\)/g)].map(match => match[1]!),
  ])];
  assert.deepEqual(replaced, [],
    'REPLACED_VIDEO_HANDLERS: a video handler the runtime replaces is a stand-in for MAME\'s method; compile the method instead');
  const ported: string[] = [];
  if (/\bcalls(?:\.|\[['"])(?:compute_resistor_weights|compute_res_net|combine_weights)\b|\bfunction\s+(?:computeWeights|computeMameTtlSanyoResNet)\b/
    .test(runtimeSources)) ported.push('resnet.cpp');
  if (/\bclass\s+\w*MotionObjects\b/.test(runtimeSources)) ported.push('atarimo.cpp');
  assert.deepEqual(ported, [],
    'HAND_PORTED_LIBRARIES: a hand port of a MAME library restates MAME by hand; compile the library from source instead');
}

// HAND_WRITTEN_ENGINES: a class in a hardware package, or in the worklet source
// a compiler emits, restates an engine by hand: a core, a chip model, or the
// frame renderer and processor that hosted one. Only the host boundaries may.
const engineSources = [
  ...sourcesIn('hardware'),
  ...readdirSync(join(src, 'mame'))
    .filter(file => /-(?:compiler|solver|worklet)\.ts$/.test(file))
    .map(file => `mame/${file}`),
];
const classDeclaration = /^\s*(?:export\s+)?(?:default\s+)?(?:abstract\s+)?class\s+(\w+)/gm;
for (const file of engineSources) {
  assert.deepEqual(
    [...readFileSync(join(src, file), 'utf8').matchAll(classDeclaration)].map(match => match[1]).sort(),
    Object.keys(HOST_BOUNDARIES.classes[file] ?? {}).sort(),
    `HAND_WRITTEN_ENGINES: a class in ${file} restates an engine or worklet by hand; generate the chip and ` +
    'play it through the stream host instead (or, if it is host code, declare it in HOST_BOUNDARIES with its reason)',
  );
}
for (const file of Object.keys(HOST_BOUNDARIES.classes)) {
  assert.ok(engineSources.includes(file), `HOST_BOUNDARIES.classes: ${file} no longer exists; delete its entry`);
}

// What the board keeps beside the generated machine: each `hostModel(...)`
// record and each field a save state carries. Hand-written hardware hides its
// registers in exactly these (the Vic Dual coin circuit kept its edge and
// timer as two saved fields), so both are exact lists that may only shrink.
const HOST_MODELS = [
  '${specification.tag}.timing', '${tag}.hosted',
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

// SOUND_KINDS: a sound kind that names a chip family or a board, rather than
// the stream mix, was a hand engine with a worklet of its own (#242). Every
// chip is its MAME class compiled whole and played through the stream mix. A
// kind is read from every place one could come back: the runtime installers,
// the acceptance probes, the contracts' kind union and the app plan's literals.
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
  assert.deepEqual([...kinds], [],
    'SOUND_KINDS: a sound kind that names a chip family is a hand engine; compile the chip and play it through ' +
    'the stream mix');
}

// HAND_WRITTEN_CPU_LAYERS and HAND_WRITTEN_CPU_FACTS: every CPU is its MAME
// class compiled whole by device-compiler.ts and hosted by DeviceCpu (#249).
//
// - HAND_WRITTEN_CPU_LAYERS: a C++ body composed in TypeScript, a `.replace`
//   edit of MAME's source, or a number typed into a constant table, in the
//   shared execution-source idioms.
// - HAND_WRITTEN_CPU_FACTS: a per-CPU fact typed in outside the compiler (a
//   clock divider, width, endianness, mask or ROM window keyed by CPU type). A
//   processor's spaces are its compiled class's own address_space_config.
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

// RETIRED_MODULES: the files that held hand-written hardware, which must not
// come back under the same name. Paths are relative to src.
const RETIRED_MODULES: Record<string, string> = {
  'hardware/cpu': 'the hand CPU capability (#249)',
  'mame/cpu-compiler.ts': 'hand CPU support layers (#249)',
  'mame/cpu-codegen.ts': 'hand CPU support layers (#249)',
  'mame/opcode-dsl.ts': 'hand CPU support layers (#249)',
  'mame/m6809-dsl.ts': 'hand CPU support layers (#249)',
  'mame/tms34010-compiler.ts': 'hand CPU support layers (#249)',
  'mame/namco51-compiler.ts': 'Namco 51xx behaviour from an old MAME revision (#249)',
  'mame/namco53-compiler.ts': 'Namco 53xx behaviour from an old MAME revision (#249)',
  'runtime/generated-cpu-core.ts': 'the hand CPU core host (#249)',
  'mame/nes-apu-compiler.ts': 'a hand NES APU (#242)',
  'hardware/nes/apu.ts': 'a hand NES APU with nesdev tables (#242)',
  'mame/opl-compiler.ts': 'a hand OPL engine (#242)',
  'mame/opm-compiler.ts': 'a hand OPM, OKIM6295 and K053260 engine (#242)',
  'mame/opn-compiler.ts': 'a hand OPN and MSM5205 engine (#242)',
  'mame/sn76489-compiler.ts': 'a hand SN76489 engine (#242)',
  'mame/tms5220-compiler.ts': 'a hand TMS5220 engine (#242)',
  'hardware/ay8910': 'a hand AY8910 package (#242)',
  'hardware/berzerk-sound': 'a hand Exidy/Berzerk sound board (#242)',
  'hardware/dac': 'hand DAC board protocols (#242)',
  'hardware/namco-wsg': 'a hand Namco WSG package (#242)',
  'hardware/okim6295': 'a hand OKIM6295 package (#242)',
  'hardware/sn76489': 'a hand SN76489 package (#242)',
  'hardware/tms5220': 'a hand TMS5220 package (#242)',
  'hardware/ym2151': 'hand OPM timers and a uPD7759 state machine (#242)',
  'hardware/ym2203': 'hand OPN timers and status (#242)',
  'hardware/discrete-counter-lfsr': 'a hand DISCRETE model (#236)',
  'hardware/discrete-dac': 'a hand DISCRETE model (#236)',
  'hardware/discrete-effects': 'per-game analog models with measured constants (#236)',
  'hardware/discrete-sn76477': 'a hand SN76477 model (#236)',
  'mame/phoenix-audio-compiler.ts': 'invented Phoenix sound constants (#236)',
  'hardware/samples/samples-worklet.ts': 'invented tones per sample ID (#228)',
  'mame/pokey-compiler.ts': 'a hand POKEY engine (#200)',
  'hardware/vector/dvg.ts': 'a hand Atari DVG (#240)',
  'mame/atarimo-compiler.ts': "a hand port of atarimo.cpp (#240)",
  'mame/slapstic-compiler.ts': 'a hand SLAPSTIC state machine (#237)',
  'mame/sega-z80-compiler.ts': 'a hand Sega Z80 decryption (#237)',
  'mame/input-merger-compiler.ts': 'a hand-built input merger IR (#203)',
  'mame/m6805-device.ts': 'a hand 68705 fork (#203)',
  'hardware/m68705': 'a hand 68705 (#176)',
};
for (const [retired, why] of Object.entries(RETIRED_MODULES)) {
  assert.ok(!existsSync(join(src, retired)),
    `RETIRED_MODULES: ${retired} held ${why}; compile the hardware from MAME's source instead`);
}

// RETIRED_NAMES: identifiers of retired hand-written hardware and of the hooks
// that hosted it. None may appear anywhere in src again, comments included.
const RETIRED_NAMES: Record<string, string> = {
  replaceMethod: "swapped a MAME method for a hand-written body (REPLACED_METHODS, #203-#242)",
  SPECIALIZED: "compiled a device type with its own source-editing function (SPECIALIZED_COMPILERS, #203-#242)",
  directScreenUpdate: 'ran a renderer written for one driver in place of its screen update (#240)',
  allowDirectScreen: 'certified a target whose screen update ran a direct renderer (#240)',
  GeneratedMotionObjects: "a hand port of atarimo.cpp (#240)",
  GeneratedTnx1Palette: "a hand port of resnet.cpp's palettes (#240)",
  exidySpriteCollisions: "a hand collision detector; venture runs MAME's own (#240)",
  schedule_exidy_collision: "a board call MAME does not have; the driver's check_collision runs (#252)",
  pendingExidyCollisions: 'the saved field of that board call (#252)',
  _MASTER_GAIN: "a mix level with no counterpart in MAME's routes (#234)",
  konamiDeviceGfx: "gfx layouts typed by hand; a device's own source has them (#251)",
  paletteShareEndianness: "a palette's byte order guessed from CPU type names; the board reads the share's space (#262)",
  MAX_QUANTUM_SECONDS: "an empirical round bound in place of MAME's timeslice() (#255)",
};
for (const file of readdirSync(src, { recursive: true, encoding: 'utf8' })) {
  if (!file.endsWith('.ts') || file.endsWith('architecture.spec.ts')) continue;
  const source = readFileSync(join(src, file), 'utf8');
  for (const [retired, why] of Object.entries(RETIRED_NAMES)) {
    assert.ok(!source.includes(retired), `RETIRED_NAMES: ${file} names ${retired} (${why}); ` +
      'run the hardware compiled from MAME\'s source instead');
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
  assert.deepEqual(layers, {},
    'HAND_WRITTEN_CPU_LAYERS: a CPU compiler composes C++, edits MAME\'s source or types a constant in by hand; ' +
    'compile the core\'s own device_reset/execute_set_input/execute_run and read its headers instead');
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
  assert.deepEqual([...new Set(facts)].sort(), [],
    'HAND_WRITTEN_CPU_FACTS: a per-CPU fact is typed in outside the compiler; read it from the core\'s source instead');
}

console.log('architecture.spec: no machine-name branches, no hand-written hardware, and only the declared host boundaries');
