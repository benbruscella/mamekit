import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
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
    'mame/stream-worklet.ts': {
      GeneratedStreamFrameRenderer: 'queues and resamples samples a generated device ' +
        'already rendered; it models no chip',
      GeneratedStreamProcessor: 'the shared AudioWorkletProcessor around that queue, ' +
        'the same for every stream device',
    },
  } as Record<string, Record<string, string>>,
};

// A branch on a MAME device type selects code written for that chip or board.
const DEVICE_TYPE_BRANCHES: Record<string, string[]> = {
  'audio-fidelity.ts': ['SAMPLES'],
  'generated-board.ts': [
    'ATARI_MOTION_OBJECTS', 'DISCRETE', 'DVG', 'I8243', 'M58715',
    'NEOGEO_CONTROL_PORT', 'NEOGEO_CTRL_EDGE_CONNECTOR', 'NEOGEO_SPRITE_OPTIMZIED',
    'SEGA_SYS16A_SPRITES', 'TAITO_SJ_SECURITY_MCU', 'Z80DMA',
  ],
  'generated-device.ts': ['GENERIC_LATCH_8'],
  'generated-video.ts': ['DVG', 'NEOGEO_SPRITE_OPTIMZIED'],
};
// Each direct-screen shape is a renderer written for one driver.
const DIRECT_SCREEN_SHAPES = [
  'berzerk-color-bitmap', 'bublbobl-object-columns', 'cosmic-bitmap-sprites',
  'dkong-scanline-sprites', 'exidy-character-ram', 'galaxian-no-bullets',
  'gauntlet-tilemaps', 'm62-category-sprites', 'system1-prom-mixer',
  'system16a-layers', 'taitosj-layered-char-ram',
  'technos-tilemap-sprites', 'timeplt', 'tnx1-banked-raster', 'vicdual-character-ram',
];
// Each replaceMethod call in src/hardware/device/extract.ts swaps a MAME method
// for a hand-written body, keyed by the compiler that makes it. One argument
// is not a literal: `method` is every SEGAIC16VID method that has diagnostics.
const REPLACED_METHODS = [
  'compileI8257: advance', 'compileI8257: device_reset', 'compileI8257: dma_read',
  'compileI8257: dma_write', 'compileI8257: execute_run',
  'compileI8257: is_request_active', 'compileI8257: next_channel',
  'compileK053246: device_start', 'compileK053246: k053247_sprites_draw_common',
  'compileNeogeoSprite: device_reset', 'compileNeogeoSprite: draw_fixed_layer',
  'compileNeogeoSprite: draw_pixel',
  'compileSegaic16Video: method', 'compileSegaic16Video: tilemap_init',
  'compileSlapstic: change_bank', 'compileSlapstic: device_post_load',
  'compileSlapstic: device_pre_save', 'compileSlapstic: device_reset',
  'compileSlapstic: device_start',
  'compileUpd7759: sound_stream_update',
];
// Each SPECIALIZED type in extract.ts is compiled by its own function, which
// edits MAME's source or its lowered methods before the device is emitted.
const SPECIALIZED_COMPILERS = [
  'I8257', 'K053246', 'NEOGEO_SPRITE_OPTIMZIED', 'SEGAIC16VID', 'SLAPSTIC', 'UPD7759',
];
// Each class in src/hardware, or in the worklet source a compiler emits,
// restates an engine, mixer or worklet by hand: a core, the frame renderer and
// processor that host it, or a chip model under another name. Paths are
// relative to src. audio-compiler.ts emits
// two discrete worklets, the counter/LFSR board and the SN76477, so its
// discrete classes appear twice.
const HAND_WRITTEN_ENGINES: Record<string, string[]> = {
  'hardware/berzerk-sound/berzerk-sound-worklet.ts': [
    'BerzerkProcessor', 'ExidyPit8253Core', 'ExidySoundCore', 'GeneratedBerzerkSoundCore',
    'GeneratedBerzerkSoundFrameRenderer', 'S14001aCore',
  ],
  'hardware/dac/worklet-source.ts': [
    'GeneratedBiquadFilter', 'GeneratedDacFrameRenderer', 'GeneratedDacMixer',
    'GeneratedDacProcessor', 'GeneratedHc55516Core',
  ],
  'hardware/discrete-dac/discrete-dac-worklet.ts': [
    'GeneratedDiscreteAudioCore', 'GeneratedDiscreteAudioFrameRenderer',
    'GeneratedDiscreteDacProcessor',
  ],
  'hardware/discrete-effects/discrete-effects-worklet.ts': [
    'GeneratedDiscreteAudioCore', 'GeneratedDiscreteAudioFrameRenderer',
    'GeneratedDiscreteEffectsProcessor',
  ],
  'hardware/nes/apu.ts': ['Dmc', 'Envelope', 'NesApu', 'Noise', 'Pulse', 'Triangle'],
  'hardware/okim6295/okim6295-worklet.ts': [
    'GeneratedOkim6295Core', 'GeneratedOkim6295FrameRenderer', 'GeneratedOkim6295Processor',
    'OkiVoice',
  ],
  'hardware/samples/samples-worklet.ts': [
    'GeneratedSamplesCore', 'GeneratedSamplesFrameRenderer', 'GeneratedSamplesProcessor',
  ],
  'hardware/ym2151/runtime.ts': ['Upd7759Runtime'],
  'mame/audio-compiler.ts': [
    'GeneratedAy8910Core', 'GeneratedAy8910FrameRenderer', 'GeneratedAy8910Mixer',
    'GeneratedAy8910Processor', 'GeneratedDac8Core', 'GeneratedDacFilterCore',
    'GeneratedDiscreteAudioCore', 'GeneratedDiscreteAudioCore',
    'GeneratedDiscreteAudioFrameRenderer', 'GeneratedDiscreteAudioFrameRenderer',
    'GeneratedDiscreteAudioProcessor', 'GeneratedDiscreteAudioProcessor',
    'GeneratedMsm5205Core', 'GeneratedNamcoWsgCore', 'GeneratedNamcoWsgFrameRenderer',
    'GeneratedNamcoWsgProcessor', 'GeneratedPoleposEngineCore',
  ],
  'mame/nes-apu-compiler.ts': ['NesProcessor', 'Resampler'],
  'mame/opm-compiler.ts': [
    'GeneratedK007232Core', 'GeneratedK053260Core', 'GeneratedMsm5205Core',
    'GeneratedRawSamplesCore', 'GeneratedSampleSpace', 'GeneratedUpd7759Core',
    'GeneratedYm2151Chip', 'GeneratedYm2151FrameRenderer', 'GeneratedYm2151Mixer',
    'GeneratedYm2151Processor', 'OkiCore', 'OkiVoice',
  ],
  'mame/opn-compiler.ts': [
    'GeneratedMsm5205Core', 'GeneratedYm2203Chip', 'GeneratedYm2203FrameRenderer',
    'GeneratedYm2203Mixer', 'GeneratedYm2203Processor', 'GeneratedYm2610AdpcmA',
    'GeneratedYm3526Chip',
  ],
  'mame/phoenix-audio-compiler.ts': [
    'GeneratedDiscreteAudioCore', 'GeneratedDiscreteAudioFrameRenderer',
    'GeneratedDiscreteAudioProcessor',
  ],
  'mame/sn76489-compiler.ts': [
    'GeneratedSn76489Core', 'GeneratedSn76489FrameRenderer', 'GeneratedSn76489Mixer',
    'GeneratedSn76489Processor', 'GeneratedSn76489SamplesCore',
  ],
  'mame/tms5220-compiler.ts': ['GeneratedTms5220Core'],
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
    .filter(file => /-(?:compiler|worklet)\.ts$/.test(file))
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
