import type { BoardIr } from '../ir/board.ts';

/** Source-declared hardware shape; shared runtime behavior never keys on a title. */
export function hasDeviceType(machine: BoardIr, type: string): boolean {
  return machine.devices?.some(device => device.type === type) ?? false;
}

/** Source-declared handler shape used to select a reusable runtime capability. */
export function hasHandler(machine: BoardIr, method: string): boolean {
  return machine.handlers?.some(handler => handler.method === method) ?? false;
}
