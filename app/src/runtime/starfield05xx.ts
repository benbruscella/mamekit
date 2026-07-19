// Namco 05xx starfield generator.
//
// Faithful port of src/mame/namco/starfield_05xx.cpp (R. Hildinger's
// RE-based implementation): a 16-bit Fibonacci LFSR with taps at 16,13,11,6
// runs over a 256x256 pixel field per frame; a "hit"
// ((lfsr & 0xFA14) == 0x7800) emits a star whose 2-bit set comes from LFSR
// bits 10,8 and whose 6-bit BBGGRR color is decoded from the remaining bits.
// Scrolling advances/delays the LFSR during the blanking intervals
// (pre/post visible cycle count tables ported verbatim).
//
// Wiring here matches Galaga (src/mame/namco/galaga.cpp):
//   - SCROLL_Y pins tied to ground (speed_index_Y always 0)
//   - set_starfield_config(16, 0, 256+16)  -> offsetX=16, offsetY=0, limitX=272
//   - control bits sampled from the 8-bit video latch at vblank
//     (screen_vblank_galaga): Q0-Q2 = X scroll speed, Q3/Q4 = star set
//     select (set_a = Q3, set_b = Q4|2), Q5 = _STARCLR enable.

const LFSR_SEED = 0x7fff;
const LFSR_HIT_MASK = 0xfa14;
const LFSR_HIT_VALUE = 0x7800;

const VISIBLE_LINES = 224;
const STARFIELD_PIXEL_WIDTH = 256;
const LFSR_CYCLES_PER_LINE = 256;

const SPEED_X_CYCLE_COUNT_OFFSET: readonly number[] = [0, 1, 2, 3, -4, -3, -2, -1];

const PRE_VIS_CYCLE_COUNT_VALUES: readonly number[] = [
  22 * LFSR_CYCLES_PER_LINE,
  23 * LFSR_CYCLES_PER_LINE,
  22 * LFSR_CYCLES_PER_LINE,
  23 * LFSR_CYCLES_PER_LINE,
  19 * LFSR_CYCLES_PER_LINE,
  20 * LFSR_CYCLES_PER_LINE,
  20 * LFSR_CYCLES_PER_LINE,
  22 * LFSR_CYCLES_PER_LINE,
];

const POST_VIS_CYCLE_COUNT_VALUES: readonly number[] = [
  10 * LFSR_CYCLES_PER_LINE,
  10 * LFSR_CYCLES_PER_LINE,
  12 * LFSR_CYCLES_PER_LINE,
  12 * LFSR_CYCLES_PER_LINE,
  9 * LFSR_CYCLES_PER_LINE,
  9 * LFSR_CYCLES_PER_LINE,
  10 * LFSR_CYCLES_PER_LINE,
  9 * LFSR_CYCLES_PER_LINE,
];

/**
 * 16-bit Fibonacci-style LFSR with taps at 16,13,11 and 6 — maximal
 * 65,535-step sequence. Verbatim port of get_next_lfsr_state().
 */
export function getNextLfsrState(lfsr: number): number {
  const bit = (lfsr >> 0) ^ (lfsr >> 3) ^ (lfsr >> 5) ^ (lfsr >> 10);
  return ((lfsr >> 1) | ((bit & 1) << 15)) & 0xffff;
}

export class Starfield05xx {
  private enable = 0;
  private lfsr = LFSR_SEED;
  private preVisCycleCount = 0;
  private postVisCycleCount = 0;
  private setA = 0;
  private setB = 0;
  private control = 0;

  private readonly offsetX: number;
  private readonly offsetY: number;
  private readonly limitX: number;

  /** 64 packed 0xAABBGGRR colors, indexed by the 6-bit star color value. */
  private colors: Uint32Array = new Uint32Array(64);

  constructor(offsetX = 16, offsetY = 0, limitX = STARFIELD_PIXEL_WIDTH + 16) {
    // Galaga: set_starfield_config(STARFIELD_X_OFFSET_GALAGA=16, 0, 256+16)
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.limitX = limitX;
  }

