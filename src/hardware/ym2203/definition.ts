// Yamaha YM2203 (OPN): four-operator FM plus an AY-compatible SSG.
//
// Shared by both sides of the compiler, so it names no MAME source path and no
// browser API — extract.ts does the lowering, and the runtime reads the ports.

import type { PortDeclaration } from '../ports.ts';

export const YM2203_ID = 'ym2203';

export const YM2203_MAME_TYPES = ['YM2203'] as const;

/** Emitted artifacts, relative to dist/runtime/generated. */
export const YM2203_IR_ARTIFACT = 'audio/ym2203.audio.ir.json';
export const YM2203_WORKLET_ARTIFACT = 'audio/ym2203-worklet.ts';

/**
 * Each chip presents an address/data port pair, so a board addresses chip N
 * port P as N * 2 + P and one worklet hosts every chip on the board.
 */
export const YM2203_PORTS_PER_CHIP = 2;

/**
 * Post-mix level for the generated core in the browser. MAME's add_route gains
 * set the relative mix between chips; this is the single master level, and it
 * lives with the family rather than in a table the shell has to be edited to
 * extend.
 */
export const YM2203_MASTER_GAIN = 0.7;

export const YM2203_PORTS: readonly PortDeclaration[] = [
  { name: 'registers', kind: 'registers', note: 'address/data port pair per chip' },
  { name: 'irq', kind: 'interrupt-out', note: 'FM timer IRQ output' },
  { name: 'clock', kind: 'clock' },
  { name: 'audio', kind: 'audio-out', note: 'FM plus SSG, mixed by the worklet' },
];
