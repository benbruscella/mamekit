import type { PortDeclaration } from '../ports.ts';

export const GAMEBOY_ID = 'gameboy';

/**
 * Board-visible Game Boy devices.
 *
 * The cartridge PCBs are compiled as source-declared children of the slot by
 * extract.ts, exactly as the NES, ColecoVision and Atari 2600 packages do for
 * their own cards. The PPU and APU are ordinary MAME devices reached through
 * the CPU's own program map, so they lower through the generic device
 * compiler rather than a bespoke extractor.
 */
export const GAMEBOY_MAME_TYPES = [
  'DMG_PPU',
  'DMG_APU',
  'GB_CART_SLOT',
] as const;

/** The tag the gameboy driver gives its sound device. */
export const GAMEBOY_APU_TAG = 'apu';

/**
 * The tag the gameboy driver gives its cartridge slot.
 *
 * `device_gb_cart_interface` looks the mounted cartridge's sub-regions up
 * through the slot (`memregion("rom")`), so the slot's tag and those names
 * together say where the cartridge bytes arrive.
 */
export const GAMEBOY_CART_SLOT_TAG = 'cartslot';

export const GAMEBOY_PORTS: readonly PortDeclaration[] = [
  { name: 'slot', kind: 'bus', note: 'source-selected generated cartridge board' },
  { name: 'registers', kind: 'registers', note: 'PPU and APU registers in the LR35902 program map' },
  { name: 'vram', kind: 'bus', note: 'PPU-owned video RAM and OAM windows' },
  { name: 'signals', kind: 'interrupt-out', note: 'V-blank, LCD STAT and OAM DMA cycle debt' },
  { name: 'clock', kind: 'clock', note: 'the 4.194304 MHz master clock the CPU also runs at' },
];

/** MAME's own type for the console's sound half. */
export const GAMEBOY_APU_TYPE = 'DMG_APU';

/**
 * The worklet that plays what the generated APU renders.
 *
 * The chip runs beside the processor -- a game reads its status register back
 * within the frame -- so it renders on the main thread and this only plays the
 * result. See [[audio-engine-placement]] for which side a chip belongs on.
 */
export const GAMEBOY_AUDIO_WORKLET_ARTIFACT = 'audio/gameboy-worklet.ts';

/**
 * Output rate for the APU's stream.
 *
 * MAME allocates it `SAMPLE_RATE_OUTPUT_ADAPTIVE`, which means the sound
 * system picks -- so this is ours to choose, and it is the one place that
 * chooses it: the runtime renders at this rate and the shell opens its audio
 * context at it.
 */
export const GAMEBOY_OUTPUT_RATE = 48000;

export function gameboyDeviceIrArtifact(type: string): string {
  return `devices/${type.toLowerCase()}.device.ir.json`;
}

export function gameboyDeviceModuleArtifact(type: string): string {
  return `devices/${type.toLowerCase()}.ts`;
}
