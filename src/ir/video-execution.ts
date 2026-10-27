// Explicit video executors selected while lowering MAME source.

export type GeneratedDirectScreenShape =
  | 'berzerk-color-bitmap'
  | 'bublbobl-object-columns'
  | 'cosmic-bitmap-sprites'
  | 'dkong-scanline-sprites'
  | 'exidy-character-ram'
  | 'gauntlet-tilemaps'
  | 'galaxian-no-bullets'
  | 'm62-category-sprites'
  | 'system16a-layers'
  | 'system1-prom-mixer'
  | 'technos-tilemap-sprites'
  | 'tnx1-banked-raster'
  | 'timeplt'
  | 'taitosj-layered-char-ram'
  | 'vicdual-character-ram';

export interface GeneratedVideoExecution {
  directScreen?: GeneratedDirectScreenShape;
  spriteDmaCallback?: string;
  roadHandler?: string;
  zoomSpriteHandler?: string;
  spriteHandler?: string;
  bankMapperHandler?: string;
  cpsSpriteHandler?: string;
  bitmapMembers: { member: string; count: number }[];
}
