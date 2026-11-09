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
  // ADPCM and speech chips a CPU reads back (the OKI's voice status, the
  // TMS5220's /READY) or feeds a sample at a time from the chip's own timer
  // (the MSM5205's VCK), and the delta-modulation decoder Sinistar talks through.
  'OKIM6295', 'MSM5205', 'TMS5220', 'TMS5220C', 'HC55516',
  // The Williams ADPCM board's DAC.
  'AD7524',
];
export const SOUND_DEVICE_PORTS: readonly PortDeclaration[] = [
  { name: 'registers', kind: 'registers', note: "the chip's own handlers, through the bus or a device finder" },
  { name: 'clock', kind: 'clock' },
  { name: 'audio', kind: 'audio-out', note: 'its sound_stream, mixed with the other streams' },
];