  /** Provide the 64-entry star palette (packed 0xAABBGGRR). */
  setColorTable(colors: Uint32Array): void {
    if (colors.length < 64) throw new Error('starfield: color table must have 64 entries');
    this.colors = colors;
  }

  /** Latch the 6 video-latch control bits (Q0..Q5). Applied at vblank(). */
  setControl(bits: number): void {
    this.control = bits & 0x3f;
  }

  /**
   * Apply the latched control bits, exactly as screen_vblank_galaga() does on
   * the falling edge of vblank (galaga_v.cpp:252-268) into
   * set_scroll_speed / set_active_starfield_sets / enable_starfield.
   */
  vblank(): void {
    // Galaga only scrolls in X - SCROLL_Y pins of the 05XX are grounded.
    const speedIndexX = this.control & 7;   // Q2<<2 | Q1<<1 | Q0
    const speedIndexY = 0;

    // set_scroll_speed()
    this.preVisCycleCount =
      (PRE_VIS_CYCLE_COUNT_VALUES[speedIndexY]! + SPEED_X_CYCLE_COUNT_OFFSET[speedIndexX]!) & 0xffff;
    this.postVisCycleCount = POST_VIS_CYCLE_COUNT_VALUES[speedIndexY]! & 0xffff;

    // set_active_starfield_sets(q3, q4 | 2)
    this.setA = (this.control >> 3) & 1;
    this.setB = ((this.control >> 4) & 1) | 2;

    // enable_starfield(q5): _STARCLR resets the LFSR seed when low
    const on = (this.control >> 5) & 1;
    if (!on) this.lfsr = LFSR_SEED;
    this.enable = on;
  }

  /**
   * Draw one frame of stars and advance the LFSR through the pre-visible,
   * visible and post-visible portions of the frame — verbatim port of
   * draw_starfield() (flip is always 0 for Galaga).
   */
  draw(frame: Uint32Array, width: number, height: number): void {
    if (!this.enable) return;

    let lfsr = this.lfsr;
    const setA = this.setA;
    const setB = this.setB;
    const colors = this.colors;
    const limitX = this.limitX;

    // Advance the LFSR during the pre-visible portion of the frame.
    // (uint16 do/while semantics preserved, as in the C++.)
    let n = this.preVisCycleCount & 0xffff;
    do {
      lfsr = getNextLfsrState(lfsr);
      n = (n - 1) & 0xffff;
    } while (n);

    // Visible portion - output all LFSR hits.
    for (let y = this.offsetY; y < VISIBLE_LINES + this.offsetY; y++) {
      const row = y * width;
      for (let x = this.offsetX; x < STARFIELD_PIXEL_WIDTH + this.offsetX; x++) {
        if ((lfsr & LFSR_HIT_MASK) === LFSR_HIT_VALUE) {
          const starSet = ((lfsr >> 9) & 2) | ((lfsr >> 8) & 1); // bitswap<2>(lfsr, 10, 8)
          if (starSet === setA || starSet === setB) {
            // don't draw the stars that are beyond the X limit
            if (x < limitX) {
              const dx = x; // flip (Bosconian) would add 64; Galaga passes flip=0
              if (dx >= 0 && dx < width && y >= 0 && y < height) {
                let color = (lfsr >> 5) & 0x7;
                color |= (lfsr << 3) & 0x18;
                color |= (lfsr << 2) & 0x20;
                color = ~color & 0x3f;
                frame[row + dx] = colors[color]!;
              }
            }
          }
        }
        lfsr = getNextLfsrState(lfsr);
      }
    }

    // Advance the LFSR during the post-visible portion of the frame.
    n = this.postVisCycleCount & 0xffff;
    do {
      lfsr = getNextLfsrState(lfsr);
      n = (n - 1) & 0xffff;
    } while (n);

    this.lfsr = lfsr;
  }
}
