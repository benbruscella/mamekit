// MAME floppy drives and the connector a controller holds them in.
//
// The connector is claimed by name. Drive mechanisms are recognised by shape:
// floppy.h declares every one of them with DECLARE_FLOPPY_IMAGE_DEVICE, and
// the set a board composes is whatever its connector's default option names
// (the 1541's ALPS_3255190X), so no drive is listed here.

import type { PortDeclaration } from '../ports.ts';

export const FLOPPY_ID = 'floppy';
export const FLOPPY_MAME_TYPES = ['FLOPPY_CONNECTOR'] as const;
export const FLOPPY_PORTS: readonly PortDeclaration[] = [
  { name: 'registers', kind: 'registers', note: 'motor, stepper and side lines driven by the controller' },
  { name: 'signals', kind: 'interrupt-out', note: 'index pulse, ready and write protect' },
];
