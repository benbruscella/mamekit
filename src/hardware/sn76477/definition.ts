import type { PortDeclaration } from '../ports.ts';

export const SN76477_ID = 'sn76477';
/** The SN76477 complex sound generator (sn76477.cpp), its pins set by the driver. */
export const SN76477_MAME_TYPES = ['SN76477'] as const;

export const SN76477_PORTS: readonly PortDeclaration[] = [
  { name: 'pins', kind: 'registers', note: 'enable, mixer, envelope and VCO pins and the resistor and capacitor values on them' },
  { name: 'audio', kind: 'audio-out' },
];
