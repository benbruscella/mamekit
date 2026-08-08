/**
 * Boards verified by the real-ROM acceptance harness even though the static
 * source-closure report still sees runtime-provided device bridges as gaps.
 *
 * Each certification is deliberately bounded to the gaps present when the
 * board was verified. A newly introduced missing handler or hardware gap will
 * therefore fail closed instead of being hidden by a blanket game override.
 */
export interface RuntimeCertification {
  generationGaps: readonly string[];
  handlerGaps: readonly string[];
  allowDirectScreen?: boolean;
}

export const RUNTIME_CERTIFICATIONS: Readonly<Record<string, RuntimeCertification>> = {
  carnival: {
    generationGaps: [],
    handlerGaps: [],
    allowDirectScreen: true,
  },
  digdug: {
    generationGaps: ['mcu:MB8843'],
    handlerGaps: [],
  },
  galaga: {
    generationGaps: ['mcu:MB8843'],
    handlerGaps: [],
  },
  gauntlet: {
    generationGaps: [
      'alpha:TILEMAP',
      'eeprom:EEPROM_2804',
      'mob:ATARI_MOTION_OBJECTS',
      'playfield:TILEMAP',
      'pokey:POKEY',
      'slapstic:SLAPSTIC',
      'tms:TMS5220C',
    ],
    handlerGaps: [
      'alpha.write16',
      'eeprom.read',
      'eeprom.unlock_write16',
      'eeprom.write',
      'playfield.write16',
      'pokey.read',
      'pokey.write',
      'tms.data_w',
    ],
    allowDirectScreen: true,
  },
  mario: {
    generationGaps: ['snd_nl:dac:NETLIST_INT_INPUT', 'z80dma:Z80DMA'],
    handlerGaps: ['z80dma.read', 'z80dma.write'],
  },
  mslug: {
    generationGaps: [
      'ctrl1:NEOGEO_CONTROL_PORT',
      'ctrl2:NEOGEO_CONTROL_PORT',
      'edge:NEOGEO_CTRL_EDGE_CONNECTOR',
      'memcard:NG_MEMCARD',
      'upd4990a:UPD4990A',
    ],
    handlerGaps: [],
  },
  outrun: {
    generationGaps: [
      'i8255:I8255',
      'mapper:SEGA_315_5195_MEM_MAPPER',
      'pcm:SEGA_315_5218',
      'segaic16road:SEGAIC16_ROAD',
      'segaic16vid:SEGAIC16VID',
      'sprites:SEGA_OUTRUN_SPRITES',
    ],
    handlerGaps: [
      'mapper.pread',
      'mapper.read',
      'mapper.write',
      'segaic16road.segaic16_road_control_0_r',
      'segaic16road.segaic16_road_control_0_w',
    ],
    allowDirectScreen: true,
  },
  polepos: {
    generationGaps: [
      '52xx:NAMCO_52XX',
      'engine:POLEPOS_SOUND',
      'mcu:MB8843',
    ],
    handlerGaps: [
      'engine.polepos_engine_sound_lsb_w',
      'engine.polepos_engine_sound_msb_w',
    ],
  },
  pooyan: {
    generationGaps: [],
    handlerGaps: [
      'timeplt_audio:ay1.address_w',
      'timeplt_audio:ay1.data_r',
      'timeplt_audio:ay1.data_w',
      'timeplt_audio:ay2.address_w',
      'timeplt_audio:ay2.data_r',
      'timeplt_audio:ay2.data_w',
    ],
  },
  qbert: {
    generationGaps: ['r1sound:GOTTLIEB_SOUND_SPEECH_REV1A', 'votrax:VOTRAX_SC01'],
    handlerGaps: ['r1sound:dac.data_w'],
  },
  rocnrope: {
    generationGaps: [],
    handlerGaps: [
      'timeplt_audio:ay1.address_w',
      'timeplt_audio:ay1.data_r',
      'timeplt_audio:ay1.data_w',
      'timeplt_audio:ay2.address_w',
      'timeplt_audio:ay2.data_r',
      'timeplt_audio:ay2.data_w',
    ],
  },
  sinistar: {
    generationGaps: ['blitter:WILLIAMS_BLITTER_SC1', 'cvsd:HC55516'],
    handlerGaps: [],
  },
  spyhunt: {
    generationGaps: [],
    handlerGaps: [
      'csd:pia.read_alt',
      'csd:pia.write_alt',
      'ssio:ay0.address_w',
      'ssio:ay0.data_r',
      'ssio:ay0.data_w',
      'ssio:ay1.address_w',
      'ssio:ay1.data_r',
      'ssio:ay1.data_w',
    ],
  },
  timeplt: {
    generationGaps: [],
    handlerGaps: [
      'timeplt_audio:ay1.address_w',
      'timeplt_audio:ay1.data_r',
      'timeplt_audio:ay1.data_w',
      'timeplt_audio:ay2.address_w',
      'timeplt_audio:ay2.data_r',
      'timeplt_audio:ay2.data_w',
    ],
  },
  tutankhm: {
    generationGaps: [],
    handlerGaps: [
      'timeplt_audio:ay1.address_w',
      'timeplt_audio:ay1.data_r',
      'timeplt_audio:ay1.data_w',
      'timeplt_audio:ay2.address_w',
      'timeplt_audio:ay2.data_r',
      'timeplt_audio:ay2.data_w',
    ],
  },
};

function isSubset(actual: readonly string[], allowed: readonly string[]): boolean {
  const allowedSet = new Set(allowed);
  return actual.every(value => allowedSet.has(value));
}

export function isRuntimeCertified(
  game: string,
  generationGaps: readonly string[],
  handlerGaps: readonly string[],
  screenUpdateCompiled: boolean,
): boolean {
  const certification = RUNTIME_CERTIFICATIONS[game];
  return certification !== undefined &&
    isSubset(generationGaps, certification.generationGaps) &&
    isSubset(handlerGaps, certification.handlerGaps) &&
    (screenUpdateCompiled || certification.allowDirectScreen === true);
}
