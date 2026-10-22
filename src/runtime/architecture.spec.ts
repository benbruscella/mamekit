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

// Hand-written hardware that predates these checks (#176). Each list may only
// shrink: a new entry is new hand-written hardware, and an entry that no
// longer matches must be deleted here so it cannot come back unnoticed.
//
// A branch on a MAME device type selects code written for that chip or board.
const DEVICE_TYPE_BRANCHES: Record<string, string[]> = {
  'audio-fidelity.ts': ['SAMPLES'],
  'generated-board.ts': [
    'ATARI_MOTION_OBJECTS', 'DISCRETE', 'DVG', 'I8243', 'M58715', 'MOS6532',
    'NEOGEO_CONTROL_PORT', 'NEOGEO_CTRL_EDGE_CONNECTOR', 'NEOGEO_SPRITE_OPTIMZIED',
    'SCREEN', 'SEGA_SYS16A_SPRITES', 'SEGA_SYS16B_SPRITES', 'TAITO_SJ_SECURITY_MCU',
    'VECTOR', 'Z80CTC', 'Z80DMA',
  ],
  'generated-device.ts': ['GENERIC_LATCH_8'],
  'generated-video.ts': ['DVG', 'NEOGEO_SPRITE_OPTIMZIED', 'SEGA_SYS16A_SPRITES'],
};
// Each direct-screen shape is a renderer written for one driver.
const DIRECT_SCREEN_SHAPES = [
  'berzerk-color-bitmap', 'bublbobl-object-columns', 'cosmic-bitmap-sprites',
  'dkong-scanline-sprites', 'exidy-character-ram', 'galaxian-no-bullets',
  'gauntlet-tilemaps', 'm62-category-sprites', 'system1-prom-mixer',
  'system16a-layers', 'system16b-layers', 'taitosj-layered-char-ram',
  'technos-tilemap-sprites', 'timeplt', 'tnx1-banked-raster', 'vicdual-character-ram',
];

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
    [...DEVICE_TYPE_BRANCHES[file] ?? []].sort(),
    `${file}: a branch on a MAME device type is hand-written hardware; generate the ` +
    'chip instead (or, if one was removed, delete it from DEVICE_TYPE_BRANCHES)',
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

console.log('architecture.spec: shared runtime has no game/family behavior switches');
