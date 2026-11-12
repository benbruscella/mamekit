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

// The CPU cores' hand-written support layer (#249), as two exact lists that
// may only shrink. Every opcode body already comes from MAME; what is pinned
// here is the layer around it, read from the compilers' own TypeScript:
//
// - HAND_WRITTEN_CPU_LAYERS, per compiler function: each C++ body composed in
//   TypeScript (a literal handed to compileMameHandler or to a body helper,
//   or any statement literal), by the name it goes by; how many `.replace`
//   edits the function makes to MAME's source; and each number typed into a
//   constant table or an extractor's seed instead of read from a header.
// - HAND_WRITTEN_CPU_FACTS: per-CPU facts typed in outside the compilers --
//   the register-file classes the emitter restates for C++ unions, its
//   internal-peripheral emitters, its execute_run step, and each CPU type a
//   clock divider, width, endianness, mask or ROM window is typed in for.
//
// CPU_COMPILER_IDIOMS are the shared lowering functions every core and device
// goes through: C++ idioms, not hardware, so the scan skips them.
const CPU_LAYER_FILES = [
  'mame/cpu-compiler.ts', 'mame/tms34010-compiler.ts',
  'mame/namco51-compiler.ts', 'mame/namco53-compiler.ts',
];
const CPU_COMPILER_IDIOMS: Record<string, string> = {
  normalizeMameExecutionSource: 'C++ the handler parser cannot read (attributes, make_unique, vectors, #define in a body)',
  stripInactivePreprocessorBranches: 'the C preprocessor\'s #if, evaluated',
  stripTracingCalls: 'logging and debugger hooks, which change no state',
  stripMameFrameworkSetup: 'device_start\'s save_item/state_add registration, which the host does',
  lowerLocalStructs: 'a struct declared with its variable, as a value of its fields',
  parseMameOperationMacros: 'reads a core\'s operation macros',
  expandMameOperationMacros: 'expands a core\'s operation macros',
  extractEnumConstants: 'reads enumerators',
  extractDefineConstants: 'reads #define constants',
  extractConstexprConstants: 'reads constexpr constants',
  resolveConstants: 'evaluates constant expressions read from source',
  hostConstantExpression: 'a constant expression as the little-endian host evaluates it (NATIVE_ENDIAN_VALUE_LE_BE)',
  exceptionCycles: 'reads m68ki_exception_cycle_table; its edits strip comments',
  rewriteMameCall: 'rewrites a call by its parsed arguments',
  rewriteCall: 'rewrites a call by its parsed arguments',
  allocIntrinsic: 'the ALLOC primitive for an element type',
  matchPair: 'finds a closing bracket',
  lineAt: 'a source line number',
  sourceRef: 'a source reference',
};
const HAND_WRITTEN_CPU_LAYERS: Record<string, string[]> = {
  'mame/cpu-compiler.ts: compileMameI8088': [
    '24 source edits', 'body fetch', 'body fetch_op', 'body read_byte', 'body read_port_byte',
    'body read_port_word', 'body read_word', 'body reset', 'body service', 'body start',
    'body step', 'body update_pc', 'body v30_add4s', 'body v30_popa', 'body v30_pusha',
    'body write_byte', 'body write_port_byte', 'body write_port_byte_al', 'body write_port_word',
    'body write_word',
  ],
  'mame/cpu-compiler.ts: compileMameM68000': [
    'body fetch', 'body input', 'body program', 'body reset', 'body service', 'body start',
  ],
  'mame/cpu-compiler.ts: compileMameTms320c10': [
    '5 source edits', 'body fetch', 'body program', 'body service',
  ],
  'mame/cpu-compiler.ts: m68000SupportMethods': [
    'body (anonymous)', 'body BIT_B', 'body BIT_F', 'body CFLAG_1', 'body CFLAG_16', 'body CFLAG_8',
    'body CFLAG_ADD_32', 'body CFLAG_SUB_32', 'body COND_LE', 'body COND_LS', 'body COND_LT',
    'body EA_A7_PD_8', 'body EA_A7_PI_8', 'body EA_AL_16', 'body EA_AL_32', 'body EA_AL_8',
    'body EA_AW_16', 'body EA_AW_32', 'body EA_AW_8', 'body EA_PCDI_16', 'body EA_PCDI_32',
    'body EA_PCDI_8', 'body EA_PCIX_16', 'body EA_PCIX_32', 'body EA_PCIX_8', 'body GET_MSB_16',
    'body GET_MSB_32', 'body GET_MSB_8', 'body HIGH_NIBBLE', 'body LOW_NIBBLE', 'body MAKE_INT_16',
    'body MAKE_INT_32', 'body MAKE_INT_8', 'body MASK_OUT_ABOVE_16', 'body MASK_OUT_ABOVE_32',
    'body MASK_OUT_ABOVE_8', 'body MASK_OUT_BELOW_16', 'body MASK_OUT_BELOW_8', 'body NFLAG_1',
    'body OPER_I_16', 'body OPER_I_32', 'body OPER_I_8', 'body POW2', 'body ROL_33_64',
    'body ROR_33_64', 'body VFLAG_1', 'body XFLAG_1', 'body `EA_A${axis}_AI_16`',
    'body `EA_A${axis}_AI_32`', 'body `EA_A${axis}_AI_8`', 'body `EA_A${axis}_DI_16`',
    'body `EA_A${axis}_DI_32`', 'body `EA_A${axis}_DI_8`', 'body `EA_A${axis}_IX_16`',
    'body `EA_A${axis}_IX_32`', 'body `EA_A${axis}_IX_8`', 'body `EA_A${axis}_PD_16`',
    'body `EA_A${axis}_PD_32`', 'body `EA_A${axis}_PD_8`', 'body `EA_A${axis}_PI_16`',
    'body `EA_A${axis}_PI_32`', 'body `EA_A${axis}_PI_8`', 'body `NFLAG_${bits}`',
    'body `OPER_${name}_${bits}`', 'body `ROL_${bits}`', 'body `ROR_${bits}`',
    'body `VFLAG_ADD_${bits}`', 'body `VFLAG_SUB_${bits}`', 'body `ZFLAG_${bits}`',
    'body m68ki_branch_16', 'body m68ki_branch_8', 'body m68ki_exception_1010',
    'body m68ki_exception_1111', 'body m68ki_exception_common', 'body m68ki_exception_format_error',
    'body m68ki_exception_illegal', 'body m68ki_exception_privilege_violation',
    'body m68ki_exception_trap', 'body m68ki_exception_trapN', 'body m68ki_fake_pull_16',
    'body m68ki_fake_pull_32', 'body m68ki_get_ccr', 'body m68ki_get_ea_ix',
    'body m68ki_get_ea_pcdi', 'body m68ki_get_ea_pcix', 'body m68ki_get_sr', 'body m68ki_jump',
    'body m68ki_pull_16', 'body m68ki_pull_32', 'body m68ki_push_32', 'body m68ki_read_16',
    'body m68ki_read_16_fc', 'body m68ki_read_32', 'body m68ki_read_32_fc', 'body m68ki_read_8',
    'body m68ki_read_8_fc', 'body m68ki_read_imm_16', 'body m68ki_read_imm_32',
    'body m68ki_read_imm_8', 'body m68ki_read_pcrel_16', 'body m68ki_read_pcrel_32',
    'body m68ki_read_pcrel_8', 'body m68ki_service_interrupt', 'body m68ki_set_ccr',
    'body m68ki_set_s_flag', 'body m68ki_set_sr', 'body m68ki_write_16', 'body m68ki_write_16_fc',
    'body m68ki_write_32', 'body m68ki_write_32_fc', 'body m68ki_write_32_pd', 'body m68ki_write_8',
    'body m68ki_write_8_fc', 'body m_reset_cb',
  ],
  'mame/cpu-compiler.ts: normalizeM68000Source': [
    '19 source edits',
  ],
  'mame/namco51-compiler.ts: compileNamco51Protocol': [
    'body chip_select', 'body credit', 'body device_reset', 'body player', 'body read',
    'body reset', 'body rw', 'body switches', 'body vblank', 'body write',
  ],
  'mame/namco53-compiler.ts: compileNamco53Protocol': [
    'body device_reset', 'body read', 'body reset',
  ],
  'mame/tms34010-compiler.ts: compileMameTms34010': [
    '5 source edits', 'body input', 'body reset', 'body step', 'constant INPUT_LINE_HALT',
  ],
  'mame/tms34010-compiler.ts: dropCalls': [
    'body (anonymous)',
  ],
  'mame/tms34010-compiler.ts: lowerSpaceAccess': [
    'body (anonymous)',
  ],
  'mame/tms34010-compiler.ts: lowerXyValues': [
    '2 source edits', 'body (anonymous)',
  ],
  'mame/tms34010-compiler.ts: normalize': [
    '6 source edits',
  ],
};
const HAND_WRITTEN_CPU_FACTS: string[] = [
  'gen/emit-machine.ts: generatedCpuAddressSpace: m68000',
  'gen/emit-machine.ts: generatedCpuAddressSpace: m68010',
  'gen/emit-machine.ts: generatedCpuAddressSpace: tms320c10',
  'gen/emit-machine.ts: generatedCpuAddressSpace: tms34010',
  'gen/emit-machine.ts: generatedCpuAddressSpace: v30',
  'gen/emit-machine.ts: generatedCpuAddressSpace: z8002',
  'gen/emit-machine.ts: generatedCpuCycleClock: tms34010',
  'gen/emit-machine.ts: lowerGeneratedMachine: i8088',
  'gen/emit-machine.ts: lowerGeneratedMachine: m68000',
  'gen/emit-machine.ts: lowerGeneratedMachine: m68010',
  'gen/emit-machine.ts: lowerGeneratedMachine: tms34010',
  'gen/emit-machine.ts: lowerGeneratedMachine: v30',
  'mame/cpu-codegen.ts: class Pair16',
  'mame/cpu-codegen.ts: class Pair16Bytes',
  'mame/cpu-codegen.ts: class Pair32',
  'mame/cpu-codegen.ts: class Pair32Bytes',
  'mame/cpu-codegen.ts: class Pair32Words',
  'mame/cpu-codegen.ts: class WordByteRegisterFile',
  'mame/cpu-codegen.ts: class XyHalves',
  'mame/cpu-codegen.ts: class XyRegister',
  'mame/cpu-codegen.ts: class XyValue',
  'mame/cpu-codegen.ts: execute_run step',
  'runtime/generated-board-shape.ts: generatedCpuDataWidth: m68000',
  'runtime/generated-board-shape.ts: generatedCpuDataWidth: m68010',
  'runtime/generated-board-shape.ts: generatedCpuDataWidth: tms320c10',
  'runtime/generated-board-shape.ts: generatedCpuDataWidth: tms34010',
  'runtime/generated-board-shape.ts: generatedCpuDataWidth: v30',
  'runtime/generated-board-shape.ts: generatedCpuDataWidth: z8002',
  'runtime/generated-board-shape.ts: generatedCpuEndianness: tms34010',
  'runtime/generated-board-shape.ts: generatedCpuEndianness: v30',
];
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
  const codegen = readFileSync(join(src, 'mame/cpu-codegen.ts'), 'utf8');
  for (const match of codegen.matchAll(/^class (\w+)(?![$\w])/gm)) facts.push(`mame/cpu-codegen.ts: class ${match[1]}`);
  for (const match of codegen.matchAll(/^function (emitInternal\w+)/gm)) facts.push(`mame/cpu-codegen.ts: ${match[1]}`);
  if (/this\.generatedService\(\);/.test(codegen)) facts.push('mame/cpu-codegen.ts: execute_run step');
  const topology = readFileSync(join(src, 'gen/lower-topology.ts'), 'utf8');
  const cpuTypes = /const CPU_TYPES[^=]*=\s*\{([^}]*)\}/.exec(topology)?.[1] ?? '';
  const types = new Set([...cpuTypes.matchAll(/(\w+)\s*:\s*'(\w+)'/g)].flatMap(match => [match[1]!, match[2]!]));
  for (const file of ['gen/emit-machine.ts', 'runtime/generated-board-shape.ts', 'gen/lower-topology.ts']) {
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
