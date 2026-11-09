// Sound chips compiled whole from their MAME class and played as streams.
//
// Shared by both sides of the compiler, so it names no MAME source path and no
// browser API.

import type { PortDeclaration } from '../ports.ts';

/**
 * Sound chips the stream capability compiles whole from their MAME class and
 * nothing else plays: every sample is the class's own `sound_stream_update`,
 * mixed on the main thread by its routes. Each family joins as its hand
 * engine is deleted (#242).
 */
export const SOUND_DEVICE_ID = 'sound-device';
export const SOUND_DEVICE_MAME_TYPES: readonly string[] = [
  // sn76496.cpp: one class, its variants told apart by constructor arguments.
  'SN76496', 'SN76489', 'SN76489A', 'SN76494', 'SN94624', 'NCR8496', 'PSSJ3', 'GAMEGEAR', 'SEGAPSG',
];
export const SOUND_DEVICE_PORTS: readonly PortDeclaration[] = [
  { name: 'registers', kind: 'registers', note: "the chip's own handlers, through the bus or a device finder" },
  { name: 'clock', kind: 'clock' },
  { name: 'audio', kind: 'audio-out', note: 'its sound_stream, mixed with the other streams' },
];
