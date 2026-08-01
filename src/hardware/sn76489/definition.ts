import type { PortDeclaration } from '../ports.ts';

export const SN76489_ID = 'sn76489';
export const SN76489_MAME_TYPES = [
  'SN76496',
  'SN76489',
  'SN76489A',
  'SN76494',
  'SN94624',
  'NCR8496',
  'PSSJ3',
  'GAMEGEAR',
  'SEGAPSG',
] as const;

export const SN76489_IR_ARTIFACT = 'audio/sn76489.audio.ir.json';
export const SN76489_WORKLET_ARTIFACT = 'audio/sn76489-worklet.ts';
export const SN76489_MASTER_GAIN = 0.7;

export const SN76489_PORTS: readonly PortDeclaration[] = [
  { name: 'write', kind: 'registers', note: 'latched data bus write' },
  { name: 'clock', kind: 'clock' },
  { name: 'audio', kind: 'audio-out' },
];
