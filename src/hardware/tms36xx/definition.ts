import type { PortDeclaration } from '../ports.ts';

export const TMS36XX_ID = 'tms36xx';
/** The TMS36xx tune generators (tms36xx.cpp): the MM6221AA, TMS3615 and TMS3617. */
export const TMS36XX_MAME_TYPES = ['TMS36XX'] as const;

export const TMS36XX_PORTS: readonly PortDeclaration[] = [
  { name: 'control', kind: 'registers', note: 'tune select, decay and note enables' },
  { name: 'audio', kind: 'audio-out' },
];
