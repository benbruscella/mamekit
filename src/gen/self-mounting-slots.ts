// Cartridge slots that mount their own cartridges.
//
// A console package compiles such a slot so that MAME's own
// get_default_card_software and call_load run as generated code (the NES and
// the SNES); every other console keeps a host list of boards whose installer
// the runtime replays. Nothing in MAME's source tells the two apart -- every
// slot has a call_load -- so the packages that compile one say so here, with
// the (option, device type) pairs the slot declares.

import { nesCartOptions } from '../hardware/nes/ines-mappers.ts';
import { snesCartOptions } from '../hardware/snes/extract.ts';

export const SELF_MOUNTING_SLOTS: Readonly<Record<string, (mameSrc: string) => [string, string][]>> = {
  NES_CART_SLOT: nesCartOptions,
  SNS_CART_SLOT: snesCartOptions,
};
