import type { PortDeclaration } from '../ports.ts';

export const CASSETTE_ID = 'cassette';

/**
 * MAME's cassette transport where a machine composes it directly
 * (`CASSETTE(config, m_cassette)` in the Spectrum's config) rather than
 * inside a card, as the C64's datassette does.
 */
export const CASSETTE_MAME_TYPES = ['CASSETTE'] as const;

export const CASSETTE_PORTS: readonly PortDeclaration[] = [
  { name: 'transport', kind: 'registers', note: 'input/output/motor calls from the driver' },
  { name: 'audio', kind: 'audio-out', note: 'the tape signal, when routed to a speaker' },
];
