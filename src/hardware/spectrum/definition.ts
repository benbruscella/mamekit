import type { PortDeclaration } from '../ports.ts';

export const SPECTRUM_ID = 'spectrum';

/**
 * The Sinclair ZX Spectrum's own devices: the ULA contention models
 * (`spectrum_ula.cpp`), whose wait states the Z80 pays through its `m1` and
 * `nomreq` hooks, and the two slots on the edge connector -- the expansion
 * port and the DMA port -- with the cards they take.
 */
export const SPECTRUM_MAME_TYPES = [
  'SPECTRUM_ULA_UNCONTENDED',
  'SPECTRUM_ULA_48K',
  'SPECTRUM_ULA_128K',
  'SPECTRUM_EXPANSION_SLOT',
  'DMA_SLOT',
  // The 128K's AY slot. Its card carries the AY-3-8912, so the board composes
  // the card into the machine (as it does a card with a processor) and the
  // slot reaches it through get_card_device().
  'AY_SLOT',
] as const;

export const SPECTRUM_PORTS: readonly PortDeclaration[] = [
  { name: 'registers', kind: 'registers', note: 'bus hooks the driver calls on every access' },
  { name: 'signals', kind: 'interrupt-out', note: 'the expansion port\'s IRQ and NMI lines' },
];
