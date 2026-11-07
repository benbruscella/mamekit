import type { PortDeclaration } from '../ports.ts';

export const NEOGEO_ID = 'neogeo';

/**
 * The Neo Geo's slots: the cartridge slot, the MVS edge connector the cabinet
 * controls plug into, and the two controller sockets. Each takes the cards its
 * machine config's option table offers (`neogeo_cart`, `neogeo_arc_edge`,
 * `neogeo_arc_pin15`), compiled from MAME as modules the slot loads when a
 * machine selects one.
 */
export const NEOGEO_MAME_TYPES = [
  'NEOGEO_CART_SLOT',
  'NEOGEO_CTRL_EDGE_CONNECTOR',
  'NEOGEO_CONTROL_PORT',
] as const;

export const NEOGEO_PORTS: readonly PortDeclaration[] = [
  { name: 'slot', kind: 'bus', note: 'source-selected generated cartridge and controller cards' },
  { name: 'registers', kind: 'registers', note: 'the driver reaches each card through its slot' },
];
