// Local cartridge photography index.
//
// Files live under <artwork>/carts/<list>/ and are keyed by softlist short name:
//
//   <name>.<ext>          the whole cartridge, front on
//   <name>.sticker.<ext>  the label sticker only
//
// Two consumers share this: generation bakes the index into config.json so a
// deployed site needs no directory listing, and the dev server serves it live so
// adding or removing art shows up on reload without regenerating.

import { existsSync, readdirSync } from 'node:fs';

const CART_ART_EXT = /\.(png|jpe?g|webp)$/i;
const STICKER = '.sticker';

export interface CartArt {
  /** whole-cartridge photo filename, with extension */
  cart?: string;
  /** label-sticker filename, with extension */
  sticker?: string;
}

/** softlist short name -> the art files present for it. Empty when the dir is absent. */
export function cartArtIndex(dir: string): Record<string, CartArt> {
  if (!existsSync(dir)) return {};
  const art: Record<string, CartArt> = {};
  for (const file of readdirSync(dir).sort()) {
    if (!CART_ART_EXT.test(file)) continue;
    const stem = file.replace(CART_ART_EXT, '');
    const sticker = stem.toLowerCase().endsWith(STICKER);
    const name = sticker ? stem.slice(0, -STICKER.length) : stem;
    if (!name) continue;
    (art[name] ??= {})[sticker ? 'sticker' : 'cart'] = file;
  }
  return art;
}
