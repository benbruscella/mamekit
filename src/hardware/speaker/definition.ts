import type { PortDeclaration } from '../ports.ts';

export const SPEAKER_ID = 'speaker';

/** MAME's level-driven speaker (`spkrdev.cpp`): the Spectrum's beeper. */
export const SPEAKER_MAME_TYPES = ['SPEAKER_SOUND'] as const;

export const SPEAKER_PORTS: readonly PortDeclaration[] = [
  { name: 'level', kind: 'registers', note: 'level_w from a driver port write' },
  { name: 'audio', kind: 'audio-out' },
];

/**
 * The rate a stream allocated at `machine().sample_rate()` renders at. MAME's
 * default; the device runtime answers the same value to the device itself.
 */
export const STREAM_AUDIO_RATE = 48000;

/**
 * Devices that render their own `sound_stream_update` beside the processor,
 * mixed on the main thread by their routed gains (sound kind `stream`): the
 * speaker, a cassette routed to the speakers so a load is heard, and a POKEY,
 * which the CPU reads back.
 */
export const STREAM_SOUND_TYPES: readonly string[] = ['SPEAKER_SOUND', 'CASSETTE', 'POKEY'];

/** The shared stream worklet, which only plays what the mix posts. */
export const STREAM_AUDIO_WORKLET_ARTIFACT = 'audio/stream-worklet.ts';
