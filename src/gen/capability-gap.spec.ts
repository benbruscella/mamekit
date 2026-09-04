import assert from 'node:assert/strict';
import { buildCapabilityGapReport, capabilityGapMarkdown } from './capability-gap.ts';
import type { KnowledgeGraph } from '../kg/types.ts';

const graph = {
  meta: {},
  nodes: [
    { id: 'game:c64', label: 'Game', props: { name: 'c64' } },
    { id: 'cpu', label: 'Device', props: { tag: 'maincpu', type: 'M6510', clock: 985248 } },
    { id: 'screen', label: 'Device', props: { tag: 'screen', type: 'SCREEN', screenRawExpr: 'XTAL(...)' } },
    { id: 'map', label: 'AddressMap', props: { cls: 'c64_state', name: 'map', dataWidth: 8, addressShift: 0, endianness: 'little' } },
    { id: 'range', label: 'AddressRange', props: { start: 0, end: 65535 } },
    { id: 'soft', label: 'SoftwareList', props: { tag: 'flop_list', list: 'c64_flop' } },
    { id: 'romregion', label: 'RomRegion', props: { tag: 'kernal', romSet: 'c64' } },
    { id: 'rom', label: 'Rom', props: { file: 'kernal.rom' } },
    { id: 'key', label: 'PortField', props: { type: 'KEYBOARD_A' } },
  ],
  edges: [
    { from: 'cpu', to: 'map', rel: 'HAS_MAP' },
    { from: 'map', to: 'range', rel: 'HAS_RANGE' },
    { from: 'romregion', to: 'rom', rel: 'LOADS' },
  ],
} as unknown as KnowledgeGraph;
const runtime = { generationGaps: ['MOS6526 is unresolved'] } as never;
const peer = { game: 'mk', generationGaps: ['MOS6526 is unresolved'] } as never;
const report = buildCapabilityGapReport(graph, runtime, [peer]);
assert.equal(report.addressSpaces[0]?.owner, 'maincpu');
assert.equal(report.addressSpaces[0]?.width, 8);
assert.equal(report.media[0]?.list, 'c64_flop');
assert.equal(report.firmware[0]?.loads, 1);
assert.equal(report.inputs.keyboardFields, 1);
assert.deepEqual(report.sharedGapCapabilities[0]?.games, ['mk']);
assert.match(report.nextSteps[0]?.owner ?? '', /hardware capability/);
assert.match(capabilityGapMarkdown(report), /Shared opportunities/);

console.log('capability-gap.spec: ambitious target report passed');
