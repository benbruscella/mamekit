// Typed component ports.
//
// A connection is only meaningful if both ends agree about what kind of signal
// crosses it. Declaring ports lets the compiler reject a board that wires a
// periodic interrupt to something that is not an interrupt input, instead of
// emitting it and letting the runtime ignore it.

/** The kinds of signal a MAME component exposes. */
export type PortKind =
  /** CPU program or I/O address space. */
  | 'bus'
  /** Interrupt or control pin: irq, firq, nmi, reset, halt. */
  | 'interrupt-in'
  /** Device output line that can drive an interrupt pin. */
  | 'interrupt-out'
  /** Addressable register file reached through a bus mapping. */
  | 'registers'
  /** Clock input. */
  | 'clock'
  /** Audio stream output. */
  | 'audio-out'
  /** Pixel, palette or video control path. */
  | 'video'
  /** Input port read back to the caller. */
  | 'input';

export interface PortDeclaration {
  /** Port name, unique within the component. */
  name: string;
  kind: PortKind;
  /** How many independent instances the component exposes (AY port A/B). */
  count?: number;
  /** Human-readable note tying the port to its MAME source concept. */
  note?: string;
}

/** Ports that can accept a connection from `kind`. */
const COMPATIBLE: Record<PortKind, readonly PortKind[]> = {
  'interrupt-out': ['interrupt-in'],
  'interrupt-in': [],
  bus: ['registers'],
  registers: [],
  clock: ['clock'],
  'audio-out': ['audio-out'],
  video: ['video'],
  input: ['input'],
};

export function portsCompatible(from: PortKind, to: PortKind): boolean {
  return COMPATIBLE[from].includes(to);
}

export function findPort(
  ports: readonly PortDeclaration[],
  name: string,
): PortDeclaration | undefined {
  return ports.find(port => port.name === name);
}
